import { l as logger, a as actionDispatcher, _ as _createCreatureActorInternal, f as _syncCreatureToActorInternal, h as deleteActor, i as _generateTroopTemplatesInternal } from "./GameCommandUtils-D_sgs3NK.js";
function registerCreatureHandlers() {
  logger.debug("[CreatureHandlers] Registering creature handlers...");
  actionDispatcher.register("createCreatureActor", async (data) => {
    const actor = await _createCreatureActorInternal(data);
    return actor;
  });
  actionDispatcher.register("syncCreatureToActor", async (data) => {
    await _syncCreatureToActorInternal(data);
  });
  actionDispatcher.register("deleteCreatureActor", async (data) => {
    await deleteActor(data.actorId);
  });
  actionDispatcher.register("generateTroopTemplates", async () => {
    return await _generateTroopTemplatesInternal();
  });
  logger.debug("[CreatureHandlers] Creature handlers registered");
}
export {
  registerCreatureHandlers
};
