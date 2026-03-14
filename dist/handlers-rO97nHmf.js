import { a as actionDispatcher, g as getPartyActor } from "./GameCommandUtils-D_sgs3NK.js";
function registerKingdomHandlers() {
  actionDispatcher.register("updateKingdom", async (data, senderId) => {
    const actor = await getPartyActor();
    if (!actor || actor.id !== data.actorId) {
      throw new Error(`Kingdom actor ${data.actorId} not found or not active`);
    }
    await actor.setKingdomData(data.updatedKingdom);
  });
  actionDispatcher.register("updateTurnState", async (data, senderId) => {
    const actor = await getPartyActor();
    if (!actor || actor.id !== data.actorId) {
      throw new Error(`Kingdom actor ${data.actorId} not found or not active`);
    }
    const currentState = actor.getFlag("pf2e-reignmaker", "turn-state");
    if (data.expectedVersion !== void 0 && currentState?.version !== data.expectedVersion) {
      return;
    }
    await actor.setFlag("pf2e-reignmaker", "turn-state", data.turnState);
  });
  actionDispatcher.register("ensureUploadDirectory", async (data) => {
    const game = globalThis.game;
    if (!game?.user?.isGM) {
      throw new Error("Only GM can create directories");
    }
    if (data.path.includes("..") || data.path.startsWith("/")) {
      throw new Error("Invalid directory path");
    }
    try {
      await FilePicker.browse("data", data.path);
    } catch (err) {
      const parts = data.path.split("/");
      let currentPath = "";
      for (const part of parts) {
        currentPath = currentPath ? `${currentPath}/${part}` : part;
        try {
          await FilePicker.browse("data", currentPath);
        } catch (browseErr) {
          await FilePicker.createDirectory("data", currentPath);
        }
      }
    }
  });
}
export {
  registerKingdomHandlers
};
