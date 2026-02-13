export function formatTime(seconds) {
  const safeSeconds = Math.max(0, Number.isFinite(seconds) ? seconds : 0);
  const m = Math.floor(safeSeconds / 60);
  const s = safeSeconds % 60;
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}

export function buildPerLevelSummary(levelSuccessTimes) {
  const sorted = [...(levelSuccessTimes ?? [])].sort((a, b) => a.level - b.level);
  const perLevelSummary = sorted.map((t, idx) => {
    const prevAt = idx === 0 ? 0 : sorted[idx - 1].at;
    return {
      level: t.level,
      at: t.at,
      duration: Math.max(0, t.at - prevAt),
    };
  });

  return { sorted, perLevelSummary };
}
