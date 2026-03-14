import { l as logger, k as getHexCenter, m as createMapText } from "./GameCommandUtils-D_sgs3NK.js";
async function renderSettlementLabels(layer, settlementData, canvas) {
  if (!canvas?.grid) {
    logger.warn("[SettlementLabelRenderer] ❌ Canvas grid not available");
    return 0;
  }
  let successCount = 0;
  for (const settlement of settlementData) {
    const { id, name } = settlement;
    try {
      const center = getHexCenter(id, canvas);
      if (!center) {
        logger.warn(`[SettlementLabelRenderer] ⚠️ Invalid hex ID: ${id}`);
        continue;
      }
      const hexSize = canvas.grid.sizeY;
      const bottomVertexY = center.y + hexSize / 2;
      const labelY = bottomVertexY - 5;
      const text = createMapText({
        text: name,
        x: center.x,
        y: labelY,
        style: "settlementLabel",
        anchorX: 0.5,
        anchorY: 1,
        name: `SettlementLabel_${id}`
      }, canvas);
      if (text) {
        layer.addChild(text);
        successCount++;
      }
    } catch (error) {
      logger.error(`[SettlementLabelRenderer] Failed to draw label for settlement ${id}:`, error);
    }
  }
  return successCount;
}
export {
  renderSettlementLabels
};
