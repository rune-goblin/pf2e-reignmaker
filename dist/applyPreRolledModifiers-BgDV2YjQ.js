import { t as createGameCommandsService } from "./GameCommandUtils-D_sgs3NK.js";
async function applyPreRolledModifiers(ctx) {
  const numericModifiers = ctx.resolutionData?.numericModifiers || [];
  if (numericModifiers.length === 0) {
    console.log("[applyPreRolledModifiers] No pre-rolled modifiers to apply");
    return { success: true };
  }
  console.log(`[applyPreRolledModifiers] Applying ${numericModifiers.length} pre-rolled modifier(s)`);
  const gameCommandsService = await createGameCommandsService();
  const result = await gameCommandsService.applyNumericModifiers(
    numericModifiers,
    ctx.outcome
  );
  if (!result.success) {
    console.error("[applyPreRolledModifiers] Failed to apply modifiers:", result.error);
  } else {
    console.log("[applyPreRolledModifiers] Successfully applied modifiers");
  }
  return result;
}
export {
  applyPreRolledModifiers
};
