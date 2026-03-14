import { B as BaseGameCommandHandler, l as logger, g as getPartyActor, a as actionDispatcher, E as getPartyLevel, G as ARMY_TYPES, b as armyService, w as escapeHtml } from "./GameCommandUtils-D_sgs3NK.js";
const REBEL_ARMY_TYPES = ["infantry", "cavalry"];
function pickRandomArmyType() {
  return REBEL_ARMY_TYPES[Math.floor(Math.random() * REBEL_ARMY_TYPES.length)];
}
class SpawnEnemyArmyHandler extends BaseGameCommandHandler {
  canHandle(command) {
    return command.type === "spawnEnemyArmy";
  }
  async prepare(command, ctx) {
    const factionId = command.factionId || ctx.metadata?.rebelsFactionId || "rebels";
    const factionName = command.factionName || "Rebels";
    logger.info(`[SpawnEnemyArmyHandler] Preparing to spawn enemy army for faction: ${factionId}`);
    const actor = getPartyActor();
    if (!actor) {
      logger.error("[SpawnEnemyArmyHandler] No kingdom actor available");
      return null;
    }
    const kingdom = actor.getKingdomData();
    if (!kingdom) {
      logger.error("[SpawnEnemyArmyHandler] No kingdom data available");
      return null;
    }
    const partyLevel = getPartyLevel();
    const armyLevel = Math.max(1, partyLevel - 1);
    const armyType = pickRandomArmyType();
    const armyConfig = ARMY_TYPES[armyType];
    const armyName = `Rebel ${armyConfig.name}`;
    const seizedHexIds = ctx.metadata?.seizedHexIds || [];
    const placementHexId = seizedHexIds.length > 0 ? seizedHexIds[Math.floor(Math.random() * seizedHexIds.length)] : null;
    logger.info(`[SpawnEnemyArmyHandler] Party level: ${partyLevel}, Army level: ${armyLevel}, Type: ${armyType}`);
    if (placementHexId) {
      logger.info(`[SpawnEnemyArmyHandler] Will place army on hex: ${placementHexId}`);
    }
    const message = `Enemy army spawned: ${armyName} (Level ${armyLevel})`;
    logger.info(`[SpawnEnemyArmyHandler] Preview: ${message}`);
    return {
      outcomeBadges: [{
        icon: "fa-shield",
        template: message,
        variant: "negative"
      }],
      commit: async () => {
        const freshActor = getPartyActor();
        const freshKingdom = freshActor?.getKingdomData();
        const freshPartyLevel = getPartyLevel();
        const freshArmyLevel = Math.max(1, freshPartyLevel - 1);
        logger.info(`[SpawnEnemyArmyHandler] Creating enemy army: ${armyName}, Level ${freshArmyLevel}`);
        try {
          const army = await armyService.createArmy(armyName, freshArmyLevel, {
            type: armyType,
            portraitImage: armyConfig.portraitImage,
            // Use army type portrait image
            tokenImage: armyConfig.tokenImage,
            // Use army type token image
            ledBy: factionId,
            supportedBy: factionId,
            exemptFromUpkeep: true,
            // Enemy armies don't cost player upkeep
            settlementId: null
            // No settlement support for enemy armies
          });
          logger.info(`[SpawnEnemyArmyHandler] Successfully created enemy army: ${army.id}`);
          if (placementHexId && army.actorId) {
            await this.placeArmyOnHex(army.actorId, placementHexId, armyName, freshKingdom);
          }
          const placementHex = freshKingdom?.hexes?.find((h) => h.id === placementHexId);
          const locationName = placementHex?.name || placementHexId || "Unknown";
          const chatMessage = `
            <p><strong>Enemy Army Spawned!</strong></p>
            <ul>
              <li><strong>Name:</strong> ${escapeHtml(armyName)}</li>
              <li><strong>Level:</strong> ${freshArmyLevel}</li>
              <li><strong>Type:</strong> ${escapeHtml(armyConfig.name)}</li>
              <li><strong>Faction:</strong> ${escapeHtml(factionName)}</li>
              ${placementHexId ? `<li><strong>Location:</strong> ${escapeHtml(locationName)}</li>` : ""}
            </ul>
            <p><em>This army is hostile and must be dealt with.</em></p>
          `;
          ChatMessage.create({
            content: chatMessage,
            speaker: ChatMessage.getSpeaker()
          });
        } catch (error) {
          logger.error(`[SpawnEnemyArmyHandler] Failed to create enemy army:`, error);
          ChatMessage.create({
            content: `<p><strong>Error:</strong> Failed to spawn enemy army. Please create manually: ${escapeHtml(armyName)} (Level ${armyLevel})</p>`,
            speaker: ChatMessage.getSpeaker()
          });
        }
      },
      // Store army info in metadata
      metadata: {
        enemyArmy: {
          name: armyName,
          level: armyLevel,
          type: armyType,
          factionId,
          factionName,
          placementHexId
        }
      }
    };
  }
  /**
   * Place army token on a hex
   */
  async placeArmyOnHex(actorId, hexId, armyName, kingdom) {
    try {
      const [row, col] = hexId.split(".").map(Number);
      if (isNaN(row) || isNaN(col)) {
        logger.warn(`[SpawnEnemyArmyHandler] Invalid hex ID format: ${hexId}`);
        return;
      }
      const canvas = globalThis.canvas;
      if (!canvas?.grid) {
        logger.warn(`[SpawnEnemyArmyHandler] Canvas not available for token placement`);
        return;
      }
      const center = canvas.grid.getCenterPoint({ i: row, j: col });
      if (!center) {
        logger.warn(`[SpawnEnemyArmyHandler] Could not get center point for hex ${hexId}`);
        return;
      }
      const scene = canvas.scene;
      if (!scene) {
        logger.warn(`[SpawnEnemyArmyHandler] No active scene for token placement`);
        return;
      }
      if (actionDispatcher.isAvailable()) {
        await actionDispatcher.dispatch("placeArmyToken", {
          actorId,
          sceneId: scene.id,
          x: center.x,
          y: center.y
        });
        logger.info(`[SpawnEnemyArmyHandler] Placed ${armyName} token at hex ${hexId} (${center.x}, ${center.y})`);
      }
    } catch (error) {
      logger.error(`[SpawnEnemyArmyHandler] Failed to place army token:`, error);
    }
  }
}
export {
  SpawnEnemyArmyHandler
};
