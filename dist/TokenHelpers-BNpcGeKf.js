import { l as logger } from "./GameCommandUtils-D_sgs3NK.js";
class TokenHelpers {
  /**
   * Find all tokens for a given actor on the current scene
   * 
   * @param actorId - Actor ID to search for
   * @returns Array of token documents (empty if none found)
   */
  static findTokensByActor(actorId) {
    const canvas = globalThis.canvas;
    if (!canvas?.scene) {
      logger.warn("[TokenHelpers] No active scene");
      return [];
    }
    const allTokens = Array.from(canvas.scene.tokens);
    const tokens = allTokens.filter((t) => t.actorId === actorId);
    logger.info(`[TokenHelpers] Found ${tokens.length} token(s) for actor ${actorId} on scene ${canvas.scene.name}`);
    return tokens;
  }
  /**
   * Find the first token for a given actor on the current scene
   * 
   * @param actorId - Actor ID to search for
   * @returns Token document or null if not found
   */
  static findTokenByActor(actorId) {
    const tokens = this.findTokensByActor(actorId);
    if (tokens.length === 0) {
      return null;
    }
    if (tokens.length > 1) {
      logger.warn(`[TokenHelpers] Multiple tokens found for actor ${actorId}, returning first one`);
    }
    return tokens[0];
  }
  /**
   * Get the hex ID from a token's position
   * 
   * @param tokenDoc - Token document
   * @returns Hex ID (e.g., "5.12") or null if conversion fails
   */
  static getTokenHexId(tokenDoc) {
    try {
      const canvas = globalThis.canvas;
      const gridSize = canvas?.grid?.size || 100;
      const centerX = tokenDoc.x + tokenDoc.width * gridSize / 2;
      const centerY = tokenDoc.y + tokenDoc.height * gridSize / 2;
      const gridCoords = canvas.grid.getOffset({ x: centerX, y: centerY });
      const hexId = `${gridCoords.i}.${String(gridCoords.j).padStart(2, "0")}`;
      logger.info(`[TokenHelpers] Token at (${tokenDoc.x}, ${tokenDoc.y}) -> hex ${hexId}`);
      return hexId;
    } catch (error) {
      logger.error("[TokenHelpers] Failed to get token hex:", error);
      return null;
    }
  }
  /**
   * Get the center position of a token in pixels
   * 
   * @param tokenDoc - Token document
   * @returns { x, y } center position
   */
  static getTokenCenter(tokenDoc) {
    const canvas = globalThis.canvas;
    const gridSize = canvas?.grid?.size || 100;
    const centerX = tokenDoc.x + tokenDoc.width * gridSize / 2;
    const centerY = tokenDoc.y + tokenDoc.height * gridSize / 2;
    return { x: centerX, y: centerY };
  }
  /**
   * Convert a hex ID to token position (centered on hex)
   * 
   * @param hexId - Hex ID (e.g., "5.12")
   * @param tokenWidth - Token width in grid units (default: 1)
   * @param tokenHeight - Token height in grid units (default: 1)
   * @returns { x, y } position for token's top-left corner (Foundry standard)
   */
  static hexToTokenPosition(hexId, tokenWidth = 1, tokenHeight = 1) {
    try {
      const canvas = globalThis.canvas;
      if (!canvas?.grid) {
        logger.warn("[TokenHelpers] Canvas grid not available");
        return null;
      }
      const gridSize = canvas.grid.size;
      const [rowStr, colStr] = hexId.split(".");
      const i = parseInt(rowStr, 10);
      const j = parseInt(colStr, 10);
      if (isNaN(i) || isNaN(j)) {
        logger.error(`[TokenHelpers] Invalid hex ID format: ${hexId}`);
        return null;
      }
      const center = canvas.grid.getCenterPoint({ i, j });
      const widthPx = tokenWidth * gridSize;
      const heightPx = tokenHeight * gridSize;
      const x = center.x - widthPx / 2;
      const y = center.y - heightPx / 2;
      logger.info(`[TokenHelpers] Hex ${hexId} (${i},${j}) -> token position (${x}, ${y})`);
      return { x, y };
    } catch (error) {
      logger.error("[TokenHelpers] Failed to convert hex to token position:", error);
      return null;
    }
  }
  /**
   * Get the current scene
   * 
   * @returns Current scene or null
   */
  static getCurrentScene() {
    const game = globalThis.game;
    return game?.scenes?.current || null;
  }
  /**
   * Check if a token exists on the current scene
   * 
   * @param actorId - Actor ID to check
   * @returns True if at least one token exists
   */
  static hasTokenOnScene(actorId) {
    const tokens = this.findTokensByActor(actorId);
    return tokens.length > 0;
  }
}
export {
  TokenHelpers
};
