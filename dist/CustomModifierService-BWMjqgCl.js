import { l as logger, aq as isStaticModifier, ar as isDiceModifier, as as isOngoingDuration, t as createGameCommandsService } from "./GameCommandUtils-D_sgs3NK.js";
async function applyCustomModifiers(config) {
  config?.phase || "Phase";
  const { getPartyActor } = await import("./GameCommandUtils-D_sgs3NK.js").then((n) => n.cn);
  const actor = getPartyActor();
  if (!actor) {
    logger.debug(`[CustomModifierService] No kingdom actor found`);
    return;
  }
  const kingdom = actor.getKingdomData();
  if (!kingdom || !kingdom.activeModifiers || kingdom.activeModifiers.length === 0) {
    logger.debug(`[CustomModifierService] No active modifiers found`);
    return;
  }
  kingdom.activeModifiers.forEach((m) => {
    logger.debug(`[CustomModifierService] Found modifier: ${m.name} (source: ${m.sourceType})`);
  });
  const customModifiers = kingdom.activeModifiers.filter((m) => m.sourceType === "custom");
  if (customModifiers.length === 0) {
    logger.debug(`[CustomModifierService] No custom modifiers to apply`);
    return;
  }
  logger.debug(`[CustomModifierService] Applying ${customModifiers.length} custom modifiers`);
  const modifiersByResource = /* @__PURE__ */ new Map();
  const modifiersToDecrement = [];
  for (const modifier of customModifiers) {
    logger.debug(`[CustomModifierService] Processing modifier: ${modifier.name}`);
    for (let i = 0; i < modifier.modifiers.length; i++) {
      const mod = modifier.modifiers[i];
      let resourceInfo = "unknown";
      if (isStaticModifier(mod) || isDiceModifier(mod)) {
        resourceInfo = mod.resource;
      } else if (Array.isArray(mod.resource)) {
        resourceInfo = mod.resource.join(", ");
      } else {
        resourceInfo = mod.resource || "unknown";
      }
      logger.debug(`[CustomModifierService]   Modifier effect on ${resourceInfo}`);
      if (isStaticModifier(mod) && (isOngoingDuration(mod.duration) || typeof mod.duration === "number")) {
        const current = modifiersByResource.get(mod.resource) || 0;
        const newValue = current + mod.value;
        modifiersByResource.set(mod.resource, newValue);
        logger.debug(`[CustomModifierService]   Applying ${mod.value} to ${mod.resource} (new total: ${newValue})`);
        if (typeof mod.duration === "number") {
          modifiersToDecrement.push({ modifierId: modifier.id, modifierIndex: i });
        }
      } else if (isDiceModifier(mod) && typeof mod.duration === "number") {
        logger.debug(`[CustomModifierService]   Rolling dice modifier: ${mod.formula} for ${mod.resource}`);
        const roll = new Roll(mod.formula);
        await roll.evaluate();
        let rolledValue = roll.total || 0;
        if (mod.negative) {
          rolledValue = -rolledValue;
        }
        const current = modifiersByResource.get(mod.resource) || 0;
        const newValue = current + rolledValue;
        modifiersByResource.set(mod.resource, newValue);
        logger.debug(`[CustomModifierService]   Rolled ${mod.formula} = ${rolledValue} for ${mod.resource} (new total: ${newValue})`);
        await roll.toMessage({
          flavor: `<strong>${modifier.name}</strong><br>${mod.resource}: ${mod.formula}`,
          speaker: ChatMessage.getSpeaker()
        });
        modifiersToDecrement.push({ modifierId: modifier.id, modifierIndex: i });
      } else {
        logger.debug(`[CustomModifierService]   Skipping (not applicable for application)`);
      }
    }
  }
  const numericModifiers = Array.from(modifiersByResource.entries()).map(([resource, value]) => ({
    resource,
    value
  }));
  logger.debug(`[CustomModifierService] Batched modifiers to apply:`);
  numericModifiers.forEach((m) => logger.debug(`   ${m.resource}: ${m.value}`));
  if (numericModifiers.length > 0) {
    const gameCommandsService = await createGameCommandsService();
    await gameCommandsService.applyNumericModifiers(numericModifiers);
    logger.debug(`✅ [CustomModifierService] Applied ${numericModifiers.length} modifier effects`);
  } else {
    logger.debug(`[CustomModifierService] No modifiers to apply (all skipped)`);
  }
}
export {
  applyCustomModifiers
};
