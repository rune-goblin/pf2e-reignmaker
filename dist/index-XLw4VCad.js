import { P as PLAYER_KINGDOM, cb as SettlementTierConfig, a4 as resourceService, cc as calculateProduction, cd as getWorksiteBaseProduction, ce as resolveProductionContext, cf as getProductionPreview, cg as filterConnectedWorksiteHexes } from "./GameCommandUtils-D_sgs3NK.js";
function calculateConsumption(settlements, armies, hexes, modifiers = []) {
  const settlementFood = calculateSettlementFoodConsumption(settlements, hexes);
  const armyFood = calculateArmyFoodConsumption(armies);
  let totalFood = settlementFood + armyFood;
  const otherResources = /* @__PURE__ */ new Map();
  modifiers.forEach((modifier) => {
    if (modifier.type === "consumption" || modifier.type === "both") {
      totalFood = applyConsumptionModifier(totalFood, modifier, "food");
    }
  });
  return {
    settlementFood,
    armyFood,
    totalFood,
    otherResources
  };
}
function calculateSettlementFoodConsumption(settlements, hexes) {
  const mappedSettlements = settlements.filter((s) => {
    if (s.location.x === 0 && s.location.y === 0) {
      return false;
    }
    if (hexes) {
      const settlementHex = hexes.find(
        (h) => h.row === s.location.x && h.col === s.location.y
      );
      if (!settlementHex || settlementHex.claimedBy !== PLAYER_KINGDOM) {
        return false;
      }
    }
    return true;
  });
  return mappedSettlements.reduce((total, settlement) => {
    const config = SettlementTierConfig[settlement.tier];
    return total + (config ? config.foodConsumption : 0);
  }, 0);
}
function calculateArmyFoodConsumption(armies) {
  return armies.length;
}
function applyConsumptionModifier(baseAmount, modifier, resource) {
  if (modifier.affectedResources.length > 0 && !modifier.affectedResources.includes(resource)) {
    return baseAmount;
  }
  let modifiedAmount = baseAmount;
  if (modifier.multiplier) {
    modifiedAmount = Math.ceil(baseAmount * modifier.multiplier);
  }
  if (modifier.flatBonus) {
    modifiedAmount += modifier.flatBonus;
  }
  return Math.max(0, modifiedAmount);
}
const consumption = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  calculateConsumption
}, Symbol.toStringTag, { value: "Module" }));
const index = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  calculateConsumption,
  calculateProduction,
  filterConnectedWorksiteHexes,
  getProductionPreview,
  getWorksiteBaseProduction,
  resolveProductionContext,
  resourceService
}, Symbol.toStringTag, { value: "Module" }));
export {
  consumption as c,
  index as i
};
