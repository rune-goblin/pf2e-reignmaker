import { l as logger, at as getFortificationTier, x as get_store_value, ae as currentTurn, q as updateKingdom } from "./GameCommandUtils-D_sgs3NK.js";
async function fortifyHexExecution(hexId, tier) {
  logger.info(`🏰 [fortifyHexExecution] Placing fortification on hex ${hexId} at tier ${tier}`);
  if (!hexId) {
    logger.warn("[fortifyHexExecution] No hex provided");
    return;
  }
  const tierConfig = getFortificationTier(tier);
  if (!tierConfig) {
    logger.error(`[fortifyHexExecution] Invalid tier: ${tier}`);
    return;
  }
  const currentTurn$1 = get_store_value(currentTurn);
  await updateKingdom((kingdom) => {
    const [rowStr, colStr] = hexId.split(".");
    const row = parseInt(rowStr, 10);
    const col = parseInt(colStr, 10);
    if (isNaN(row) || isNaN(col)) {
      logger.warn(`[fortifyHexExecution] Invalid hex ID format: ${hexId}`);
      return;
    }
    const hex = kingdom.hexes.find((h) => h.row === row && h.col === col);
    if (hex) {
      logger.info(`[fortifyHexExecution] Setting fortification tier ${tier} on hex ${hexId}`);
      hex.fortification = {
        tier,
        maintenancePaid: true,
        turnBuilt: currentTurn$1
        // No maintenance required on turn built
      };
    } else {
      logger.warn(`[fortifyHexExecution] Hex ${hexId} not found in Kingdom Store`);
    }
  });
  const { ReignMakerMapLayer } = await import("./GameCommandUtils-D_sgs3NK.js").then((n) => n.cP);
  const mapLayer = ReignMakerMapLayer.getInstance();
  mapLayer.showPixiContainer();
  logger.info(`✅ [fortifyHexExecution] Successfully built/upgraded fortification to ${tierConfig.name} on hex ${hexId}`);
}
export {
  fortifyHexExecution
};
