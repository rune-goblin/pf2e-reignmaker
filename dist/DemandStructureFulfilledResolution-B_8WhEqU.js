import { aw as SvelteComponent, ax as init, ay as safe_not_equal, b0 as Dialog, b1 as binding_callbacks, b2 as bind, b3 as destroy_component, b4 as transition_out, b5 as transition_in, b6 as add_flush_callback, b7 as mount_component, b8 as create_component, b9 as createEventDispatcher, aA as detach, bd as run_all, aN as toggle_class, aB as insert, aF as append, aK as listen, aC as element, aG as space, aH as text, aD as attr, aW as getResourceIcon, am as rollDiceFormula, aE as set_data, az as noop } from "./GameCommandUtils-D_sgs3NK.js";
function create_else_block_3(ctx) {
  let p;
  let t0;
  let strong;
  let t1;
  let t2;
  return {
    c() {
      p = element("p");
      t0 = text("The citizens celebrate as ");
      strong = element("strong");
      t1 = text(
        /*structureName*/
        ctx[1]
      );
      t2 = text(" has been built!");
      attr(strong, "class", "svelte-prm-cm33jm");
      attr(p, "class", "svelte-prm-cm33jm");
    },
    m(target, anchor) {
      insert(target, p, anchor);
      append(p, t0);
      append(p, strong);
      append(strong, t1);
      append(p, t2);
    },
    p(ctx2, dirty) {
      if (dirty & /*structureName*/
      2) set_data(
        t1,
        /*structureName*/
        ctx2[1]
      );
    },
    d(detaching) {
      if (detaching) {
        detach(p);
      }
    }
  };
}
function create_if_block_3(ctx) {
  let p;
  let t0;
  let strong0;
  let t1;
  let t2;
  let strong1;
  let t3;
  let t4;
  return {
    c() {
      p = element("p");
      t0 = text("The citizens of ");
      strong0 = element("strong");
      t1 = text(
        /*settlementName*/
        ctx[2]
      );
      t2 = text(" celebrate as ");
      strong1 = element("strong");
      t3 = text(
        /*structureName*/
        ctx[1]
      );
      t4 = text(" has been built!");
      attr(strong0, "class", "svelte-prm-cm33jm");
      attr(strong1, "class", "svelte-prm-cm33jm");
      attr(p, "class", "svelte-prm-cm33jm");
    },
    m(target, anchor) {
      insert(target, p, anchor);
      append(p, t0);
      append(p, strong0);
      append(strong0, t1);
      append(p, t2);
      append(p, strong1);
      append(strong1, t3);
      append(p, t4);
    },
    p(ctx2, dirty) {
      if (dirty & /*settlementName*/
      4) set_data(
        t1,
        /*settlementName*/
        ctx2[2]
      );
      if (dirty & /*structureName*/
      2) set_data(
        t3,
        /*structureName*/
        ctx2[1]
      );
    },
    d(detaching) {
      if (detaching) {
        detach(p);
      }
    }
  };
}
function create_else_block_2(ctx) {
  let span;
  return {
    c() {
      span = element("span");
      span.textContent = "1d4";
      attr(span, "class", "dice-button svelte-prm-cm33jm");
    },
    m(target, anchor) {
      insert(target, span, anchor);
    },
    p: noop,
    d(detaching) {
      if (detaching) {
        detach(span);
      }
    }
  };
}
function create_if_block_2(ctx) {
  let span;
  let t;
  return {
    c() {
      span = element("span");
      t = text(
        /*unrestValue*/
        ctx[5]
      );
      attr(span, "class", "value svelte-prm-cm33jm");
    },
    m(target, anchor) {
      insert(target, span, anchor);
      append(span, t);
    },
    p(ctx2, dirty) {
      if (dirty & /*unrestValue*/
      32) set_data(
        t,
        /*unrestValue*/
        ctx2[5]
      );
    },
    d(detaching) {
      if (detaching) {
        detach(span);
      }
    }
  };
}
function create_else_block_1(ctx) {
  let span;
  return {
    c() {
      span = element("span");
      span.textContent = "2-6";
      attr(span, "class", "dice-button svelte-prm-cm33jm");
    },
    m(target, anchor) {
      insert(target, span, anchor);
    },
    p: noop,
    d(detaching) {
      if (detaching) {
        detach(span);
      }
    }
  };
}
function create_if_block_1(ctx) {
  let span;
  let t;
  return {
    c() {
      span = element("span");
      t = text(
        /*goldValue*/
        ctx[6]
      );
      attr(span, "class", "value svelte-prm-cm33jm");
    },
    m(target, anchor) {
      insert(target, span, anchor);
      append(span, t);
    },
    p(ctx2, dirty) {
      if (dirty & /*goldValue*/
      64) set_data(
        t,
        /*goldValue*/
        ctx2[6]
      );
    },
    d(detaching) {
      if (detaching) {
        detach(span);
      }
    }
  };
}
function create_else_block(ctx) {
  let span;
  let t0;
  let t1;
  let t2;
  return {
    c() {
      span = element("span");
      t0 = text('The ongoing "Citizens demand a ');
      t1 = text(
        /*structureName*/
        ctx[1]
      );
      t2 = text('" modifier will be removed.');
    },
    m(target, anchor) {
      insert(target, span, anchor);
      append(span, t0);
      append(span, t1);
      append(span, t2);
    },
    p(ctx2, dirty) {
      if (dirty & /*structureName*/
      2) set_data(
        t1,
        /*structureName*/
        ctx2[1]
      );
    },
    d(detaching) {
      if (detaching) {
        detach(span);
      }
    }
  };
}
function create_if_block(ctx) {
  let span;
  let t0;
  let t1;
  let t2;
  let t3;
  let t4;
  return {
    c() {
      span = element("span");
      t0 = text('The ongoing "Citizens of ');
      t1 = text(
        /*settlementName*/
        ctx[2]
      );
      t2 = text(" demand a ");
      t3 = text(
        /*structureName*/
        ctx[1]
      );
      t4 = text('" modifier will be removed.');
    },
    m(target, anchor) {
      insert(target, span, anchor);
      append(span, t0);
      append(span, t1);
      append(span, t2);
      append(span, t3);
      append(span, t4);
    },
    p(ctx2, dirty) {
      if (dirty & /*settlementName*/
      4) set_data(
        t1,
        /*settlementName*/
        ctx2[2]
      );
      if (dirty & /*structureName*/
      2) set_data(
        t3,
        /*structureName*/
        ctx2[1]
      );
    },
    d(detaching) {
      if (detaching) {
        detach(span);
      }
    }
  };
}
function create_default_slot(ctx) {
  let div1;
  let div0;
  let t0;
  let t1;
  let p;
  let t3;
  let div8;
  let div2;
  let t5;
  let div7;
  let button0;
  let div4;
  let i1;
  let t6;
  let div3;
  let t7;
  let t8;
  let t9;
  let button1;
  let div6;
  let i2;
  let t10;
  let div5;
  let t11;
  let t12;
  let t13;
  let div9;
  let i3;
  let t14;
  let mounted;
  let dispose;
  function select_block_type(ctx2, dirty) {
    if (
      /*settlementName*/
      ctx2[2]
    ) return create_if_block_3;
    return create_else_block_3;
  }
  let current_block_type = select_block_type(ctx);
  let if_block0 = current_block_type(ctx);
  function select_block_type_1(ctx2, dirty) {
    if (
      /*unrestRolled*/
      ctx2[3]
    ) return create_if_block_2;
    return create_else_block_2;
  }
  let current_block_type_1 = select_block_type_1(ctx);
  let if_block1 = current_block_type_1(ctx);
  function select_block_type_2(ctx2, dirty) {
    if (
      /*goldRolled*/
      ctx2[4]
    ) return create_if_block_1;
    return create_else_block_1;
  }
  let current_block_type_2 = select_block_type_2(ctx);
  let if_block2 = current_block_type_2(ctx);
  function select_block_type_3(ctx2, dirty) {
    if (
      /*settlementName*/
      ctx2[2]
    ) return create_if_block;
    return create_else_block;
  }
  let current_block_type_3 = select_block_type_3(ctx);
  let if_block3 = current_block_type_3(ctx);
  return {
    c() {
      div1 = element("div");
      div0 = element("div");
      div0.innerHTML = `<i class="fas fa-building svelte-prm-cm33jm"></i>`;
      t0 = space();
      if_block0.c();
      t1 = space();
      p = element("p");
      p.textContent = "Their demands have been met and unrest subsides.";
      t3 = space();
      div8 = element("div");
      div2 = element("div");
      div2.textContent = "Rewards:";
      t5 = space();
      div7 = element("div");
      button0 = element("button");
      div4 = element("div");
      i1 = element("i");
      t6 = space();
      div3 = element("div");
      t7 = text("Lose \n            ");
      if_block1.c();
      t8 = text("\n            Unrest");
      t9 = space();
      button1 = element("button");
      div6 = element("div");
      i2 = element("i");
      t10 = space();
      div5 = element("div");
      t11 = text("Gain \n            ");
      if_block2.c();
      t12 = text("\n            Gold");
      t13 = space();
      div9 = element("div");
      i3 = element("i");
      t14 = space();
      if_block3.c();
      attr(div0, "class", "celebration-icon svelte-prm-cm33jm");
      attr(p, "class", "subtext svelte-prm-cm33jm");
      attr(div1, "class", "message svelte-prm-cm33jm");
      attr(div2, "class", "dice-rollers-header svelte-prm-cm33jm");
      attr(i1, "class", "fas " + getResourceIcon("unrest") + " resource-icon svelte-prm-cm33jm");
      attr(div3, "class", "text svelte-prm-cm33jm");
      attr(div4, "class", "content svelte-prm-cm33jm");
      attr(button0, "class", "outcome-badge variant-positive svelte-prm-cm33jm");
      button0.disabled = /*unrestRolled*/
      ctx[3];
      toggle_class(button0, "clickable", !/*unrestRolled*/
      ctx[3]);
      toggle_class(
        button0,
        "rolled",
        /*unrestRolled*/
        ctx[3]
      );
      attr(i2, "class", "fas " + getResourceIcon("gold") + " resource-icon svelte-prm-cm33jm");
      attr(div5, "class", "text svelte-prm-cm33jm");
      attr(div6, "class", "content svelte-prm-cm33jm");
      attr(button1, "class", "outcome-badge variant-positive svelte-prm-cm33jm");
      button1.disabled = /*goldRolled*/
      ctx[4];
      toggle_class(button1, "clickable", !/*goldRolled*/
      ctx[4]);
      toggle_class(
        button1,
        "rolled",
        /*goldRolled*/
        ctx[4]
      );
      attr(div7, "class", "outcome-badges svelte-prm-cm33jm");
      attr(div8, "class", "dice-rollers-section svelte-prm-cm33jm");
      attr(i3, "class", "fas fa-times-circle svelte-prm-cm33jm");
      attr(div9, "class", "modifier-notice svelte-prm-cm33jm");
    },
    m(target, anchor) {
      insert(target, div1, anchor);
      append(div1, div0);
      append(div1, t0);
      if_block0.m(div1, null);
      append(div1, t1);
      append(div1, p);
      insert(target, t3, anchor);
      insert(target, div8, anchor);
      append(div8, div2);
      append(div8, t5);
      append(div8, div7);
      append(div7, button0);
      append(button0, div4);
      append(div4, i1);
      append(div4, t6);
      append(div4, div3);
      append(div3, t7);
      if_block1.m(div3, null);
      append(div3, t8);
      append(div7, t9);
      append(div7, button1);
      append(button1, div6);
      append(div6, i2);
      append(div6, t10);
      append(div6, div5);
      append(div5, t11);
      if_block2.m(div5, null);
      append(div5, t12);
      insert(target, t13, anchor);
      insert(target, div9, anchor);
      append(div9, i3);
      append(div9, t14);
      if_block3.m(div9, null);
      if (!mounted) {
        dispose = [
          listen(
            button0,
            "click",
            /*rollUnrest*/
            ctx[8]
          ),
          listen(
            button1,
            "click",
            /*rollGold*/
            ctx[9]
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (current_block_type === (current_block_type = select_block_type(ctx2)) && if_block0) {
        if_block0.p(ctx2, dirty);
      } else {
        if_block0.d(1);
        if_block0 = current_block_type(ctx2);
        if (if_block0) {
          if_block0.c();
          if_block0.m(div1, t1);
        }
      }
      if (current_block_type_1 === (current_block_type_1 = select_block_type_1(ctx2)) && if_block1) {
        if_block1.p(ctx2, dirty);
      } else {
        if_block1.d(1);
        if_block1 = current_block_type_1(ctx2);
        if (if_block1) {
          if_block1.c();
          if_block1.m(div3, t8);
        }
      }
      if (dirty & /*unrestRolled*/
      8) {
        button0.disabled = /*unrestRolled*/
        ctx2[3];
      }
      if (dirty & /*unrestRolled*/
      8) {
        toggle_class(button0, "clickable", !/*unrestRolled*/
        ctx2[3]);
      }
      if (dirty & /*unrestRolled*/
      8) {
        toggle_class(
          button0,
          "rolled",
          /*unrestRolled*/
          ctx2[3]
        );
      }
      if (current_block_type_2 === (current_block_type_2 = select_block_type_2(ctx2)) && if_block2) {
        if_block2.p(ctx2, dirty);
      } else {
        if_block2.d(1);
        if_block2 = current_block_type_2(ctx2);
        if (if_block2) {
          if_block2.c();
          if_block2.m(div5, t12);
        }
      }
      if (dirty & /*goldRolled*/
      16) {
        button1.disabled = /*goldRolled*/
        ctx2[4];
      }
      if (dirty & /*goldRolled*/
      16) {
        toggle_class(button1, "clickable", !/*goldRolled*/
        ctx2[4]);
      }
      if (dirty & /*goldRolled*/
      16) {
        toggle_class(
          button1,
          "rolled",
          /*goldRolled*/
          ctx2[4]
        );
      }
      if (current_block_type_3 === (current_block_type_3 = select_block_type_3(ctx2)) && if_block3) {
        if_block3.p(ctx2, dirty);
      } else {
        if_block3.d(1);
        if_block3 = current_block_type_3(ctx2);
        if (if_block3) {
          if_block3.c();
          if_block3.m(div9, null);
        }
      }
    },
    d(detaching) {
      if (detaching) {
        detach(div1);
        detach(t3);
        detach(div8);
        detach(t13);
        detach(div9);
      }
      if_block0.d();
      if_block1.d();
      if_block2.d();
      if_block3.d();
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_fragment(ctx) {
  let dialog;
  let updating_show;
  let current;
  function dialog_show_binding(value) {
    ctx[13](value);
  }
  let dialog_props = {
    title: "Citizens Rejoice!",
    confirmLabel: "Claim Rewards",
    cancelLabel: "Cancel",
    confirmDisabled: (
      /*confirmDisabled*/
      ctx[7]
    ),
    onConfirm: (
      /*handleConfirm*/
      ctx[10]
    ),
    onCancel: (
      /*handleCancel*/
      ctx[11]
    ),
    width: "450px",
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
      if (dirty & /*confirmDisabled*/
      128) dialog_changes.confirmDisabled = /*confirmDisabled*/
      ctx2[7];
      if (dirty & /*$$scope, structureName, settlementName, goldRolled, goldValue, unrestRolled, unrestValue*/
      32894) {
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
  let { show = true } = $$props;
  let { structureId } = $$props;
  let { structureName } = $$props;
  let { settlementName = "" } = $$props;
  const dispatch = createEventDispatcher();
  let unrestRolled = false;
  let unrestValue = null;
  let goldRolled = false;
  let goldValue = null;
  function rollUnrest() {
    if (unrestRolled) return;
    $$invalidate(5, unrestValue = rollDiceFormula("1d4"));
    $$invalidate(3, unrestRolled = true);
  }
  function rollGold() {
    if (goldRolled) return;
    $$invalidate(6, goldValue = Math.floor(Math.random() * 5) + 2);
    $$invalidate(4, goldRolled = true);
  }
  function handleConfirm() {
    if (confirmDisabled) return;
    dispatch("selection", {
      unrestReduction: unrestValue,
      goldReward: goldValue
    });
    $$invalidate(0, show = false);
  }
  function handleCancel() {
    dispatch("cancel");
    $$invalidate(0, show = false);
  }
  function dialog_show_binding(value) {
    show = value;
    $$invalidate(0, show);
  }
  $$self.$$set = ($$props2) => {
    if ("show" in $$props2) $$invalidate(0, show = $$props2.show);
    if ("structureId" in $$props2) $$invalidate(12, structureId = $$props2.structureId);
    if ("structureName" in $$props2) $$invalidate(1, structureName = $$props2.structureName);
    if ("settlementName" in $$props2) $$invalidate(2, settlementName = $$props2.settlementName);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*unrestRolled, goldRolled*/
    24) {
      $$invalidate(7, confirmDisabled = !unrestRolled || !goldRolled);
    }
  };
  return [
    show,
    structureName,
    settlementName,
    unrestRolled,
    goldRolled,
    unrestValue,
    goldValue,
    confirmDisabled,
    rollUnrest,
    rollGold,
    handleConfirm,
    handleCancel,
    structureId,
    dialog_show_binding
  ];
}
class DemandStructureFulfilledResolution extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, {
      show: 0,
      structureId: 12,
      structureName: 1,
      settlementName: 2
    });
  }
}
export {
  DemandStructureFulfilledResolution as default
};
