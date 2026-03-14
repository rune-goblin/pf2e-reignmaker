import { l as logger, g as getPartyActor, P as PLAYER_KINGDOM, j as getWorksiteProductionDisplay } from "./GameCommandUtils-D_sgs3NK.js";
async function inspectProduction() {
  logger.debug("=== PRODUCTION INSPECTION ===");
  const actor = await getPartyActor();
  if (!actor) {
    console.error("No kingdom actor found");
    return;
  }
  const kingdom = actor.getKingdomData();
  if (!kingdom) {
    console.error("No kingdom data found");
    return;
  }
  logger.debug("Kingdom Data Overview:");
  logger.debug("  Total hexes:", kingdom.hexes?.length || 0);
  logger.debug("  Claimed hexes:", kingdom.hexes?.filter((h) => h.claimedBy === PLAYER_KINGDOM).length || 0);
  const hexesWithWorksites = kingdom.hexes?.filter((h) => h.worksite) || [];
  logger.debug("  Hexes with worksites:", hexesWithWorksites.length);
  if (hexesWithWorksites.length === 0) {
    logger.debug("No worksites found in hex data!");
    logger.debug("This means worksites were not properly saved to kingdom data.");
    return;
  }
  logger.debug("\nWorksite Details:");
  hexesWithWorksites.forEach((hex) => {
    logger.debug(`
Hex ${hex.id}:`);
    logger.debug("  Terrain:", hex.terrain || "MISSING");
    logger.debug("  Worksite Type:", hex.worksite?.type || "MISSING");
    logger.debug("  Claimed By:", hex.claimedBy);
    logger.debug("  Has Commodity Bonus:", hex.hasCommodityBonus || false);
    const terrain = hex.terrain?.toLowerCase() || "";
    const worksiteType = hex.worksite?.type || "";
    const expectedProduction = getWorksiteProductionDisplay(worksiteType, terrain) || "None (terrain mismatch)";
    logger.debug("  Expected Production:", expectedProduction);
  });
  const { calculateProduction } = await import("./GameCommandUtils-D_sgs3NK.js").then((n) => n.ct);
  const result = calculateProduction(kingdom.hexes || [], []);
  logger.debug("\nCalculated Production (from hexes):");
  const production = {};
  result.totalProduction.forEach((value, key) => {
    production[key] = value;
  });
  logger.debug(production);
  const hasProduction = Object.values(production).some((v) => v > 0);
  if (!hasProduction && hexesWithWorksites.length > 0) {
    logger.debug("Calculated production is empty despite having worksites!");
    logger.debug("Possible causes:");
    logger.debug("  1. Terrain data is missing or incorrect");
    logger.debug("  2. Worksites are on incompatible terrain");
    logger.debug("  3. Production calculation logic has an error");
  }
  logger.debug("\n=== END INSPECTION ===");
}
function registerProductionInspector() {
  if (!globalThis.game?.pf2eReignMaker) {
    globalThis.game = globalThis.game || {};
    globalThis.game.pf2eReignMaker = {};
  }
  globalThis.game.pf2eReignMaker.inspectProduction = inspectProduction;
  logger.debug("Production inspector registered: game.pf2eReignMaker.inspectProduction()");
}
export {
  inspectProduction,
  registerProductionInspector
};
