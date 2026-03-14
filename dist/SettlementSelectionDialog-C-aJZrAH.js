import { aw as SvelteComponent, ax as init, ay as safe_not_equal, b0 as Dialog, b1 as binding_callbacks, b2 as bind, b3 as destroy_component, b4 as transition_out, b5 as transition_in, b6 as add_flush_callback, b7 as mount_component, b8 as create_component, b9 as createEventDispatcher, aA as detach, aB as insert, aP as empty, g as getPartyActor, az as noop, aC as element, aD as attr, aI as ensure_array_like, aS as update_keyed_each, aE as set_data, aN as toggle_class, aF as append, aK as listen, aH as text, aG as space, aT as destroy_block } from "./GameCommandUtils-D_sgs3NK.js";
function get_each_context(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[14] = list[i];
  return child_ctx;
}
function create_else_block(ctx) {
  let div;
  let each_blocks = [];
  let each_1_lookup = /* @__PURE__ */ new Map();
  let each_value = ensure_array_like(
    /*settlementInfo*/
    ctx[3]
  );
  const get_key = (ctx2) => (
    /*info*/
    ctx2[14].settlement.id
  );
  for (let i = 0; i < each_value.length; i += 1) {
    let child_ctx = get_each_context(ctx, each_value, i);
    let key = get_key(child_ctx);
    each_1_lookup.set(key, each_blocks[i] = create_each_block(key, child_ctx));
  }
  return {
    c() {
      div = element("div");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      attr(div, "class", "settlement-list svelte-prm-jb5meg");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(div, null);
        }
      }
    },
    p(ctx2, dirty) {
      if (dirty & /*settlementInfo, selectedSettlementId, selectSettlement*/
      28) {
        each_value = ensure_array_like(
          /*settlementInfo*/
          ctx2[3]
        );
        each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx2, each_value, each_1_lookup, div, destroy_block, create_each_block, null, get_each_context);
      }
    },
    d(detaching) {
      if (detaching) {
        detach(div);
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
      div.innerHTML = `<i class="fas fa-exclamation-circle svelte-prm-jb5meg"></i> <p class="svelte-prm-jb5meg">No settlements available.</p>`;
      attr(div, "class", "no-settlements svelte-prm-jb5meg");
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
function create_if_block_3(ctx) {
  let span;
  let t_value = (
    /*info*/
    ctx[14].supplementaryPrimary + ""
  );
  let t;
  return {
    c() {
      span = element("span");
      t = text(t_value);
      attr(span, "class", "supplementary-primary svelte-prm-jb5meg");
    },
    m(target, anchor) {
      insert(target, span, anchor);
      append(span, t);
    },
    p(ctx2, dirty) {
      if (dirty & /*settlementInfo*/
      8 && t_value !== (t_value = /*info*/
      ctx2[14].supplementaryPrimary + "")) set_data(t, t_value);
    },
    d(detaching) {
      if (detaching) {
        detach(span);
      }
    }
  };
}
function create_if_block_2(ctx) {
  let span;
  let t_value = (
    /*info*/
    ctx[14].supplementarySecondary + ""
  );
  let t;
  return {
    c() {
      span = element("span");
      t = text(t_value);
      attr(span, "class", "supplementary-secondary svelte-prm-jb5meg");
    },
    m(target, anchor) {
      insert(target, span, anchor);
      append(span, t);
    },
    p(ctx2, dirty) {
      if (dirty & /*settlementInfo*/
      8 && t_value !== (t_value = /*info*/
      ctx2[14].supplementarySecondary + "")) set_data(t, t_value);
    },
    d(detaching) {
      if (detaching) {
        detach(span);
      }
    }
  };
}
function create_if_block_1(ctx) {
  let div;
  let t_value = (
    /*info*/
    ctx[14].reason + ""
  );
  let t;
  return {
    c() {
      div = element("div");
      t = text(t_value);
      attr(div, "class", "ineligibility-reason svelte-prm-jb5meg");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      append(div, t);
    },
    p(ctx2, dirty) {
      if (dirty & /*settlementInfo*/
      8 && t_value !== (t_value = /*info*/
      ctx2[14].reason + "")) set_data(t, t_value);
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
    }
  };
}
function create_each_block(key_1, ctx) {
  let button;
  let div3;
  let div1;
  let div0;
  let span0;
  let t0_value = (
    /*info*/
    ctx[14].settlement.name + ""
  );
  let t0;
  let t1;
  let t2;
  let div2;
  let span1;
  let t3_value = (
    /*info*/
    (ctx[14].settlement.tier || "Village") + ""
  );
  let t3;
  let t4;
  let span2;
  let t5_value = (
    /*info*/
    ctx[14].settlement.level + ""
  );
  let t5;
  let t6;
  let t7;
  let t8;
  let button_disabled_value;
  let button_title_value;
  let mounted;
  let dispose;
  let if_block0 = (
    /*info*/
    ctx[14].supplementaryPrimary && create_if_block_3(ctx)
  );
  let if_block1 = (
    /*info*/
    ctx[14].supplementarySecondary && create_if_block_2(ctx)
  );
  let if_block2 = !/*info*/
  ctx[14].eligible && /*info*/
  ctx[14].reason && create_if_block_1(ctx);
  function click_handler() {
    return (
      /*click_handler*/
      ctx[10](
        /*info*/
        ctx[14]
      )
    );
  }
  return {
    key: key_1,
    first: null,
    c() {
      button = element("button");
      div3 = element("div");
      div1 = element("div");
      div0 = element("div");
      span0 = element("span");
      t0 = text(t0_value);
      t1 = space();
      if (if_block0) if_block0.c();
      t2 = space();
      div2 = element("div");
      span1 = element("span");
      t3 = text(t3_value);
      t4 = space();
      span2 = element("span");
      t5 = text(t5_value);
      t6 = space();
      if (if_block1) if_block1.c();
      t7 = space();
      if (if_block2) if_block2.c();
      t8 = space();
      attr(span0, "class", "settlement-name svelte-prm-jb5meg");
      attr(div0, "class", "settlement-name-row svelte-prm-jb5meg");
      attr(div1, "class", "settlement-left svelte-prm-jb5meg");
      attr(span1, "class", "tier-badge svelte-prm-jb5meg");
      attr(span2, "class", "level-number svelte-prm-jb5meg");
      attr(div2, "class", "settlement-right svelte-prm-jb5meg");
      attr(div3, "class", "settlement-main svelte-prm-jb5meg");
      attr(button, "class", "settlement-item svelte-prm-jb5meg");
      button.disabled = button_disabled_value = !/*info*/
      ctx[14].eligible;
      attr(button, "title", button_title_value = /*info*/
      ctx[14].reason || "");
      toggle_class(
        button,
        "selected",
        /*selectedSettlementId*/
        ctx[2] === /*info*/
        ctx[14].settlement.id
      );
      toggle_class(button, "ineligible", !/*info*/
      ctx[14].eligible);
      this.first = button;
    },
    m(target, anchor) {
      insert(target, button, anchor);
      append(button, div3);
      append(div3, div1);
      append(div1, div0);
      append(div0, span0);
      append(span0, t0);
      append(div0, t1);
      if (if_block0) if_block0.m(div0, null);
      append(div3, t2);
      append(div3, div2);
      append(div2, span1);
      append(span1, t3);
      append(div2, t4);
      append(div2, span2);
      append(span2, t5);
      append(button, t6);
      if (if_block1) if_block1.m(button, null);
      append(button, t7);
      if (if_block2) if_block2.m(button, null);
      append(button, t8);
      if (!mounted) {
        dispose = listen(button, "click", click_handler);
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty & /*settlementInfo*/
      8 && t0_value !== (t0_value = /*info*/
      ctx[14].settlement.name + "")) set_data(t0, t0_value);
      if (
        /*info*/
        ctx[14].supplementaryPrimary
      ) {
        if (if_block0) {
          if_block0.p(ctx, dirty);
        } else {
          if_block0 = create_if_block_3(ctx);
          if_block0.c();
          if_block0.m(div0, null);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }
      if (dirty & /*settlementInfo*/
      8 && t3_value !== (t3_value = /*info*/
      (ctx[14].settlement.tier || "Village") + "")) set_data(t3, t3_value);
      if (dirty & /*settlementInfo*/
      8 && t5_value !== (t5_value = /*info*/
      ctx[14].settlement.level + "")) set_data(t5, t5_value);
      if (
        /*info*/
        ctx[14].supplementarySecondary
      ) {
        if (if_block1) {
          if_block1.p(ctx, dirty);
        } else {
          if_block1 = create_if_block_2(ctx);
          if_block1.c();
          if_block1.m(button, t7);
        }
      } else if (if_block1) {
        if_block1.d(1);
        if_block1 = null;
      }
      if (!/*info*/
      ctx[14].eligible && /*info*/
      ctx[14].reason) {
        if (if_block2) {
          if_block2.p(ctx, dirty);
        } else {
          if_block2 = create_if_block_1(ctx);
          if_block2.c();
          if_block2.m(button, t8);
        }
      } else if (if_block2) {
        if_block2.d(1);
        if_block2 = null;
      }
      if (dirty & /*settlementInfo*/
      8 && button_disabled_value !== (button_disabled_value = !/*info*/
      ctx[14].eligible)) {
        button.disabled = button_disabled_value;
      }
      if (dirty & /*settlementInfo*/
      8 && button_title_value !== (button_title_value = /*info*/
      ctx[14].reason || "")) {
        attr(button, "title", button_title_value);
      }
      if (dirty & /*selectedSettlementId, settlementInfo*/
      12) {
        toggle_class(
          button,
          "selected",
          /*selectedSettlementId*/
          ctx[2] === /*info*/
          ctx[14].settlement.id
        );
      }
      if (dirty & /*settlementInfo*/
      8) {
        toggle_class(button, "ineligible", !/*info*/
        ctx[14].eligible);
      }
    },
    d(detaching) {
      if (detaching) {
        detach(button);
      }
      if (if_block0) if_block0.d();
      if (if_block1) if_block1.d();
      if (if_block2) if_block2.d();
      mounted = false;
      dispose();
    }
  };
}
function create_default_slot(ctx) {
  let if_block_anchor;
  function select_block_type(ctx2, dirty) {
    if (
      /*settlementInfo*/
      ctx2[3].length === 0
    ) return create_if_block;
    return create_else_block;
  }
  let current_block_type = select_block_type(ctx);
  let if_block = current_block_type(ctx);
  return {
    c() {
      if_block.c();
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if_block.m(target, anchor);
      insert(target, if_block_anchor, anchor);
    },
    p(ctx2, dirty) {
      if (current_block_type === (current_block_type = select_block_type(ctx2)) && if_block) {
        if_block.p(ctx2, dirty);
      } else {
        if_block.d(1);
        if_block = current_block_type(ctx2);
        if (if_block) {
          if_block.c();
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      }
    },
    d(detaching) {
      if (detaching) {
        detach(if_block_anchor);
      }
      if_block.d(detaching);
    }
  };
}
function create_fragment(ctx) {
  let dialog;
  let updating_show;
  let current;
  function dialog_show_binding(value) {
    ctx[11](value);
  }
  let dialog_props = {
    title: (
      /*title*/
      ctx[1]
    ),
    confirmLabel: "Select",
    confirmDisabled: !/*selectedSettlementId*/
    ctx[2],
    width: "500px",
    $$slots: { default: [create_default_slot] },
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
  dialog.$on(
    "confirm",
    /*handleConfirm*/
    ctx[5]
  );
  dialog.$on(
    "cancel",
    /*handleCancel*/
    ctx[6]
  );
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
      if (dirty & /*selectedSettlementId*/
      4) dialog_changes.confirmDisabled = !/*selectedSettlementId*/
      ctx2[2];
      if (dirty & /*$$scope, settlementInfo, selectedSettlementId*/
      131084) {
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
  let { show = false } = $$props;
  let { title = "Select Settlement" } = $$props;
  let { filter = null } = $$props;
  let { getSupplementaryInfo = null } = $$props;
  let { kingdom = null } = $$props;
  const dispatch = createEventDispatcher();
  let selectedSettlementId = null;
  let settlementInfo = [];
  function loadSettlements() {
    let kingdomData = kingdom;
    if (!kingdomData) {
      const actor = getPartyActor();
      if (!actor) {
        console.error("❌ [SettlementSelectionDialog] No kingdom actor available");
        return;
      }
      kingdomData = actor.getKingdomData();
      if (!kingdomData) {
        console.error("❌ [SettlementSelectionDialog] No kingdom data available");
        return;
      }
    }
    $$invalidate(3, settlementInfo = (kingdomData.settlements || []).map((s) => {
      const info = { settlement: s };
      if (!filter) {
        info.eligible = true;
      } else {
        const result = filter(s, kingdomData);
        if (typeof result === "boolean") {
          info.eligible = result;
        } else {
          info.eligible = result.eligible;
          info.reason = result.reason;
        }
      }
      if (getSupplementaryInfo) {
        const result = getSupplementaryInfo(s);
        if (typeof result === "string") {
          info.supplementaryPrimary = result;
        } else if (result) {
          info.supplementaryPrimary = result.primary;
          info.supplementarySecondary = result.secondary;
        }
      }
      return info;
    }).filter((info) => info.eligible));
    settlementInfo.sort((a, b) => a.settlement.name.localeCompare(b.settlement.name));
  }
  function selectSettlement(info) {
    if (!info.eligible) {
      const game = globalThis.game;
      if (game?.ui?.notifications) {
        game.ui.notifications.warn(info.reason || `Cannot select ${info.settlement.name}`);
      }
      return;
    }
    $$invalidate(2, selectedSettlementId = info.settlement.id);
  }
  function handleConfirm() {
    if (!selectedSettlementId) {
      const game = globalThis.game;
      if (game?.ui?.notifications) {
        game.ui.notifications.warn("Please select a settlement");
      }
      return;
    }
    const selected = settlementInfo.find((info) => info.settlement.id === selectedSettlementId);
    dispatch("confirm", {
      settlementId: selectedSettlementId,
      settlementName: selected?.settlement.name || "Unknown"
    });
    $$invalidate(2, selectedSettlementId = null);
    $$invalidate(0, show = false);
  }
  function handleCancel() {
    $$invalidate(2, selectedSettlementId = null);
    $$invalidate(0, show = false);
    dispatch("cancel");
  }
  const click_handler = (info) => selectSettlement(info);
  function dialog_show_binding(value) {
    show = value;
    $$invalidate(0, show);
  }
  $$self.$$set = ($$props2) => {
    if ("show" in $$props2) $$invalidate(0, show = $$props2.show);
    if ("title" in $$props2) $$invalidate(1, title = $$props2.title);
    if ("filter" in $$props2) $$invalidate(7, filter = $$props2.filter);
    if ("getSupplementaryInfo" in $$props2) $$invalidate(8, getSupplementaryInfo = $$props2.getSupplementaryInfo);
    if ("kingdom" in $$props2) $$invalidate(9, kingdom = $$props2.kingdom);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*show*/
    1) {
      if (show) {
        loadSettlements();
      }
    }
  };
  return [
    show,
    title,
    selectedSettlementId,
    settlementInfo,
    selectSettlement,
    handleConfirm,
    handleCancel,
    filter,
    getSupplementaryInfo,
    kingdom,
    click_handler,
    dialog_show_binding
  ];
}
class SettlementSelectionDialog extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, {
      show: 0,
      title: 1,
      filter: 7,
      getSupplementaryInfo: 8,
      kingdom: 9
    });
  }
}
export {
  SettlementSelectionDialog as default
};
