import { l as logger, I as ICON_SHADOW_COLOR, F as FORTIFICATION_ICONS } from "./GameCommandUtils-D_sgs3NK.js";
function getFortificationIcon(tier) {
  switch (tier) {
    case 1:
      return FORTIFICATION_ICONS.earthen;
    case 2:
      return FORTIFICATION_ICONS.tower_wood;
    case 3:
      return FORTIFICATION_ICONS.tower_stone;
    case 4:
      return FORTIFICATION_ICONS.keep;
    default:
      return FORTIFICATION_ICONS.earthen;
  }
}
function drawHammerIndicator(layer, centerX, centerY, hexSize) {
  const hammerSize = hexSize * 0.2;
  const offsetX = hexSize * 0.22;
  const offsetY = -hexSize * 0.22;
  const bg = new PIXI.Graphics();
  bg.beginFill(16096779, 0.9);
  bg.drawCircle(centerX + offsetX, centerY + offsetY, hammerSize * 0.7);
  bg.endFill();
  layer.addChild(bg);
  const hammer = new PIXI.Graphics();
  const hx = centerX + offsetX;
  const hy = centerY + offsetY;
  const s = hammerSize * 0.35;
  hammer.lineStyle(s * 0.35, 16777215, 1);
  hammer.moveTo(hx, hy + s * 0.6);
  hammer.lineTo(hx, hy - s * 0.3);
  hammer.lineStyle(s * 0.5, 16777215, 1);
  hammer.moveTo(hx - s * 0.5, hy - s * 0.4);
  hammer.lineTo(hx + s * 0.5, hy - s * 0.4);
  layer.addChild(hammer);
}
async function renderFortificationIcons(layer, fortificationData, canvas) {
  if (!canvas?.grid) {
    logger.warn("[FortificationRenderer] ❌ Canvas grid not available");
    return 0;
  }
  globalThis.foundry.grid.GridHex;
  let successCount = 0;
  for (const { id, tier, maintenancePaid, hasQueuedUpgrade } of fortificationData) {
    try {
      const parts = id.split(".");
      if (parts.length !== 2) {
        logger.warn(`[FortificationRenderer] ⚠️ Invalid hex ID format: ${id}`);
        continue;
      }
      const i = parseInt(parts[0], 10);
      const j = parseInt(parts[1], 10);
      if (isNaN(i) || isNaN(j)) {
        logger.warn(`[FortificationRenderer] ⚠️ Invalid hex coordinates: ${id}`);
        continue;
      }
      const center = canvas.grid.getCenterPoint({ i, j });
      const hexSize = canvas.grid.sizeY;
      if (tier > 0) {
        const iconPath = getFortificationIcon(tier);
        const texture = await PIXI.Assets.load(iconPath);
        const iconSize = hexSize * 0.5;
        const shadowSprite = new PIXI.Sprite(texture);
        shadowSprite.anchor.set(0.5, 0.5);
        shadowSprite.position.set(center.x + 3, center.y + 3);
        const scale = iconSize / shadowSprite.height;
        shadowSprite.scale.set(scale, scale);
        shadowSprite.tint = ICON_SHADOW_COLOR.color;
        shadowSprite.alpha = ICON_SHADOW_COLOR.alpha;
        const blurFilter = new PIXI.BlurFilter();
        blurFilter.blur = 8;
        shadowSprite.filters = [blurFilter];
        layer.addChild(shadowSprite);
        const sprite = new PIXI.Sprite(texture);
        sprite.anchor.set(0.5, 0.5);
        sprite.position.set(center.x, center.y);
        sprite.scale.set(scale, scale);
        layer.addChild(sprite);
        if (!maintenancePaid) {
          const borderGraphics = new PIXI.Graphics();
          borderGraphics.lineStyle(3, 16711680, 0.8);
          borderGraphics.drawCircle(center.x, center.y, iconSize / 2 + 5);
          layer.addChild(borderGraphics);
        }
      }
      if (hasQueuedUpgrade) {
        drawHammerIndicator(layer, center.x, center.y, hexSize);
      }
      successCount++;
    } catch (error) {
      logger.error(`[FortificationRenderer] Failed to draw fortification icon for hex ${id}:`, error);
    }
  }
  return successCount;
}
export {
  renderFortificationIcons
};
