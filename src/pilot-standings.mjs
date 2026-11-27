export function finalStandings(rounds) {
  const lastRound = rounds.at(-1);
  const scored = lastRound.teams.map(({ alias, result }, slot) => {
    let qesHundredths = 0;
    let profit = 0;
    for (const round of rounds) {
      const quarter = round.teams[slot].result;
      qesHundredths += Math.round(quarter.qes * 100);
      profit += quarter.finances.operatingProfit;
    }
    return {
      alias, qesHundredths, profit,
      eligible: result.finances.closingCash > 0 && profit >= 0,
    };
  });
  const eligible = scored.filter((team) => team.eligible).sort((a, b) =>
    b.qesHundredths - a.qesHundredths || b.profit - a.profit);
  const ineligible = scored.filter((team) => !team.eligible);
  const [leader, runnerUp] = eligible;
  const tied = !!runnerUp && leader.qesHundredths === runnerUp.qesHundredths
    && leader.profit === runnerUp.profit;
  return {
    outcome: leader ? (tied ? "shared-winners" : "single-winner") : "no-winner",
    teams: [...eligible, ...ineligible].map(({ alias, qesHundredths, eligible }, index) => ({
      alias,
      qes: Math.round(qesHundredths / rounds.length) / 100,
      eligible,
      rank: eligible ? (tied ? 1 : index + 1) : null,
    })),
  };
}
