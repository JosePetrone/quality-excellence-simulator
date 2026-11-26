import { readFile } from "node:fs/promises";
import { createServer } from "node:http";
import { stripTypeScriptTypes } from "node:module";
import { pathToFileURL } from "node:url";
import { openPilot, PilotError, provisionPilot, rotateInstructor } from "../src/pilot-store.mjs";

const routes = new Map([
  ["/", ["pilot.html", "text/html"]],
  ["/pilot.css", ["pilot.css", "text/css"]],
  ["/pilot-view.js", ["pilot-view.js", "text/javascript"]],
  ["/participant.ts", ["participant.ts", "text/javascript"]],
  ["/simulation.ts", ["simulation.ts", "text/javascript"]],
]);
const commands = new Set(["/api/submit", "/api/resolve", "/api/publish", "/api/rotate-team"]);
const maximumBody = 4096;
const headers = {
  "Cache-Control": "no-store",
  "Content-Security-Policy": "default-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'; form-action 'self'",
  "Referrer-Policy": "no-referrer",
  "X-Content-Type-Options": "nosniff",
};

async function loadAssets() {
  return new Map(await Promise.all([...routes].map(async ([route, [file, type]]) => {
    const source = await readFile(new URL(`../src/${file}`, import.meta.url), "utf8");
    return [route, { type, body: file.endsWith(".ts") ? stripTypeScriptTypes(source) : source }];
  })));
}

function send(response, status, body, type = "application/json") {
  response.writeHead(status, { ...headers, "Content-Type": `${type}; charset=utf-8` });
  response.end(type === "application/json" ? JSON.stringify(body) : body);
}

function verifyOrigin(request) {
  if (request.headers["sec-fetch-site"] && request.headers["sec-fetch-site"] !== "same-origin") {
    throw new PilotError(403, "invalid-origin");
  }
  if (!request.headers.origin) return;
  let origin;
  try {
    origin = new URL(request.headers.origin);
  } catch {
    throw new PilotError(403, "invalid-origin");
  }
  if (!["http:", "https:"].includes(origin.protocol) || origin.host !== request.headers.host
    || origin.origin !== request.headers.origin) {
    throw new PilotError(403, "invalid-origin");
  }
}

async function readJson(request) {
  if (request.headers["content-type"]?.split(";")[0].trim().toLowerCase() !== "application/json") {
    throw new PilotError(415, "json-required");
  }
  if (Number(request.headers["content-length"]) > maximumBody) {
    throw new PilotError(413, "body-too-large");
  }
  const chunks = [];
  let size = 0;
  // Keep the stream open long enough to send a 413 on a chunked upload.
  for await (const chunk of request.iterator({ destroyOnReturn: false })) {
    size += chunk.length;
    if (size > maximumBody) throw new PilotError(413, "body-too-large");
    chunks.push(chunk);
  }
  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    throw new PilotError(400, "invalid-json");
  }
}

function createHandler(store, assets) {
  return async (request, response) => {
    try {
      const { method, url } = request;
      const asset = assets.get(url);
      if (asset && (method === "GET" || method === "HEAD")) {
        send(response, 200, method === "HEAD" ? undefined : asset.body, asset.type);
        return;
      }
      const credential = /^Bearer ([A-Za-z0-9_-]{43})$/i.exec(request.headers.authorization ?? "")?.[1];
      if (method === "GET" && url === "/api/session") {
        send(response, 200, store.read(credential));
      } else if (method === "POST" && commands.has(url)) {
        verifyOrigin(request);
        const payload = await readJson(request);
        send(response, 200, store.command(credential, url.slice("/api/".length), payload));
      } else {
        send(response, 404, { error: "not-found" });
      }
    } catch (error) {
      if (response.destroyed) return;
      const status = error instanceof PilotError ? error.status : 500;
      if (status === 413) response.setHeader("Connection", "close");
      send(response, status, { error: status === 500 ? "service-unavailable" : error.message });
    }
  };
}

export async function startPilot(path, port = 4175) {
  const assets = await loadAssets();
  const store = openPilot(path);
  const server = createServer({ requestTimeout: 15_000, headersTimeout: 10_000 }, createHandler(store, assets));
  server.once("close", () => store.close());
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(port, "127.0.0.1", () => {
      server.removeListener("error", reject);
      resolve();
    });
  }).catch(error => {
    store.close();
    throw error;
  });
  return server;
}

async function main(args) {
  const [action, path, ...aliases] = args;
  if (action === "init" && aliases.length === 2) {
    const credentials = provisionPilot(path, aliases);
    console.log(`Instructor: ${credentials.instructor}\nTeam A: ${credentials.a}\nTeam B: ${credentials.b}`);
  } else if (action === "rotate-instructor" && path && !aliases.length) {
    console.log(`Instructor: ${rotateInstructor(path)}`);
  } else if (action === "serve" && path && !aliases.length) {
    const server = await startPilot(path, Number(process.env.PORT ?? 4175));
    console.log(`QualityEdge pilot is running at http://127.0.0.1:${server.address().port}/`);
  } else {
    console.error("Usage: node scripts/serve-pilot.mjs init <absolute-db> <alias-a> <alias-b> | rotate-instructor <absolute-db> | serve <absolute-db>");
    process.exitCode = 1;
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    await main(process.argv.slice(2));
  } catch {
    console.error("Pilot command failed. Check the database path, aliases, state and listening port.");
    process.exitCode = 1;
  }
}
