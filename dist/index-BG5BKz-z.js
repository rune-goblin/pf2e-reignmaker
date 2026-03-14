import { ch as completePhaseStepByIndex, ci as isStepCompletedByIndex, cj as isCurrentPhaseComplete, ck as getCurrentStepInfo, cl as getPhaseStatus, cm as TurnManager } from "./GameCommandUtils-D_sgs3NK.js";
class PhaseHandler {
  // Complete a step by index and handle progression logic
  static async completePhaseStepByIndex(stepIndex) {
    return await completePhaseStepByIndex(stepIndex);
  }
  // Check if a specific step is completed by index
  static async isStepCompletedByIndex(stepIndex) {
    return isStepCompletedByIndex(stepIndex);
  }
  // Check if current phase is complete
  static async isCurrentPhaseComplete() {
    return isCurrentPhaseComplete();
  }
  // Get current step information
  static getCurrentStepInfo() {
    return getCurrentStepInfo();
  }
  // Get phase completion status
  static getPhaseStatus() {
    return getPhaseStatus();
  }
}
const phaseHandler = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  PhaseHandler
}, Symbol.toStringTag, { value: "Module" }));
const index = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  PhaseHandler,
  TurnManager
}, Symbol.toStringTag, { value: "Module" }));
export {
  index as i,
  phaseHandler as p
};
