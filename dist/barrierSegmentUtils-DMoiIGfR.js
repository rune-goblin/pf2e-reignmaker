import { n as getHexCenter, o as getEdgeMidpoint, p as getKingdomData, q as updateKingdom } from "./GameCommandUtils-D_sgs3NK.js";
function computeBarrierSegments(paths, crossings, canvas) {
  if (!canvas?.grid) {
    console.warn("[BarrierSegments] Canvas not ready, cannot compute segments");
    return [];
  }
  const segments = [];
  const crossingPointSet = /* @__PURE__ */ new Set();
  if (crossings) {
    for (const crossing of crossings) {
      const key = getConnectionPointKey(crossing);
      crossingPointSet.add(key);
    }
  }
  for (const path of paths) {
    const sortedPoints = [...path.points].sort((a, b) => a.order - b.order);
    for (let i = 0; i < sortedPoints.length - 1; i++) {
      const p1 = sortedPoints[i];
      const p2 = sortedPoints[i + 1];
      const pos1 = getConnectorPosition(p1, canvas);
      const pos2 = getConnectorPosition(p2, canvas);
      if (!pos1 || !pos2) continue;
      const hasCrossing = crossingPointSet.has(getConnectionPointKey(p1)) || crossingPointSet.has(getConnectionPointKey(p2));
      segments.push({
        start: { x: pos1.x, y: pos1.y },
        end: { x: pos2.x, y: pos2.y },
        hasCrossing
      });
    }
  }
  console.log(`[BarrierSegments] Computed ${segments.length} barrier segments`);
  return segments;
}
function getConnectionPointKey(point) {
  return `${point.hexI},${point.hexJ},${point.edge || ""},${point.isCenter || false},${point.cornerIndex ?? ""}`;
}
function getConnectorPosition(point, canvas) {
  if (point.isCenter) {
    return getHexCenter(point.hexI, point.hexJ, canvas);
  }
  if (point.edge) {
    return getEdgeMidpoint(point.hexI, point.hexJ, point.edge, canvas);
  }
  if (point.cornerIndex !== void 0) {
    const vertices = canvas.grid.getVertices({ i: point.hexI, j: point.hexJ });
    if (!vertices || vertices.length <= point.cornerIndex) {
      return null;
    }
    const v = vertices[point.cornerIndex];
    return { x: v.x, y: v.y };
  }
  return null;
}
async function ensureBarrierSegments() {
  const canvas = globalThis.canvas;
  if (!canvas?.grid) {
    console.warn("[BarrierSegments] Canvas not ready, cannot ensure segments");
    return 0;
  }
  const kingdom = getKingdomData();
  const hasRivers = (kingdom.rivers?.paths?.length ?? 0) > 0;
  const hasSegments = (kingdom.rivers?.barrierSegments?.length ?? 0) > 0;
  if (!hasRivers) {
    return 0;
  }
  if (hasSegments) {
    console.log(`[BarrierSegments] ${kingdom.rivers.barrierSegments.length} barrier segments already exist`);
    return kingdom.rivers.barrierSegments.length;
  }
  console.log("[BarrierSegments] Computing missing barrier segments for existing rivers...");
  const segments = computeBarrierSegments(
    kingdom.rivers.paths,
    kingdom.rivers.crossings,
    canvas
  );
  await updateKingdom((k) => {
    if (!k.rivers) k.rivers = { paths: [] };
    k.rivers.barrierSegments = segments;
  });
  console.log(`[BarrierSegments] Computed and saved ${segments.length} barrier segments`);
  return segments.length;
}
async function recalculateBarrierSegments() {
  const canvas = globalThis.canvas;
  if (!canvas?.grid) {
    console.error("[BarrierSegments] Canvas not ready, cannot recalculate");
    return 0;
  }
  const kingdom = getKingdomData();
  const paths = kingdom.rivers?.paths || [];
  const crossings = kingdom.rivers?.crossings;
  if (paths.length === 0) {
    console.log("[BarrierSegments] No rivers to compute barriers for");
    return 0;
  }
  const segments = computeBarrierSegments(paths, crossings, canvas);
  await updateKingdom((k) => {
    if (!k.rivers) k.rivers = { paths: [] };
    k.rivers.barrierSegments = segments;
  });
  console.log(`[BarrierSegments] Recalculated ${segments.length} barrier segments from ${paths.length} river paths`);
  return segments.length;
}
export {
  computeBarrierSegments,
  ensureBarrierSegments,
  recalculateBarrierSegments
};
