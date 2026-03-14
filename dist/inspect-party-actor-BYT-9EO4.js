import { g as getPartyActor } from "./GameCommandUtils-D_sgs3NK.js";
function inspectPartyActor() {
  const actor = getPartyActor();
  if (!actor) {
    console.warn("[inspectPartyActor] No party actor found");
    return;
  }
  console.group("🔍 [inspectPartyActor] Party Actor Properties");
  console.log("Actor ID:", actor.id);
  console.log("Actor Name:", actor.name);
  console.log("Actor Type:", actor.type);
  console.group("📋 Top-level Properties:");
  const topLevelProps = Object.keys(actor).filter((key) => !key.startsWith("_"));
  console.log(topLevelProps);
  topLevelProps.forEach((key) => {
    try {
      const value = actor[key];
      const type = typeof value;
      if (type === "function") {
        console.log(`  ${key}: [Function]`);
      } else if (type === "object" && value !== null) {
        console.log(`  ${key}: [Object]`, value);
      } else {
        console.log(`  ${key}:`, value);
      }
    } catch (e) {
      console.log(`  ${key}: [Error accessing]`);
    }
  });
  console.groupEnd();
  console.group("📦 System Data:");
  if (actor.system) {
    console.log("system:", actor.system);
    console.log("system keys:", Object.keys(actor.system || {}));
    const system = actor.system;
    if (system.details) {
      console.log("system.details:", system.details);
      console.log("system.details keys:", Object.keys(system.details || {}));
    }
    if (system.level) {
      console.log("system.level:", system.level);
    }
  } else {
    console.log("No system data found");
  }
  console.groupEnd();
  console.group("🏴 Flags:");
  if (actor.flags) {
    console.log("flags:", actor.flags);
    console.log("flags keys:", Object.keys(actor.flags || {}));
  }
  console.groupEnd();
  console.group("👥 Members/Characters:");
  if (actor.members) {
    console.log("members:", actor.members);
  }
  if (actor.characters) {
    console.log("characters:", actor.characters);
  }
  if (actor.getMembers) {
    try {
      const members = actor.getMembers();
      console.log("getMembers():", members);
    } catch (e) {
      console.log("getMembers() error:", e);
    }
  }
  console.groupEnd();
  console.group("📊 Level-related Properties:");
  console.log("actor.level:", actor.level);
  console.log("actor.system?.details?.level:", actor.system?.details?.level);
  console.log("actor.system?.level:", actor.system?.level);
  console.log("actor.system?.partyLevel:", actor.system?.partyLevel);
  console.log("actor.system?.details?.partyLevel:", actor.system?.details?.partyLevel);
  console.groupEnd();
  console.group("📄 Full Actor Object (JSON):");
  try {
    const json = JSON.stringify(actor, (key, value) => {
      if (typeof value === "function") return "[Function]";
      if (key === "_source" || key === "data") return "[Source Data]";
      return value;
    }, 2);
    console.log(json.substring(0, 5e3));
  } catch (e) {
    console.log("JSON stringify error:", e);
  }
  console.groupEnd();
  console.groupEnd();
}
export {
  inspectPartyActor
};
