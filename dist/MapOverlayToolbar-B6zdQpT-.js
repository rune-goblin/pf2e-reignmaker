import { aw as SvelteComponent, ax as init, ay as safe_not_equal, b0 as Dialog, b1 as binding_callbacks, b2 as bind, b3 as destroy_component, b4 as transition_out, b5 as transition_in, b6 as add_flush_callback, b7 as mount_component, b8 as create_component, bu as component_subscribe, y as kingdomData, b9 as createEventDispatcher, al as SettlementTier, P as PLAYER_KINGDOM, aI as ensure_array_like, aA as detach, aJ as destroy_each, bd as run_all, bq as set_input_value, bo as select_option, aB as insert, aF as append, aK as listen, aC as element, aG as space, aD as attr, bp as add_render_callback, bm as select_value, az as noop, aH as text, aM as set_style, aN as toggle_class, au as writable, bw as onMount, bv as onDestroy, aE as set_data, bC as downloadMapData, bD as allHexesByFaction, bE as hiddenFactions, aS as update_keyed_each, aT as destroy_block, bF as setTerritoryFactionVisibility, bk as group_outros, bl as check_outros, R as ReignMakerMapLayer, bG as getOverlayManager, l as logger } from "./GameCommandUtils-D_sgs3NK.js";
import { i as isWizardActive, j as getGuidedModePosition, g as getEditorModeService, k as activeEditorSection, l as settlementEditorDialog, m as cellRiverEditorHandlers, o as cellLakeEditorHandlers, q as cellCrossingEditorHandlers } from "./EditorModeService-pyvG--bK.js";
function get_each_context$3(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[18] = list[i];
  return child_ctx;
}
function create_each_block$3(ctx) {
  let option;
  let t_value = (
    /*tierOption*/
    ctx[18] + ""
  );
  let t;
  return {
    c() {
      option = element("option");
      t = text(t_value);
      option.__value = /*tierOption*/
      ctx[18];
      set_input_value(option, option.__value);
    },
    m(target, anchor) {
      insert(target, option, anchor);
      append(option, t);
    },
    p: noop,
    d(detaching) {
      if (detaching) {
        detach(option);
      }
    }
  };
}
function create_default_slot(ctx) {
  let div2;
  let div0;
  let label0;
  let t1;
  let input;
  let t2;
  let div1;
  let label1;
  let t4;
  let select;
  let mounted;
  let dispose;
  let each_value = ensure_array_like(
    /*tierOptions*/
    ctx[6]
  );
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$3(get_each_context$3(ctx, each_value, i));
  }
  return {
    c() {
      div2 = element("div");
      div0 = element("div");
      label0 = element("label");
      label0.textContent = "Settlement Name:";
      t1 = space();
      input = element("input");
      t2 = space();
      div1 = element("div");
      label1 = element("label");
      label1.textContent = "Settlement Tier:";
      t4 = space();
      select = element("select");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      attr(label0, "for", "settlement-name");
      attr(label0, "class", "svelte-prm-1neryxn");
      attr(input, "id", "settlement-name");
      attr(input, "type", "text");
      attr(input, "placeholder", "Enter settlement name...");
      attr(input, "class", "svelte-prm-1neryxn");
      attr(div0, "class", "form-group svelte-prm-1neryxn");
      attr(label1, "for", "settlement-tier");
      attr(label1, "class", "svelte-prm-1neryxn");
      attr(select, "id", "settlement-tier");
      attr(select, "class", "rm-select svelte-prm-1neryxn");
      if (
        /*tier*/
        ctx[5] === void 0
      ) add_render_callback(() => (
        /*select_change_handler*/
        ctx[14].call(select)
      ));
      attr(div1, "class", "form-group svelte-prm-1neryxn");
      attr(div2, "class", "settlement-editor-dialog svelte-prm-1neryxn");
    },
    m(target, anchor) {
      insert(target, div2, anchor);
      append(div2, div0);
      append(div0, label0);
      append(div0, t1);
      append(div0, input);
      set_input_value(
        input,
        /*name*/
        ctx[4]
      );
      ctx[12](input);
      append(div2, t2);
      append(div2, div1);
      append(div1, label1);
      append(div1, t4);
      append(div1, select);
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(select, null);
        }
      }
      select_option(
        select,
        /*tier*/
        ctx[5],
        true
      );
      if (!mounted) {
        dispose = [
          listen(
            input,
            "input",
            /*input_input_handler*/
            ctx[11]
          ),
          listen(
            input,
            "keydown",
            /*keydown_handler*/
            ctx[13]
          ),
          listen(
            select,
            "change",
            /*select_change_handler*/
            ctx[14]
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (dirty & /*name*/
      16 && input.value !== /*name*/
      ctx2[4]) {
        set_input_value(
          input,
          /*name*/
          ctx2[4]
        );
      }
      if (dirty & /*tierOptions*/
      64) {
        each_value = ensure_array_like(
          /*tierOptions*/
          ctx2[6]
        );
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context$3(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block$3(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(select, null);
          }
        }
        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }
        each_blocks.length = each_value.length;
      }
      if (dirty & /*tier, tierOptions*/
      96) {
        select_option(
          select,
          /*tier*/
          ctx2[5]
        );
      }
    },
    d(detaching) {
      if (detaching) {
        detach(div2);
      }
      ctx[12](null);
      destroy_each(each_blocks, detaching);
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_fragment$3(ctx) {
  let dialog;
  let updating_show;
  let current;
  function dialog_show_binding(value) {
    ctx[15](value);
  }
  let dialog_props = {
    title: (
      /*existingSettlement*/
      ctx[1] ? `Edit Settlement (${/*hexId*/
      ctx[2]})` : `Place Settlement (${/*hexId*/
      ctx[2]})`
    ),
    confirmLabel: (
      /*existingSettlement*/
      ctx[1] ? "Save" : "Place"
    ),
    cancelLabel: "Cancel",
    confirmDisabled: !/*name*/
    ctx[4].trim(),
    width: "500px",
    onConfirm: (
      /*handleConfirm*/
      ctx[7]
    ),
    onCancel: (
      /*handleCancel*/
      ctx[8]
    ),
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
      if (dirty & /*existingSettlement, hexId*/
      6) dialog_changes.title = /*existingSettlement*/
      ctx2[1] ? `Edit Settlement (${/*hexId*/
      ctx2[2]})` : `Place Settlement (${/*hexId*/
      ctx2[2]})`;
      if (dirty & /*existingSettlement*/
      2) dialog_changes.confirmLabel = /*existingSettlement*/
      ctx2[1] ? "Save" : "Place";
      if (dirty & /*name*/
      16) dialog_changes.confirmDisabled = !/*name*/
      ctx2[4].trim();
      if (dirty & /*$$scope, tier, name, inputElement*/
      2097208) {
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
function instance$3($$self, $$props, $$invalidate) {
  let $kingdomData;
  component_subscribe($$self, kingdomData, ($$value) => $$invalidate(10, $kingdomData = $$value));
  let { show = false } = $$props;
  let { existingSettlement = null } = $$props;
  let { hexId = "" } = $$props;
  const dispatch = createEventDispatcher();
  let name = "";
  let tier = SettlementTier.VILLAGE;
  let inputElement;
  let initialized = false;
  const tierOptions = [
    SettlementTier.VILLAGE,
    SettlementTier.TOWN,
    SettlementTier.CITY,
    SettlementTier.METROPOLIS
  ];
  function handleConfirm() {
    if (name.trim()) {
      dispatch("confirm", { name: name.trim(), tier });
      $$invalidate(0, show = false);
    }
  }
  function handleCancel() {
    dispatch("cancel");
    $$invalidate(0, show = false);
  }
  function input_input_handler() {
    name = this.value;
    $$invalidate(4, name), $$invalidate(0, show), $$invalidate(9, initialized), $$invalidate(1, existingSettlement);
  }
  function input_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      inputElement = $$value;
      $$invalidate(3, inputElement);
    });
  }
  const keydown_handler = (e) => e.key === "Enter" && handleConfirm();
  function select_change_handler() {
    tier = select_value(this);
    $$invalidate(5, tier), $$invalidate(0, show), $$invalidate(9, initialized), $$invalidate(1, existingSettlement);
    $$invalidate(6, tierOptions);
  }
  function dialog_show_binding(value) {
    show = value;
    $$invalidate(0, show);
  }
  $$self.$$set = ($$props2) => {
    if ("show" in $$props2) $$invalidate(0, show = $$props2.show);
    if ("existingSettlement" in $$props2) $$invalidate(1, existingSettlement = $$props2.existingSettlement);
    if ("hexId" in $$props2) $$invalidate(2, hexId = $$props2.hexId);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*show, initialized, existingSettlement*/
    515) {
      if (show && !initialized) {
        if (existingSettlement) {
          $$invalidate(4, name = existingSettlement.name);
          $$invalidate(5, tier = existingSettlement.tier);
        } else {
          $$invalidate(4, name = "");
          $$invalidate(5, tier = SettlementTier.VILLAGE);
        }
        $$invalidate(9, initialized = true);
      }
    }
    if ($$self.$$.dirty & /*show*/
    1) {
      if (!show) {
        $$invalidate(9, initialized = false);
      }
    }
    if ($$self.$$.dirty & /*$kingdomData*/
    1024) {
      (() => {
        const options = [
          {
            value: PLAYER_KINGDOM,
            label: "Player Kingdom"
          }
        ];
        if ($kingdomData?.factions) {
          $kingdomData.factions.forEach((faction) => {
            options.push({ value: faction.id, label: faction.name });
          });
        }
        options.push({ value: null, label: "Unowned/Neutral" });
        return options;
      })();
    }
    if ($$self.$$.dirty & /*show, inputElement*/
    9) {
      if (show && inputElement) {
        setTimeout(() => inputElement?.focus(), 100);
      }
    }
  };
  return [
    show,
    existingSettlement,
    hexId,
    inputElement,
    name,
    tier,
    tierOptions,
    handleConfirm,
    handleCancel,
    initialized,
    $kingdomData,
    input_input_handler,
    input_binding,
    keydown_handler,
    select_change_handler,
    dialog_show_binding
  ];
}
class SettlementEditorDialog extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$3, create_fragment$3, safe_not_equal, { show: 0, existingSettlement: 1, hexId: 2 });
  }
}
function get_each_context$2(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[117] = list[i];
  return child_ctx;
}
function get_each_context_1(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[120] = list[i];
  return child_ctx;
}
function create_if_block_28(ctx) {
  let section;
  let select;
  let option0;
  let option1;
  let option2;
  let option3;
  let option4;
  let option5;
  let option6;
  let option7;
  let option8;
  let option9;
  let mounted;
  let dispose;
  return {
    c() {
      section = element("section");
      select = element("select");
      option0 = element("option");
      option0.textContent = "Terrain";
      option1 = element("option");
      option1.textContent = "Rivers";
      option2 = element("option");
      option2.textContent = "Water";
      option3 = element("option");
      option3.textContent = "Crossings";
      option4 = element("option");
      option4.textContent = "Roads";
      option5 = element("option");
      option5.textContent = "Bounty";
      option6 = element("option");
      option6.textContent = "Worksites";
      option7 = element("option");
      option7.textContent = "Settlements";
      option8 = element("option");
      option8.textContent = "Fortifications";
      option9 = element("option");
      option9.textContent = "Territory";
      option0.__value = "terrain";
      set_input_value(option0, option0.__value);
      attr(option0, "class", "svelte-prm-emwfcn");
      option1.__value = "rivers";
      set_input_value(option1, option1.__value);
      attr(option1, "class", "svelte-prm-emwfcn");
      option2.__value = "water";
      set_input_value(option2, option2.__value);
      attr(option2, "class", "svelte-prm-emwfcn");
      option3.__value = "crossings";
      set_input_value(option3, option3.__value);
      attr(option3, "class", "svelte-prm-emwfcn");
      option4.__value = "roads";
      set_input_value(option4, option4.__value);
      attr(option4, "class", "svelte-prm-emwfcn");
      option5.__value = "bounty";
      set_input_value(option5, option5.__value);
      attr(option5, "class", "svelte-prm-emwfcn");
      option6.__value = "worksites";
      set_input_value(option6, option6.__value);
      attr(option6, "class", "svelte-prm-emwfcn");
      option7.__value = "settlements";
      set_input_value(option7, option7.__value);
      attr(option7, "class", "svelte-prm-emwfcn");
      option8.__value = "fortifications";
      set_input_value(option8, option8.__value);
      attr(option8, "class", "svelte-prm-emwfcn");
      option9.__value = "territory";
      set_input_value(option9, option9.__value);
      attr(option9, "class", "svelte-prm-emwfcn");
      attr(select, "class", "section-dropdown rm-select svelte-prm-emwfcn");
      if (
        /*selectedSection*/
        ctx[6] === void 0
      ) add_render_callback(() => (
        /*select_change_handler*/
        ctx[38].call(select)
      ));
      attr(section, "class", "editor-section dropdown-section svelte-prm-emwfcn");
    },
    m(target, anchor) {
      insert(target, section, anchor);
      append(section, select);
      append(select, option0);
      append(select, option1);
      append(select, option2);
      append(select, option3);
      append(select, option4);
      append(select, option5);
      append(select, option6);
      append(select, option7);
      append(select, option8);
      append(select, option9);
      select_option(
        select,
        /*selectedSection*/
        ctx[6],
        true
      );
      if (!mounted) {
        dispose = [
          listen(
            select,
            "change",
            /*select_change_handler*/
            ctx[38]
          ),
          listen(
            select,
            "change",
            /*handleSectionChange*/
            ctx[20]
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (dirty[0] & /*selectedSection*/
      64) {
        select_option(
          select,
          /*selectedSection*/
          ctx2[6]
        );
      }
    },
    d(detaching) {
      if (detaching) {
        detach(section);
      }
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_if_block_26(ctx) {
  let section;
  let t0;
  let div1;
  let div0;
  let button0;
  let t1;
  let button1;
  let t2;
  let button2;
  let t3;
  let button3;
  let t4;
  let button4;
  let t5;
  let button5;
  let t6;
  let button6;
  let t7;
  let button7;
  let mounted;
  let dispose;
  let if_block = !/*isMinimized*/
  ctx[5] && create_if_block_27(ctx);
  return {
    c() {
      section = element("section");
      if (if_block) if_block.c();
      t0 = space();
      div1 = element("div");
      div0 = element("div");
      button0 = element("button");
      button0.innerHTML = `<i class="fas fa-wheat-awn" style="color: #90C650;"></i>`;
      t1 = space();
      button1 = element("button");
      button1.innerHTML = `<i class="fas fa-tree" style="color: #228B22;"></i>`;
      t2 = space();
      button2 = element("button");
      button2.innerHTML = `<i class="fa-solid fa-mound" style="color: #8B7355;"></i>`;
      t3 = space();
      button3 = element("button");
      button3.innerHTML = `<i class="fas fa-mountain" style="color: #808080;"></i>`;
      t4 = space();
      button4 = element("button");
      button4.innerHTML = `<i class="fa-solid fa-seedling" style="color: #6B8E23;"></i>`;
      t5 = space();
      button5 = element("button");
      button5.innerHTML = `<i class="fas fa-sun" style="color: #EDC9AF;"></i>`;
      t6 = space();
      button6 = element("button");
      button6.innerHTML = `<i class="fas fa-tint" style="color: #4682B4;"></i>`;
      t7 = space();
      button7 = element("button");
      button7.innerHTML = `<i class="fas fa-question"></i>`;
      attr(button0, "class", "tool-button svelte-prm-emwfcn");
      attr(button0, "title", "Plains");
      toggle_class(
        button0,
        "active",
        /*$currentTool*/
        ctx[1] === "terrain-plains"
      );
      attr(button1, "class", "tool-button svelte-prm-emwfcn");
      attr(button1, "title", "Forest");
      toggle_class(
        button1,
        "active",
        /*$currentTool*/
        ctx[1] === "terrain-forest"
      );
      attr(button2, "class", "tool-button svelte-prm-emwfcn");
      attr(button2, "title", "Hills");
      toggle_class(
        button2,
        "active",
        /*$currentTool*/
        ctx[1] === "terrain-hills"
      );
      attr(button3, "class", "tool-button svelte-prm-emwfcn");
      attr(button3, "title", "Mountains");
      toggle_class(
        button3,
        "active",
        /*$currentTool*/
        ctx[1] === "terrain-mountains"
      );
      attr(button4, "class", "tool-button svelte-prm-emwfcn");
      attr(button4, "title", "Swamp");
      toggle_class(
        button4,
        "active",
        /*$currentTool*/
        ctx[1] === "terrain-swamp"
      );
      attr(button5, "class", "tool-button svelte-prm-emwfcn");
      attr(button5, "title", "Desert");
      toggle_class(
        button5,
        "active",
        /*$currentTool*/
        ctx[1] === "terrain-desert"
      );
      attr(button6, "class", "tool-button svelte-prm-emwfcn");
      attr(button6, "title", "Water");
      toggle_class(
        button6,
        "active",
        /*$currentTool*/
        ctx[1] === "terrain-water"
      );
      attr(div0, "class", "tool-buttons terrain-buttons svelte-prm-emwfcn");
      attr(div1, "class", "tool-content svelte-prm-emwfcn");
      attr(button7, "class", "tool-button help-button section-help svelte-prm-emwfcn");
      attr(button7, "title", "Show keyboard shortcuts in chat");
      attr(section, "class", "editor-section terrain-section svelte-prm-emwfcn");
      toggle_class(
        section,
        "active-section",
        /*activeSection*/
        ctx[14] === "terrain"
      );
    },
    m(target, anchor) {
      insert(target, section, anchor);
      if (if_block) if_block.m(section, null);
      append(section, t0);
      append(section, div1);
      append(div1, div0);
      append(div0, button0);
      append(div0, t1);
      append(div0, button1);
      append(div0, t2);
      append(div0, button2);
      append(div0, t3);
      append(div0, button3);
      append(div0, t4);
      append(div0, button4);
      append(div0, t5);
      append(div0, button5);
      append(div0, t6);
      append(div0, button6);
      append(section, t7);
      append(section, button7);
      if (!mounted) {
        dispose = [
          listen(
            button0,
            "click",
            /*click_handler_1*/
            ctx[40]
          ),
          listen(
            button1,
            "click",
            /*click_handler_2*/
            ctx[41]
          ),
          listen(
            button2,
            "click",
            /*click_handler_3*/
            ctx[42]
          ),
          listen(
            button3,
            "click",
            /*click_handler_4*/
            ctx[43]
          ),
          listen(
            button4,
            "click",
            /*click_handler_5*/
            ctx[44]
          ),
          listen(
            button5,
            "click",
            /*click_handler_6*/
            ctx[45]
          ),
          listen(
            button6,
            "click",
            /*click_handler_7*/
            ctx[46]
          ),
          listen(
            button7,
            "click",
            /*click_handler_8*/
            ctx[47]
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (!/*isMinimized*/
      ctx2[5]) {
        if (if_block) {
          if_block.p(ctx2, dirty);
        } else {
          if_block = create_if_block_27(ctx2);
          if_block.c();
          if_block.m(section, t0);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
      if (dirty[0] & /*$currentTool*/
      2) {
        toggle_class(
          button0,
          "active",
          /*$currentTool*/
          ctx2[1] === "terrain-plains"
        );
      }
      if (dirty[0] & /*$currentTool*/
      2) {
        toggle_class(
          button1,
          "active",
          /*$currentTool*/
          ctx2[1] === "terrain-forest"
        );
      }
      if (dirty[0] & /*$currentTool*/
      2) {
        toggle_class(
          button2,
          "active",
          /*$currentTool*/
          ctx2[1] === "terrain-hills"
        );
      }
      if (dirty[0] & /*$currentTool*/
      2) {
        toggle_class(
          button3,
          "active",
          /*$currentTool*/
          ctx2[1] === "terrain-mountains"
        );
      }
      if (dirty[0] & /*$currentTool*/
      2) {
        toggle_class(
          button4,
          "active",
          /*$currentTool*/
          ctx2[1] === "terrain-swamp"
        );
      }
      if (dirty[0] & /*$currentTool*/
      2) {
        toggle_class(
          button5,
          "active",
          /*$currentTool*/
          ctx2[1] === "terrain-desert"
        );
      }
      if (dirty[0] & /*$currentTool*/
      2) {
        toggle_class(
          button6,
          "active",
          /*$currentTool*/
          ctx2[1] === "terrain-water"
        );
      }
      if (dirty[0] & /*activeSection*/
      16384) {
        toggle_class(
          section,
          "active-section",
          /*activeSection*/
          ctx2[14] === "terrain"
        );
      }
    },
    d(detaching) {
      if (detaching) {
        detach(section);
      }
      if (if_block) if_block.d();
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_if_block_27(ctx) {
  let button;
  let mounted;
  let dispose;
  return {
    c() {
      button = element("button");
      button.textContent = "Terrain";
      attr(button, "class", "section-label svelte-prm-emwfcn");
      attr(button, "type", "button");
    },
    m(target, anchor) {
      insert(target, button, anchor);
      if (!mounted) {
        dispose = listen(
          button,
          "click",
          /*click_handler*/
          ctx[39]
        );
        mounted = true;
      }
    },
    p: noop,
    d(detaching) {
      if (detaching) {
        detach(button);
      }
      mounted = false;
      dispose();
    }
  };
}
function create_if_block_22(ctx) {
  let section;
  let t0;
  let div;
  let t1;
  let t2;
  let button;
  let mounted;
  let dispose;
  let if_block0 = !/*isMinimized*/
  ctx[5] && create_if_block_25(ctx);
  function select_block_type(ctx2, dirty) {
    if (
      /*deleteConfirmSection*/
      ctx2[12] === "rivers"
    ) return create_if_block_24;
    return create_else_block_2;
  }
  let current_block_type = select_block_type(ctx);
  let if_block1 = current_block_type(ctx);
  let if_block2 = (
    /*$currentTool*/
    ctx[1] === "cell-river-area-erase" && create_if_block_23(ctx)
  );
  return {
    c() {
      section = element("section");
      if (if_block0) if_block0.c();
      t0 = space();
      div = element("div");
      if_block1.c();
      t1 = space();
      if (if_block2) if_block2.c();
      t2 = space();
      button = element("button");
      button.innerHTML = `<i class="fas fa-question"></i>`;
      attr(div, "class", "tool-content svelte-prm-emwfcn");
      attr(button, "class", "tool-button help-button section-help svelte-prm-emwfcn");
      attr(button, "title", "Show keyboard shortcuts in chat");
      attr(section, "class", "editor-section svelte-prm-emwfcn");
      toggle_class(
        section,
        "active-section",
        /*activeSection*/
        ctx[14] === "rivers"
      );
    },
    m(target, anchor) {
      insert(target, section, anchor);
      if (if_block0) if_block0.m(section, null);
      append(section, t0);
      append(section, div);
      if_block1.m(div, null);
      append(div, t1);
      if (if_block2) if_block2.m(div, null);
      append(section, t2);
      append(section, button);
      if (!mounted) {
        dispose = listen(
          button,
          "click",
          /*click_handler_17*/
          ctx[56]
        );
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (!/*isMinimized*/
      ctx2[5]) {
        if (if_block0) {
          if_block0.p(ctx2, dirty);
        } else {
          if_block0 = create_if_block_25(ctx2);
          if_block0.c();
          if_block0.m(section, t0);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }
      if (current_block_type === (current_block_type = select_block_type(ctx2)) && if_block1) {
        if_block1.p(ctx2, dirty);
      } else {
        if_block1.d(1);
        if_block1 = current_block_type(ctx2);
        if (if_block1) {
          if_block1.c();
          if_block1.m(div, t1);
        }
      }
      if (
        /*$currentTool*/
        ctx2[1] === "cell-river-area-erase"
      ) {
        if (if_block2) {
          if_block2.p(ctx2, dirty);
        } else {
          if_block2 = create_if_block_23(ctx2);
          if_block2.c();
          if_block2.m(div, null);
        }
      } else if (if_block2) {
        if_block2.d(1);
        if_block2 = null;
      }
      if (dirty[0] & /*activeSection*/
      16384) {
        toggle_class(
          section,
          "active-section",
          /*activeSection*/
          ctx2[14] === "rivers"
        );
      }
    },
    d(detaching) {
      if (detaching) {
        detach(section);
      }
      if (if_block0) if_block0.d();
      if_block1.d();
      if (if_block2) if_block2.d();
      mounted = false;
      dispose();
    }
  };
}
function create_if_block_25(ctx) {
  let button;
  let mounted;
  let dispose;
  return {
    c() {
      button = element("button");
      button.textContent = "Rivers";
      attr(button, "class", "section-label svelte-prm-emwfcn");
      attr(button, "type", "button");
    },
    m(target, anchor) {
      insert(target, button, anchor);
      if (!mounted) {
        dispose = listen(
          button,
          "click",
          /*click_handler_9*/
          ctx[48]
        );
        mounted = true;
      }
    },
    p: noop,
    d(detaching) {
      if (detaching) {
        detach(button);
      }
      mounted = false;
      dispose();
    }
  };
}
function create_else_block_2(ctx) {
  let div;
  let button0;
  let t0;
  let button1;
  let t1;
  let button2;
  let t2;
  let button3;
  let t3;
  let button4;
  let mounted;
  let dispose;
  return {
    c() {
      div = element("div");
      button0 = element("button");
      button0.innerHTML = `<i class="fas fa-water"></i>`;
      t0 = space();
      button1 = element("button");
      button1.innerHTML = `<i class="fas fa-eraser"></i>`;
      t1 = space();
      button2 = element("button");
      button2.innerHTML = `<i class="fas fa-circle" style="color: #ff6666;"></i>`;
      t2 = space();
      button3 = element("button");
      button3.innerHTML = `<i class="fas fa-exchange-alt"></i>`;
      t3 = space();
      button4 = element("button");
      button4.innerHTML = `<i class="fas fa-trash"></i>`;
      attr(button0, "class", "tool-button svelte-prm-emwfcn");
      attr(button0, "title", "Draw Rivers - Click to add points, double-click to finish path");
      toggle_class(
        button0,
        "active",
        /*$currentTool*/
        ctx[1] === "cell-river-edit"
      );
      attr(button1, "class", "tool-button svelte-prm-emwfcn");
      attr(button1, "title", "Erase Path - Click on a river to remove entire path");
      toggle_class(
        button1,
        "active",
        /*$currentTool*/
        ctx[1] === "cell-river-erase"
      );
      attr(button2, "class", "tool-button svelte-prm-emwfcn");
      attr(button2, "title", "Area Erase - Drag to erase river points in a circular area");
      toggle_class(
        button2,
        "active",
        /*$currentTool*/
        ctx[1] === "cell-river-area-erase"
      );
      attr(button3, "class", "tool-button svelte-prm-emwfcn");
      attr(button3, "title", "Flip Direction - Click on a river to reverse its flow");
      toggle_class(
        button3,
        "active",
        /*$currentTool*/
        ctx[1] === "cell-river-flip"
      );
      attr(button4, "class", "tool-button danger svelte-prm-emwfcn");
      attr(button4, "title", "Clear All - Remove all river paths");
      attr(div, "class", "tool-buttons svelte-prm-emwfcn");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      append(div, button0);
      append(div, t0);
      append(div, button1);
      append(div, t1);
      append(div, button2);
      append(div, t2);
      append(div, button3);
      append(div, t3);
      append(div, button4);
      if (!mounted) {
        dispose = [
          listen(
            button0,
            "click",
            /*click_handler_11*/
            ctx[50]
          ),
          listen(
            button1,
            "click",
            /*click_handler_12*/
            ctx[51]
          ),
          listen(
            button2,
            "click",
            /*click_handler_13*/
            ctx[52]
          ),
          listen(
            button3,
            "click",
            /*click_handler_14*/
            ctx[53]
          ),
          listen(
            button4,
            "click",
            /*click_handler_15*/
            ctx[54]
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (dirty[0] & /*$currentTool*/
      2) {
        toggle_class(
          button0,
          "active",
          /*$currentTool*/
          ctx2[1] === "cell-river-edit"
        );
      }
      if (dirty[0] & /*$currentTool*/
      2) {
        toggle_class(
          button1,
          "active",
          /*$currentTool*/
          ctx2[1] === "cell-river-erase"
        );
      }
      if (dirty[0] & /*$currentTool*/
      2) {
        toggle_class(
          button2,
          "active",
          /*$currentTool*/
          ctx2[1] === "cell-river-area-erase"
        );
      }
      if (dirty[0] & /*$currentTool*/
      2) {
        toggle_class(
          button3,
          "active",
          /*$currentTool*/
          ctx2[1] === "cell-river-flip"
        );
      }
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_if_block_24(ctx) {
  let div;
  let button0;
  let t1;
  let button1;
  let mounted;
  let dispose;
  return {
    c() {
      div = element("div");
      button0 = element("button");
      button0.textContent = "Delete All";
      t1 = space();
      button1 = element("button");
      button1.textContent = "Cancel";
      attr(button0, "class", "tool-button confirm-delete svelte-prm-emwfcn");
      attr(button0, "title", "Confirm delete all rivers");
      attr(button1, "class", "tool-button cancel-delete svelte-prm-emwfcn");
      attr(button1, "title", "Cancel");
      attr(div, "class", "delete-confirm-row svelte-prm-emwfcn");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      append(div, button0);
      append(div, t1);
      append(div, button1);
      if (!mounted) {
        dispose = [
          listen(
            button0,
            "click",
            /*click_handler_10*/
            ctx[49]
          ),
          listen(
            button1,
            "click",
            /*cancelDeleteConfirm*/
            ctx[31]
          )
        ];
        mounted = true;
      }
    },
    p: noop,
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_if_block_23(ctx) {
  let div;
  let span;
  let t1;
  let each_value_1 = ensure_array_like(
    /*eraserSizes*/
    ctx[33]
  );
  let each_blocks = [];
  for (let i = 0; i < each_value_1.length; i += 1) {
    each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
  }
  return {
    c() {
      div = element("div");
      span = element("span");
      span.textContent = "Size:";
      t1 = space();
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      attr(span, "class", "size-label svelte-prm-emwfcn");
      attr(div, "class", "eraser-size-selector svelte-prm-emwfcn");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      append(div, span);
      append(div, t1);
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(div, null);
        }
      }
    },
    p(ctx2, dirty) {
      if (dirty[0] & /*selectedEraserSize*/
      1 | dirty[1] & /*eraserSizes, setEraserSize*/
      12) {
        each_value_1 = ensure_array_like(
          /*eraserSizes*/
          ctx2[33]
        );
        let i;
        for (i = 0; i < each_value_1.length; i += 1) {
          const child_ctx = get_each_context_1(ctx2, each_value_1, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block_1(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(div, null);
          }
        }
        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }
        each_blocks.length = each_value_1.length;
      }
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      destroy_each(each_blocks, detaching);
    }
  };
}
function create_each_block_1(ctx) {
  let button;
  let t0_value = (
    /*size*/
    ctx[120].label + ""
  );
  let t0;
  let t1;
  let mounted;
  let dispose;
  function click_handler_16() {
    return (
      /*click_handler_16*/
      ctx[55](
        /*size*/
        ctx[120]
      )
    );
  }
  return {
    c() {
      button = element("button");
      t0 = text(t0_value);
      t1 = space();
      attr(button, "class", "size-button svelte-prm-emwfcn");
      attr(
        button,
        "title",
        /*size*/
        ctx[120].title
      );
      toggle_class(
        button,
        "active",
        /*selectedEraserSize*/
        ctx[0] === /*size*/
        ctx[120].value
      );
    },
    m(target, anchor) {
      insert(target, button, anchor);
      append(button, t0);
      append(button, t1);
      if (!mounted) {
        dispose = listen(button, "click", click_handler_16);
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty[0] & /*selectedEraserSize*/
      1 | dirty[1] & /*eraserSizes*/
      4) {
        toggle_class(
          button,
          "active",
          /*selectedEraserSize*/
          ctx[0] === /*size*/
          ctx[120].value
        );
      }
    },
    d(detaching) {
      if (detaching) {
        detach(button);
      }
      mounted = false;
      dispose();
    }
  };
}
function create_if_block_19(ctx) {
  let section;
  let t0;
  let div;
  let t1;
  let button;
  let mounted;
  let dispose;
  let if_block0 = !/*isMinimized*/
  ctx[5] && create_if_block_21(ctx);
  function select_block_type_1(ctx2, dirty) {
    if (
      /*deleteConfirmSection*/
      ctx2[12] === "water"
    ) return create_if_block_20;
    return create_else_block_1;
  }
  let current_block_type = select_block_type_1(ctx);
  let if_block1 = current_block_type(ctx);
  return {
    c() {
      section = element("section");
      if (if_block0) if_block0.c();
      t0 = space();
      div = element("div");
      if_block1.c();
      t1 = space();
      button = element("button");
      button.innerHTML = `<i class="fas fa-question"></i>`;
      attr(div, "class", "tool-content svelte-prm-emwfcn");
      attr(button, "class", "tool-button help-button section-help svelte-prm-emwfcn");
      attr(button, "title", "Show keyboard shortcuts in chat");
      attr(section, "class", "editor-section svelte-prm-emwfcn");
      toggle_class(
        section,
        "active-section",
        /*activeSection*/
        ctx[14] === "water"
      );
    },
    m(target, anchor) {
      insert(target, section, anchor);
      if (if_block0) if_block0.m(section, null);
      append(section, t0);
      append(section, div);
      if_block1.m(div, null);
      append(section, t1);
      append(section, button);
      if (!mounted) {
        dispose = listen(
          button,
          "click",
          /*click_handler_23*/
          ctx[62]
        );
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (!/*isMinimized*/
      ctx2[5]) {
        if (if_block0) {
          if_block0.p(ctx2, dirty);
        } else {
          if_block0 = create_if_block_21(ctx2);
          if_block0.c();
          if_block0.m(section, t0);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }
      if (current_block_type === (current_block_type = select_block_type_1(ctx2)) && if_block1) {
        if_block1.p(ctx2, dirty);
      } else {
        if_block1.d(1);
        if_block1 = current_block_type(ctx2);
        if (if_block1) {
          if_block1.c();
          if_block1.m(div, null);
        }
      }
      if (dirty[0] & /*activeSection*/
      16384) {
        toggle_class(
          section,
          "active-section",
          /*activeSection*/
          ctx2[14] === "water"
        );
      }
    },
    d(detaching) {
      if (detaching) {
        detach(section);
      }
      if (if_block0) if_block0.d();
      if_block1.d();
      mounted = false;
      dispose();
    }
  };
}
function create_if_block_21(ctx) {
  let button;
  let mounted;
  let dispose;
  return {
    c() {
      button = element("button");
      button.textContent = "Water";
      attr(button, "class", "section-label svelte-prm-emwfcn");
      attr(button, "type", "button");
    },
    m(target, anchor) {
      insert(target, button, anchor);
      if (!mounted) {
        dispose = listen(
          button,
          "click",
          /*click_handler_18*/
          ctx[57]
        );
        mounted = true;
      }
    },
    p: noop,
    d(detaching) {
      if (detaching) {
        detach(button);
      }
      mounted = false;
      dispose();
    }
  };
}
function create_else_block_1(ctx) {
  let div;
  let button0;
  let t0;
  let button1;
  let t1;
  let button2;
  let mounted;
  let dispose;
  return {
    c() {
      div = element("div");
      button0 = element("button");
      button0.innerHTML = `<i class="fas fa-paint-brush" style="color: #20B2AA;"></i>`;
      t0 = space();
      button1 = element("button");
      button1.innerHTML = `<i class="fas fa-eraser"></i>`;
      t1 = space();
      button2 = element("button");
      button2.innerHTML = `<i class="fas fa-trash"></i>`;
      attr(button0, "class", "tool-button svelte-prm-emwfcn");
      attr(button0, "title", "Paint Water - Click and drag to paint water cells");
      toggle_class(
        button0,
        "active",
        /*$currentTool*/
        ctx[1] === "cell-lake-paint"
      );
      attr(button1, "class", "tool-button svelte-prm-emwfcn");
      attr(button1, "title", "Erase Water - Click and drag to erase water cells");
      toggle_class(
        button1,
        "active",
        /*$currentTool*/
        ctx[1] === "cell-lake-erase"
      );
      attr(button2, "class", "tool-button danger svelte-prm-emwfcn");
      attr(button2, "title", "Clear All - Remove all water cells");
      attr(div, "class", "tool-buttons svelte-prm-emwfcn");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      append(div, button0);
      append(div, t0);
      append(div, button1);
      append(div, t1);
      append(div, button2);
      if (!mounted) {
        dispose = [
          listen(
            button0,
            "click",
            /*click_handler_20*/
            ctx[59]
          ),
          listen(
            button1,
            "click",
            /*click_handler_21*/
            ctx[60]
          ),
          listen(
            button2,
            "click",
            /*click_handler_22*/
            ctx[61]
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (dirty[0] & /*$currentTool*/
      2) {
        toggle_class(
          button0,
          "active",
          /*$currentTool*/
          ctx2[1] === "cell-lake-paint"
        );
      }
      if (dirty[0] & /*$currentTool*/
      2) {
        toggle_class(
          button1,
          "active",
          /*$currentTool*/
          ctx2[1] === "cell-lake-erase"
        );
      }
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_if_block_20(ctx) {
  let div;
  let button0;
  let t1;
  let button1;
  let mounted;
  let dispose;
  return {
    c() {
      div = element("div");
      button0 = element("button");
      button0.textContent = "Delete All";
      t1 = space();
      button1 = element("button");
      button1.textContent = "Cancel";
      attr(button0, "class", "tool-button confirm-delete svelte-prm-emwfcn");
      attr(button0, "title", "Confirm delete all water");
      attr(button1, "class", "tool-button cancel-delete svelte-prm-emwfcn");
      attr(button1, "title", "Cancel");
      attr(div, "class", "delete-confirm-row svelte-prm-emwfcn");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      append(div, button0);
      append(div, t1);
      append(div, button1);
      if (!mounted) {
        dispose = [
          listen(
            button0,
            "click",
            /*click_handler_19*/
            ctx[58]
          ),
          listen(
            button1,
            "click",
            /*cancelDeleteConfirm*/
            ctx[31]
          )
        ];
        mounted = true;
      }
    },
    p: noop,
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_if_block_16(ctx) {
  let section;
  let t0;
  let div;
  let t1;
  let button;
  let mounted;
  let dispose;
  let if_block0 = !/*isMinimized*/
  ctx[5] && create_if_block_18(ctx);
  function select_block_type_2(ctx2, dirty) {
    if (
      /*deleteConfirmSection*/
      ctx2[12] === "crossings"
    ) return create_if_block_17;
    return create_else_block;
  }
  let current_block_type = select_block_type_2(ctx);
  let if_block1 = current_block_type(ctx);
  return {
    c() {
      section = element("section");
      if (if_block0) if_block0.c();
      t0 = space();
      div = element("div");
      if_block1.c();
      t1 = space();
      button = element("button");
      button.innerHTML = `<i class="fas fa-question"></i>`;
      attr(div, "class", "tool-content svelte-prm-emwfcn");
      attr(button, "class", "tool-button help-button section-help svelte-prm-emwfcn");
      attr(button, "title", "Show keyboard shortcuts in chat");
      attr(section, "class", "editor-section svelte-prm-emwfcn");
      toggle_class(
        section,
        "active-section",
        /*activeSection*/
        ctx[14] === "crossings"
      );
    },
    m(target, anchor) {
      insert(target, section, anchor);
      if (if_block0) if_block0.m(section, null);
      append(section, t0);
      append(section, div);
      if_block1.m(div, null);
      append(section, t1);
      append(section, button);
      if (!mounted) {
        dispose = listen(
          button,
          "click",
          /*click_handler_29*/
          ctx[68]
        );
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (!/*isMinimized*/
      ctx2[5]) {
        if (if_block0) {
          if_block0.p(ctx2, dirty);
        } else {
          if_block0 = create_if_block_18(ctx2);
          if_block0.c();
          if_block0.m(section, t0);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }
      if (current_block_type === (current_block_type = select_block_type_2(ctx2)) && if_block1) {
        if_block1.p(ctx2, dirty);
      } else {
        if_block1.d(1);
        if_block1 = current_block_type(ctx2);
        if (if_block1) {
          if_block1.c();
          if_block1.m(div, null);
        }
      }
      if (dirty[0] & /*activeSection*/
      16384) {
        toggle_class(
          section,
          "active-section",
          /*activeSection*/
          ctx2[14] === "crossings"
        );
      }
    },
    d(detaching) {
      if (detaching) {
        detach(section);
      }
      if (if_block0) if_block0.d();
      if_block1.d();
      mounted = false;
      dispose();
    }
  };
}
function create_if_block_18(ctx) {
  let button;
  let mounted;
  let dispose;
  return {
    c() {
      button = element("button");
      button.textContent = "Crossings";
      attr(button, "class", "section-label svelte-prm-emwfcn");
      attr(button, "type", "button");
    },
    m(target, anchor) {
      insert(target, button, anchor);
      if (!mounted) {
        dispose = listen(
          button,
          "click",
          /*click_handler_24*/
          ctx[63]
        );
        mounted = true;
      }
    },
    p: noop,
    d(detaching) {
      if (detaching) {
        detach(button);
      }
      mounted = false;
      dispose();
    }
  };
}
function create_else_block(ctx) {
  let div;
  let button0;
  let t0;
  let button1;
  let t1;
  let button2;
  let mounted;
  let dispose;
  return {
    c() {
      div = element("div");
      button0 = element("button");
      button0.innerHTML = `<i class="fas fa-bridge" style="color: #00FF00;"></i>`;
      t0 = space();
      button1 = element("button");
      button1.innerHTML = `<i class="fas fa-eraser"></i>`;
      t1 = space();
      button2 = element("button");
      button2.innerHTML = `<i class="fas fa-trash"></i>`;
      attr(button0, "class", "tool-button svelte-prm-emwfcn");
      attr(button0, "title", "Paint Passages - Click and drag to paint crossing cells (bridges/fords)");
      toggle_class(
        button0,
        "active",
        /*$currentTool*/
        ctx[1] === "cell-crossing-paint"
      );
      attr(button1, "class", "tool-button svelte-prm-emwfcn");
      attr(button1, "title", "Erase Passages - Click and drag to remove crossing cells");
      toggle_class(
        button1,
        "active",
        /*$currentTool*/
        ctx[1] === "cell-crossing-erase"
      );
      attr(button2, "class", "tool-button danger svelte-prm-emwfcn");
      attr(button2, "title", "Clear All - Remove all crossing cells");
      attr(div, "class", "tool-buttons svelte-prm-emwfcn");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      append(div, button0);
      append(div, t0);
      append(div, button1);
      append(div, t1);
      append(div, button2);
      if (!mounted) {
        dispose = [
          listen(
            button0,
            "click",
            /*click_handler_26*/
            ctx[65]
          ),
          listen(
            button1,
            "click",
            /*click_handler_27*/
            ctx[66]
          ),
          listen(
            button2,
            "click",
            /*click_handler_28*/
            ctx[67]
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (dirty[0] & /*$currentTool*/
      2) {
        toggle_class(
          button0,
          "active",
          /*$currentTool*/
          ctx2[1] === "cell-crossing-paint"
        );
      }
      if (dirty[0] & /*$currentTool*/
      2) {
        toggle_class(
          button1,
          "active",
          /*$currentTool*/
          ctx2[1] === "cell-crossing-erase"
        );
      }
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_if_block_17(ctx) {
  let div;
  let button0;
  let t1;
  let button1;
  let mounted;
  let dispose;
  return {
    c() {
      div = element("div");
      button0 = element("button");
      button0.textContent = "Delete All";
      t1 = space();
      button1 = element("button");
      button1.textContent = "Cancel";
      attr(button0, "class", "tool-button confirm-delete svelte-prm-emwfcn");
      attr(button0, "title", "Confirm delete all crossings");
      attr(button1, "class", "tool-button cancel-delete svelte-prm-emwfcn");
      attr(button1, "title", "Cancel");
      attr(div, "class", "delete-confirm-row svelte-prm-emwfcn");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      append(div, button0);
      append(div, t1);
      append(div, button1);
      if (!mounted) {
        dispose = [
          listen(
            button0,
            "click",
            /*click_handler_25*/
            ctx[64]
          ),
          listen(
            button1,
            "click",
            /*cancelDeleteConfirm*/
            ctx[31]
          )
        ];
        mounted = true;
      }
    },
    p: noop,
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_if_block_14(ctx) {
  let section;
  let t0;
  let div1;
  let div0;
  let button0;
  let t1;
  let button1;
  let t2;
  let button2;
  let mounted;
  let dispose;
  let if_block = !/*isMinimized*/
  ctx[5] && create_if_block_15(ctx);
  return {
    c() {
      section = element("section");
      if (if_block) if_block.c();
      t0 = space();
      div1 = element("div");
      div0 = element("div");
      button0 = element("button");
      button0.innerHTML = `<i class="fas fa-road"></i>`;
      t1 = space();
      button1 = element("button");
      button1.innerHTML = `<i class="fas fa-cut"></i>`;
      t2 = space();
      button2 = element("button");
      button2.innerHTML = `<i class="fas fa-question"></i>`;
      attr(button0, "class", "tool-button svelte-prm-emwfcn");
      attr(button0, "title", "Roads - Click hex to add road, Ctrl+Click to remove");
      toggle_class(
        button0,
        "active",
        /*$currentTool*/
        ctx[1] === "road-edit"
      );
      attr(button1, "class", "tool-button svelte-prm-emwfcn");
      attr(button1, "title", "Cut Roads - Click on a segment to break the connection");
      toggle_class(
        button1,
        "active",
        /*$currentTool*/
        ctx[1] === "road-scissors"
      );
      attr(div0, "class", "tool-buttons svelte-prm-emwfcn");
      attr(div1, "class", "tool-content svelte-prm-emwfcn");
      attr(button2, "class", "tool-button help-button section-help svelte-prm-emwfcn");
      attr(button2, "title", "Show keyboard shortcuts in chat");
      attr(section, "class", "editor-section svelte-prm-emwfcn");
      toggle_class(
        section,
        "active-section",
        /*activeSection*/
        ctx[14] === "roads"
      );
    },
    m(target, anchor) {
      insert(target, section, anchor);
      if (if_block) if_block.m(section, null);
      append(section, t0);
      append(section, div1);
      append(div1, div0);
      append(div0, button0);
      append(div0, t1);
      append(div0, button1);
      append(section, t2);
      append(section, button2);
      if (!mounted) {
        dispose = [
          listen(
            button0,
            "click",
            /*click_handler_31*/
            ctx[70]
          ),
          listen(
            button1,
            "click",
            /*click_handler_32*/
            ctx[71]
          ),
          listen(
            button2,
            "click",
            /*click_handler_33*/
            ctx[72]
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (!/*isMinimized*/
      ctx2[5]) {
        if (if_block) {
          if_block.p(ctx2, dirty);
        } else {
          if_block = create_if_block_15(ctx2);
          if_block.c();
          if_block.m(section, t0);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
      if (dirty[0] & /*$currentTool*/
      2) {
        toggle_class(
          button0,
          "active",
          /*$currentTool*/
          ctx2[1] === "road-edit"
        );
      }
      if (dirty[0] & /*$currentTool*/
      2) {
        toggle_class(
          button1,
          "active",
          /*$currentTool*/
          ctx2[1] === "road-scissors"
        );
      }
      if (dirty[0] & /*activeSection*/
      16384) {
        toggle_class(
          section,
          "active-section",
          /*activeSection*/
          ctx2[14] === "roads"
        );
      }
    },
    d(detaching) {
      if (detaching) {
        detach(section);
      }
      if (if_block) if_block.d();
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_if_block_15(ctx) {
  let button;
  let mounted;
  let dispose;
  return {
    c() {
      button = element("button");
      button.textContent = "Roads";
      attr(button, "class", "section-label svelte-prm-emwfcn");
      attr(button, "type", "button");
    },
    m(target, anchor) {
      insert(target, button, anchor);
      if (!mounted) {
        dispose = listen(
          button,
          "click",
          /*click_handler_30*/
          ctx[69]
        );
        mounted = true;
      }
    },
    p: noop,
    d(detaching) {
      if (detaching) {
        detach(button);
      }
      mounted = false;
      dispose();
    }
  };
}
function create_if_block_12(ctx) {
  let section;
  let t0;
  let div1;
  let div0;
  let button0;
  let t1;
  let button1;
  let t2;
  let button2;
  let t3;
  let button3;
  let t4;
  let button4;
  let t5;
  let button5;
  let t6;
  let button6;
  let mounted;
  let dispose;
  let if_block = !/*isMinimized*/
  ctx[5] && create_if_block_13(ctx);
  return {
    c() {
      section = element("section");
      if (if_block) if_block.c();
      t0 = space();
      div1 = element("div");
      div0 = element("div");
      button0 = element("button");
      button0.innerHTML = `<i class="fas fa-wheat-awn" style="color: var(--icon-food);"></i>`;
      t1 = space();
      button1 = element("button");
      button1.innerHTML = `<i class="fas fa-tree" style="color: var(--icon-lumber);"></i>`;
      t2 = space();
      button2 = element("button");
      button2.innerHTML = `<i class="fas fa-cube" style="color: var(--icon-stone);"></i>`;
      t3 = space();
      button3 = element("button");
      button3.innerHTML = `<i class="fas fa-mountain" style="color: var(--icon-ore);"></i>`;
      t4 = space();
      button4 = element("button");
      button4.innerHTML = `<i class="fas fa-coins" style="color: var(--icon-gold);"></i>`;
      t5 = space();
      button5 = element("button");
      button5.innerHTML = `<i class="fa-solid fa-minus"></i>`;
      t6 = space();
      button6 = element("button");
      button6.innerHTML = `<i class="fas fa-question"></i>`;
      attr(button0, "class", "tool-button svelte-prm-emwfcn");
      attr(button0, "title", "Food - Click to add");
      toggle_class(
        button0,
        "active",
        /*$currentTool*/
        ctx[1] === "bounty-food"
      );
      attr(button1, "class", "tool-button svelte-prm-emwfcn");
      attr(button1, "title", "Lumber - Click to add");
      toggle_class(
        button1,
        "active",
        /*$currentTool*/
        ctx[1] === "bounty-lumber"
      );
      attr(button2, "class", "tool-button svelte-prm-emwfcn");
      attr(button2, "title", "Stone - Click to add");
      toggle_class(
        button2,
        "active",
        /*$currentTool*/
        ctx[1] === "bounty-stone"
      );
      attr(button3, "class", "tool-button svelte-prm-emwfcn");
      attr(button3, "title", "Ore - Click to add");
      toggle_class(
        button3,
        "active",
        /*$currentTool*/
        ctx[1] === "bounty-ore"
      );
      attr(button4, "class", "tool-button svelte-prm-emwfcn");
      attr(button4, "title", "Gold - Click to add");
      toggle_class(
        button4,
        "active",
        /*$currentTool*/
        ctx[1] === "bounty-gold"
      );
      attr(button5, "class", "tool-button svelte-prm-emwfcn");
      attr(button5, "title", "Remove - Click to clear bounty from hex");
      toggle_class(
        button5,
        "active",
        /*$currentTool*/
        ctx[1] === "bounty-minus"
      );
      attr(div0, "class", "tool-buttons svelte-prm-emwfcn");
      attr(div1, "class", "tool-content svelte-prm-emwfcn");
      attr(button6, "class", "tool-button help-button section-help svelte-prm-emwfcn");
      attr(button6, "title", "Show keyboard shortcuts in chat");
      attr(section, "class", "editor-section svelte-prm-emwfcn");
      toggle_class(
        section,
        "active-section",
        /*activeSection*/
        ctx[14] === "bounty"
      );
    },
    m(target, anchor) {
      insert(target, section, anchor);
      if (if_block) if_block.m(section, null);
      append(section, t0);
      append(section, div1);
      append(div1, div0);
      append(div0, button0);
      append(div0, t1);
      append(div0, button1);
      append(div0, t2);
      append(div0, button2);
      append(div0, t3);
      append(div0, button3);
      append(div0, t4);
      append(div0, button4);
      append(div0, t5);
      append(div0, button5);
      append(section, t6);
      append(section, button6);
      if (!mounted) {
        dispose = [
          listen(
            button0,
            "click",
            /*click_handler_35*/
            ctx[74]
          ),
          listen(
            button1,
            "click",
            /*click_handler_36*/
            ctx[75]
          ),
          listen(
            button2,
            "click",
            /*click_handler_37*/
            ctx[76]
          ),
          listen(
            button3,
            "click",
            /*click_handler_38*/
            ctx[77]
          ),
          listen(
            button4,
            "click",
            /*click_handler_39*/
            ctx[78]
          ),
          listen(
            button5,
            "click",
            /*click_handler_40*/
            ctx[79]
          ),
          listen(
            button6,
            "click",
            /*click_handler_41*/
            ctx[80]
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (!/*isMinimized*/
      ctx2[5]) {
        if (if_block) {
          if_block.p(ctx2, dirty);
        } else {
          if_block = create_if_block_13(ctx2);
          if_block.c();
          if_block.m(section, t0);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
      if (dirty[0] & /*$currentTool*/
      2) {
        toggle_class(
          button0,
          "active",
          /*$currentTool*/
          ctx2[1] === "bounty-food"
        );
      }
      if (dirty[0] & /*$currentTool*/
      2) {
        toggle_class(
          button1,
          "active",
          /*$currentTool*/
          ctx2[1] === "bounty-lumber"
        );
      }
      if (dirty[0] & /*$currentTool*/
      2) {
        toggle_class(
          button2,
          "active",
          /*$currentTool*/
          ctx2[1] === "bounty-stone"
        );
      }
      if (dirty[0] & /*$currentTool*/
      2) {
        toggle_class(
          button3,
          "active",
          /*$currentTool*/
          ctx2[1] === "bounty-ore"
        );
      }
      if (dirty[0] & /*$currentTool*/
      2) {
        toggle_class(
          button4,
          "active",
          /*$currentTool*/
          ctx2[1] === "bounty-gold"
        );
      }
      if (dirty[0] & /*$currentTool*/
      2) {
        toggle_class(
          button5,
          "active",
          /*$currentTool*/
          ctx2[1] === "bounty-minus"
        );
      }
      if (dirty[0] & /*activeSection*/
      16384) {
        toggle_class(
          section,
          "active-section",
          /*activeSection*/
          ctx2[14] === "bounty"
        );
      }
    },
    d(detaching) {
      if (detaching) {
        detach(section);
      }
      if (if_block) if_block.d();
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_if_block_13(ctx) {
  let button;
  let mounted;
  let dispose;
  return {
    c() {
      button = element("button");
      button.textContent = "Bounty";
      attr(button, "class", "section-label svelte-prm-emwfcn");
      attr(button, "type", "button");
    },
    m(target, anchor) {
      insert(target, button, anchor);
      if (!mounted) {
        dispose = listen(
          button,
          "click",
          /*click_handler_34*/
          ctx[73]
        );
        mounted = true;
      }
    },
    p: noop,
    d(detaching) {
      if (detaching) {
        detach(button);
      }
      mounted = false;
      dispose();
    }
  };
}
function create_if_block_10(ctx) {
  let section;
  let t0;
  let div1;
  let div0;
  let button0;
  let t1;
  let button1;
  let t2;
  let button2;
  let t3;
  let button3;
  let t4;
  let button4;
  let t5;
  let button5;
  let mounted;
  let dispose;
  let if_block = !/*isMinimized*/
  ctx[5] && create_if_block_11(ctx);
  return {
    c() {
      section = element("section");
      if (if_block) if_block.c();
      t0 = space();
      div1 = element("div");
      div0 = element("div");
      button0 = element("button");
      button0.innerHTML = `<i class="fas fa-wheat-awn"></i>`;
      t1 = space();
      button1 = element("button");
      button1.innerHTML = `<i class="fas fa-tree"></i>`;
      t2 = space();
      button2 = element("button");
      button2.innerHTML = `<i class="fas fa-hammer"></i>`;
      t3 = space();
      button3 = element("button");
      button3.innerHTML = `<i class="fas fa-cube"></i>`;
      t4 = space();
      button4 = element("button");
      button4.innerHTML = `<i class="fa-solid fa-minus"></i>`;
      t5 = space();
      button5 = element("button");
      button5.innerHTML = `<i class="fas fa-question"></i>`;
      attr(button0, "class", "tool-button svelte-prm-emwfcn");
      attr(button0, "title", "Farmstead - Click to place, Ctrl+Click to remove");
      toggle_class(
        button0,
        "active",
        /*$currentTool*/
        ctx[1] === "worksite-farm"
      );
      attr(button1, "class", "tool-button svelte-prm-emwfcn");
      attr(button1, "title", "Logging Camp - Click to place (forest only), Ctrl+Click to remove");
      toggle_class(
        button1,
        "active",
        /*$currentTool*/
        ctx[1] === "worksite-lumber-mill"
      );
      attr(button2, "class", "tool-button svelte-prm-emwfcn");
      attr(button2, "title", "Mine - Click to place (mountains/swamp), Ctrl+Click to remove");
      toggle_class(
        button2,
        "active",
        /*$currentTool*/
        ctx[1] === "worksite-mine"
      );
      attr(button3, "class", "tool-button svelte-prm-emwfcn");
      attr(button3, "title", "Quarry - Click to place (hills/mountains), Ctrl+Click to remove");
      toggle_class(
        button3,
        "active",
        /*$currentTool*/
        ctx[1] === "worksite-quarry"
      );
      attr(button4, "class", "tool-button svelte-prm-emwfcn");
      attr(button4, "title", "Remove - Click to clear worksite from hex");
      toggle_class(
        button4,
        "active",
        /*$currentTool*/
        ctx[1] === "worksite-minus"
      );
      attr(div0, "class", "tool-buttons svelte-prm-emwfcn");
      attr(div1, "class", "tool-content svelte-prm-emwfcn");
      attr(button5, "class", "tool-button help-button section-help svelte-prm-emwfcn");
      attr(button5, "title", "Show keyboard shortcuts in chat");
      attr(section, "class", "editor-section svelte-prm-emwfcn");
      toggle_class(
        section,
        "active-section",
        /*activeSection*/
        ctx[14] === "worksites"
      );
    },
    m(target, anchor) {
      insert(target, section, anchor);
      if (if_block) if_block.m(section, null);
      append(section, t0);
      append(section, div1);
      append(div1, div0);
      append(div0, button0);
      append(div0, t1);
      append(div0, button1);
      append(div0, t2);
      append(div0, button2);
      append(div0, t3);
      append(div0, button3);
      append(div0, t4);
      append(div0, button4);
      append(section, t5);
      append(section, button5);
      if (!mounted) {
        dispose = [
          listen(
            button0,
            "click",
            /*click_handler_43*/
            ctx[82]
          ),
          listen(
            button1,
            "click",
            /*click_handler_44*/
            ctx[83]
          ),
          listen(
            button2,
            "click",
            /*click_handler_45*/
            ctx[84]
          ),
          listen(
            button3,
            "click",
            /*click_handler_46*/
            ctx[85]
          ),
          listen(
            button4,
            "click",
            /*click_handler_47*/
            ctx[86]
          ),
          listen(
            button5,
            "click",
            /*click_handler_48*/
            ctx[87]
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (!/*isMinimized*/
      ctx2[5]) {
        if (if_block) {
          if_block.p(ctx2, dirty);
        } else {
          if_block = create_if_block_11(ctx2);
          if_block.c();
          if_block.m(section, t0);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
      if (dirty[0] & /*$currentTool*/
      2) {
        toggle_class(
          button0,
          "active",
          /*$currentTool*/
          ctx2[1] === "worksite-farm"
        );
      }
      if (dirty[0] & /*$currentTool*/
      2) {
        toggle_class(
          button1,
          "active",
          /*$currentTool*/
          ctx2[1] === "worksite-lumber-mill"
        );
      }
      if (dirty[0] & /*$currentTool*/
      2) {
        toggle_class(
          button2,
          "active",
          /*$currentTool*/
          ctx2[1] === "worksite-mine"
        );
      }
      if (dirty[0] & /*$currentTool*/
      2) {
        toggle_class(
          button3,
          "active",
          /*$currentTool*/
          ctx2[1] === "worksite-quarry"
        );
      }
      if (dirty[0] & /*$currentTool*/
      2) {
        toggle_class(
          button4,
          "active",
          /*$currentTool*/
          ctx2[1] === "worksite-minus"
        );
      }
      if (dirty[0] & /*activeSection*/
      16384) {
        toggle_class(
          section,
          "active-section",
          /*activeSection*/
          ctx2[14] === "worksites"
        );
      }
    },
    d(detaching) {
      if (detaching) {
        detach(section);
      }
      if (if_block) if_block.d();
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_if_block_11(ctx) {
  let button;
  let mounted;
  let dispose;
  return {
    c() {
      button = element("button");
      button.textContent = "Worksites";
      attr(button, "class", "section-label svelte-prm-emwfcn");
      attr(button, "type", "button");
    },
    m(target, anchor) {
      insert(target, button, anchor);
      if (!mounted) {
        dispose = listen(
          button,
          "click",
          /*click_handler_42*/
          ctx[81]
        );
        mounted = true;
      }
    },
    p: noop,
    d(detaching) {
      if (detaching) {
        detach(button);
      }
      mounted = false;
      dispose();
    }
  };
}
function create_if_block_8(ctx) {
  let section;
  let t0;
  let div1;
  let div0;
  let button0;
  let t1;
  let button1;
  let t2;
  let button2;
  let mounted;
  let dispose;
  let if_block = !/*isMinimized*/
  ctx[5] && create_if_block_9(ctx);
  return {
    c() {
      section = element("section");
      if (if_block) if_block.c();
      t0 = space();
      div1 = element("div");
      div0 = element("div");
      button0 = element("button");
      button0.innerHTML = `<i class="fas fa-city"></i>`;
      t1 = space();
      button1 = element("button");
      button1.innerHTML = `<i class="fa-solid fa-minus"></i>`;
      t2 = space();
      button2 = element("button");
      button2.innerHTML = `<i class="fas fa-question"></i>`;
      attr(button0, "class", "tool-button svelte-prm-emwfcn");
      attr(button0, "title", "Settlement - Click to place/edit");
      toggle_class(
        button0,
        "active",
        /*$currentTool*/
        ctx[1] === "settlement-place"
      );
      attr(button1, "class", "tool-button svelte-prm-emwfcn");
      attr(button1, "title", "Remove - Click to clear settlement marker from hex");
      toggle_class(
        button1,
        "active",
        /*$currentTool*/
        ctx[1] === "settlement-minus"
      );
      attr(div0, "class", "tool-buttons svelte-prm-emwfcn");
      attr(div1, "class", "tool-content svelte-prm-emwfcn");
      attr(button2, "class", "tool-button help-button section-help svelte-prm-emwfcn");
      attr(button2, "title", "Show keyboard shortcuts in chat");
      attr(section, "class", "editor-section svelte-prm-emwfcn");
      toggle_class(
        section,
        "active-section",
        /*activeSection*/
        ctx[14] === "settlements"
      );
    },
    m(target, anchor) {
      insert(target, section, anchor);
      if (if_block) if_block.m(section, null);
      append(section, t0);
      append(section, div1);
      append(div1, div0);
      append(div0, button0);
      append(div0, t1);
      append(div0, button1);
      append(section, t2);
      append(section, button2);
      if (!mounted) {
        dispose = [
          listen(
            button0,
            "click",
            /*click_handler_50*/
            ctx[89]
          ),
          listen(
            button1,
            "click",
            /*click_handler_51*/
            ctx[90]
          ),
          listen(
            button2,
            "click",
            /*click_handler_52*/
            ctx[91]
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (!/*isMinimized*/
      ctx2[5]) {
        if (if_block) {
          if_block.p(ctx2, dirty);
        } else {
          if_block = create_if_block_9(ctx2);
          if_block.c();
          if_block.m(section, t0);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
      if (dirty[0] & /*$currentTool*/
      2) {
        toggle_class(
          button0,
          "active",
          /*$currentTool*/
          ctx2[1] === "settlement-place"
        );
      }
      if (dirty[0] & /*$currentTool*/
      2) {
        toggle_class(
          button1,
          "active",
          /*$currentTool*/
          ctx2[1] === "settlement-minus"
        );
      }
      if (dirty[0] & /*activeSection*/
      16384) {
        toggle_class(
          section,
          "active-section",
          /*activeSection*/
          ctx2[14] === "settlements"
        );
      }
    },
    d(detaching) {
      if (detaching) {
        detach(section);
      }
      if (if_block) if_block.d();
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_if_block_9(ctx) {
  let button;
  let mounted;
  let dispose;
  return {
    c() {
      button = element("button");
      button.textContent = "Settlements";
      attr(button, "class", "section-label svelte-prm-emwfcn");
      attr(button, "type", "button");
    },
    m(target, anchor) {
      insert(target, button, anchor);
      if (!mounted) {
        dispose = listen(
          button,
          "click",
          /*click_handler_49*/
          ctx[88]
        );
        mounted = true;
      }
    },
    p: noop,
    d(detaching) {
      if (detaching) {
        detach(button);
      }
      mounted = false;
      dispose();
    }
  };
}
function create_if_block_6(ctx) {
  let section;
  let t0;
  let div1;
  let div0;
  let button0;
  let t1;
  let button1;
  let t2;
  let button2;
  let t3;
  let button3;
  let t4;
  let button4;
  let mounted;
  let dispose;
  let if_block = !/*isMinimized*/
  ctx[5] && create_if_block_7(ctx);
  return {
    c() {
      section = element("section");
      if (if_block) if_block.c();
      t0 = space();
      div1 = element("div");
      div0 = element("div");
      button0 = element("button");
      button0.innerHTML = `<i class="fas fa-border-all"></i>`;
      t1 = space();
      button1 = element("button");
      button1.innerHTML = `<i class="fas fa-archway"></i>`;
      t2 = space();
      button2 = element("button");
      button2.innerHTML = `<i class="fas fa-chess-rook"></i>`;
      t3 = space();
      button3 = element("button");
      button3.innerHTML = `<i class="fas fa-dungeon"></i>`;
      t4 = space();
      button4 = element("button");
      button4.innerHTML = `<i class="fas fa-question"></i>`;
      attr(button0, "class", "tool-button svelte-prm-emwfcn");
      attr(button0, "title", "Earthworks (Tier 1) - Click to place, Ctrl+Click to remove");
      toggle_class(
        button0,
        "active",
        /*$currentTool*/
        ctx[1] === "fortification-tier1"
      );
      attr(button1, "class", "tool-button svelte-prm-emwfcn");
      attr(button1, "title", "Wooden Tower (Tier 2) - Click to place, Ctrl+Click to remove");
      toggle_class(
        button1,
        "active",
        /*$currentTool*/
        ctx[1] === "fortification-tier2"
      );
      attr(button2, "class", "tool-button svelte-prm-emwfcn");
      attr(button2, "title", "Stone Tower (Tier 3) - Click to place, Ctrl+Click to remove");
      toggle_class(
        button2,
        "active",
        /*$currentTool*/
        ctx[1] === "fortification-tier3"
      );
      attr(button3, "class", "tool-button svelte-prm-emwfcn");
      attr(button3, "title", "Fortress (Tier 4) - Click to place, Ctrl+Click to remove");
      toggle_class(
        button3,
        "active",
        /*$currentTool*/
        ctx[1] === "fortification-tier4"
      );
      attr(div0, "class", "tool-buttons svelte-prm-emwfcn");
      attr(div1, "class", "tool-content svelte-prm-emwfcn");
      attr(button4, "class", "tool-button help-button section-help svelte-prm-emwfcn");
      attr(button4, "title", "Show keyboard shortcuts in chat");
      attr(section, "class", "editor-section svelte-prm-emwfcn");
      toggle_class(
        section,
        "active-section",
        /*activeSection*/
        ctx[14] === "fortifications"
      );
    },
    m(target, anchor) {
      insert(target, section, anchor);
      if (if_block) if_block.m(section, null);
      append(section, t0);
      append(section, div1);
      append(div1, div0);
      append(div0, button0);
      append(div0, t1);
      append(div0, button1);
      append(div0, t2);
      append(div0, button2);
      append(div0, t3);
      append(div0, button3);
      append(section, t4);
      append(section, button4);
      if (!mounted) {
        dispose = [
          listen(
            button0,
            "click",
            /*click_handler_54*/
            ctx[93]
          ),
          listen(
            button1,
            "click",
            /*click_handler_55*/
            ctx[94]
          ),
          listen(
            button2,
            "click",
            /*click_handler_56*/
            ctx[95]
          ),
          listen(
            button3,
            "click",
            /*click_handler_57*/
            ctx[96]
          ),
          listen(
            button4,
            "click",
            /*click_handler_58*/
            ctx[97]
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (!/*isMinimized*/
      ctx2[5]) {
        if (if_block) {
          if_block.p(ctx2, dirty);
        } else {
          if_block = create_if_block_7(ctx2);
          if_block.c();
          if_block.m(section, t0);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
      if (dirty[0] & /*$currentTool*/
      2) {
        toggle_class(
          button0,
          "active",
          /*$currentTool*/
          ctx2[1] === "fortification-tier1"
        );
      }
      if (dirty[0] & /*$currentTool*/
      2) {
        toggle_class(
          button1,
          "active",
          /*$currentTool*/
          ctx2[1] === "fortification-tier2"
        );
      }
      if (dirty[0] & /*$currentTool*/
      2) {
        toggle_class(
          button2,
          "active",
          /*$currentTool*/
          ctx2[1] === "fortification-tier3"
        );
      }
      if (dirty[0] & /*$currentTool*/
      2) {
        toggle_class(
          button3,
          "active",
          /*$currentTool*/
          ctx2[1] === "fortification-tier4"
        );
      }
      if (dirty[0] & /*activeSection*/
      16384) {
        toggle_class(
          section,
          "active-section",
          /*activeSection*/
          ctx2[14] === "fortifications"
        );
      }
    },
    d(detaching) {
      if (detaching) {
        detach(section);
      }
      if (if_block) if_block.d();
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_if_block_7(ctx) {
  let button;
  let mounted;
  let dispose;
  return {
    c() {
      button = element("button");
      button.textContent = "Fortifications";
      attr(button, "class", "section-label svelte-prm-emwfcn");
      attr(button, "type", "button");
    },
    m(target, anchor) {
      insert(target, button, anchor);
      if (!mounted) {
        dispose = listen(
          button,
          "click",
          /*click_handler_53*/
          ctx[92]
        );
        mounted = true;
      }
    },
    p: noop,
    d(detaching) {
      if (detaching) {
        detach(button);
      }
      mounted = false;
      dispose();
    }
  };
}
function create_if_block_2(ctx) {
  let section;
  let t0;
  let div3;
  let div2;
  let div1;
  let div0;
  let div0_title_value;
  let t1;
  let t2;
  let select;
  let option0;
  let option1;
  let t4_value = (
    /*$kingdomData*/
    (ctx[15].name || "Player Kingdom") + ""
  );
  let t4;
  let t5;
  let button;
  let mounted;
  let dispose;
  let if_block0 = !/*isMinimized*/
  ctx[5] && create_if_block_5(ctx);
  let if_block1 = (
    /*selectedClaimOwner*/
    ctx[7] === "null" && create_if_block_4()
  );
  let if_block2 = (
    /*selectedClaimOwner*/
    ctx[7] !== "null" && create_if_block_3(ctx)
  );
  let each_value = ensure_array_like(
    /*$kingdomData*/
    ctx[15].factions || []
  );
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
  }
  return {
    c() {
      section = element("section");
      if (if_block0) if_block0.c();
      t0 = space();
      div3 = element("div");
      div2 = element("div");
      div1 = element("div");
      div0 = element("div");
      if (if_block1) if_block1.c();
      t1 = space();
      if (if_block2) if_block2.c();
      t2 = space();
      select = element("select");
      option0 = element("option");
      option0.textContent = "Unclaimed";
      option1 = element("option");
      t4 = text(t4_value);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      t5 = space();
      button = element("button");
      button.innerHTML = `<i class="fas fa-question svelte-prm-emwfcn"></i>`;
      attr(div0, "class", "color-swatch svelte-prm-emwfcn");
      set_style(
        div0,
        "background-color",
        /*selectedClaimOwner*/
        ctx[7] === "null" ? "#444444" : (
          /*selectedClaimOwner*/
          ctx[7] === "player" ? (
            /*$kingdomData*/
            ctx[15].playerKingdomColor || "#5b9bd5"
          ) : (
            /*$kingdomData*/
            ctx[15].factions?.find(
              /*func*/
              ctx[99]
            )?.color || "#666666"
          )
        )
      );
      attr(div0, "title", div0_title_value = /*selectedClaimOwner*/
      ctx[7] === "null" ? "Unclaimed territory" : "Click to change faction color");
      toggle_class(
        div0,
        "unclaimed",
        /*selectedClaimOwner*/
        ctx[7] === "null"
      );
      attr(div1, "class", "color-swatch-wrapper svelte-prm-emwfcn");
      option0.__value = "null";
      set_input_value(option0, option0.__value);
      attr(option0, "class", "svelte-prm-emwfcn");
      option1.__value = "player";
      set_input_value(option1, option1.__value);
      attr(option1, "class", "svelte-prm-emwfcn");
      attr(select, "class", "faction-dropdown rm-select svelte-prm-emwfcn");
      attr(select, "title", "Select owner to claim hexes");
      if (
        /*selectedClaimOwner*/
        ctx[7] === void 0
      ) add_render_callback(() => (
        /*select_change_handler_1*/
        ctx[102].call(select)
      ));
      attr(div2, "class", "territory-controls svelte-prm-emwfcn");
      attr(div3, "class", "tool-content svelte-prm-emwfcn");
      attr(button, "class", "tool-button help-button section-help svelte-prm-emwfcn");
      attr(button, "title", "Show keyboard shortcuts in chat");
      attr(section, "class", "editor-section territory-claim-section svelte-prm-emwfcn");
      toggle_class(
        section,
        "active-section",
        /*activeSection*/
        ctx[14] === "territory"
      );
    },
    m(target, anchor) {
      insert(target, section, anchor);
      if (if_block0) if_block0.m(section, null);
      append(section, t0);
      append(section, div3);
      append(div3, div2);
      append(div2, div1);
      append(div1, div0);
      if (if_block1) if_block1.m(div0, null);
      append(div1, t1);
      if (if_block2) if_block2.m(div1, null);
      append(div2, t2);
      append(div2, select);
      append(select, option0);
      append(select, option1);
      append(option1, t4);
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(select, null);
        }
      }
      select_option(
        select,
        /*selectedClaimOwner*/
        ctx[7],
        true
      );
      append(section, t5);
      append(section, button);
      if (!mounted) {
        dispose = [
          listen(
            select,
            "change",
            /*select_change_handler_1*/
            ctx[102]
          ),
          listen(
            select,
            "change",
            /*handleClaimOwnerChange*/
            ctx[22]
          ),
          listen(
            button,
            "click",
            /*click_handler_60*/
            ctx[103]
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (!/*isMinimized*/
      ctx2[5]) {
        if (if_block0) {
          if_block0.p(ctx2, dirty);
        } else {
          if_block0 = create_if_block_5(ctx2);
          if_block0.c();
          if_block0.m(section, t0);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }
      if (
        /*selectedClaimOwner*/
        ctx2[7] === "null"
      ) {
        if (if_block1) ;
        else {
          if_block1 = create_if_block_4();
          if_block1.c();
          if_block1.m(div0, null);
        }
      } else if (if_block1) {
        if_block1.d(1);
        if_block1 = null;
      }
      if (dirty[0] & /*selectedClaimOwner, $kingdomData*/
      32896) {
        set_style(
          div0,
          "background-color",
          /*selectedClaimOwner*/
          ctx2[7] === "null" ? "#444444" : (
            /*selectedClaimOwner*/
            ctx2[7] === "player" ? (
              /*$kingdomData*/
              ctx2[15].playerKingdomColor || "#5b9bd5"
            ) : (
              /*$kingdomData*/
              ctx2[15].factions?.find(
                /*func*/
                ctx2[99]
              )?.color || "#666666"
            )
          )
        );
      }
      if (dirty[0] & /*selectedClaimOwner, $kingdomData*/
      32896 && div0_title_value !== (div0_title_value = /*selectedClaimOwner*/
      ctx2[7] === "null" ? "Unclaimed territory" : "Click to change faction color")) {
        attr(div0, "title", div0_title_value);
      }
      if (dirty[0] & /*selectedClaimOwner*/
      128) {
        toggle_class(
          div0,
          "unclaimed",
          /*selectedClaimOwner*/
          ctx2[7] === "null"
        );
      }
      if (
        /*selectedClaimOwner*/
        ctx2[7] !== "null"
      ) {
        if (if_block2) {
          if_block2.p(ctx2, dirty);
        } else {
          if_block2 = create_if_block_3(ctx2);
          if_block2.c();
          if_block2.m(div1, null);
        }
      } else if (if_block2) {
        if_block2.d(1);
        if_block2 = null;
      }
      if (dirty[0] & /*$kingdomData*/
      32768 && t4_value !== (t4_value = /*$kingdomData*/
      (ctx2[15].name || "Player Kingdom") + "")) set_data(t4, t4_value);
      if (dirty[0] & /*$kingdomData*/
      32768) {
        each_value = ensure_array_like(
          /*$kingdomData*/
          ctx2[15].factions || []
        );
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context$2(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block$2(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(select, null);
          }
        }
        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }
        each_blocks.length = each_value.length;
      }
      if (dirty[0] & /*selectedClaimOwner, $kingdomData*/
      32896) {
        select_option(
          select,
          /*selectedClaimOwner*/
          ctx2[7]
        );
      }
      if (dirty[0] & /*activeSection*/
      16384) {
        toggle_class(
          section,
          "active-section",
          /*activeSection*/
          ctx2[14] === "territory"
        );
      }
    },
    d(detaching) {
      if (detaching) {
        detach(section);
      }
      if (if_block0) if_block0.d();
      if (if_block1) if_block1.d();
      if (if_block2) if_block2.d();
      destroy_each(each_blocks, detaching);
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_if_block_5(ctx) {
  let button;
  let mounted;
  let dispose;
  return {
    c() {
      button = element("button");
      button.textContent = "Territory";
      attr(button, "class", "section-label svelte-prm-emwfcn");
      attr(button, "type", "button");
    },
    m(target, anchor) {
      insert(target, button, anchor);
      if (!mounted) {
        dispose = listen(
          button,
          "click",
          /*click_handler_59*/
          ctx[98]
        );
        mounted = true;
      }
    },
    p: noop,
    d(detaching) {
      if (detaching) {
        detach(button);
      }
      mounted = false;
      dispose();
    }
  };
}
function create_if_block_4(ctx) {
  let i;
  return {
    c() {
      i = element("i");
      attr(i, "class", "fas fa-times svelte-prm-emwfcn");
    },
    m(target, anchor) {
      insert(target, i, anchor);
    },
    d(detaching) {
      if (detaching) {
        detach(i);
      }
    }
  };
}
function create_if_block_3(ctx) {
  let input;
  let input_value_value;
  let mounted;
  let dispose;
  return {
    c() {
      input = element("input");
      attr(input, "type", "color");
      input.value = input_value_value = /*selectedClaimOwner*/
      ctx[7] === "player" ? (
        /*$kingdomData*/
        ctx[15].playerKingdomColor || "#5b9bd5"
      ) : (
        /*$kingdomData*/
        ctx[15].factions?.find(
          /*func_1*/
          ctx[100]
        )?.color || "#666666"
      );
      attr(input, "class", "color-picker-input svelte-prm-emwfcn");
      attr(input, "title", "Click to change faction color");
    },
    m(target, anchor) {
      insert(target, input, anchor);
      ctx[101](input);
      if (!mounted) {
        dispose = listen(
          input,
          "change",
          /*handleColorChange*/
          ctx[23]
        );
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (dirty[0] & /*selectedClaimOwner, $kingdomData*/
      32896 && input_value_value !== (input_value_value = /*selectedClaimOwner*/
      ctx2[7] === "player" ? (
        /*$kingdomData*/
        ctx2[15].playerKingdomColor || "#5b9bd5"
      ) : (
        /*$kingdomData*/
        ctx2[15].factions?.find(
          /*func_1*/
          ctx2[100]
        )?.color || "#666666"
      ))) {
        input.value = input_value_value;
      }
    },
    d(detaching) {
      if (detaching) {
        detach(input);
      }
      ctx[101](null);
      mounted = false;
      dispose();
    }
  };
}
function create_each_block$2(ctx) {
  let option;
  let t_value = (
    /*faction*/
    ctx[117].name + ""
  );
  let t;
  let option_value_value;
  return {
    c() {
      option = element("option");
      t = text(t_value);
      option.__value = option_value_value = /*faction*/
      ctx[117].id;
      set_input_value(option, option.__value);
      attr(option, "class", "svelte-prm-emwfcn");
    },
    m(target, anchor) {
      insert(target, option, anchor);
      append(option, t);
    },
    p(ctx2, dirty) {
      if (dirty[0] & /*$kingdomData*/
      32768 && t_value !== (t_value = /*faction*/
      ctx2[117].name + "")) set_data(t, t_value);
      if (dirty[0] & /*$kingdomData*/
      32768 && option_value_value !== (option_value_value = /*faction*/
      ctx2[117].id)) {
        option.__value = option_value_value;
        set_input_value(option, option.__value);
      }
    },
    d(detaching) {
      if (detaching) {
        detach(option);
      }
    }
  };
}
function create_if_block$2(ctx) {
  let div1;
  let t0;
  let div0;
  let button0;
  let t2;
  let button1;
  let mounted;
  let dispose;
  let if_block = (
    /*isGM*/
    ctx[13] && create_if_block_1$1(ctx)
  );
  return {
    c() {
      div1 = element("div");
      if (if_block) if_block.c();
      t0 = space();
      div0 = element("div");
      button0 = element("button");
      button0.innerHTML = `<i class="fas fa-times"></i> Cancel`;
      t2 = space();
      button1 = element("button");
      button1.innerHTML = `<i class="fas fa-check"></i> Save`;
      attr(button0, "class", "action-button cancel-button svelte-prm-emwfcn");
      attr(button1, "class", "action-button save-button svelte-prm-emwfcn");
      attr(div0, "class", "action-row svelte-prm-emwfcn");
      attr(div1, "class", "panel-actions svelte-prm-emwfcn");
    },
    m(target, anchor) {
      insert(target, div1, anchor);
      if (if_block) if_block.m(div1, null);
      append(div1, t0);
      append(div1, div0);
      append(div0, button0);
      append(div0, t2);
      append(div0, button1);
      if (!mounted) {
        dispose = [
          listen(
            button0,
            "click",
            /*handleCancel*/
            ctx[26]
          ),
          listen(
            button1,
            "click",
            /*handleSave*/
            ctx[25]
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (
        /*isGM*/
        ctx2[13]
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
        } else {
          if_block = create_if_block_1$1(ctx2);
          if_block.c();
          if_block.m(div1, t0);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
    },
    d(detaching) {
      if (detaching) {
        detach(div1);
      }
      if (if_block) if_block.d();
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_if_block_1$1(ctx) {
  let button;
  let mounted;
  let dispose;
  return {
    c() {
      button = element("button");
      button.innerHTML = `<i class="fas fa-download"></i> Export Map Data`;
      attr(button, "class", "action-button export-button svelte-prm-emwfcn");
      attr(button, "title", "Export to stolen-lands-map.json (save to data/piazolands/)");
    },
    m(target, anchor) {
      insert(target, button, anchor);
      if (!mounted) {
        dispose = listen(
          button,
          "click",
          /*handleExportMapData*/
          ctx[29]
        );
        mounted = true;
      }
    },
    p: noop,
    d(detaching) {
      if (detaching) {
        detach(button);
      }
      mounted = false;
      dispose();
    }
  };
}
function create_fragment$2(ctx) {
  let settlementeditordialog;
  let updating_show;
  let t0;
  let div2;
  let div0;
  let i0;
  let t1;
  let span;
  let t3;
  let button0;
  let i1;
  let i1_class_value;
  let button0_title_value;
  let t4;
  let button1;
  let t5;
  let div1;
  let t6;
  let t7;
  let t8;
  let t9;
  let t10;
  let t11;
  let t12;
  let t13;
  let t14;
  let t15;
  let t16;
  let current;
  let mounted;
  let dispose;
  function settlementeditordialog_show_binding(value) {
    ctx[37](value);
  }
  let settlementeditordialog_props = {
    hexId: (
      /*settlementDialogHexId*/
      ctx[10]
    ),
    existingSettlement: (
      /*settlementDialogExisting*/
      ctx[11]
    )
  };
  if (
    /*showSettlementDialog*/
    ctx[9] !== void 0
  ) {
    settlementeditordialog_props.show = /*showSettlementDialog*/
    ctx[9];
  }
  settlementeditordialog = new SettlementEditorDialog({ props: settlementeditordialog_props });
  binding_callbacks.push(() => bind(settlementeditordialog, "show", settlementeditordialog_show_binding));
  settlementeditordialog.$on(
    "confirm",
    /*handleSettlementConfirm*/
    ctx[27]
  );
  settlementeditordialog.$on(
    "cancel",
    /*handleSettlementCancel*/
    ctx[28]
  );
  let if_block0 = (
    /*isMinimized*/
    ctx[5] && create_if_block_28(ctx)
  );
  let if_block1 = (!/*isMinimized*/
  ctx[5] || /*selectedSection*/
  ctx[6] === "terrain") && create_if_block_26(ctx);
  let if_block2 = (!/*isMinimized*/
  ctx[5] || /*selectedSection*/
  ctx[6] === "rivers") && create_if_block_22(ctx);
  let if_block3 = (!/*isMinimized*/
  ctx[5] || /*selectedSection*/
  ctx[6] === "water") && create_if_block_19(ctx);
  let if_block4 = (!/*isMinimized*/
  ctx[5] || /*selectedSection*/
  ctx[6] === "crossings") && create_if_block_16(ctx);
  let if_block5 = (!/*isMinimized*/
  ctx[5] || /*selectedSection*/
  ctx[6] === "roads") && create_if_block_14(ctx);
  let if_block6 = (!/*isMinimized*/
  ctx[5] || /*selectedSection*/
  ctx[6] === "bounty") && create_if_block_12(ctx);
  let if_block7 = (!/*isMinimized*/
  ctx[5] || /*selectedSection*/
  ctx[6] === "worksites") && create_if_block_10(ctx);
  let if_block8 = (!/*isMinimized*/
  ctx[5] || /*selectedSection*/
  ctx[6] === "settlements") && create_if_block_8(ctx);
  let if_block9 = (!/*isMinimized*/
  ctx[5] || /*selectedSection*/
  ctx[6] === "fortifications") && create_if_block_6(ctx);
  let if_block10 = (!/*isMinimized*/
  ctx[5] || /*selectedSection*/
  ctx[6] === "territory") && create_if_block_2(ctx);
  let if_block11 = !/*$isWizardActive*/
  ctx[16] && create_if_block$2(ctx);
  return {
    c() {
      create_component(settlementeditordialog.$$.fragment);
      t0 = space();
      div2 = element("div");
      div0 = element("div");
      i0 = element("i");
      t1 = space();
      span = element("span");
      span.textContent = "Map Editor";
      t3 = space();
      button0 = element("button");
      i1 = element("i");
      t4 = space();
      button1 = element("button");
      button1.innerHTML = `<i class="fas fa-times svelte-prm-emwfcn"></i>`;
      t5 = space();
      div1 = element("div");
      if (if_block0) if_block0.c();
      t6 = space();
      if (if_block1) if_block1.c();
      t7 = space();
      if (if_block2) if_block2.c();
      t8 = space();
      if (if_block3) if_block3.c();
      t9 = space();
      if (if_block4) if_block4.c();
      t10 = space();
      if (if_block5) if_block5.c();
      t11 = space();
      if (if_block6) if_block6.c();
      t12 = space();
      if (if_block7) if_block7.c();
      t13 = space();
      if (if_block8) if_block8.c();
      t14 = space();
      if (if_block9) if_block9.c();
      t15 = space();
      if (if_block10) if_block10.c();
      t16 = space();
      if (if_block11) if_block11.c();
      attr(i0, "class", "fas fa-pencil-alt svelte-prm-emwfcn");
      attr(span, "class", "svelte-prm-emwfcn");
      attr(i1, "class", i1_class_value = "fas " + /*isMinimized*/
      (ctx[5] ? "fa-expand" : "fa-compress") + " svelte-prm-emwfcn");
      attr(button0, "class", "minimize-button svelte-prm-emwfcn");
      attr(button0, "title", button0_title_value = /*isMinimized*/
      ctx[5] ? "Expand all sections" : "Minimize to dropdown");
      attr(button1, "class", "close-button svelte-prm-emwfcn");
      attr(button1, "title", "Close editor (discard changes)");
      attr(div0, "class", "panel-header svelte-prm-emwfcn");
      attr(div1, "class", "editor-sections svelte-prm-emwfcn");
      attr(div2, "class", "editor-mode-panel svelte-prm-emwfcn");
      set_style(
        div2,
        "left",
        /*position*/
        ctx[2].x + "px"
      );
      set_style(
        div2,
        "top",
        /*position*/
        ctx[2].y + "px"
      );
      attr(div2, "role", "toolbar");
      attr(div2, "tabindex", "0");
      attr(div2, "aria-label", "Map Editor");
      toggle_class(
        div2,
        "dragging",
        /*isDragging*/
        ctx[3]
      );
    },
    m(target, anchor) {
      mount_component(settlementeditordialog, target, anchor);
      insert(target, t0, anchor);
      insert(target, div2, anchor);
      append(div2, div0);
      append(div0, i0);
      append(div0, t1);
      append(div0, span);
      append(div0, t3);
      append(div0, button0);
      append(button0, i1);
      append(div0, t4);
      append(div0, button1);
      append(div2, t5);
      append(div2, div1);
      if (if_block0) if_block0.m(div1, null);
      append(div1, t6);
      if (if_block1) if_block1.m(div1, null);
      append(div1, t7);
      if (if_block2) if_block2.m(div1, null);
      append(div1, t8);
      if (if_block3) if_block3.m(div1, null);
      append(div1, t9);
      if (if_block4) if_block4.m(div1, null);
      append(div1, t10);
      if (if_block5) if_block5.m(div1, null);
      append(div1, t11);
      if (if_block6) if_block6.m(div1, null);
      append(div1, t12);
      if (if_block7) if_block7.m(div1, null);
      append(div1, t13);
      if (if_block8) if_block8.m(div1, null);
      append(div1, t14);
      if (if_block9) if_block9.m(div1, null);
      append(div1, t15);
      if (if_block10) if_block10.m(div1, null);
      append(div2, t16);
      if (if_block11) if_block11.m(div2, null);
      ctx[104](div2);
      current = true;
      if (!mounted) {
        dispose = [
          listen(
            button0,
            "click",
            /*toggleMinimize*/
            ctx[19]
          ),
          listen(
            button1,
            "click",
            /*handleCancel*/
            ctx[26]
          ),
          listen(
            div2,
            "mousedown",
            /*handleMouseDown*/
            ctx[24]
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      const settlementeditordialog_changes = {};
      if (dirty[0] & /*settlementDialogHexId*/
      1024) settlementeditordialog_changes.hexId = /*settlementDialogHexId*/
      ctx2[10];
      if (dirty[0] & /*settlementDialogExisting*/
      2048) settlementeditordialog_changes.existingSettlement = /*settlementDialogExisting*/
      ctx2[11];
      if (!updating_show && dirty[0] & /*showSettlementDialog*/
      512) {
        updating_show = true;
        settlementeditordialog_changes.show = /*showSettlementDialog*/
        ctx2[9];
        add_flush_callback(() => updating_show = false);
      }
      settlementeditordialog.$set(settlementeditordialog_changes);
      if (!current || dirty[0] & /*isMinimized*/
      32 && i1_class_value !== (i1_class_value = "fas " + /*isMinimized*/
      (ctx2[5] ? "fa-expand" : "fa-compress") + " svelte-prm-emwfcn")) {
        attr(i1, "class", i1_class_value);
      }
      if (!current || dirty[0] & /*isMinimized*/
      32 && button0_title_value !== (button0_title_value = /*isMinimized*/
      ctx2[5] ? "Expand all sections" : "Minimize to dropdown")) {
        attr(button0, "title", button0_title_value);
      }
      if (
        /*isMinimized*/
        ctx2[5]
      ) {
        if (if_block0) {
          if_block0.p(ctx2, dirty);
        } else {
          if_block0 = create_if_block_28(ctx2);
          if_block0.c();
          if_block0.m(div1, t6);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }
      if (!/*isMinimized*/
      ctx2[5] || /*selectedSection*/
      ctx2[6] === "terrain") {
        if (if_block1) {
          if_block1.p(ctx2, dirty);
        } else {
          if_block1 = create_if_block_26(ctx2);
          if_block1.c();
          if_block1.m(div1, t7);
        }
      } else if (if_block1) {
        if_block1.d(1);
        if_block1 = null;
      }
      if (!/*isMinimized*/
      ctx2[5] || /*selectedSection*/
      ctx2[6] === "rivers") {
        if (if_block2) {
          if_block2.p(ctx2, dirty);
        } else {
          if_block2 = create_if_block_22(ctx2);
          if_block2.c();
          if_block2.m(div1, t8);
        }
      } else if (if_block2) {
        if_block2.d(1);
        if_block2 = null;
      }
      if (!/*isMinimized*/
      ctx2[5] || /*selectedSection*/
      ctx2[6] === "water") {
        if (if_block3) {
          if_block3.p(ctx2, dirty);
        } else {
          if_block3 = create_if_block_19(ctx2);
          if_block3.c();
          if_block3.m(div1, t9);
        }
      } else if (if_block3) {
        if_block3.d(1);
        if_block3 = null;
      }
      if (!/*isMinimized*/
      ctx2[5] || /*selectedSection*/
      ctx2[6] === "crossings") {
        if (if_block4) {
          if_block4.p(ctx2, dirty);
        } else {
          if_block4 = create_if_block_16(ctx2);
          if_block4.c();
          if_block4.m(div1, t10);
        }
      } else if (if_block4) {
        if_block4.d(1);
        if_block4 = null;
      }
      if (!/*isMinimized*/
      ctx2[5] || /*selectedSection*/
      ctx2[6] === "roads") {
        if (if_block5) {
          if_block5.p(ctx2, dirty);
        } else {
          if_block5 = create_if_block_14(ctx2);
          if_block5.c();
          if_block5.m(div1, t11);
        }
      } else if (if_block5) {
        if_block5.d(1);
        if_block5 = null;
      }
      if (!/*isMinimized*/
      ctx2[5] || /*selectedSection*/
      ctx2[6] === "bounty") {
        if (if_block6) {
          if_block6.p(ctx2, dirty);
        } else {
          if_block6 = create_if_block_12(ctx2);
          if_block6.c();
          if_block6.m(div1, t12);
        }
      } else if (if_block6) {
        if_block6.d(1);
        if_block6 = null;
      }
      if (!/*isMinimized*/
      ctx2[5] || /*selectedSection*/
      ctx2[6] === "worksites") {
        if (if_block7) {
          if_block7.p(ctx2, dirty);
        } else {
          if_block7 = create_if_block_10(ctx2);
          if_block7.c();
          if_block7.m(div1, t13);
        }
      } else if (if_block7) {
        if_block7.d(1);
        if_block7 = null;
      }
      if (!/*isMinimized*/
      ctx2[5] || /*selectedSection*/
      ctx2[6] === "settlements") {
        if (if_block8) {
          if_block8.p(ctx2, dirty);
        } else {
          if_block8 = create_if_block_8(ctx2);
          if_block8.c();
          if_block8.m(div1, t14);
        }
      } else if (if_block8) {
        if_block8.d(1);
        if_block8 = null;
      }
      if (!/*isMinimized*/
      ctx2[5] || /*selectedSection*/
      ctx2[6] === "fortifications") {
        if (if_block9) {
          if_block9.p(ctx2, dirty);
        } else {
          if_block9 = create_if_block_6(ctx2);
          if_block9.c();
          if_block9.m(div1, t15);
        }
      } else if (if_block9) {
        if_block9.d(1);
        if_block9 = null;
      }
      if (!/*isMinimized*/
      ctx2[5] || /*selectedSection*/
      ctx2[6] === "territory") {
        if (if_block10) {
          if_block10.p(ctx2, dirty);
        } else {
          if_block10 = create_if_block_2(ctx2);
          if_block10.c();
          if_block10.m(div1, null);
        }
      } else if (if_block10) {
        if_block10.d(1);
        if_block10 = null;
      }
      if (!/*$isWizardActive*/
      ctx2[16]) {
        if (if_block11) {
          if_block11.p(ctx2, dirty);
        } else {
          if_block11 = create_if_block$2(ctx2);
          if_block11.c();
          if_block11.m(div2, null);
        }
      } else if (if_block11) {
        if_block11.d(1);
        if_block11 = null;
      }
      if (!current || dirty[0] & /*position*/
      4) {
        set_style(
          div2,
          "left",
          /*position*/
          ctx2[2].x + "px"
        );
      }
      if (!current || dirty[0] & /*position*/
      4) {
        set_style(
          div2,
          "top",
          /*position*/
          ctx2[2].y + "px"
        );
      }
      if (!current || dirty[0] & /*isDragging*/
      8) {
        toggle_class(
          div2,
          "dragging",
          /*isDragging*/
          ctx2[3]
        );
      }
    },
    i(local) {
      if (current) return;
      transition_in(settlementeditordialog.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(settlementeditordialog.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(t0);
        detach(div2);
      }
      destroy_component(settlementeditordialog, detaching);
      if (if_block0) if_block0.d();
      if (if_block1) if_block1.d();
      if (if_block2) if_block2.d();
      if (if_block3) if_block3.d();
      if (if_block4) if_block4.d();
      if (if_block5) if_block5.d();
      if (if_block6) if_block6.d();
      if (if_block7) if_block7.d();
      if (if_block8) if_block8.d();
      if (if_block9) if_block9.d();
      if (if_block10) if_block10.d();
      if (if_block11) if_block11.d();
      ctx[104](null);
      mounted = false;
      run_all(dispose);
    }
  };
}
const PANEL_WIDTH = 280;
const PANEL_HEIGHT = 600;
function clampToViewport$1(pos, panelWidth, panelHeight) {
  return {
    x: Math.max(0, Math.min(window.innerWidth - panelWidth, pos.x)),
    y: Math.max(0, Math.min(window.innerHeight - panelHeight, pos.y))
  };
}
function getActiveSection(tool) {
  if (tool === "inactive") return null;
  if ([
    "cell-river-edit",
    "cell-river-erase",
    "cell-river-area-erase",
    "cell-river-flip"
  ].includes(tool)) {
    return "rivers";
  }
  if (["cell-lake-paint", "cell-lake-erase"].includes(tool)) {
    return "water";
  }
  if ([
    "cell-crossing-paint",
    "cell-crossing-erase",
    "waterfall-toggle",
    "bridge-toggle",
    "ford-toggle"
  ].includes(tool)) {
    return "crossings";
  }
  if (["road-edit", "road-scissors"].includes(tool)) {
    return "roads";
  }
  if (tool.startsWith("terrain-")) {
    return "terrain";
  }
  if (tool.startsWith("bounty-")) {
    return "bounty";
  }
  if (tool.startsWith("worksite-")) {
    return "worksites";
  }
  if (tool === "settlement-place" || tool === "settlement-minus") {
    return "settlements";
  }
  if (tool.startsWith("fortification-")) {
    return "fortifications";
  }
  if (tool === "claimed-by") {
    return "territory";
  }
  return null;
}
function instance$2($$self, $$props, $$invalidate) {
  let activeSection;
  let $currentTool;
  let $kingdomData;
  let $isWizardActive;
  component_subscribe($$self, kingdomData, ($$value) => $$invalidate(15, $kingdomData = $$value));
  component_subscribe($$self, isWizardActive, ($$value) => $$invalidate(16, $isWizardActive = $$value));
  let { onClose } = $$props;
  const currentTool = writable("inactive");
  component_subscribe($$self, currentTool, (value) => $$invalidate(1, $currentTool = value));
  const editorService = getEditorModeService();
  let unsubscribeExternalSection = null;
  let position = { x: 100, y: 100 };
  let isDragging = false;
  let dragStart = { x: 0, y: 0 };
  let panelElement;
  let isMinimized = false;
  let selectedSection = "settlements";
  let selectedClaimOwner = "player";
  onMount(async () => {
    $$invalidate(13, isGM = globalThis.game?.user?.isGM ?? false);
    const guidedPos = getGuidedModePosition("editorPanel");
    if (guidedPos) {
      $$invalidate(2, position = clampToViewport$1(guidedPos, PANEL_WIDTH, PANEL_HEIGHT));
    } else {
      $$invalidate(2, position = {
        x: 216,
        y: (window.innerHeight - 400) / 2
      });
    }
    const savedMinimized = localStorage.getItem("reignmaker-editor-panel-minimized");
    if (savedMinimized) {
      $$invalidate(5, isMinimized = savedMinimized === "true");
    }
    const savedSection = localStorage.getItem("reignmaker-editor-panel-section");
    if (savedSection) {
      $$invalidate(6, selectedSection = savedSection);
    }
    await editorService.enterEditorMode();
    await selectSection(selectedSection);
    unsubscribeExternalSection = activeEditorSection.subscribe(async (section) => {
      if (section && section !== selectedSection) {
        $$invalidate(6, selectedSection = section);
        localStorage.setItem("reignmaker-editor-panel-section", section);
        await selectSection(section);
      }
    });
  });
  onDestroy(() => {
    unsubscribeSettlementDialog();
    if (unsubscribeExternalSection) {
      unsubscribeExternalSection();
    }
    editorService.exitEditorMode();
  });
  async function setTool(tool) {
    currentTool.set(tool);
    await editorService.setTool(tool);
  }
  function toggleMinimize() {
    $$invalidate(5, isMinimized = !isMinimized);
    localStorage.setItem("reignmaker-editor-panel-minimized", String(isMinimized));
  }
  async function handleSectionChange(event) {
    event.stopPropagation();
    const target = event.target;
    const newSection = target.value;
    $$invalidate(6, selectedSection = newSection);
    localStorage.setItem("reignmaker-editor-panel-section", newSection);
    await selectSection(newSection);
    setTimeout(
      () => {
      },
      100
    );
  }
  async function selectSection(section) {
    await editorService.setEditorMode(section);
    const defaultTools = {
      "rivers": "cell-river-edit",
      "water": "cell-lake-paint",
      "crossings": "cell-crossing-paint",
      "roads": "road-edit",
      "terrain": "terrain-plains",
      "bounty": "bounty-food",
      "worksites": "worksite-farm",
      "settlements": "settlement-place",
      "fortifications": "fortification-tier1",
      "territory": "claimed-by"
    };
    const tool = defaultTools[section];
    if (tool) {
      if (section === "territory") {
        editorService.setClaimOwner(selectedClaimOwner === "null" ? null : selectedClaimOwner);
      }
      await setTool(tool);
    }
  }
  function selectClaimOwner(owner) {
    $$invalidate(7, selectedClaimOwner = owner);
    editorService.setClaimOwner(owner === "null" ? null : owner);
    setTool("claimed-by");
  }
  function handleClaimOwnerChange(event) {
    const target = event.target;
    selectClaimOwner(target.value);
  }
  let colorPickerInput;
  async function handleColorChange(event) {
    const input = event.target;
    const newColor = input.value;
    const { updateKingdom } = await import("./GameCommandUtils-D_sgs3NK.js").then((n) => n.cx);
    await updateKingdom((kingdom) => {
      if (selectedClaimOwner === "player") {
        kingdom.playerKingdomColor = newColor;
      } else if (selectedClaimOwner !== "null") {
        const faction = kingdom.factions?.find((f) => f.id === selectedClaimOwner);
        if (faction) {
          faction.color = newColor;
        }
      }
    });
  }
  function handleMouseDown(e) {
    if (e.target.closest(".tool-button, .action-button, .section-dropdown, .faction-dropdown, .color-swatch")) return;
    $$invalidate(3, isDragging = true);
    dragStart = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    };
    e.preventDefault();
  }
  function handleMouseMove(e) {
    if (!isDragging) return;
    $$invalidate(2, position = {
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  }
  function handleMouseUp() {
    if (isDragging) {
      $$invalidate(3, isDragging = false);
    }
  }
  async function handleSave() {
    try {
      await editorService.save();
    } catch (error) {
      console.error("[EditorModePanel] Save error:", error);
      const ui = globalThis.ui;
      ui?.notifications?.error("Failed to save map changes. Please try again.");
      return;
    }
    onClose();
  }
  async function handleCancel() {
    try {
      await editorService.cancel();
    } catch (error) {
      console.error("[EditorModePanel] Cancel error:", error);
      const ui = globalThis.ui;
      ui?.notifications?.warn("Error during cancel - changes may not be fully reverted.");
      try {
        editorService.exitEditorMode();
      } catch {
      }
    }
    onClose();
  }
  onMount(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  });
  let showSettlementDialog = false;
  let settlementDialogHexId = "";
  let settlementDialogExisting = null;
  const unsubscribeSettlementDialog = settlementEditorDialog.subscribe((state) => {
    $$invalidate(9, showSettlementDialog = state.show);
    $$invalidate(10, settlementDialogHexId = state.hexId || "");
    $$invalidate(11, settlementDialogExisting = state.existingSettlement);
  });
  function handleSettlementConfirm(event) {
    settlementEditorDialog.confirm(event.detail);
  }
  function handleSettlementCancel() {
    settlementEditorDialog.cancel();
  }
  async function handleClearAllRivers() {
    await cellRiverEditorHandlers.clearAll();
  }
  async function handleClearAllLakes() {
    await cellLakeEditorHandlers.clearAll();
  }
  async function handleClearAllCrossings() {
    await cellCrossingEditorHandlers.clearAll();
  }
  let deleteConfirmSection = null;
  let isGM = false;
  async function handleExportMapData() {
    await downloadMapData("Stolen Lands");
  }
  function showDeleteConfirm(section) {
    $$invalidate(12, deleteConfirmSection = section);
  }
  function cancelDeleteConfirm() {
    $$invalidate(12, deleteConfirmSection = null);
  }
  async function confirmDelete(section) {
    if (section === "rivers") {
      await handleClearAllRivers();
    } else if (section === "water") {
      await handleClearAllLakes();
    } else if (section === "crossings") {
      await handleClearAllCrossings();
    }
    $$invalidate(12, deleteConfirmSection = null);
  }
  const eraserSizes = [
    {
      label: "S",
      value: 16,
      title: "Small (16px)"
    },
    {
      label: "M",
      value: 32,
      title: "Medium (32px)"
    },
    {
      label: "L",
      value: 64,
      title: "Large (64px)"
    }
  ];
  let selectedEraserSize = 32;
  function setEraserSize(size) {
    $$invalidate(0, selectedEraserSize = size);
    cellRiverEditorHandlers.setEraserRadius(size);
  }
  const sectionShortcuts = {
    "rivers": {
      title: "River Editor",
      shortcuts: [
        { key: "Click", action: "Select path" },
        { key: "Drag", action: "Draw river" },
        { key: "Shift+Drag", action: "Move vertex" },
        { key: "Ctrl+Z", action: "Undo last point" },
        {
          key: "Ctrl+Click",
          action: "Remove point"
        },
        { key: "Alt", action: "Finish path" }
      ]
    },
    "water": {
      title: "Water Editor",
      shortcuts: [
        {
          key: "Click/Drag",
          action: "Paint water cells"
        },
        { key: "[ ]", action: "Adjust brush size" },
        { key: "X", action: "Toggle paint/erase" }
      ]
    },
    "crossings": {
      title: "Crossings Editor",
      shortcuts: [
        {
          key: "Click/Drag",
          action: "Paint passage"
        },
        { key: "[ ]", action: "Adjust brush size" },
        { key: "X", action: "Toggle paint/erase" }
      ]
    },
    "roads": {
      title: "Roads Editor",
      shortcuts: [
        { key: "Click", action: "Add road" },
        { key: "Ctrl+Click", action: "Remove road" },
        {
          key: "Scissors tool",
          action: "Cut road segment"
        }
      ]
    },
    "terrain": {
      title: "Terrain Editor",
      shortcuts: [
        { key: "Click", action: "Set terrain type" },
        { key: "Drag", action: "Paint terrain" }
      ]
    },
    "bounty": {
      title: "Bounty Editor",
      shortcuts: [
        { key: "Click", action: "Add resource" },
        {
          key: "Ctrl+Click",
          action: "Remove resource"
        }
      ]
    },
    "worksites": {
      title: "Worksites Editor",
      shortcuts: [
        { key: "Click", action: "Place worksite" },
        {
          key: "Ctrl+Click",
          action: "Remove worksite"
        }
      ]
    },
    "settlements": {
      title: "Settlements Editor",
      shortcuts: [
        {
          key: "Click",
          action: "Place/edit settlement"
        },
        {
          key: "Minus tool",
          action: "Remove settlement"
        }
      ]
    },
    "fortifications": {
      title: "Fortifications Editor",
      shortcuts: [
        {
          key: "Click",
          action: "Place fortification"
        },
        {
          key: "Ctrl+Click",
          action: "Remove fortification"
        }
      ]
    },
    "territory": {
      title: "Territory Editor",
      shortcuts: [
        {
          key: "Click",
          action: "Claim hex for selected owner"
        },
        { key: "Drag", action: "Paint territory" }
      ]
    }
  };
  function showHelp(section) {
    const help = sectionShortcuts[section];
    if (!help) return;
    const shortcutLines = help.shortcuts.map((s) => `<li><strong>${s.key}</strong> - ${s.action}</li>`).join("");
    const content = `
      <div style="padding: 0.5rem;">
        <h3 style="margin: 0 0 0.5rem 0; color: #8b0000;">${help.title} Shortcuts</h3>
        <ul style="margin: 0; padding-left: 1.25rem; list-style: disc;">
          ${shortcutLines}
        </ul>
      </div>
    `;
    const ChatMessage = globalThis.ChatMessage;
    if (ChatMessage) {
      ChatMessage.create({
        content,
        whisper: [globalThis.game?.user?.id].filter(Boolean)
      });
    }
  }
  function settlementeditordialog_show_binding(value) {
    showSettlementDialog = value;
    $$invalidate(9, showSettlementDialog);
  }
  function select_change_handler() {
    selectedSection = select_value(this);
    $$invalidate(6, selectedSection);
  }
  const click_handler = () => selectSection("terrain");
  const click_handler_1 = () => setTool("terrain-plains");
  const click_handler_2 = () => setTool("terrain-forest");
  const click_handler_3 = () => setTool("terrain-hills");
  const click_handler_4 = () => setTool("terrain-mountains");
  const click_handler_5 = () => setTool("terrain-swamp");
  const click_handler_6 = () => setTool("terrain-desert");
  const click_handler_7 = () => setTool("terrain-water");
  const click_handler_8 = () => showHelp("terrain");
  const click_handler_9 = () => selectSection("rivers");
  const click_handler_10 = () => confirmDelete("rivers");
  const click_handler_11 = () => setTool("cell-river-edit");
  const click_handler_12 = () => setTool("cell-river-erase");
  const click_handler_13 = () => setTool("cell-river-area-erase");
  const click_handler_14 = () => setTool("cell-river-flip");
  const click_handler_15 = () => showDeleteConfirm("rivers");
  const click_handler_16 = (size) => setEraserSize(size.value);
  const click_handler_17 = () => showHelp("rivers");
  const click_handler_18 = () => selectSection("water");
  const click_handler_19 = () => confirmDelete("water");
  const click_handler_20 = () => setTool("cell-lake-paint");
  const click_handler_21 = () => setTool("cell-lake-erase");
  const click_handler_22 = () => showDeleteConfirm("water");
  const click_handler_23 = () => showHelp("water");
  const click_handler_24 = () => selectSection("crossings");
  const click_handler_25 = () => confirmDelete("crossings");
  const click_handler_26 = () => setTool("cell-crossing-paint");
  const click_handler_27 = () => setTool("cell-crossing-erase");
  const click_handler_28 = () => showDeleteConfirm("crossings");
  const click_handler_29 = () => showHelp("crossings");
  const click_handler_30 = () => selectSection("roads");
  const click_handler_31 = () => setTool("road-edit");
  const click_handler_32 = () => setTool("road-scissors");
  const click_handler_33 = () => showHelp("roads");
  const click_handler_34 = () => selectSection("bounty");
  const click_handler_35 = () => setTool("bounty-food");
  const click_handler_36 = () => setTool("bounty-lumber");
  const click_handler_37 = () => setTool("bounty-stone");
  const click_handler_38 = () => setTool("bounty-ore");
  const click_handler_39 = () => setTool("bounty-gold");
  const click_handler_40 = () => setTool("bounty-minus");
  const click_handler_41 = () => showHelp("bounty");
  const click_handler_42 = () => selectSection("worksites");
  const click_handler_43 = () => setTool("worksite-farm");
  const click_handler_44 = () => setTool("worksite-lumber-mill");
  const click_handler_45 = () => setTool("worksite-mine");
  const click_handler_46 = () => setTool("worksite-quarry");
  const click_handler_47 = () => setTool("worksite-minus");
  const click_handler_48 = () => showHelp("worksites");
  const click_handler_49 = () => selectSection("settlements");
  const click_handler_50 = () => setTool("settlement-place");
  const click_handler_51 = () => setTool("settlement-minus");
  const click_handler_52 = () => showHelp("settlements");
  const click_handler_53 = () => selectSection("fortifications");
  const click_handler_54 = () => setTool("fortification-tier1");
  const click_handler_55 = () => setTool("fortification-tier2");
  const click_handler_56 = () => setTool("fortification-tier3");
  const click_handler_57 = () => setTool("fortification-tier4");
  const click_handler_58 = () => showHelp("fortifications");
  const click_handler_59 = () => selectSection("territory");
  const func = (f) => f.id === selectedClaimOwner;
  const func_1 = (f) => f.id === selectedClaimOwner;
  function input_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      colorPickerInput = $$value;
      $$invalidate(8, colorPickerInput);
    });
  }
  function select_change_handler_1() {
    selectedClaimOwner = select_value(this);
    $$invalidate(7, selectedClaimOwner);
  }
  const click_handler_60 = () => showHelp("territory");
  function div2_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      panelElement = $$value;
      $$invalidate(4, panelElement);
    });
  }
  $$self.$$set = ($$props2) => {
    if ("onClose" in $$props2) $$invalidate(36, onClose = $$props2.onClose);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty[0] & /*$currentTool*/
    2) {
      $$invalidate(14, activeSection = getActiveSection($currentTool));
    }
    if ($$self.$$.dirty[0] & /*$currentTool, selectedEraserSize*/
    3) {
      if ($currentTool === "cell-river-area-erase") {
        cellRiverEditorHandlers.setEraserRadius(selectedEraserSize);
      }
    }
  };
  return [
    selectedEraserSize,
    $currentTool,
    position,
    isDragging,
    panelElement,
    isMinimized,
    selectedSection,
    selectedClaimOwner,
    colorPickerInput,
    showSettlementDialog,
    settlementDialogHexId,
    settlementDialogExisting,
    deleteConfirmSection,
    isGM,
    activeSection,
    $kingdomData,
    $isWizardActive,
    currentTool,
    setTool,
    toggleMinimize,
    handleSectionChange,
    selectSection,
    handleClaimOwnerChange,
    handleColorChange,
    handleMouseDown,
    handleSave,
    handleCancel,
    handleSettlementConfirm,
    handleSettlementCancel,
    handleExportMapData,
    showDeleteConfirm,
    cancelDeleteConfirm,
    confirmDelete,
    eraserSizes,
    setEraserSize,
    showHelp,
    onClose,
    settlementeditordialog_show_binding,
    select_change_handler,
    click_handler,
    click_handler_1,
    click_handler_2,
    click_handler_3,
    click_handler_4,
    click_handler_5,
    click_handler_6,
    click_handler_7,
    click_handler_8,
    click_handler_9,
    click_handler_10,
    click_handler_11,
    click_handler_12,
    click_handler_13,
    click_handler_14,
    click_handler_15,
    click_handler_16,
    click_handler_17,
    click_handler_18,
    click_handler_19,
    click_handler_20,
    click_handler_21,
    click_handler_22,
    click_handler_23,
    click_handler_24,
    click_handler_25,
    click_handler_26,
    click_handler_27,
    click_handler_28,
    click_handler_29,
    click_handler_30,
    click_handler_31,
    click_handler_32,
    click_handler_33,
    click_handler_34,
    click_handler_35,
    click_handler_36,
    click_handler_37,
    click_handler_38,
    click_handler_39,
    click_handler_40,
    click_handler_41,
    click_handler_42,
    click_handler_43,
    click_handler_44,
    click_handler_45,
    click_handler_46,
    click_handler_47,
    click_handler_48,
    click_handler_49,
    click_handler_50,
    click_handler_51,
    click_handler_52,
    click_handler_53,
    click_handler_54,
    click_handler_55,
    click_handler_56,
    click_handler_57,
    click_handler_58,
    click_handler_59,
    func,
    func_1,
    input_binding,
    select_change_handler_1,
    click_handler_60,
    div2_binding
  ];
}
class EditorModePanel extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$2, create_fragment$2, safe_not_equal, { onClose: 36 }, null, [-1, -1, -1, -1]);
  }
}
function get_each_context$1(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[12] = list[i];
  const constants_0 = (
    /*getFactionInfo*/
    child_ctx[4](
      /*factionId*/
      child_ctx[12]
    )
  );
  child_ctx[13] = constants_0;
  return child_ctx;
}
function create_if_block$1(ctx) {
  let div1;
  let div0;
  let each_blocks = [];
  let each_1_lookup = /* @__PURE__ */ new Map();
  let each_value = ensure_array_like(
    /*factionsWithHexes*/
    ctx[2]
  );
  const get_key = (ctx2) => (
    /*factionId*/
    ctx2[12]
  );
  for (let i = 0; i < each_value.length; i += 1) {
    let child_ctx = get_each_context$1(ctx, each_value, i);
    let key = get_key(child_ctx);
    each_1_lookup.set(key, each_blocks[i] = create_each_block$1(key, child_ctx));
  }
  return {
    c() {
      div1 = element("div");
      div0 = element("div");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      attr(div0, "class", "faction-list svelte-prm-wutney");
      attr(div1, "class", "dropdown-panel svelte-prm-wutney");
    },
    m(target, anchor) {
      insert(target, div1, anchor);
      append(div1, div0);
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(div0, null);
        }
      }
    },
    p(ctx2, dirty) {
      if (dirty & /*getFactionInfo, factionsWithHexes, $hiddenFactions, toggleFaction*/
      60) {
        each_value = ensure_array_like(
          /*factionsWithHexes*/
          ctx2[2]
        );
        each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx2, each_value, each_1_lookup, div0, destroy_block, create_each_block$1, null, get_each_context$1);
      }
    },
    d(detaching) {
      if (detaching) {
        detach(div1);
      }
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].d();
      }
    }
  };
}
function create_each_block$1(key_1, ctx) {
  let label;
  let input;
  let input_checked_value;
  let t0;
  let span0;
  let t1;
  let span1;
  let t2_value = (
    /*info*/
    ctx[13].name + ""
  );
  let t2;
  let t3;
  let span2;
  let t4;
  let t5_value = (
    /*info*/
    ctx[13].hexCount + ""
  );
  let t5;
  let t6;
  let t7;
  let mounted;
  let dispose;
  function change_handler() {
    return (
      /*change_handler*/
      ctx[9](
        /*factionId*/
        ctx[12]
      )
    );
  }
  return {
    key: key_1,
    first: null,
    c() {
      label = element("label");
      input = element("input");
      t0 = space();
      span0 = element("span");
      t1 = space();
      span1 = element("span");
      t2 = text(t2_value);
      t3 = space();
      span2 = element("span");
      t4 = text("(");
      t5 = text(t5_value);
      t6 = text(")");
      t7 = space();
      attr(input, "type", "checkbox");
      input.checked = input_checked_value = !/*$hiddenFactions*/
      ctx[3].has(
        /*factionId*/
        ctx[12]
      );
      attr(input, "class", "svelte-prm-wutney");
      attr(span0, "class", "color-swatch svelte-prm-wutney");
      set_style(
        span0,
        "background-color",
        /*info*/
        ctx[13].color
      );
      attr(span1, "class", "faction-name svelte-prm-wutney");
      attr(span2, "class", "hex-count svelte-prm-wutney");
      attr(label, "class", "faction-item svelte-prm-wutney");
      this.first = label;
    },
    m(target, anchor) {
      insert(target, label, anchor);
      append(label, input);
      append(label, t0);
      append(label, span0);
      append(label, t1);
      append(label, span1);
      append(span1, t2);
      append(label, t3);
      append(label, span2);
      append(span2, t4);
      append(span2, t5);
      append(span2, t6);
      append(label, t7);
      if (!mounted) {
        dispose = listen(input, "change", change_handler);
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty & /*$hiddenFactions, factionsWithHexes*/
      12 && input_checked_value !== (input_checked_value = !/*$hiddenFactions*/
      ctx[3].has(
        /*factionId*/
        ctx[12]
      ))) {
        input.checked = input_checked_value;
      }
      if (dirty & /*factionsWithHexes*/
      4) {
        set_style(
          span0,
          "background-color",
          /*info*/
          ctx[13].color
        );
      }
      if (dirty & /*factionsWithHexes*/
      4 && t2_value !== (t2_value = /*info*/
      ctx[13].name + "")) set_data(t2, t2_value);
      if (dirty & /*factionsWithHexes*/
      4 && t5_value !== (t5_value = /*info*/
      ctx[13].hexCount + "")) set_data(t5, t5_value);
    },
    d(detaching) {
      if (detaching) {
        detach(label);
      }
      mounted = false;
      dispose();
    }
  };
}
function create_fragment$1(ctx) {
  let div;
  let button;
  let i;
  let t;
  let mounted;
  let dispose;
  let if_block = (
    /*isOpen*/
    ctx[0] && create_if_block$1(ctx)
  );
  return {
    c() {
      div = element("div");
      button = element("button");
      i = element("i");
      t = space();
      if (if_block) if_block.c();
      attr(i, "class", "fas fa-chevron-down svelte-prm-wutney");
      toggle_class(
        i,
        "rotated",
        /*isOpen*/
        ctx[0]
      );
      attr(button, "class", "dropdown-trigger svelte-prm-wutney");
      attr(button, "title", "Select visible factions");
      toggle_class(
        button,
        "open",
        /*isOpen*/
        ctx[0]
      );
      attr(div, "class", "faction-dropdown svelte-prm-wutney");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      append(div, button);
      append(button, i);
      append(div, t);
      if (if_block) if_block.m(div, null);
      ctx[10](div);
      if (!mounted) {
        dispose = [
          listen(
            window,
            "click",
            /*handleClickOutside*/
            ctx[7]
          ),
          listen(
            button,
            "click",
            /*toggleDropdown*/
            ctx[6]
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (dirty & /*isOpen*/
      1) {
        toggle_class(
          i,
          "rotated",
          /*isOpen*/
          ctx2[0]
        );
      }
      if (dirty & /*isOpen*/
      1) {
        toggle_class(
          button,
          "open",
          /*isOpen*/
          ctx2[0]
        );
      }
      if (
        /*isOpen*/
        ctx2[0]
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
        } else {
          if_block = create_if_block$1(ctx2);
          if_block.c();
          if_block.m(div, null);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      if (if_block) if_block.d();
      ctx[10](null);
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance$1($$self, $$props, $$invalidate) {
  let factionsWithHexes;
  let $kingdomData;
  let $allHexesByFaction;
  let $hiddenFactions;
  component_subscribe($$self, kingdomData, ($$value) => $$invalidate(11, $kingdomData = $$value));
  component_subscribe($$self, allHexesByFaction, ($$value) => $$invalidate(8, $allHexesByFaction = $$value));
  component_subscribe($$self, hiddenFactions, ($$value) => $$invalidate(3, $hiddenFactions = $$value));
  let isOpen = false;
  let dropdownElement;
  function getFactionInfo(factionId) {
    const hexCount = $allHexesByFaction.get(factionId)?.length || 0;
    if (factionId === PLAYER_KINGDOM) {
      return {
        name: $kingdomData.name || "Your Kingdom",
        color: $kingdomData.playerKingdomColor || "#5b9bd5",
        hexCount
      };
    }
    const faction = $kingdomData.factions?.find((f) => f.id === factionId);
    return {
      name: faction?.name || factionId,
      color: faction?.color || "#666666",
      hexCount
    };
  }
  function toggleFaction(factionId) {
    hiddenFactions.update(($set) => {
      const newSet = new Set($set);
      const willBeVisible = newSet.has(factionId);
      if (willBeVisible) {
        newSet.delete(factionId);
      } else {
        newSet.add(factionId);
      }
      setTerritoryFactionVisibility(factionId, willBeVisible);
      return newSet;
    });
  }
  function toggleDropdown(event) {
    event.stopPropagation();
    $$invalidate(0, isOpen = !isOpen);
  }
  function handleClickOutside(event) {
    if (dropdownElement && !dropdownElement.contains(event.target)) {
      $$invalidate(0, isOpen = false);
    }
  }
  const change_handler = (factionId) => toggleFaction(factionId);
  function div_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      dropdownElement = $$value;
      $$invalidate(1, dropdownElement);
    });
  }
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*$allHexesByFaction*/
    256) {
      $$invalidate(2, factionsWithHexes = (() => {
        const fromHexes = Array.from($allHexesByFaction.keys()).filter((f) => f !== "unclaimed");
        if (!fromHexes.includes(PLAYER_KINGDOM)) {
          fromHexes.push(PLAYER_KINGDOM);
        }
        return fromHexes.sort((a, b) => {
          if (a === PLAYER_KINGDOM) return -1;
          if (b === PLAYER_KINGDOM) return 1;
          return a.localeCompare(b);
        });
      })());
    }
  };
  return [
    isOpen,
    dropdownElement,
    factionsWithHexes,
    $hiddenFactions,
    getFactionInfo,
    toggleFaction,
    toggleDropdown,
    handleClickOutside,
    $allHexesByFaction,
    change_handler,
    div_binding
  ];
}
class FactionVisibilityDropdown extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$1, create_fragment$1, safe_not_equal, {});
  }
}
function get_each_context(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[30] = list[i];
  return child_ctx;
}
function create_if_block_1(ctx) {
  let factionvisibilitydropdown;
  let current;
  factionvisibilitydropdown = new FactionVisibilityDropdown({});
  return {
    c() {
      create_component(factionvisibilitydropdown.$$.fragment);
    },
    m(target, anchor) {
      mount_component(factionvisibilitydropdown, target, anchor);
      current = true;
    },
    i(local) {
      if (current) return;
      transition_in(factionvisibilitydropdown.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(factionvisibilitydropdown.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(factionvisibilitydropdown, detaching);
    }
  };
}
function create_each_block(ctx) {
  let div;
  let button;
  let i;
  let t0;
  let span;
  let t2;
  let current;
  let mounted;
  let dispose;
  function click_handler() {
    return (
      /*click_handler*/
      ctx[17](
        /*overlay*/
        ctx[30]
      )
    );
  }
  let if_block = (
    /*overlay*/
    ctx[30].id === "territories" && create_if_block_1()
  );
  return {
    c() {
      div = element("div");
      button = element("button");
      i = element("i");
      t0 = space();
      span = element("span");
      span.textContent = `${/*overlay*/
      ctx[30].name}`;
      t2 = space();
      if (if_block) if_block.c();
      attr(i, "class", "fas " + /*overlay*/
      ctx[30].icon + " svelte-prm-134c3jb");
      attr(span, "class", "svelte-prm-134c3jb");
      attr(button, "class", "toolbar-button svelte-prm-134c3jb");
      attr(button, "title", "Toggle " + /*overlay*/
      ctx[30].name + " Overlay");
      toggle_class(
        button,
        "active",
        /*$activeOverlaysStore*/
        ctx[6].has(
          /*overlay*/
          ctx[30].id
        )
      );
      attr(div, "class", "overlay-row svelte-prm-134c3jb");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      append(div, button);
      append(button, i);
      append(button, t0);
      append(button, span);
      append(div, t2);
      if (if_block) if_block.m(div, null);
      current = true;
      if (!mounted) {
        dispose = listen(button, "click", click_handler);
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (!current || dirty[0] & /*$activeOverlaysStore, overlays*/
      320) {
        toggle_class(
          button,
          "active",
          /*$activeOverlaysStore*/
          ctx[6].has(
            /*overlay*/
            ctx[30].id
          )
        );
      }
    },
    i(local) {
      if (current) return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      if (if_block) if_block.d();
      mounted = false;
      dispose();
    }
  };
}
function create_if_block(ctx) {
  let div;
  let t0;
  let button;
  let mounted;
  let dispose;
  return {
    c() {
      div = element("div");
      t0 = space();
      button = element("button");
      button.innerHTML = `<i class="fas fa-pencil-alt svelte-prm-134c3jb"></i> <span class="svelte-prm-134c3jb">Map Editor</span>`;
      attr(div, "class", "toolbar-divider svelte-prm-134c3jb");
      attr(button, "class", "toolbar-button editor-button svelte-prm-134c3jb");
      attr(button, "title", "Open Map Editor (GM Only)");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      insert(target, t0, anchor);
      insert(target, button, anchor);
      if (!mounted) {
        dispose = listen(
          button,
          "click",
          /*openEditor*/
          ctx[13]
        );
        mounted = true;
      }
    },
    p: noop,
    d(detaching) {
      if (detaching) {
        detach(div);
        detach(t0);
        detach(button);
      }
      mounted = false;
      dispose();
    }
  };
}
function create_fragment(ctx) {
  let div3;
  let div0;
  let i0;
  let t0;
  let span;
  let t2;
  let button0;
  let t3;
  let div1;
  let button1;
  let t4;
  let button2;
  let t5;
  let button3;
  let t6;
  let div2;
  let t7;
  let current;
  let mounted;
  let dispose;
  let each_value = ensure_array_like(
    /*overlays*/
    ctx[8]
  );
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
  }
  const out = (i) => transition_out(each_blocks[i], 1, 1, () => {
    each_blocks[i] = null;
  });
  let if_block = (
    /*isGM*/
    ctx[7] && create_if_block(ctx)
  );
  return {
    c() {
      div3 = element("div");
      div0 = element("div");
      i0 = element("i");
      t0 = space();
      span = element("span");
      span.textContent = "Map Overlays";
      t2 = space();
      button0 = element("button");
      button0.innerHTML = `<i class="fas fa-times svelte-prm-134c3jb"></i>`;
      t3 = space();
      div1 = element("div");
      button1 = element("button");
      button1.innerHTML = `<i class="fas fa-hexagon svelte-prm-134c3jb"></i>`;
      t4 = space();
      button2 = element("button");
      button2.innerHTML = `<i class="fas fa-vector-square svelte-prm-134c3jb"></i>`;
      t5 = space();
      button3 = element("button");
      button3.innerHTML = `<i class="fas fa-arrows-alt svelte-prm-134c3jb"></i>`;
      t6 = space();
      div2 = element("div");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      t7 = space();
      if (if_block) if_block.c();
      attr(i0, "class", "fas fa-chess-rook svelte-prm-134c3jb");
      attr(span, "class", "svelte-prm-134c3jb");
      attr(button0, "class", "close-button svelte-prm-134c3jb");
      attr(button0, "title", "Close toolbar");
      attr(div0, "class", "toolbar-header svelte-prm-134c3jb");
      attr(button1, "class", "debug-toggle svelte-prm-134c3jb");
      attr(button1, "title", "Toggle Hex Debug (logs hex IDs on click)");
      toggle_class(
        button1,
        "active",
        /*debugHexMode*/
        ctx[3]
      );
      attr(button2, "class", "debug-toggle svelte-prm-134c3jb");
      attr(button2, "title", "Region Report (select two hexes to export hex data)");
      toggle_class(
        button2,
        "active",
        /*regionReportMode*/
        ctx[4]
      );
      attr(button3, "class", "debug-toggle svelte-prm-134c3jb");
      attr(button3, "title", "Toggle Neighbors Debug (logs neighbor hex IDs)");
      toggle_class(
        button3,
        "active",
        /*debugNeighborsMode*/
        ctx[5]
      );
      attr(div1, "class", "debug-tools svelte-prm-134c3jb");
      attr(div2, "class", "toolbar-buttons svelte-prm-134c3jb");
      attr(div3, "class", "map-overlay-toolbar svelte-prm-134c3jb");
      set_style(
        div3,
        "left",
        /*position*/
        ctx[1].x + "px"
      );
      set_style(
        div3,
        "top",
        /*position*/
        ctx[1].y + "px"
      );
      attr(div3, "role", "toolbar");
      attr(div3, "tabindex", "0");
      attr(div3, "aria-label", "Map Overlay Controls");
      toggle_class(
        div3,
        "dragging",
        /*isDragging*/
        ctx[0]
      );
    },
    m(target, anchor) {
      insert(target, div3, anchor);
      append(div3, div0);
      append(div0, i0);
      append(div0, t0);
      append(div0, span);
      append(div0, t2);
      append(div0, button0);
      append(div3, t3);
      append(div3, div1);
      append(div1, button1);
      append(div1, t4);
      append(div1, button2);
      append(div1, t5);
      append(div1, button3);
      append(div3, t6);
      append(div3, div2);
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(div2, null);
        }
      }
      append(div2, t7);
      if (if_block) if_block.m(div2, null);
      ctx[18](div3);
      current = true;
      if (!mounted) {
        dispose = [
          listen(
            button0,
            "click",
            /*closeToolbar*/
            ctx[12]
          ),
          listen(
            button1,
            "click",
            /*toggleDebugHex*/
            ctx[14]
          ),
          listen(
            button2,
            "click",
            /*toggleRegionReport*/
            ctx[15]
          ),
          listen(
            button3,
            "click",
            /*toggleDebugNeighbors*/
            ctx[16]
          ),
          listen(
            div3,
            "mousedown",
            /*handleMouseDown*/
            ctx[10]
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (!current || dirty[0] & /*debugHexMode*/
      8) {
        toggle_class(
          button1,
          "active",
          /*debugHexMode*/
          ctx2[3]
        );
      }
      if (!current || dirty[0] & /*regionReportMode*/
      16) {
        toggle_class(
          button2,
          "active",
          /*regionReportMode*/
          ctx2[4]
        );
      }
      if (!current || dirty[0] & /*debugNeighborsMode*/
      32) {
        toggle_class(
          button3,
          "active",
          /*debugNeighborsMode*/
          ctx2[5]
        );
      }
      if (dirty[0] & /*overlays, $activeOverlaysStore, toggleOverlay*/
      2368) {
        each_value = ensure_array_like(
          /*overlays*/
          ctx2[8]
        );
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
            transition_in(each_blocks[i], 1);
          } else {
            each_blocks[i] = create_each_block(child_ctx);
            each_blocks[i].c();
            transition_in(each_blocks[i], 1);
            each_blocks[i].m(div2, t7);
          }
        }
        group_outros();
        for (i = each_value.length; i < each_blocks.length; i += 1) {
          out(i);
        }
        check_outros();
      }
      if (
        /*isGM*/
        ctx2[7]
      ) if_block.p(ctx2, dirty);
      if (!current || dirty[0] & /*position*/
      2) {
        set_style(
          div3,
          "left",
          /*position*/
          ctx2[1].x + "px"
        );
      }
      if (!current || dirty[0] & /*position*/
      2) {
        set_style(
          div3,
          "top",
          /*position*/
          ctx2[1].y + "px"
        );
      }
      if (!current || dirty[0] & /*isDragging*/
      1) {
        toggle_class(
          div3,
          "dragging",
          /*isDragging*/
          ctx2[0]
        );
      }
    },
    i(local) {
      if (current) return;
      for (let i = 0; i < each_value.length; i += 1) {
        transition_in(each_blocks[i]);
      }
      current = true;
    },
    o(local) {
      each_blocks = each_blocks.filter(Boolean);
      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div3);
      }
      destroy_each(each_blocks, detaching);
      if (if_block) if_block.d();
      ctx[18](null);
      mounted = false;
      run_all(dispose);
    }
  };
}
const TOOLBAR_WIDTH = 200;
const TOOLBAR_HEIGHT = 400;
function clampToViewport(pos, panelWidth, panelHeight) {
  return {
    x: Math.max(0, Math.min(window.innerWidth - panelWidth, pos.x)),
    y: Math.max(0, Math.min(window.innerHeight - panelHeight, pos.y))
  };
}
function instance($$self, $$props, $$invalidate) {
  let $activeOverlaysStore;
  let isDragging = false;
  let position = { x: 100, y: 100 };
  let dragStart = { x: 0, y: 0 };
  let toolbarElement;
  let showEditorPanel = false;
  let editorPanelMountPoint = null;
  let editorPanelComponent = null;
  let debugHexMode = false;
  let regionReportMode = false;
  let debugNeighborsMode = false;
  const isGM = globalThis.game?.user?.isGM ?? false;
  const mapLayer = ReignMakerMapLayer.getInstance();
  const overlayManager = getOverlayManager();
  const editorService = getEditorModeService();
  const allOverlays = overlayManager.getAllOverlays();
  const overlays = allOverlays.filter((overlay) => {
    if (overlay.id.includes("debug")) {
      return isGM;
    }
    if (overlay.id === "demanded-hex") {
      return false;
    }
    if (overlay.id === "interactive-hover" || overlay.id === "army-movement") {
      return false;
    }
    if (overlay.id === "territory-border") {
      return false;
    }
    if (overlay.id === "provinces" || overlay.id === "provinces-fill") {
      return false;
    }
    if (overlay.id === "settlement-labels") {
      return false;
    }
    return true;
  });
  const activeOverlaysStore = overlayManager.getActiveOverlaysStore();
  component_subscribe($$self, activeOverlaysStore, (value) => $$invalidate(6, $activeOverlaysStore = value));
  onMount(async () => {
    const guidedPos = getGuidedModePosition("overlayToolbar");
    if (guidedPos) {
      $$invalidate(1, position = clampToViewport(guidedPos, TOOLBAR_WIDTH, TOOLBAR_HEIGHT));
    } else {
      $$invalidate(1, position = {
        x: 8,
        y: (window.innerHeight - TOOLBAR_HEIGHT) / 2
      });
    }
    mapLayer.showPixiContainer();
  });
  function handleMouseDown(e) {
    if (e.target.closest(".toolbar-button")) return;
    $$invalidate(0, isDragging = true);
    dragStart = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    };
    e.preventDefault();
  }
  function handleMouseMove(e) {
    if (!isDragging) return;
    $$invalidate(1, position = {
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  }
  function handleMouseUp() {
    if (isDragging) {
      $$invalidate(0, isDragging = false);
    }
  }
  async function toggleOverlay(overlayId) {
    try {
      await overlayManager.toggleOverlay(overlayId);
    } catch (error) {
      logger.error(
        `[MapOverlayToolbar] Failed to toggle overlay ${overlayId}:`,
        error
      );
    }
  }
  onMount(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    const handleOpenEditorEvent = () => openEditor();
    const handleCloseEditorEvent = () => closeEditor();
    window.addEventListener("reignmaker:open-editor", handleOpenEditorEvent);
    window.addEventListener("reignmaker:close-editor", handleCloseEditorEvent);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("reignmaker:open-editor", handleOpenEditorEvent);
      window.removeEventListener("reignmaker:close-editor", handleCloseEditorEvent);
    };
  });
  onDestroy(() => {
    if (editorPanelComponent) {
      editorPanelComponent.$destroy();
      editorPanelComponent = null;
    }
    if (editorPanelMountPoint) {
      editorPanelMountPoint.remove();
      editorPanelMountPoint = null;
    }
  });
  function closeToolbar() {
    toolbarElement.dispatchEvent(new CustomEvent("close", { bubbles: true }));
  }
  async function openEditor() {
    if (showEditorPanel) return;
    showEditorPanel = true;
    if (!$activeOverlaysStore.has("rivers")) {
      await overlayManager.toggleOverlay("rivers");
    }
    editorPanelMountPoint = document.createElement("div");
    editorPanelMountPoint.id = "editor-panel-mount";
    document.body.appendChild(editorPanelMountPoint);
    editorPanelComponent = new EditorModePanel({
      target: editorPanelMountPoint,
      props: { onClose: closeEditor }
    });
  }
  function closeEditor() {
    if (!showEditorPanel) return;
    showEditorPanel = false;
    if (editorPanelComponent) {
      editorPanelComponent.$destroy();
      editorPanelComponent = null;
    }
    if (editorPanelMountPoint) {
      editorPanelMountPoint.remove();
      editorPanelMountPoint = null;
    }
  }
  function toggleDebugHex() {
    $$invalidate(3, debugHexMode = editorService.toggleDebugHex());
  }
  function toggleRegionReport() {
    $$invalidate(4, regionReportMode = editorService.toggleRegionReport());
  }
  function toggleDebugNeighbors() {
    $$invalidate(5, debugNeighborsMode = editorService.toggleDebugNeighbors());
  }
  const click_handler = (overlay) => toggleOverlay(overlay.id);
  function div3_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      toolbarElement = $$value;
      $$invalidate(2, toolbarElement);
    });
  }
  return [
    isDragging,
    position,
    toolbarElement,
    debugHexMode,
    regionReportMode,
    debugNeighborsMode,
    $activeOverlaysStore,
    isGM,
    overlays,
    activeOverlaysStore,
    handleMouseDown,
    toggleOverlay,
    closeToolbar,
    openEditor,
    toggleDebugHex,
    toggleRegionReport,
    toggleDebugNeighbors,
    click_handler,
    div3_binding
  ];
}
class MapOverlayToolbar extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, {}, null, [-1, -1]);
  }
}
export {
  MapOverlayToolbar as default
};
