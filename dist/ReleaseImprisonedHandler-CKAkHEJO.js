import { B as BaseGameCommandHandler, l as logger, g as getPartyActor } from "./GameCommandUtils-D_sgs3NK.js";
class ReleaseImprisonedHandler extends BaseGameCommandHandler {
  canHandle(command) {
    return command.type === "releaseImprisoned";
  }
  async prepare(command, ctx) {
    const percentage = command.percentage;
    logger.info(`[ReleaseImprisonedHandler] Preparing to release ${percentage === "all" ? "all" : percentage + "%"} imprisoned unrest`);
    const actor = getPartyActor();
    if (!actor) {
      logger.error("[ReleaseImprisonedHandler] No kingdom actor available");
      return null;
    }
    const kingdom = actor.getKingdomData();
    if (!kingdom) {
      logger.error("[ReleaseImprisonedHandler] No kingdom data available");
      return null;
    }
    let totalImprisoned = 0;
    for (const settlement of kingdom.settlements || []) {
      totalImprisoned += settlement.imprisonedUnrest || 0;
    }
    if (totalImprisoned === 0) {
      logger.warn("[ReleaseImprisonedHandler] No imprisoned unrest to release");
      return {
        outcomeBadges: [{
          icon: "fa-exclamation-triangle",
          template: "No imprisoned unrest to release",
          variant: "neutral"
        }],
        commit: async () => {
          logger.info("[ReleaseImprisonedHandler] No imprisoned unrest - skipping");
        }
      };
    }
    const releasePercentage = percentage === "all" ? 1 : percentage / 100;
    const amountToRelease = Math.floor(totalImprisoned * releasePercentage);
    if (amountToRelease === 0) {
      logger.warn("[ReleaseImprisonedHandler] Amount to release rounded down to 0");
      return {
        outcomeBadges: [{
          icon: "fa-exclamation-triangle",
          template: "No imprisoned unrest to release (rounded down to 0)",
          variant: "neutral"
        }],
        commit: async () => {
          logger.info("[ReleaseImprisonedHandler] Amount rounded to 0 - skipping");
        }
      };
    }
    const percentageText = percentage === "all" ? "100%" : `${percentage}%`;
    const badgeText = `Releasing ${amountToRelease} imprisoned unrest (${percentageText} of ${totalImprisoned}) - converting to regular unrest`;
    logger.info(`[ReleaseImprisonedHandler] Preview: ${badgeText}`);
    return {
      outcomeBadges: [{
        icon: "fa-door-open",
        template: badgeText,
        variant: "negative"
      }],
      commit: async () => {
        logger.info(`[ReleaseImprisonedHandler] Releasing ${amountToRelease} imprisoned unrest`);
        const actor2 = getPartyActor();
        if (!actor2) {
          logger.error("[ReleaseImprisonedHandler] No kingdom actor available during commit");
          return;
        }
        await actor2.updateKingdomData((kingdom2) => {
          let remaining = amountToRelease;
          for (const settlement of kingdom2.settlements || []) {
            if (remaining <= 0) break;
            const currentImprisoned = settlement.imprisonedUnrest || 0;
            if (currentImprisoned === 0) continue;
            const toRelease = Math.min(remaining, Math.ceil(currentImprisoned * releasePercentage));
            settlement.imprisonedUnrest = Math.max(0, currentImprisoned - toRelease);
            remaining -= toRelease;
            logger.info(`  🔓 Released ${toRelease} imprisoned unrest from ${settlement.name}`);
          }
          kingdom2.unrest = (kingdom2.unrest || 0) + amountToRelease;
          logger.info(`  ⚠️ Added ${amountToRelease} to kingdom unrest (now ${kingdom2.unrest})`);
        });
        const percentageText2 = percentage === "all" ? "100%" : `${percentage}%`;
        const message = `<p><strong>Prison Break:</strong> Released ${amountToRelease} imprisoned unrest (${percentageText2} of ${totalImprisoned}) back into the kingdom.</p>`;
        ChatMessage.create({
          content: message,
          speaker: { alias: "Kingdom Management" }
        });
        logger.info(`[ReleaseImprisonedHandler] Successfully released ${amountToRelease} imprisoned unrest`);
      }
    };
  }
}
export {
  ReleaseImprisonedHandler
};
