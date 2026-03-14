import { l as logger, V as VoteService } from "./GameCommandUtils-D_sgs3NK.js";
function initializeVoteHooks() {
  Hooks.on("userConnected", async (user, connected) => {
    if (!connected) {
      logger.info(`🗳️ [VoteHooks] User ${user.name} disconnected, updating votes...`);
      await VoteService.handleUserDisconnect(user.id);
    } else {
      logger.info(`🗳️ [VoteHooks] User ${user.name} connected`);
    }
  });
  logger.debug("🗳️ [VoteHooks] Vote system hooks initialized");
}
export {
  initializeVoteHooks
};
