import { g as getPartyActor, l as logger } from "./GameCommandUtils-D_sgs3NK.js";
async function migrateKingmakerFeatures() {
  try {
    logger.info("[Migration] Starting kingmakerFeatures cleanup...");
    const partyActor = await getPartyActor();
    if (!partyActor) {
      return {
        success: false,
        hexesCleaned: 0,
        error: "No party actor found"
      };
    }
    const kingdom = partyActor.getKingdomData();
    if (!kingdom) {
      return {
        success: false,
        hexesCleaned: 0,
        error: "No kingdom data found"
      };
    }
    let hexesCleaned = 0;
    await partyActor.updateKingdomData((k) => {
      for (const hex of k.hexes) {
        const hexAny = hex;
        if ("kingmakerFeatures" in hexAny) {
          delete hexAny.kingmakerFeatures;
          hexesCleaned++;
        }
      }
    });
    if (hexesCleaned > 0) {
      logger.info(`[Migration] Cleaned up kingmakerFeatures from ${hexesCleaned} hexes`);
      const ui = globalThis.ui;
      ui?.notifications?.info(`Migration complete: Cleaned ${hexesCleaned} hexes`);
    } else {
      logger.info("[Migration] No kingmakerFeatures found - kingdom data already clean");
    }
    return {
      success: true,
      hexesCleaned
    };
  } catch (error) {
    logger.error("[Migration] Failed to migrate kingmakerFeatures:", error);
    return {
      success: false,
      hexesCleaned: 0,
      error: error instanceof Error ? error.message : "Unknown error"
    };
  }
}
async function needsKingmakerFeaturesMigration() {
  try {
    const partyActor = await getPartyActor();
    if (!partyActor) return false;
    const kingdom = partyActor.getKingdomData();
    if (!kingdom) return false;
    return kingdom.hexes.some((hex) => "kingmakerFeatures" in hex);
  } catch (error) {
    logger.error("[Migration] Error checking migration status:", error);
    return false;
  }
}
export {
  migrateKingmakerFeatures,
  needsKingmakerFeaturesMigration
};
