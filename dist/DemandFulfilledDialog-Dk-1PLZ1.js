import { t as createGameCommandsService, l as logger, q as updateKingdom, v as updatePendingOutcome, w as escapeHtml } from "./GameCommandUtils-D_sgs3NK.js";
const DemandFulfilledDialog = {
  /**
   * Show the demand fulfilled dialog
   * User rolls dice interactively, selects worksite, then claims rewards
   * 
   * @param options - Hex ID, terrain, and optional event instance ID
   * @returns The result with rewards and selected worksite, or null if cancelled
   */
  async show(options) {
    const { hexId, terrain } = options;
    const { default: DemandFulfilledResolution } = await import("./DemandFulfilledResolution-CaePleMQ.js");
    return new Promise((resolve) => {
      let dialogComponent = null;
      const mount = document.createElement("div");
      document.body.appendChild(mount);
      dialogComponent = new DemandFulfilledResolution({
        target: mount,
        props: {
          show: true,
          hexId,
          terrain
        }
      });
      dialogComponent.$on("selection", (event) => {
        const result = event.detail;
        cleanup();
        resolve({
          goldBonus: result.goldBonus,
          unrestReduction: result.unrestReduction,
          worksiteType: result.worksiteType
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
  async applyRewards(hexId, result, eventInstanceId) {
    const { goldBonus, unrestReduction, worksiteType } = result;
    const gameCommands = await createGameCommandsService();
    await gameCommands.applyNumericModifiers([
      { resource: "unrest", value: -unrestReduction },
      { resource: "gold", value: goldBonus }
    ], "success");
    if (worksiteType) {
      const { createWorksiteExecution } = await import("./GameCommandUtils-D_sgs3NK.js").then((n) => n.cJ);
      await createWorksiteExecution(hexId, worksiteType);
      logger.info(`[DemandFulfilledDialog] Created free ${worksiteType} on hex ${hexId}`);
    }
    await updateKingdom((kingdom) => {
      const hex = kingdom.hexes?.find((h) => h.id === hexId);
      if (hex?.features) {
        hex.features = hex.features.filter((f) => f.type !== "demanded");
        logger.info(`[DemandFulfilledDialog] Removed 'demanded' feature from hex ${hexId}`);
      }
    });
    if (eventInstanceId) {
      await updatePendingOutcome(eventInstanceId, (instance) => {
        instance.status = "resolved";
        instance.appliedOutcome = {
          outcome: "success",
          actorName: "Auto-Resolved",
          skillName: "",
          effect: "Citizens celebrate the new territory!",
          modifiers: [
            { type: "static", resource: "unrest", value: -unrestReduction },
            { type: "static", resource: "gold", value: goldBonus }
          ],
          manualEffects: [],
          effectsApplied: true,
          shortfallResources: []
        };
      });
    }
    const ChatMessage = globalThis.ChatMessage;
    await ChatMessage.create({
      content: `<div class="reignmaker-chat">
        <h3>Demand for Expansion Fulfilled</h3>
        <p>Citizens celebrate as hex <strong>${escapeHtml(hexId)}</strong> has been claimed.</p>
        <p>Unrest reduced by <strong>${unrestReduction}</strong>.</p>
        <p>Gold gained: <strong>+${goldBonus}</strong>.</p>
        ${worksiteType ? `<p>A free <strong>${escapeHtml(worksiteType)}</strong> has been established!</p>` : ""}
      </div>`,
      speaker: { alias: "Kingdom" }
    });
    logger.info(`[DemandFulfilledDialog] Applied rewards for hex ${hexId}: -${unrestReduction} unrest, +${goldBonus} gold, worksite: ${worksiteType || "none"}`);
  }
};
export {
  DemandFulfilledDialog
};
