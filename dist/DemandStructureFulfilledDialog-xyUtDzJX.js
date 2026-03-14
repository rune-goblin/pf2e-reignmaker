import { t as createGameCommandsService, l as logger, q as updateKingdom, v as updatePendingOutcome, w as escapeHtml } from "./GameCommandUtils-D_sgs3NK.js";
const DemandStructureFulfilledDialog = {
  /**
   * Show the demand fulfilled dialog
   * User rolls dice interactively, then claims rewards
   * 
   * @param options - Structure ID, name, and optional event instance/modifier IDs
   * @returns The result with rewards, or null if cancelled
   */
  async show(options) {
    const { structureId, structureName, settlementName } = options;
    const { default: DemandStructureFulfilledResolution } = await import("./DemandStructureFulfilledResolution-B_8WhEqU.js");
    return new Promise((resolve) => {
      let dialogComponent = null;
      const mount = document.createElement("div");
      document.body.appendChild(mount);
      dialogComponent = new DemandStructureFulfilledResolution({
        target: mount,
        props: {
          show: true,
          structureId,
          structureName,
          settlementName: settlementName || ""
        }
      });
      dialogComponent.$on("selection", (event) => {
        const result = event.detail;
        cleanup();
        resolve({
          unrestReduction: result.unrestReduction,
          goldReward: result.goldReward
        });
      });
      dialogComponent.$on("cancel", () => {
        cleanup();
        resolve(null);
      });
      function cleanup() {
        if (dialogComponent) {
          dialogComponent.$destroy();
          dialogComponent = null;
        }
        if (mount.parentNode) {
          mount.parentNode.removeChild(mount);
        }
      }
    });
  },
  /**
   * Apply the rewards from the dialog result
   */
  async applyRewards(structureId, structureName, result, eventInstanceId, modifierId, settlementName) {
    const { unrestReduction, goldReward } = result;
    const gameCommands = await createGameCommandsService();
    await gameCommands.applyNumericModifiers([
      { resource: "unrest", value: -unrestReduction },
      { resource: "gold", value: goldReward }
    ], "success");
    logger.info(`[DemandStructureFulfilledDialog] Attempting to remove modifier. modifierId=${modifierId}, structureId=${structureId}`);
    await updateKingdom((kingdom) => {
      if (kingdom.activeModifiers) {
        const beforeCount = kingdom.activeModifiers.length;
        const demandModifiers = kingdom.activeModifiers.filter(
          (m) => m.sourceType === "custom" && m.sourceName === "Demand Structure Event"
        );
        logger.info(`[DemandStructureFulfilledDialog] Found ${demandModifiers.length} demand modifiers before removal`);
        demandModifiers.forEach((m) => {
          logger.info(`  - id=${m.id}, metadata.demandedStructureId=${m.metadata?.demandedStructureId}`);
        });
        kingdom.activeModifiers = kingdom.activeModifiers.filter((m) => {
          if (modifierId && m.id === modifierId) {
            logger.info(`[DemandStructureFulfilledDialog] Removing modifier by ID match: ${m.id}`);
            return false;
          }
          if (m.sourceType === "custom" && m.sourceName === "Demand Structure Event" && m.metadata?.demandedStructureId === structureId) {
            logger.info(`[DemandStructureFulfilledDialog] Removing modifier by structureId match: ${m.id}`);
            return false;
          }
          return true;
        });
        const removed = beforeCount - kingdom.activeModifiers.length;
        logger.info(`[DemandStructureFulfilledDialog] Removed ${removed} demand modifier(s). ${kingdom.activeModifiers.length} modifiers remain.`);
      } else {
        logger.warn(`[DemandStructureFulfilledDialog] No activeModifiers array found on kingdom!`);
      }
    });
    if (eventInstanceId) {
      await updatePendingOutcome(eventInstanceId, (instance) => {
        instance.status = "resolved";
        instance.appliedOutcome = {
          outcome: "success",
          actorName: "Auto-Resolved",
          skillName: "",
          effect: "Citizens celebrate the new structure!",
          modifiers: [
            { type: "static", resource: "unrest", value: -unrestReduction },
            { type: "static", resource: "gold", value: goldReward }
          ],
          manualEffects: [],
          effectsApplied: true,
          shortfallResources: []
        };
      });
    }
    const ChatMessage = globalThis.ChatMessage;
    const citizensText = settlementName ? `Citizens of <strong>${escapeHtml(settlementName)}</strong> celebrate` : "Citizens celebrate";
    await ChatMessage.create({
      content: `<div class="reignmaker-chat">
        <h3>Demand for Structure Fulfilled!</h3>
        <p>${citizensText} as <strong>${escapeHtml(structureName)}</strong> has been built.</p>
        <p>Unrest reduced by <strong>${unrestReduction}</strong>.</p>
        <p>Gold gained: <strong>${goldReward}</strong>.</p>
      </div>`,
      speaker: { alias: "Kingdom" }
    });
    logger.info(`[DemandStructureFulfilledDialog] Applied rewards for structure ${structureId} in ${settlementName || "unknown"}: -${unrestReduction} unrest, +${goldReward} gold`);
  }
};
export {
  DemandStructureFulfilledDialog
};
