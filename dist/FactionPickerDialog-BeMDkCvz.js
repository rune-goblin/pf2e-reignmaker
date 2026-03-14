import { aw as SvelteComponent, ax as init, ay as safe_not_equal, b0 as Dialog, b1 as binding_callbacks, b2 as bind, b3 as destroy_component, b4 as transition_out, b5 as transition_in, b6 as add_flush_callback, b7 as mount_component, b8 as create_component, b9 as createEventDispatcher, aA as detach, aB as insert, aC as element, aD as attr, aE as set_data, aF as append, aH as text, ba as FACTION_ATTITUDE_COLORS, bb as FACTION_ATTITUDE_ICONS, bc as FACTION_ATTITUDE_NAMES, az as noop, aI as ensure_array_like, aS as update_keyed_each, aG as space, bd as run_all, aM as set_style, aN as toggle_class, aK as listen, aT as destroy_block } from "./GameCommandUtils-D_sgs3NK.js";
function get_each_context(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[18] = list[i];
  const constants_0 = (
    /*getAttitudeConfig*/
    child_ctx[10](
      /*faction*/
      child_ctx[18].attitude
    )
  );
  child_ctx[19] = constants_0;
  const constants_1 = (
    /*checkEligibility*/
    child_ctx[6](
      /*faction*/
      child_ctx[18]
    )
  );
  child_ctx[20] = constants_1;
  return child_ctx;
}
function create_else_block(ctx) {
  let div4;
  let div2;
  let t3;
  let div3;
  let each_blocks = [];
  let each_1_lookup = /* @__PURE__ */ new Map();
  let each_value = ensure_array_like(
    /*eligibleFactions*/
    ctx[2]
  );
  const get_key = (ctx2) => (
    /*faction*/
    ctx2[18].id
  );
  for (let i = 0; i < each_value.length; i += 1) {
    let child_ctx = get_each_context(ctx, each_value, i);
    let key = get_key(child_ctx);
    each_1_lookup.set(key, each_blocks[i] = create_each_block(key, child_ctx));
  }
  return {
    c() {
      div4 = element("div");
      div2 = element("div");
      div2.innerHTML = `<div class="col-name">Faction</div> <div class="col-attitude">Current Attitude</div>`;
      t3 = space();
      div3 = element("div");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      attr(div2, "class", "table-header svelte-prm-d0qc1g");
      attr(div3, "class", "table-body svelte-prm-d0qc1g");
      attr(div4, "class", "faction-table svelte-prm-d0qc1g");
    },
    m(target, anchor) {
      insert(target, div4, anchor);
      append(div4, div2);
      append(div4, t3);
      append(div4, div3);
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(div3, null);
        }
      }
    },
    p(ctx2, dirty) {
      if (dirty & /*selectedFactionIds, eligibleFactions, checkEligibility, toggleFaction, getAttitudeConfig*/
      1236) {
        each_value = ensure_array_like(
          /*eligibleFactions*/
          ctx2[2]
        );
        each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx2, each_value, each_1_lookup, div3, destroy_block, create_each_block, null, get_each_context);
      }
    },
    d(detaching) {
      if (detaching) {
        detach(div4);
      }
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].d();
      }
    }
  };
}
function create_if_block(ctx) {
  let div;
  return {
    c() {
      div = element("div");
      div.innerHTML = `<i class="fas fa-exclamation-circle svelte-prm-d0qc1g"></i> <p class="svelte-prm-d0qc1g">No eligible factions available.</p>`;
      attr(div, "class", "no-factions svelte-prm-d0qc1g");
    },
    m(target, anchor) {
      insert(target, div, anchor);
    },
    p: noop,
    d(detaching) {
      if (detaching) {
        detach(div);
      }
    }
  };
}
function create_if_block_1(ctx) {
  let div;
  let t_value = (
    /*eligibility*/
    ctx[20].reason + ""
  );
  let t;
  return {
    c() {
      div = element("div");
      t = text(t_value);
      attr(div, "class", "ineligible-reason svelte-prm-d0qc1g");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      append(div, t);
    },
    p(ctx2, dirty) {
      if (dirty & /*eligibleFactions*/
      4 && t_value !== (t_value = /*eligibility*/
      ctx2[20].reason + "")) set_data(t, t_value);
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
    }
  };
}
function create_each_block(key_1, ctx) {
  let div4;
  let div1;
  let div0;
  let t0_value = (
    /*faction*/
    ctx[18].name + ""
  );
  let t0;
  let t1;
  let t2;
  let div3;
  let div2;
  let i;
  let i_class_value;
  let t3;
  let span;
  let t4_value = (
    /*config*/
    ctx[19].displayName + ""
  );
  let t4;
  let t5;
  let mounted;
  let dispose;
  let if_block = !/*eligibility*/
  ctx[20].eligible && /*eligibility*/
  ctx[20].reason && create_if_block_1(ctx);
  function click_handler() {
    return (
      /*click_handler*/
      ctx[14](
        /*faction*/
        ctx[18]
      )
    );
  }
  function keydown_handler(...args) {
    return (
      /*keydown_handler*/
      ctx[15](
        /*faction*/
        ctx[18],
        ...args
      )
    );
  }
  return {
    key: key_1,
    first: null,
    c() {
      div4 = element("div");
      div1 = element("div");
      div0 = element("div");
      t0 = text(t0_value);
      t1 = space();
      if (if_block) if_block.c();
      t2 = space();
      div3 = element("div");
      div2 = element("div");
      i = element("i");
      t3 = space();
      span = element("span");
      t4 = text(t4_value);
      t5 = space();
      attr(div0, "class", "name-text svelte-prm-d0qc1g");
      attr(div1, "class", "col-name svelte-prm-d0qc1g");
      attr(i, "class", i_class_value = "fas " + /*config*/
      ctx[19].icon + " svelte-prm-d0qc1g");
      set_style(
        i,
        "color",
        /*config*/
        ctx[19].color
      );
      attr(div2, "class", "attitude-badge svelte-prm-d0qc1g");
      set_style(
        div2,
        "border-color",
        /*config*/
        ctx[19].color
      );
      attr(div3, "class", "col-attitude");
      attr(div4, "class", "table-row svelte-prm-d0qc1g");
      attr(div4, "role", "button");
      attr(div4, "tabindex", "0");
      toggle_class(
        div4,
        "selected",
        /*selectedFactionIds*/
        ctx[4].has(
          /*faction*/
          ctx[18].id
        )
      );
      toggle_class(div4, "ineligible", !/*eligibility*/
      ctx[20].eligible);
      this.first = div4;
    },
    m(target, anchor) {
      insert(target, div4, anchor);
      append(div4, div1);
      append(div1, div0);
      append(div0, t0);
      append(div1, t1);
      if (if_block) if_block.m(div1, null);
      append(div4, t2);
      append(div4, div3);
      append(div3, div2);
      append(div2, i);
      append(div2, t3);
      append(div2, span);
      append(span, t4);
      append(div4, t5);
      if (!mounted) {
        dispose = [
          listen(div4, "click", click_handler),
          listen(div4, "keydown", keydown_handler)
        ];
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty & /*eligibleFactions*/
      4 && t0_value !== (t0_value = /*faction*/
      ctx[18].name + "")) set_data(t0, t0_value);
      if (!/*eligibility*/
      ctx[20].eligible && /*eligibility*/
      ctx[20].reason) {
        if (if_block) {
          if_block.p(ctx, dirty);
        } else {
          if_block = create_if_block_1(ctx);
          if_block.c();
          if_block.m(div1, null);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
      if (dirty & /*eligibleFactions*/
      4 && i_class_value !== (i_class_value = "fas " + /*config*/
      ctx[19].icon + " svelte-prm-d0qc1g")) {
        attr(i, "class", i_class_value);
      }
      if (dirty & /*eligibleFactions*/
      4) {
        set_style(
          i,
          "color",
          /*config*/
          ctx[19].color
        );
      }
      if (dirty & /*eligibleFactions*/
      4 && t4_value !== (t4_value = /*config*/
      ctx[19].displayName + "")) set_data(t4, t4_value);
      if (dirty & /*eligibleFactions*/
      4) {
        set_style(
          div2,
          "border-color",
          /*config*/
          ctx[19].color
        );
      }
      if (dirty & /*selectedFactionIds, eligibleFactions*/
      20) {
        toggle_class(
          div4,
          "selected",
          /*selectedFactionIds*/
          ctx[4].has(
            /*faction*/
            ctx[18].id
          )
        );
      }
      if (dirty & /*checkEligibility, eligibleFactions*/
      68) {
        toggle_class(div4, "ineligible", !/*eligibility*/
        ctx[20].eligible);
      }
    },
    d(detaching) {
      if (detaching) {
        detach(div4);
      }
      if (if_block) if_block.d();
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_default_slot(ctx) {
  let div;
  function select_block_type(ctx2, dirty) {
    if (
      /*eligibleFactions*/
      ctx2[2].length === 0
    ) return create_if_block;
    return create_else_block;
  }
  let current_block_type = select_block_type(ctx);
  let if_block = current_block_type(ctx);
  return {
    c() {
      div = element("div");
      if_block.c();
      attr(div, "class", "faction-table-container svelte-prm-d0qc1g");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      if_block.m(div, null);
    },
    p(ctx2, dirty) {
      if (current_block_type === (current_block_type = select_block_type(ctx2)) && if_block) {
        if_block.p(ctx2, dirty);
      } else {
        if_block.d(1);
        if_block = current_block_type(ctx2);
        if (if_block) {
          if_block.c();
          if_block.m(div, null);
        }
      }
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      if_block.d();
    }
  };
}
function create_footer_left_slot(ctx) {
  let div;
  let t0_value = (
    /*selectedFactionIds*/
    ctx[4].size + ""
  );
  let t0;
  let t1;
  let t2;
  let t3;
  return {
    c() {
      div = element("div");
      t0 = text(t0_value);
      t1 = text("/");
      t2 = text(
        /*count*/
        ctx[3]
      );
      t3 = text(" selected");
      attr(div, "slot", "footer-left");
      attr(div, "class", "selection-count svelte-prm-d0qc1g");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      append(div, t0);
      append(div, t1);
      append(div, t2);
      append(div, t3);
    },
    p(ctx2, dirty) {
      if (dirty & /*selectedFactionIds*/
      16 && t0_value !== (t0_value = /*selectedFactionIds*/
      ctx2[4].size + "")) set_data(t0, t0_value);
      if (dirty & /*count*/
      8) set_data(
        t2,
        /*count*/
        ctx2[3]
      );
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
    }
  };
}
function create_fragment(ctx) {
  let dialog;
  let updating_show;
  let current;
  function dialog_show_binding(value) {
    ctx[16](value);
  }
  let dialog_props = {
    title: (
      /*title*/
      ctx[1]
    ),
    confirmLabel: "Select " + /*count*/
    (ctx[3] > 1 ? "Factions" : "Faction"),
    cancelLabel: "Cancel",
    confirmDisabled: (
      /*confirmDisabled*/
      ctx[5]
    ),
    width: "600px",
    onConfirm: (
      /*handleConfirm*/
      ctx[8]
    ),
    onCancel: (
      /*handleCancel*/
      ctx[9]
    ),
    $$slots: {
      "footer-left": [create_footer_left_slot],
      default: [create_default_slot]
    },
    $$scope: { ctx }
  };
  if (
    /*show*/
    ctx[0] !== void 0
  ) {
    dialog_props.show = /*show*/
    ctx[0];
  }
  dialog = new Dialog({ props: dialog_props });
  binding_callbacks.push(() => bind(dialog, "show", dialog_show_binding));
  return {
    c() {
      create_component(dialog.$$.fragment);
    },
    m(target, anchor) {
      mount_component(dialog, target, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      const dialog_changes = {};
      if (dirty & /*title*/
      2) dialog_changes.title = /*title*/
      ctx2[1];
      if (dirty & /*count*/
      8) dialog_changes.confirmLabel = "Select " + /*count*/
      (ctx2[3] > 1 ? "Factions" : "Faction");
      if (dirty & /*confirmDisabled*/
      32) dialog_changes.confirmDisabled = /*confirmDisabled*/
      ctx2[5];
      if (dirty & /*$$scope, count, selectedFactionIds, eligibleFactions*/
      8388636) {
        dialog_changes.$$scope = { dirty, ctx: ctx2 };
      }
      if (!updating_show && dirty & /*show*/
      1) {
        updating_show = true;
        dialog_changes.show = /*show*/
        ctx2[0];
        add_flush_callback(() => updating_show = false);
      }
      dialog.$set(dialog_changes);
    },
    i(local) {
      if (current) return;
      transition_in(dialog.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(dialog.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(dialog, detaching);
    }
  };
}
function instance($$self, $$props, $$invalidate) {
  let confirmDisabled;
  let { show = false } = $$props;
  let { title = "Select Faction" } = $$props;
  let { eligibleFactions = [] } = $$props;
  let { allowMultiple = false } = $$props;
  let { count = 1 } = $$props;
  let { filter = void 0 } = $$props;
  let { kingdom = void 0 } = $$props;
  const dispatch = createEventDispatcher();
  let selectedFactionIds = /* @__PURE__ */ new Set();
  function checkEligibility(faction) {
    if (!filter) return { eligible: true };
    const result = filter(faction, kingdom);
    if (typeof result === "boolean") {
      return { eligible: result };
    }
    return result;
  }
  function toggleFaction(faction) {
    const eligibility = checkEligibility(faction);
    if (!eligibility.eligible) {
      ui?.notifications?.warn(eligibility.reason || "This faction cannot be selected");
      return;
    }
    if (selectedFactionIds.has(faction.id)) {
      selectedFactionIds.delete(faction.id);
    } else {
      if (selectedFactionIds.size < count) {
        selectedFactionIds.add(faction.id);
      } else if (count === 1) {
        selectedFactionIds.clear();
        selectedFactionIds.add(faction.id);
      } else {
        ui?.notifications?.warn(`You can only select ${count} factions`);
      }
    }
    $$invalidate(4, selectedFactionIds);
  }
  function handleConfirm() {
    if (selectedFactionIds.size === 0) {
      ui?.notifications?.warn("Please select at least one faction");
      return;
    }
    if (selectedFactionIds.size < count) {
      ui?.notifications?.warn(`Please select ${count} faction${count > 1 ? "s" : ""} (${selectedFactionIds.size}/${count} selected)`);
      return;
    }
    const selectedFactions = Array.from(selectedFactionIds).map((id) => eligibleFactions.find((f) => f.id === id)).filter(Boolean);
    dispatch("confirm", {
      factionIds: Array.from(selectedFactionIds),
      factions: selectedFactions
    });
    $$invalidate(4, selectedFactionIds = /* @__PURE__ */ new Set());
    $$invalidate(0, show = false);
  }
  function handleCancel() {
    $$invalidate(4, selectedFactionIds = /* @__PURE__ */ new Set());
    $$invalidate(0, show = false);
    dispatch("cancel");
  }
  function getAttitudeConfig(attitude) {
    return {
      displayName: FACTION_ATTITUDE_NAMES[attitude],
      icon: FACTION_ATTITUDE_ICONS[attitude],
      color: FACTION_ATTITUDE_COLORS[attitude]
    };
  }
  const click_handler = (faction) => toggleFaction(faction);
  const keydown_handler = (faction, e) => (e.key === "Enter" || e.key === " ") && toggleFaction(faction);
  function dialog_show_binding(value) {
    show = value;
    $$invalidate(0, show);
  }
  $$self.$$set = ($$props2) => {
    if ("show" in $$props2) $$invalidate(0, show = $$props2.show);
    if ("title" in $$props2) $$invalidate(1, title = $$props2.title);
    if ("eligibleFactions" in $$props2) $$invalidate(2, eligibleFactions = $$props2.eligibleFactions);
    if ("allowMultiple" in $$props2) $$invalidate(11, allowMultiple = $$props2.allowMultiple);
    if ("count" in $$props2) $$invalidate(3, count = $$props2.count);
    if ("filter" in $$props2) $$invalidate(12, filter = $$props2.filter);
    if ("kingdom" in $$props2) $$invalidate(13, kingdom = $$props2.kingdom);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*selectedFactionIds, count*/
    24) {
      $$invalidate(5, confirmDisabled = selectedFactionIds.size !== count);
    }
  };
  return [
    show,
    title,
    eligibleFactions,
    count,
    selectedFactionIds,
    confirmDisabled,
    checkEligibility,
    toggleFaction,
    handleConfirm,
    handleCancel,
    getAttitudeConfig,
    allowMultiple,
    filter,
    kingdom,
    click_handler,
    keydown_handler,
    dialog_show_binding
  ];
}
class FactionPickerDialog extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, {
      show: 0,
      title: 1,
      eligibleFactions: 2,
      allowMultiple: 11,
      count: 3,
      filter: 12,
      kingdom: 13
    });
  }
}
export {
  FactionPickerDialog as default
};
