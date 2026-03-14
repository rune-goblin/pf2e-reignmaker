import { a as actionDispatcher, l as logger, V as VoteService } from "./GameCommandUtils-D_sgs3NK.js";
function registerVoteHandlers() {
  actionDispatcher.register("castVote", handleCastVote);
  actionDispatcher.register("resolveVote", handleResolveVote);
  actionDispatcher.register("handleUserDisconnect", handleUserDisconnectAction);
  actionDispatcher.register("cleanupOldVotes", handleCleanupOldVotes);
  actionDispatcher.register("resetVote", handleResetVote);
  logger.debug("🗳️ [VoteHandler] Vote handlers registered");
}
async function handleCastVote(data) {
  await VoteService.castVoteForPlayer(
    data.eventId,
    data.choiceId,
    data.playerId,
    data.playerName,
    data.characterName,
    data.playerColor
  );
}
async function handleResolveVote(data) {
  await VoteService.forceResolveWithWinner(data.eventId, data.winner);
}
async function handleUserDisconnectAction(data) {
  await VoteService.handleUserDisconnect(data.userId);
}
async function handleCleanupOldVotes(data) {
  await VoteService.cleanupOldVotes();
}
async function handleResetVote(data) {
  await VoteService.resetVote(data.eventId);
}
export {
  registerVoteHandlers
};
