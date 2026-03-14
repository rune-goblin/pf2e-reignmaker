import { l as logger, a as actionDispatcher, b as armyService, u as updateActor, c as addItemToActor, r as removeItemFromActor, d as updateItemOnActor } from "./GameCommandUtils-D_sgs3NK.js";
function registerArmyHandlers() {
  logger.debug("[ArmyHandlers] Registering army handlers...");
  actionDispatcher.register("createArmy", async (data) => {
    const army = await armyService._createArmyInternal(
      data.name,
      data.level,
      data.type,
      data.portraitImage,
      data.tokenImage,
      data.actorData,
      data.settlementId,
      data.exemptFromUpkeep,
      data.ledBy,
      data.supportedBy
    );
    const isPlayerArmy = !data.ledBy || data.ledBy === "player" || data.ledBy === "PLAYER_KINGDOM";
    if (isPlayerArmy && army.actorId) {
      try {
        const { doctrineAbilityService } = await import("./DoctrineAbilityService-Dcwbh05e.js");
        await doctrineAbilityService.syncAbilitiesToArmy(army.actorId);
        logger.debug(`[ArmyHandlers] Synced doctrine abilities to ${army.name}`);
      } catch (error) {
        console.error(`[ArmyHandlers] Failed to sync doctrine abilities to ${army.name}:`, error);
      }
    }
    return army;
  });
  actionDispatcher.register("disbandArmy", async (data, senderId) => {
    const result = await armyService._disbandArmyInternal(data.armyId, data.deleteActor ?? true);
    return result;
  });
  actionDispatcher.register("placeArmyToken", async (data) => {
    await armyService._placeArmyTokenInternal(data.actorId, data.sceneId, data.x, data.y);
  });
  actionDispatcher.register("updateArmyActor", async (data, senderId) => {
    const actor = await updateActor(data.actorId, data.updateData);
    return actor;
  });
  actionDispatcher.register("addItemToArmy", async (data, senderId) => {
    const item = await addItemToActor(data.actorId, data.itemData);
    return item;
  });
  actionDispatcher.register("removeItemFromArmy", async (data) => {
    await removeItemFromActor(data.actorId, data.itemId);
  });
  actionDispatcher.register("updateItemOnArmy", async (data) => {
    const item = await updateItemOnActor(data.actorId, data.itemId, data.updateData);
    return item;
  });
  logger.debug("[ArmyHandlers] All army handlers registered successfully");
}
export {
  registerArmyHandlers
};
