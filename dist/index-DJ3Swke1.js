import { t as createGameCommandsService } from "./GameCommandUtils-D_sgs3NK.js";
import { an, ap, ao, am } from "./GameCommandUtils-D_sgs3NK.js";
async function applyResolvedOutcome(resolutionData, outcome) {
  const gameCommands = await createGameCommandsService();
  const result = await gameCommands.applyNumericModifiers(
    resolutionData.numericModifiers,
    outcome
  );
  if (resolutionData.manualEffects.length > 0) ;
  if (resolutionData.complexActions.length > 0) ;
  return result;
}
export {
  applyResolvedOutcome,
  an as detectStateChangeDice,
  ap as formatStateChangeLabel,
  ao as getOutcomeDisplayProps,
  am as rollDiceFormula
};
