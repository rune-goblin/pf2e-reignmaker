import { x as get_store_value, l as logger, bh as doctrineService, bH as getActiveAbilities, bI as DOCTRINE_ABILITY_SLUG_PREFIX, b as armyService, bJ as getDoctrineAbilitySlug, y as kingdomData } from "./GameCommandUtils-D_sgs3NK.js";
const inspiringAura = {
  name: "Inspiring Aura",
  img: "icons/magic/light/beam-rays-orange.webp",
  type: "effect",
  system: {
    actionType: { value: "passive" },
    actions: { value: null },
    category: "defensive",
    slug: "inspiring-aura",
    description: {
      value: "<p>The army inspires allies through unwavering conviction and righteous purpose.</p>\n<p><strong>Effect:</strong> This army and all allied armies within 60 feet gain a +1 status bonus to initiative rolls and saving throws against fear effects.</p>"
    },
    duration: {
      value: -1,
      unit: "unlimited",
      sustained: false,
      expiry: null
    },
    rules: [
      {
        key: "FlatModifier",
        selector: "initiative",
        value: 1,
        type: "status",
        slug: "inspiring-aura-initiative"
      },
      {
        key: "FlatModifier",
        selector: "saving-throw",
        value: 1,
        type: "status",
        predicate: ["fear"],
        slug: "inspiring-aura-fear-save"
      }
    ],
    traits: {
      rarity: "common",
      value: ["aura", "emotion", "mental"]
    },
    aura: {
      radius: 60,
      effects: ["inspiring-aura"],
      appearance: {
        border: { color: "#FFD700" },
        highlight: { color: "#FFD70033" }
      }
    }
  }
};
const auraOfRighteousness = {
  name: "Aura of Righteousness",
  img: "icons/magic/holy/barrier-shield-winged-blue.webp",
  type: "effect",
  system: {
    actionType: { value: "passive" },
    actions: { value: null },
    category: "defensive",
    slug: "aura-of-righteousness",
    description: {
      value: "<p>The army radiates an aura of holy righteousness that shields allies against unholy forces.</p>\n<p><strong>Effect:</strong> This army and all allied armies within 20 feet gain a +2 status bonus to AC against unholy creatures and deal an additional 2 damage against unholy creatures.</p>"
    },
    duration: {
      value: -1,
      unit: "unlimited",
      sustained: false,
      expiry: null
    },
    rules: [
      {
        key: "FlatModifier",
        selector: "ac",
        value: 2,
        type: "status",
        predicate: ["target:trait:unholy"],
        slug: "righteousness-ac-vs-unholy"
      },
      {
        key: "FlatModifier",
        selector: "strike-damage",
        value: 2,
        type: "status",
        predicate: ["target:trait:unholy"],
        slug: "righteousness-damage-vs-unholy"
      }
    ],
    traits: {
      rarity: "common",
      value: ["aura", "holy"]
    },
    aura: {
      radius: 20,
      effects: ["aura-of-righteousness"],
      appearance: {
        border: { color: "#FFFFFF" },
        highlight: { color: "#FFFFFF33" }
      }
    }
  }
};
const noQuarter = {
  name: "No Quarter!",
  img: "icons/skills/melee/blade-tip-chipped-blood-red.webp",
  type: "effect",
  system: {
    actionType: { value: "passive" },
    actions: { value: null },
    category: "offensive",
    slug: "no-quarter",
    description: {
      value: "<p>The army fights with ruthless aggression, showing no mercy to their foes.</p>\n<p><strong>Effect:</strong> This army and all allied armies within 60 feet gain a +1 status bonus to attack rolls and damage rolls.</p>"
    },
    duration: {
      value: -1,
      unit: "unlimited",
      sustained: false,
      expiry: null
    },
    rules: [
      {
        key: "FlatModifier",
        selector: "attack",
        value: 1,
        type: "status",
        slug: "no-quarter-attack"
      },
      {
        key: "FlatModifier",
        selector: "damage",
        value: 1,
        type: "status",
        slug: "no-quarter-damage"
      }
    ],
    traits: {
      rarity: "common",
      value: ["aura", "emotion", "mental"]
    },
    aura: {
      radius: 60,
      effects: ["no-quarter"],
      appearance: {
        border: { color: "#8B0000" },
        highlight: { color: "#8B000033" }
      }
    }
  }
};
const despair = {
  name: "Despair",
  img: "icons/magic/unholy/silhouette-evil-horned-giant.webp",
  type: "effect",
  system: {
    actionType: { value: "passive" },
    actions: { value: null },
    category: "offensive",
    slug: "despair",
    description: {
      value: "<p>The army radiates an aura of dread and hopelessness that breaks the will of enemies.</p>\n<p><strong>Effect:</strong> Enemy armies within 60 feet become frightened 1 and cannot reduce their frightened condition below 1 while they remain in the aura.</p>\n<p><strong>Immunity:</strong> Creatures immune to fear are unaffected.</p>"
    },
    duration: {
      value: -1,
      unit: "unlimited",
      sustained: false,
      expiry: null
    },
    rules: [
      {
        key: "FlatModifier",
        selector: "all",
        value: -1,
        type: "status",
        predicate: ["self:condition:frightened"],
        slug: "despair-frightened"
      }
    ],
    traits: {
      rarity: "common",
      value: ["aura", "emotion", "fear", "mental"]
    },
    aura: {
      radius: 60,
      effects: ["despair"],
      traits: ["emotion", "fear", "mental"],
      hostile: true,
      appearance: {
        border: { color: "#4B0082" },
        highlight: { color: "#4B008233" }
      }
    }
  }
};
const rally = {
  name: "Rally",
  img: "icons/environment/people/infantry-army.webp",
  type: "effect",
  system: {
    actionType: { value: "passive" },
    actions: { value: null },
    category: "defensive",
    slug: "rally",
    description: {
      value: "<p>The army rallies its allies with disciplined coordination and tactical support.</p>\n<p><strong>Effect:</strong> This army and all allied armies within 60 feet gain a +1 circumstance bonus to AC and saving throws.</p>"
    },
    duration: {
      value: -1,
      unit: "unlimited",
      sustained: false,
      expiry: null
    },
    rules: [
      {
        key: "FlatModifier",
        selector: "ac",
        value: 1,
        type: "circumstance",
        slug: "rally-ac"
      },
      {
        key: "FlatModifier",
        selector: "saving-throw",
        value: 1,
        type: "circumstance",
        slug: "rally-saves"
      }
    ],
    traits: {
      rarity: "common",
      value: ["aura", "auditory", "linguistic"]
    },
    aura: {
      radius: 60,
      effects: ["rally"],
      appearance: {
        border: { color: "#4169E1" },
        highlight: { color: "#4169E133" }
      }
    }
  }
};
const rigorousDiscipline = {
  name: "Rigorous Discipline",
  img: "icons/skills/melee/shield-block-gray-orange.webp",
  type: "action",
  system: {
    actionType: { value: "reaction" },
    actions: { value: null },
    category: "defensive",
    slug: "rigorous-discipline",
    description: {
      value: "<p><strong>Trigger</strong> The army is struck by a critical hit that deals physical damage.</p>\n<hr />\n<p>Through relentless drilling and tactical conditioning, this army can shrug off even grievous injuries. Attempt a @Check[flat|dc:17|showDC:all]. If successful, the attack becomes a normal hit.</p>"
    },
    rules: [],
    traits: {
      rarity: "common",
      value: []
    }
  }
};
const DOCTRINE_ABILITIES = {
  "inspiring-aura": inspiringAura,
  "aura-of-righteousness": auraOfRighteousness,
  "no-quarter": noQuarter,
  "despair": despair,
  "rally": rally,
  "rigorous-discipline": rigorousDiscipline
};
class DoctrineAbilityService {
  static instance;
  static getInstance() {
    if (!DoctrineAbilityService.instance) {
      DoctrineAbilityService.instance = new DoctrineAbilityService();
    }
    return DoctrineAbilityService.instance;
  }
  /**
   * Sync doctrine abilities to all player kingdom armies
   * Called after doctrine values change
   */
  async syncAbilitiesToAllArmies() {
    const kingdom = get_store_value(kingdomData);
    if (!kingdom?.armies) {
      logger.info("[DoctrineAbilityService] No armies to sync");
      return;
    }
    const state = doctrineService.getDoctrineState();
    const activeAbilities = getActiveAbilities(
      state.values,
      state.dominant,
      doctrineService.getTierForValue.bind(doctrineService),
      doctrineService.tierMeetsMinimum.bind(doctrineService)
    );
    logger.info(`[DoctrineAbilityService] Active abilities: ${activeAbilities.map((a) => a.name).join(", ") || "none"}`);
    const playerArmies = kingdom.armies.filter(
      (army) => army.ledBy === "player" || army.ledBy === "PLAYER_KINGDOM"
    );
    if (playerArmies.length === 0) {
      logger.info("[DoctrineAbilityService] No player armies to sync");
      return;
    }
    for (const army of playerArmies) {
      if (!army.actorId) {
        logger.warn(`[DoctrineAbilityService] Army ${army.name} has no linked actor, skipping`);
        continue;
      }
      try {
        await this.syncAbilitiesToArmy(army.actorId, activeAbilities);
      } catch (error) {
        logger.error(`[DoctrineAbilityService] Failed to sync abilities to ${army.name}:`, error);
      }
    }
  }
  /**
   * Sync doctrine abilities to a specific army actor
   */
  async syncAbilitiesToArmy(actorId, activeAbilities) {
    const game = globalThis.game;
    const actor = game?.actors?.get(actorId);
    if (!actor) {
      logger.warn(`[DoctrineAbilityService] Actor not found: ${actorId}`);
      return;
    }
    if (!activeAbilities) {
      const state = doctrineService.getDoctrineState();
      activeAbilities = getActiveAbilities(
        state.values,
        state.dominant,
        doctrineService.getTierForValue.bind(doctrineService),
        doctrineService.tierMeetsMinimum.bind(doctrineService)
      );
    }
    const currentDoctrineItems = actor.items.filter(
      (item) => item.system?.slug?.startsWith(DOCTRINE_ABILITY_SLUG_PREFIX)
    );
    const slugToItems = /* @__PURE__ */ new Map();
    for (const item of currentDoctrineItems) {
      const slug = item.system.slug;
      if (!slugToItems.has(slug)) {
        slugToItems.set(slug, []);
      }
      slugToItems.get(slug).push(item);
    }
    for (const [slug, items] of slugToItems.entries()) {
      if (items.length > 1) {
        logger.info(`[DoctrineAbilityService] Found ${items.length} duplicates of ${slug} on ${actor.name}, removing extras`);
        for (let i = 1; i < items.length; i++) {
          await armyService.removeItemFromArmy(actorId, items[i].id);
        }
      }
    }
    const currentSlugs = new Set(slugToItems.keys());
    const targetSlugs = new Set(activeAbilities.map((a) => getDoctrineAbilitySlug(a.id)));
    const toRemove = Array.from(slugToItems.entries()).filter(([slug]) => !targetSlugs.has(slug)).map(([, items]) => items[0]);
    for (const item of toRemove) {
      logger.info(`[DoctrineAbilityService] Removing ${item.name} from ${actor.name}`);
      await armyService.removeItemFromArmy(actorId, item.id);
    }
    const toAdd = activeAbilities.filter(
      (ability) => !currentSlugs.has(getDoctrineAbilitySlug(ability.id))
    );
    for (const ability of toAdd) {
      try {
        const itemData = await this.getAbilityItemData(ability);
        if (itemData) {
          logger.info(`[DoctrineAbilityService] Adding ${ability.name} to ${actor.name}`);
          await armyService.addItemToArmy(actorId, itemData);
        }
      } catch (error) {
        logger.error(`[DoctrineAbilityService] Failed to add ${ability.name} to ${actor.name}:`, error);
      }
    }
  }
  /**
   * Get the item data for an ability from local TypeScript definitions
   */
  getAbilityItemData(ability) {
    const data = DOCTRINE_ABILITIES[ability.sourceId];
    if (!data) {
      logger.error(`[DoctrineAbilityService] Ability not found: ${ability.sourceId}`);
      return null;
    }
    const itemData = JSON.parse(JSON.stringify(data));
    itemData.system.slug = getDoctrineAbilitySlug(ability.id);
    const doctrineLabel = ability.doctrine.charAt(0).toUpperCase() + ability.doctrine.slice(1);
    const sourceNote = `<p><em>Granted by ${doctrineLabel} doctrine</em></p>`;
    itemData.system.description.value = sourceNote + itemData.system.description.value;
    return itemData;
  }
}
const doctrineAbilityService = DoctrineAbilityService.getInstance();
export {
  doctrineAbilityService
};
