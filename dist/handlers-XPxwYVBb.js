import { a as actionDispatcher, e as createNPCInFolder } from "./GameCommandUtils-D_sgs3NK.js";
function registerFactionHandlers() {
  actionDispatcher.register("createFactionActor", async (data) => {
    const actor = await createFactionActorInternal(data.name, data.folderId);
    return actor;
  });
}
async function createFactionActorInternal(name, folderId) {
  const actor = await createNPCInFolder(name, "NPCs");
  return actor;
}
export {
  registerFactionHandlers
};
