import { readFile } from "node:fs/promises";
import { createServer } from "node:http";
import { stripTypeScriptTypes } from "node:module";

const routes = new Map([
  ["/", ["../src/participant.html", "text/html"]],
  ["/participant.css", ["../src/participant.css", "text/css"]],
  ["/participant-view.js", ["../src/participant-view.js", "text/javascript"]],
  ["/participant.ts", ["../src/participant.ts", "text/javascript"]],
  ["/simulation.ts", ["../src/simulation.ts", "text/javascript"]],
]);

const assets = new Map(await Promise.all([...routes].map(async ([route, [path, type]]) => {
  const source = await readFile(new URL(path, import.meta.url), "utf8");
  return [route, { type, body: path.endsWith(".ts") ? stripTypeScriptTypes(source) : source }];
})));

const server = createServer((request, response) => {
  const asset = assets.get(request.url);
  if (!asset || !["GET", "HEAD"].includes(request.method)) {
    response.writeHead(404).end();
    return;
  }
  response.writeHead(200, { "Content-Type": `${asset.type}; charset=utf-8`, "Cache-Control": "no-store" });
  response.end(request.method === "HEAD" ? undefined : asset.body);
});

server.listen(Number(process.env.PORT ?? 4173), "127.0.0.1", () => {
  console.log(`QualityEdge is running at http://127.0.0.1:${server.address().port}/`);
});
