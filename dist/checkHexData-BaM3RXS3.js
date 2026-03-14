import { l as logger, x as get_store_value, y as kingdomData } from "./GameCommandUtils-D_sgs3NK.js";
function checkHexData(hexId) {
  logger.info(`========== HEX ${hexId} DATA CHECK ==========`);
  try {
    const km = typeof kingmaker !== "undefined" ? kingmaker : globalThis.kingmaker;
    if (km?.state?.hexes) {
      const [row, col] = hexId.split(".");
      const kingmakerKey = parseInt(row) * 1e3 + parseInt(col);
      const hexState = km.state.hexes[kingmakerKey];
      logger.info(`
[KINGMAKER] Hex ${hexId} (key ${kingmakerKey}):`);
      if (hexState) {
        logger.info(`  claimed: ${hexState.claimed}`);
        logger.info(`  features:`, hexState.features);
        logger.info(`  camp: ${hexState.camp}`);
        const hasRoadInKingmaker = hexState.features?.some((f) => f.type === "road");
        logger.info(`  HAS ROAD IN KINGMAKER: ${hasRoadInKingmaker}`);
      } else {
        logger.info(`  (No hex state in Kingmaker)`);
      }
    } else {
      logger.info(`
[KINGMAKER] Not available`);
    }
  } catch (error) {
    logger.error("[KINGMAKER] Error checking data:", error);
  }
  try {
    const kingdom = get_store_value(kingdomData);
    const hexData = kingdom.hexes?.find((h) => h.id === hexId);
    logger.info(`
[KINGDOM STORE] Hex ${hexId}:`);
    if (hexData) {
      logger.info(`  terrain: ${hexData.terrain}`);
      logger.info(`  travel: ${hexData.travel}`);
      logger.info(`  hasRoad: ${hexData.hasRoad}`);
      logger.info(`  features:`, hexData.features);
      logger.info(`  claimedBy: ${hexData.claimedBy}`);
    } else {
      logger.info(`  (Not found in Kingdom Store)`);
    }
  } catch (error) {
    logger.error("[KINGDOM STORE] Error checking data:", error);
  }
  logger.info(`========== END HEX DATA CHECK ==========
`);
}
function registerHexDataCheck() {
  const game = globalThis.game;
  if (!game) return;
  if (!game.reignmaker) {
    game.reignmaker = {};
  }
  game.reignmaker.checkHexData = checkHexData;
}
export {
  checkHexData,
  registerHexDataCheck
};
