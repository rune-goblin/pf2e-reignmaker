import { B as BaseGameCommandHandler, l as logger, x as get_store_value, T as TurnPhase, A as addToActionLog, w as escapeHtml, C as actionLog, D as currentPhase } from "./GameCommandUtils-D_sgs3NK.js";
class SpendPlayerActionHandler extends BaseGameCommandHandler {
  canHandle(command) {
    return command.type === "spendPlayerAction";
  }
  async prepare(command, ctx) {
    const characterSelection = command.characterSelection || "random";
    command.characterId;
    logger.info(`[SpendPlayerActionHandler] Preparing to spend player action: selection=${characterSelection}`);
    const players = Array.from(game.users).filter((user) => !user.isGM && user.active);
    if (players.length === 0) {
      logger.warn("[SpendPlayerActionHandler] No logged-in players available");
      return {
        outcomeBadges: [{
          icon: "fa-exclamation-triangle",
          template: "No logged-in players available to spend action",
          variant: "neutral"
        }],
        commit: async () => {
          logger.info("[SpendPlayerActionHandler] No logged-in players to affect - skipping");
        }
      };
    }
    const currentActionLog = get_store_value(actionLog) || [];
    const playersWhoHaventActed = players.filter((player) => {
      return !currentActionLog.some(
        (entry) => entry.playerId === player.id && (entry.phase === TurnPhase.ACTIONS || entry.phase === TurnPhase.EVENTS)
      );
    });
    if (playersWhoHaventActed.length === 0) {
      logger.warn("[SpendPlayerActionHandler] All players have already acted");
      return {
        outcomeBadges: [{
          icon: "fa-exclamation-triangle",
          template: "All players have already acted this turn",
          variant: "neutral"
        }],
        commit: async () => {
          logger.info("[SpendPlayerActionHandler] All players acted - skipping");
        }
      };
    }
    let targetPlayer = null;
    let targetCharacter = null;
    if (characterSelection === "player-choice" || characterSelection === "random") {
      const randomIndex = Math.floor(Math.random() * playersWhoHaventActed.length);
      targetPlayer = playersWhoHaventActed[randomIndex];
      targetCharacter = targetPlayer?.character;
      if (!targetCharacter) {
        logger.warn(`[SpendPlayerActionHandler] Player ${targetPlayer?.name} has no assigned character`);
        targetCharacter = { name: targetPlayer?.name, id: targetPlayer?.id };
      }
    }
    if (!targetPlayer || !targetCharacter) {
      logger.error("[SpendPlayerActionHandler] Could not select target player/character");
      return null;
    }
    let characterName = "Unknown Character";
    if (targetCharacter.name) {
      characterName = targetCharacter.name;
    } else if (targetCharacter.data?.name) {
      characterName = targetCharacter.data.name;
    } else if (targetPlayer.name) {
      characterName = `${targetPlayer.name}'s Character`;
    }
    const message = `${characterName} cannot take a Kingdom Action this turn (recovering from wounds)`;
    logger.info(`[SpendPlayerActionHandler] Preview: ${message}`);
    logger.info(`[SpendPlayerActionHandler] Selected character: ${characterName} (Player: ${targetPlayer.name})`);
    const playerId = targetPlayer.id;
    const playerName = targetPlayer.name || "Unknown Player";
    const finalCharacterName = characterName;
    return {
      outcomeBadges: [{
        icon: "fa-user-injured",
        template: message,
        variant: "negative"
      }],
      commit: async () => {
        logger.info(`[SpendPlayerActionHandler] Spending action for ${finalCharacterName}`);
        const entry = {
          playerId,
          playerName,
          characterName: finalCharacterName,
          actionName: "spent-action-incident",
          // Special marker for spent actions
          phase: get_store_value(currentPhase),
          timestamp: Date.now()
        };
        await addToActionLog(entry);
        const chatMessage = `<p><strong>Character Cannot Act:</strong></p><p>${escapeHtml(finalCharacterName)} cannot take a Kingdom Action this turn (recovering from wounds).</p>`;
        ChatMessage.create({
          content: chatMessage,
          speaker: ChatMessage.getSpeaker()
        });
        logger.info(`[SpendPlayerActionHandler] Successfully spent action for ${finalCharacterName}`);
      }
    };
  }
}
export {
  SpendPlayerActionHandler
};
