import { g as getPartyActor, l as logger } from "./GameCommandUtils-D_sgs3NK.js";
function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}
function getHexCenterPixels(hexId) {
  const canvas = globalThis.canvas;
  const parts = hexId.split(".");
  const i = parseInt(parts[0], 10);
  const j = parseInt(parts[1], 10);
  const center = canvas.grid.getCenterPoint({ i, j });
  return { x: center.x, y: center.y };
}
async function animateTokenAlongPath(tokenDocument, path, msPerHex = 100) {
  if (!tokenDocument) {
    logger.error("[TokenAnimation] No token document provided");
    return;
  }
  if (path.length < 2) {
    logger.warn("[TokenAnimation] Path too short (need at least 2 hexes)");
    return;
  }
  const totalDuration = (path.length - 1) * msPerHex;
  logger.info(`[TokenAnimation] Animating token along ${path.length} hexes (${msPerHex}ms per hex, ${totalDuration}ms total)`);
  const waypoints = path.map((hexId) => {
    const center = getHexCenterPixels(hexId);
    const gridSize = globalThis.canvas.grid.size;
    const tokenWidth = tokenDocument.width * gridSize;
    const tokenHeight = tokenDocument.height * gridSize;
    return {
      hexId,
      x: center.x - tokenWidth / 2,
      y: center.y - tokenHeight / 2
    };
  });
  const segmentDuration = msPerHex;
  for (let i = 0; i < waypoints.length - 1; i++) {
    const start = waypoints[i];
    const end = waypoints[i + 1];
    logger.info(`[TokenAnimation] Segment ${i + 1}/${waypoints.length - 1}: ${start.hexId} → ${end.hexId} (${segmentDuration}ms)`);
    await animateSegment(tokenDocument, start, end, segmentDuration);
  }
  logger.info("[TokenAnimation] Animation complete");
}
async function animateSegment(tokenDocument, start, end, duration) {
  return new Promise((resolve) => {
    const startTime = Date.now();
    const deltaX = end.x - start.x;
    const deltaY = end.y - start.y;
    function animate() {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOutQuad(progress);
      const currentX = start.x + deltaX * easedProgress;
      const currentY = start.y + deltaY * easedProgress;
      tokenDocument.object.document.x = currentX;
      tokenDocument.object.document.y = currentY;
      tokenDocument.object.position.set(currentX, currentY);
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        tokenDocument.update({ x: end.x, y: end.y }).then(() => {
          resolve();
        });
      }
    }
    requestAnimationFrame(animate);
  });
}
async function getArmyToken(armyId) {
  const { TokenHelpers } = await import("./TokenHelpers-BNpcGeKf.js");
  const partyActor = getPartyActor();
  const kingdom = partyActor?.getKingdomData();
  const army = kingdom?.armies?.find((a) => a.id === armyId);
  if (!army || !army.actorId) {
    logger.warn(`[TokenAnimation] Army ${armyId} has no linked actor`);
    return null;
  }
  logger.info(`[TokenAnimation] Looking for token for army ${army.name} (actorId: ${army.actorId})`);
  const token = TokenHelpers.findTokenByActor(army.actorId);
  if (!token) {
    logger.warn(`[TokenAnimation] No token found for army ${army.name} (actorId: ${army.actorId}) on current scene`);
    logger.warn(`[TokenAnimation] Try placing the army token on the scene first`);
    return null;
  }
  logger.info(`[TokenAnimation] Found token: ${token.name}`);
  return token;
}
export {
  animateTokenAlongPath,
  getArmyToken
};
