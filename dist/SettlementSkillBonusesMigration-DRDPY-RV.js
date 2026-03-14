import { g as getPartyActor, l as logger, q as updateKingdom, z as settlementService } from "./GameCommandUtils-D_sgs3NK.js";
function needsSkillBonusesMigration() {
  const actor = getPartyActor();
  if (!actor) return false;
  const kingdom = actor.getKingdomData();
  if (!kingdom) return false;
  return kingdom.settlements.some((s) => !s.skillBonuses);
}
async function migrateSettlementSkillBonuses() {
  const actor = getPartyActor();
  if (!actor) {
    logger.warn("[Migration] No kingdom actor found");
    return;
  }
  const kingdom = actor.getKingdomData();
  if (!kingdom) {
    logger.warn("[Migration] No kingdom data found");
    return;
  }
  const settlementsToMigrate = kingdom.settlements.filter((s) => !s.skillBonuses);
  if (settlementsToMigrate.length === 0) {
    return;
  }
  await updateKingdom((k) => {
    for (const settlement of k.settlements) {
      if (!settlement.skillBonuses) {
        const { bonuses, details } = settlementService.calculateSkillBonuses(settlement);
        settlement.skillBonuses = bonuses;
        settlement.skillBonusDetails = details;
      }
    }
  });
}
async function autoMigrateSettlements() {
  if (needsSkillBonusesMigration()) {
    await migrateSettlementSkillBonuses();
  }
}
export {
  autoMigrateSettlements,
  migrateSettlementSkillBonuses,
  needsSkillBonusesMigration
};
