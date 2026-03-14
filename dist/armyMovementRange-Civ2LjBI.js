import { l as logger } from "./GameCommandUtils-D_sgs3NK.js";
async function getArmyMovementRange(actorId) {
  const DEFAULT_MOVEMENT = 20;
  const DEFAULT_RESULT = {
    range: DEFAULT_MOVEMENT,
    canFly: false,
    canSwim: false,
    hasOnlySwim: false
  };
  if (!actorId) {
    logger.warn("[getArmyMovementRange] No actor ID provided, using default movement");
    return DEFAULT_RESULT;
  }
  try {
    const game = globalThis.game;
    const actor = game.actors.get(actorId);
    if (!actor) {
      logger.warn(`[getArmyMovementRange] Actor ${actorId} not found, using default movement`);
      return DEFAULT_RESULT;
    }
    const actorSpeed = actor.system?.attributes?.speed;
    if (!actorSpeed) {
      logger.warn(`[getArmyMovementRange] Actor ${actor.name} has no speed data, using default movement`);
      return DEFAULT_RESULT;
    }
    const flySpeed = actorSpeed.otherSpeeds?.find((s) => s.type === "fly")?.value || 0;
    const swimSpeed = actorSpeed.otherSpeeds?.find((s) => s.type === "swim")?.value || 0;
    const landSpeed = actorSpeed.value || 0;
    const canFly = flySpeed > 0;
    const canSwim = swimSpeed > 0;
    const hasOnlySwim = swimSpeed > 0 && landSpeed === 0 && flySpeed === 0;
    const maxSpeed = Math.max(flySpeed, swimSpeed, landSpeed);
    if (maxSpeed === 0) {
      logger.warn(`[getArmyMovementRange] Actor ${actor.name} has no valid speed, using default movement`);
      return DEFAULT_RESULT;
    }
    const range = Math.floor(maxSpeed / 2);
    logger.info(`[getArmyMovementRange] Actor ${actor.name}: speed=${maxSpeed}, range=${range}, canFly=${canFly}, canSwim=${canSwim}, hasOnlySwim=${hasOnlySwim}`);
    return { range, canFly, canSwim, hasOnlySwim };
  } catch (error) {
    logger.error("[getArmyMovementRange] Error reading actor speed:", error);
    return DEFAULT_RESULT;
  }
}
export {
  getArmyMovementRange
};
