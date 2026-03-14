import { aw as SvelteComponent, ax as init, ay as safe_not_equal, b0 as Dialog, b1 as binding_callbacks, b2 as bind, b3 as destroy_component, b4 as transition_out, b5 as transition_in, b6 as add_flush_callback, b7 as mount_component, b8 as create_component, b9 as createEventDispatcher, bt as getValidWorksiteTypes, aA as detach, bd as run_all, aE as set_data, aN as toggle_class, aB as insert, aF as append, aK as listen, aC as element, aH as text, aG as space, aD as attr, aW as getResourceIcon, am as rollDiceFormula, j as getWorksiteProductionDisplay, az as noop, aI as ensure_array_like, aJ as destroy_each, aP as empty } from "./GameCommandUtils-D_sgs3NK.js";
function get_each_context(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[22] = list[i];
  const constants_0 = (
    /*selectedWorksite*/
    child_ctx[3] === /*type*/
    child_ctx[22]
  );
  child_ctx[23] = constants_0;
  const constants_1 = (
    /*getWorksiteIcon*/
    child_ctx[12](
      /*type*/
      child_ctx[22]
    )
  );
  child_ctx[24] = constants_1;
  const constants_2 = (
    /*getWorksiteRevenue*/
    child_ctx[13](
      /*type*/
      child_ctx[22]
    )
  );
  child_ctx[25] = constants_2;
  return child_ctx;
}
function create_else_block_2(ctx) {
  let span;
  return {
    c() {
      span = element("span");
      span.textContent = "2d3";
      attr(span, "class", "dice-button svelte-prm-1vs932j");
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
function create_if_block_5(ctx) {
  let span;
  let t;
  return {
    c() {
      span = element("span");
      t = text(
        /*goldValue*/
        ctx[7]
      );
      attr(span, "class", "value svelte-prm-1vs932j");
    },
    m(target, anchor) {
      insert(target, span, anchor);
      append(span, t);
    },
    p(ctx2, dirty) {
      if (dirty & /*goldValue*/
      128) set_data(
        t,
        /*goldValue*/
        ctx2[7]
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
      span.textContent = "1d3";
      attr(span, "class", "dice-button svelte-prm-1vs932j");
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
function create_if_block_4(ctx) {
  let span;
  let t;
  return {
    c() {
      span = element("span");
      t = text(
        /*unrestValue*/
        ctx[8]
      );
      attr(span, "class", "value svelte-prm-1vs932j");
    },
    m(target, anchor) {
      insert(target, span, anchor);
      append(span, t);
    },
    p(ctx2, dirty) {
      if (dirty & /*unrestValue*/
      256) set_data(
        t,
        /*unrestValue*/
        ctx2[8]
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
  let div;
  let t;
  let if_block_anchor;
  let each_value = ensure_array_like(
    /*validWorksiteTypes*/
    ctx[6]
  );
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
  }
  let if_block = (
    /*selectedWorksite*/
    ctx[3] && create_if_block_1(ctx)
  );
  return {
    c() {
      div = element("div");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      t = space();
      if (if_block) if_block.c();
      if_block_anchor = empty();
      attr(div, "class", "worksite-grid svelte-prm-1vs932j");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(div, null);
        }
      }
      insert(target, t, anchor);
      if (if_block) if_block.m(target, anchor);
      insert(target, if_block_anchor, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & /*selectedWorksite, validWorksiteTypes, getWorksiteRevenue, getWorksiteIcon*/
      12360) {
        each_value = ensure_array_like(
          /*validWorksiteTypes*/
          ctx2[6]
        );
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(div, null);
          }
        }
        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }
        each_blocks.length = each_value.length;
      }
      if (
        /*selectedWorksite*/
        ctx2[3]
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
        } else {
          if_block = create_if_block_1(ctx2);
          if_block.c();
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
    },
    d(detaching) {
      if (detaching) {
        detach(div);
        detach(t);
        detach(if_block_anchor);
      }
      destroy_each(each_blocks, detaching);
      if (if_block) if_block.d(detaching);
    }
  };
}
function create_if_block(ctx) {
  let p;
  return {
    c() {
      p = element("p");
      p.textContent = "No worksites available for this terrain.";
      attr(p, "class", "no-worksites svelte-prm-1vs932j");
    },
    m(target, anchor) {
      insert(target, p, anchor);
    },
    p: noop,
    d(detaching) {
      if (detaching) {
        detach(p);
      }
    }
  };
}
function create_if_block_3(ctx) {
  let div;
  let t_value = (
    /*revenue*/
    ctx[25] + ""
  );
  let t;
  return {
    c() {
      div = element("div");
      t = text(t_value);
      attr(div, "class", "worksite-revenue svelte-prm-1vs932j");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      append(div, t);
    },
    p(ctx2, dirty) {
      if (dirty & /*validWorksiteTypes*/
      64 && t_value !== (t_value = /*revenue*/
      ctx2[25] + "")) set_data(t, t_value);
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
    }
  };
}
function create_if_block_2(ctx) {
  let div;
  return {
    c() {
      div = element("div");
      div.innerHTML = `<i class="fa-solid fa-check"></i>`;
      attr(div, "class", "selected-badge svelte-prm-1vs932j");
    },
    m(target, anchor) {
      insert(target, div, anchor);
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
    }
  };
}
function create_each_block(ctx) {
  let button;
  let i;
  let i_class_value;
  let t0;
  let div;
  let t1_value = (
    /*type*/
    ctx[22] + ""
  );
  let t1;
  let t2;
  let t3;
  let t4;
  let mounted;
  let dispose;
  let if_block0 = (
    /*revenue*/
    ctx[25] && create_if_block_3(ctx)
  );
  let if_block1 = (
    /*isSelected*/
    ctx[23] && create_if_block_2()
  );
  function click_handler() {
    return (
      /*click_handler*/
      ctx[19](
        /*type*/
        ctx[22]
      )
    );
  }
  return {
    c() {
      button = element("button");
      i = element("i");
      t0 = space();
      div = element("div");
      t1 = text(t1_value);
      t2 = space();
      if (if_block0) if_block0.c();
      t3 = space();
      if (if_block1) if_block1.c();
      t4 = space();
      attr(i, "class", i_class_value = "fas " + /*icon*/
      ctx[24] + " worksite-icon svelte-prm-1vs932j");
      attr(div, "class", "worksite-name svelte-prm-1vs932j");
      attr(button, "class", "worksite-box svelte-prm-1vs932j");
      toggle_class(
        button,
        "selected",
        /*isSelected*/
        ctx[23]
      );
    },
    m(target, anchor) {
      insert(target, button, anchor);
      append(button, i);
      append(button, t0);
      append(button, div);
      append(div, t1);
      append(button, t2);
      if (if_block0) if_block0.m(button, null);
      append(button, t3);
      if (if_block1) if_block1.m(button, null);
      append(button, t4);
      if (!mounted) {
        dispose = listen(button, "click", click_handler);
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty & /*validWorksiteTypes*/
      64 && i_class_value !== (i_class_value = "fas " + /*icon*/
      ctx[24] + " worksite-icon svelte-prm-1vs932j")) {
        attr(i, "class", i_class_value);
      }
      if (dirty & /*validWorksiteTypes*/
      64 && t1_value !== (t1_value = /*type*/
      ctx[22] + "")) set_data(t1, t1_value);
      if (
        /*revenue*/
        ctx[25]
      ) {
        if (if_block0) {
          if_block0.p(ctx, dirty);
        } else {
          if_block0 = create_if_block_3(ctx);
          if_block0.c();
          if_block0.m(button, t3);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }
      if (
        /*isSelected*/
        ctx[23]
      ) {
        if (if_block1) ;
        else {
          if_block1 = create_if_block_2();
          if_block1.c();
          if_block1.m(button, t4);
        }
      } else if (if_block1) {
        if_block1.d(1);
        if_block1 = null;
      }
      if (dirty & /*selectedWorksite, validWorksiteTypes*/
      72) {
        toggle_class(
          button,
          "selected",
          /*isSelected*/
          ctx[23]
        );
      }
    },
    d(detaching) {
      if (detaching) {
        detach(button);
      }
      if (if_block0) if_block0.d();
      if (if_block1) if_block1.d();
      mounted = false;
      dispose();
    }
  };
}
function create_if_block_1(ctx) {
  let div;
  let t0;
  let t1;
  return {
    c() {
      div = element("div");
      t0 = text("Selected: ");
      t1 = text(
        /*selectedWorksite*/
        ctx[3]
      );
      attr(div, "class", "selection-summary svelte-prm-1vs932j");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      append(div, t0);
      append(div, t1);
    },
    p(ctx2, dirty) {
      if (dirty & /*selectedWorksite*/
      8) set_data(
        t1,
        /*selectedWorksite*/
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
function create_default_slot(ctx) {
  let div0;
  let p0;
  let t0;
  let strong;
  let t1;
  let t2;
  let t3;
  let div7;
  let div1;
  let t5;
  let div6;
  let button0;
  let div3;
  let i0;
  let t6;
  let div2;
  let t7;
  let t8;
  let t9;
  let button1;
  let div5;
  let i1;
  let t10;
  let div4;
  let t11;
  let t12;
  let t13;
  let div8;
  let p1;
  let t14;
  let span;
  let t15;
  let t16;
  let t17;
  let t18;
  let mounted;
  let dispose;
  function select_block_type(ctx2, dirty) {
    if (
      /*goldRolled*/
      ctx2[4]
    ) return create_if_block_5;
    return create_else_block_2;
  }
  let current_block_type = select_block_type(ctx);
  let if_block0 = current_block_type(ctx);
  function select_block_type_1(ctx2, dirty) {
    if (
      /*unrestRolled*/
      ctx2[5]
    ) return create_if_block_4;
    return create_else_block_1;
  }
  let current_block_type_1 = select_block_type_1(ctx);
  let if_block1 = current_block_type_1(ctx);
  function select_block_type_2(ctx2, dirty) {
    if (
      /*validWorksiteTypes*/
      ctx2[6].length === 0
    ) return create_if_block;
    return create_else_block;
  }
  let current_block_type_2 = select_block_type_2(ctx);
  let if_block2 = current_block_type_2(ctx);
  return {
    c() {
      div0 = element("div");
      p0 = element("p");
      t0 = text("Citizens celebrate as hex ");
      strong = element("strong");
      t1 = text(
        /*hexId*/
        ctx[1]
      );
      t2 = text(" has been claimed!");
      t3 = space();
      div7 = element("div");
      div1 = element("div");
      div1.textContent = "Rewards:";
      t5 = space();
      div6 = element("div");
      button0 = element("button");
      div3 = element("div");
      i0 = element("i");
      t6 = space();
      div2 = element("div");
      t7 = text("Gain \n            ");
      if_block0.c();
      t8 = text("\n            Gold");
      t9 = space();
      button1 = element("button");
      div5 = element("div");
      i1 = element("i");
      t10 = space();
      div4 = element("div");
      t11 = text("Lose \n            ");
      if_block1.c();
      t12 = text("\n            Unrest");
      t13 = space();
      div8 = element("div");
      p1 = element("p");
      t14 = text("Choose a free worksite ");
      span = element("span");
      t15 = text("(");
      t16 = text(
        /*terrain*/
        ctx[2]
      );
      t17 = text(")");
      t18 = space();
      if_block2.c();
      attr(strong, "class", "svelte-prm-1vs932j");
      attr(p0, "class", "svelte-prm-1vs932j");
      attr(div0, "class", "message svelte-prm-1vs932j");
      attr(div1, "class", "dice-rollers-header svelte-prm-1vs932j");
      attr(i0, "class", "fas " + getResourceIcon("gold") + " resource-icon gold-icon svelte-prm-1vs932j");
      attr(div2, "class", "text svelte-prm-1vs932j");
      attr(div3, "class", "content svelte-prm-1vs932j");
      attr(button0, "class", "outcome-badge variant-positive svelte-prm-1vs932j");
      button0.disabled = /*goldRolled*/
      ctx[4];
      toggle_class(button0, "clickable", !/*goldRolled*/
      ctx[4]);
      toggle_class(
        button0,
        "rolled",
        /*goldRolled*/
        ctx[4]
      );
      attr(i1, "class", "fas " + getResourceIcon("unrest") + " resource-icon svelte-prm-1vs932j");
      attr(div4, "class", "text svelte-prm-1vs932j");
      attr(div5, "class", "content svelte-prm-1vs932j");
      attr(button1, "class", "outcome-badge variant-positive svelte-prm-1vs932j");
      button1.disabled = /*unrestRolled*/
      ctx[5];
      toggle_class(button1, "clickable", !/*unrestRolled*/
      ctx[5]);
      toggle_class(
        button1,
        "rolled",
        /*unrestRolled*/
        ctx[5]
      );
      attr(div6, "class", "outcome-badges svelte-prm-1vs932j");
      attr(div7, "class", "dice-rollers-section svelte-prm-1vs932j");
      attr(span, "class", "terrain-hint svelte-prm-1vs932j");
      attr(p1, "class", "section-label svelte-prm-1vs932j");
      attr(div8, "class", "worksite-section svelte-prm-1vs932j");
    },
    m(target, anchor) {
      insert(target, div0, anchor);
      append(div0, p0);
      append(p0, t0);
      append(p0, strong);
      append(strong, t1);
      append(p0, t2);
      insert(target, t3, anchor);
      insert(target, div7, anchor);
      append(div7, div1);
      append(div7, t5);
      append(div7, div6);
      append(div6, button0);
      append(button0, div3);
      append(div3, i0);
      append(div3, t6);
      append(div3, div2);
      append(div2, t7);
      if_block0.m(div2, null);
      append(div2, t8);
      append(div6, t9);
      append(div6, button1);
      append(button1, div5);
      append(div5, i1);
      append(div5, t10);
      append(div5, div4);
      append(div4, t11);
      if_block1.m(div4, null);
      append(div4, t12);
      insert(target, t13, anchor);
      insert(target, div8, anchor);
      append(div8, p1);
      append(p1, t14);
      append(p1, span);
      append(span, t15);
      append(span, t16);
      append(span, t17);
      append(div8, t18);
      if_block2.m(div8, null);
      if (!mounted) {
        dispose = [
          listen(
            button0,
            "click",
            /*rollGold*/
            ctx[10]
          ),
          listen(
            button1,
            "click",
            /*rollUnrest*/
            ctx[11]
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (dirty & /*hexId*/
      2) set_data(
        t1,
        /*hexId*/
        ctx2[1]
      );
      if (current_block_type === (current_block_type = select_block_type(ctx2)) && if_block0) {
        if_block0.p(ctx2, dirty);
      } else {
        if_block0.d(1);
        if_block0 = current_block_type(ctx2);
        if (if_block0) {
          if_block0.c();
          if_block0.m(div2, t8);
        }
      }
      if (dirty & /*goldRolled*/
      16) {
        button0.disabled = /*goldRolled*/
        ctx2[4];
      }
      if (dirty & /*goldRolled*/
      16) {
        toggle_class(button0, "clickable", !/*goldRolled*/
        ctx2[4]);
      }
      if (dirty & /*goldRolled*/
      16) {
        toggle_class(
          button0,
          "rolled",
          /*goldRolled*/
          ctx2[4]
        );
      }
      if (current_block_type_1 === (current_block_type_1 = select_block_type_1(ctx2)) && if_block1) {
        if_block1.p(ctx2, dirty);
      } else {
        if_block1.d(1);
        if_block1 = current_block_type_1(ctx2);
        if (if_block1) {
          if_block1.c();
          if_block1.m(div4, t12);
        }
      }
      if (dirty & /*unrestRolled*/
      32) {
        button1.disabled = /*unrestRolled*/
        ctx2[5];
      }
      if (dirty & /*unrestRolled*/
      32) {
        toggle_class(button1, "clickable", !/*unrestRolled*/
        ctx2[5]);
      }
      if (dirty & /*unrestRolled*/
      32) {
        toggle_class(
          button1,
          "rolled",
          /*unrestRolled*/
          ctx2[5]
        );
      }
      if (dirty & /*terrain*/
      4) set_data(
        t16,
        /*terrain*/
        ctx2[2]
      );
      if (current_block_type_2 === (current_block_type_2 = select_block_type_2(ctx2)) && if_block2) {
        if_block2.p(ctx2, dirty);
      } else {
        if_block2.d(1);
        if_block2 = current_block_type_2(ctx2);
        if (if_block2) {
          if_block2.c();
          if_block2.m(div8, null);
        }
      }
    },
    d(detaching) {
      if (detaching) {
        detach(div0);
        detach(t3);
        detach(div7);
        detach(t13);
        detach(div8);
      }
      if_block0.d();
      if_block1.d();
      if_block2.d();
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
    ctx[20](value);
  }
  let dialog_props = {
    title: "Demand Fulfilled",
    confirmLabel: "Claim Rewards",
    cancelLabel: "Cancel",
    confirmDisabled: (
      /*confirmDisabled*/
      ctx[9]
    ),
    onConfirm: (
      /*handleConfirm*/
      ctx[14]
    ),
    onCancel: (
      /*handleCancel*/
      ctx[15]
    ),
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
      512) dialog_changes.confirmDisabled = /*confirmDisabled*/
      ctx2[9];
      if (dirty & /*$$scope, validWorksiteTypes, selectedWorksite, terrain, unrestRolled, unrestValue, goldRolled, goldValue, hexId*/
      268435966) {
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
  let validWorksiteTypes;
  let allDiceRolled;
  let worksiteRequired;
  let worksiteSelected;
  let confirmDisabled;
  let { show = true } = $$props;
  let { hexId } = $$props;
  let { terrain } = $$props;
  const dispatch = createEventDispatcher();
  let selectedWorksite = null;
  let goldRolled = false;
  let unrestRolled = false;
  let goldValue = null;
  let unrestValue = null;
  function rollGold() {
    if (goldRolled) return;
    $$invalidate(7, goldValue = rollDiceFormula("2d3"));
    $$invalidate(4, goldRolled = true);
  }
  function rollUnrest() {
    if (unrestRolled) return;
    $$invalidate(8, unrestValue = rollDiceFormula("1d3"));
    $$invalidate(5, unrestRolled = true);
  }
  function getWorksiteIcon(type) {
    switch (type) {
      case "Farmstead":
        return getResourceIcon("food");
      case "Logging Camp":
        return getResourceIcon("lumber");
      case "Mine":
        return getResourceIcon("ore");
      case "Quarry":
        return getResourceIcon("stone");
      default:
        return "fa-box";
    }
  }
  function getWorksiteRevenue(type) {
    return getWorksiteProductionDisplay(type, terrain.toLowerCase());
  }
  function handleConfirm() {
    if (confirmDisabled) return;
    dispatch("selection", {
      goldBonus: goldValue,
      unrestReduction: unrestValue,
      worksiteType: selectedWorksite
    });
    $$invalidate(0, show = false);
  }
  function handleCancel() {
    dispatch("cancel");
    $$invalidate(0, show = false);
  }
  const click_handler = (type) => $$invalidate(3, selectedWorksite = type);
  function dialog_show_binding(value) {
    show = value;
    $$invalidate(0, show);
  }
  $$self.$$set = ($$props2) => {
    if ("show" in $$props2) $$invalidate(0, show = $$props2.show);
    if ("hexId" in $$props2) $$invalidate(1, hexId = $$props2.hexId);
    if ("terrain" in $$props2) $$invalidate(2, terrain = $$props2.terrain);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*hexId*/
    2) {
      $$invalidate(6, validWorksiteTypes = getValidWorksiteTypes(hexId));
    }
    if ($$self.$$.dirty & /*goldRolled, unrestRolled*/
    48) {
      $$invalidate(18, allDiceRolled = goldRolled && unrestRolled);
    }
    if ($$self.$$.dirty & /*validWorksiteTypes*/
    64) {
      $$invalidate(17, worksiteRequired = validWorksiteTypes.length > 0);
    }
    if ($$self.$$.dirty & /*selectedWorksite*/
    8) {
      $$invalidate(16, worksiteSelected = selectedWorksite !== null);
    }
    if ($$self.$$.dirty & /*allDiceRolled, worksiteRequired, worksiteSelected*/
    458752) {
      $$invalidate(9, confirmDisabled = !allDiceRolled || worksiteRequired && !worksiteSelected);
    }
  };
  return [
    show,
    hexId,
    terrain,
    selectedWorksite,
    goldRolled,
    unrestRolled,
    validWorksiteTypes,
    goldValue,
    unrestValue,
    confirmDisabled,
    rollGold,
    rollUnrest,
    getWorksiteIcon,
    getWorksiteRevenue,
    handleConfirm,
    handleCancel,
    worksiteSelected,
    worksiteRequired,
    allDiceRolled,
    click_handler,
    dialog_show_binding
  ];
}
class DemandFulfilledResolution extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, { show: 0, hexId: 1, terrain: 2 });
  }
}
export {
  DemandFulfilledResolution as default
};
