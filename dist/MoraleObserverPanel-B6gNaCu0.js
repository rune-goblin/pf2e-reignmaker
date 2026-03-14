import { aw as SvelteComponent, ax as init, ay as safe_not_equal, az as noop, aA as detach, aB as insert, aC as element, aD as attr, aE as set_data, aF as append, aG as space, aH as text, aI as ensure_array_like, aJ as destroy_each, aK as listen, aL as is_function, aM as set_style, aN as toggle_class, $ as MORALE_OUTCOMES, aO as src_url_equal, aP as empty } from "./GameCommandUtils-D_sgs3NK.js";
function get_each_context_1(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[20] = list[i];
  const constants_0 = (
    /*armyStatus*/
    child_ctx[20].result
  );
  child_ctx[21] = constants_0;
  const constants_1 = (
    /*result*/
    child_ctx[21] ? (
      /*outcomeColors*/
      child_ctx[13][
        /*result*/
        child_ctx[21].outcome
      ]
    ) : "#999"
  );
  child_ctx[22] = constants_1;
  const constants_2 = (
    /*result*/
    child_ctx[21] ? (
      /*outcomeLabels*/
      child_ctx[14][
        /*result*/
        child_ctx[21].outcome
      ]
    ) : "Unknown"
  );
  child_ctx[23] = constants_2;
  return child_ctx;
}
function get_each_context_2(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[20] = list[i];
  return child_ctx;
}
function get_each_context(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[20] = list[i];
  const constants_0 = (
    /*armyStatus*/
    child_ctx[20].result
  );
  child_ctx[21] = constants_0;
  const constants_1 = (
    /*result*/
    child_ctx[21] ? (
      /*outcomeColors*/
      child_ctx[13][
        /*result*/
        child_ctx[21].outcome
      ]
    ) : "#999"
  );
  child_ctx[22] = constants_1;
  const constants_2 = (
    /*result*/
    child_ctx[21] ? (
      /*outcomeLabels*/
      child_ctx[14][
        /*result*/
        child_ctx[21].outcome
      ]
    ) : "Unknown"
  );
  child_ctx[23] = constants_2;
  const constants_3 = (
    /*result*/
    child_ctx[21] ? MORALE_OUTCOMES[
      /*result*/
      child_ctx[21].outcome
    ] : null
  );
  child_ctx[24] = constants_3;
  return child_ctx;
}
function create_else_block_1(ctx) {
  let div2;
  let h3;
  let i0;
  let t0;
  let t1_value = (
    /*state*/
    ctx[0].title + ""
  );
  let t1;
  let t2;
  let div0;
  let i1;
  let t3;
  let span0;
  let t4;
  let t5_value = (
    /*state*/
    ctx[0].initiatorName + ""
  );
  let t5;
  let t6;
  let t7;
  let div1;
  let i2;
  let t8;
  let span1;
  let t9;
  let t10;
  let t11;
  let t12;
  let t13;
  let div3;
  function select_block_type_2(ctx2, dirty) {
    if (
      /*myCharacterCheck*/
      ctx2[4]
    ) return create_if_block_13;
    return create_else_block_5;
  }
  let current_block_type = select_block_type_2(ctx);
  let if_block0 = current_block_type(ctx);
  function select_block_type_3(ctx2, dirty) {
    if (
      /*pendingArmies*/
      ctx2[10].length === 0 && /*completedArmies*/
      ctx2[9].length === 0
    ) return create_if_block_7;
    return create_else_block_2;
  }
  let current_block_type_1 = select_block_type_3(ctx);
  let if_block1 = current_block_type_1(ctx);
  return {
    c() {
      div2 = element("div");
      h3 = element("h3");
      i0 = element("i");
      t0 = space();
      t1 = text(t1_value);
      t2 = space();
      div0 = element("div");
      i1 = element("i");
      t3 = space();
      span0 = element("span");
      t4 = text("Started by ");
      t5 = text(t5_value);
      t6 = space();
      if_block0.c();
      t7 = space();
      div1 = element("div");
      i2 = element("i");
      t8 = space();
      span1 = element("span");
      t9 = text("Characters Used: ");
      t10 = text(
        /*usedCheckCount*/
        ctx[7]
      );
      t11 = text("/");
      t12 = text(
        /*totalCharacterCount*/
        ctx[6]
      );
      t13 = space();
      div3 = element("div");
      if_block1.c();
      attr(i0, "class", "fas fa-flag");
      attr(h3, "class", "svelte-prm-1a6tw77");
      attr(i1, "class", "fas fa-crown svelte-prm-1a6tw77");
      attr(div0, "class", "initiator-info svelte-prm-1a6tw77");
      attr(i2, "class", "fas fa-users svelte-prm-1a6tw77");
      attr(div1, "class", "character-usage svelte-prm-1a6tw77");
      attr(div2, "class", "panel-header svelte-prm-1a6tw77");
      attr(div3, "class", "army-list svelte-prm-1a6tw77");
    },
    m(target, anchor) {
      insert(target, div2, anchor);
      append(div2, h3);
      append(h3, i0);
      append(h3, t0);
      append(h3, t1);
      append(div2, t2);
      append(div2, div0);
      append(div0, i1);
      append(div0, t3);
      append(div0, span0);
      append(span0, t4);
      append(span0, t5);
      append(div2, t6);
      if_block0.m(div2, null);
      append(div2, t7);
      append(div2, div1);
      append(div1, i2);
      append(div1, t8);
      append(div1, span1);
      append(span1, t9);
      append(span1, t10);
      append(span1, t11);
      append(span1, t12);
      insert(target, t13, anchor);
      insert(target, div3, anchor);
      if_block1.m(div3, null);
    },
    p(ctx2, dirty) {
      if (dirty & /*state*/
      1 && t1_value !== (t1_value = /*state*/
      ctx2[0].title + "")) set_data(t1, t1_value);
      if (dirty & /*state*/
      1 && t5_value !== (t5_value = /*state*/
      ctx2[0].initiatorName + "")) set_data(t5, t5_value);
      if (current_block_type === (current_block_type = select_block_type_2(ctx2)) && if_block0) {
        if_block0.p(ctx2, dirty);
      } else {
        if_block0.d(1);
        if_block0 = current_block_type(ctx2);
        if (if_block0) {
          if_block0.c();
          if_block0.m(div2, t7);
        }
      }
      if (dirty & /*usedCheckCount*/
      128) set_data(
        t10,
        /*usedCheckCount*/
        ctx2[7]
      );
      if (dirty & /*totalCharacterCount*/
      64) set_data(
        t12,
        /*totalCharacterCount*/
        ctx2[6]
      );
      if (current_block_type_1 === (current_block_type_1 = select_block_type_3(ctx2)) && if_block1) {
        if_block1.p(ctx2, dirty);
      } else {
        if_block1.d(1);
        if_block1 = current_block_type_1(ctx2);
        if (if_block1) {
          if_block1.c();
          if_block1.m(div3, null);
        }
      }
    },
    d(detaching) {
      if (detaching) {
        detach(div2);
        detach(t13);
        detach(div3);
      }
      if_block0.d();
      if_block1.d();
    }
  };
}
function create_if_block_2(ctx) {
  let div0;
  let h3;
  let i0;
  let t0;
  let t1_value = (
    /*state*/
    ctx[0].title + ""
  );
  let t1;
  let t2;
  let t3;
  let div2;
  let div1;
  let t4;
  let button;
  let mounted;
  let dispose;
  let each_value = ensure_array_like(
    /*completedArmies*/
    ctx[9]
  );
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
  }
  return {
    c() {
      div0 = element("div");
      h3 = element("h3");
      i0 = element("i");
      t0 = space();
      t1 = text(t1_value);
      t2 = text(" Complete");
      t3 = space();
      div2 = element("div");
      div1 = element("div");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      t4 = space();
      button = element("button");
      button.innerHTML = `<i class="fas fa-check"></i> Done`;
      attr(i0, "class", "fas fa-check-circle");
      attr(h3, "class", "svelte-prm-1a6tw77");
      attr(div0, "class", "panel-header svelte-prm-1a6tw77");
      attr(div1, "class", "results-summary svelte-prm-1a6tw77");
      attr(button, "class", "btn-done svelte-prm-1a6tw77");
      attr(div2, "class", "result-content svelte-prm-1a6tw77");
    },
    m(target, anchor) {
      insert(target, div0, anchor);
      append(div0, h3);
      append(h3, i0);
      append(h3, t0);
      append(h3, t1);
      append(h3, t2);
      insert(target, t3, anchor);
      insert(target, div2, anchor);
      append(div2, div1);
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(div1, null);
        }
      }
      append(div2, t4);
      append(div2, button);
      if (!mounted) {
        dispose = listen(button, "click", function() {
          if (is_function(
            /*onDone*/
            ctx[1]
          )) ctx[1].apply(this, arguments);
        });
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty & /*state*/
      1 && t1_value !== (t1_value = /*state*/
      ctx[0].title + "")) set_data(t1, t1_value);
      if (dirty & /*completedArmies, outcomeColors, outcomeLabels*/
      25088) {
        each_value = ensure_array_like(
          /*completedArmies*/
          ctx[9]
        );
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context(ctx, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(div1, null);
          }
        }
        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }
        each_blocks.length = each_value.length;
      }
    },
    d(detaching) {
      if (detaching) {
        detach(div0);
        detach(t3);
        detach(div2);
      }
      destroy_each(each_blocks, detaching);
      mounted = false;
      dispose();
    }
  };
}
function create_if_block(ctx) {
  let div0;
  let h3;
  let i0;
  let t0;
  let t1_value = (
    /*state*/
    ctx[0].title + ""
  );
  let t1;
  let t2;
  let t3;
  let div2;
  let div1;
  let t4;
  let span;
  let t5_value = (
    /*checkingArmy*/
    ctx[2].army.name + ""
  );
  let t5;
  let t6;
  let i1;
  let t7;
  let p;
  function select_block_type_1(ctx2, dirty) {
    if (
      /*checkingArmy*/
      ctx2[2].tokenImage
    ) return create_if_block_1;
    return create_else_block;
  }
  let current_block_type = select_block_type_1(ctx);
  let if_block = current_block_type(ctx);
  return {
    c() {
      div0 = element("div");
      h3 = element("h3");
      i0 = element("i");
      t0 = space();
      t1 = text(t1_value);
      t2 = text(" - Rolling");
      t3 = space();
      div2 = element("div");
      div1 = element("div");
      if_block.c();
      t4 = space();
      span = element("span");
      t5 = text(t5_value);
      t6 = space();
      i1 = element("i");
      t7 = space();
      p = element("p");
      p.textContent = "Waiting for roll to complete...";
      attr(i0, "class", "fas fa-dice-d20");
      attr(h3, "class", "svelte-prm-1a6tw77");
      attr(div0, "class", "panel-header svelte-prm-1a6tw77");
      attr(span, "class", "army-name svelte-prm-1a6tw77");
      attr(div1, "class", "checking-army svelte-prm-1a6tw77");
      attr(i1, "class", "fas fa-spinner fa-spin waiting-spinner svelte-prm-1a6tw77");
      attr(p, "class", "svelte-prm-1a6tw77");
      attr(div2, "class", "waiting-content svelte-prm-1a6tw77");
    },
    m(target, anchor) {
      insert(target, div0, anchor);
      append(div0, h3);
      append(h3, i0);
      append(h3, t0);
      append(h3, t1);
      append(h3, t2);
      insert(target, t3, anchor);
      insert(target, div2, anchor);
      append(div2, div1);
      if_block.m(div1, null);
      append(div1, t4);
      append(div1, span);
      append(span, t5);
      append(div2, t6);
      append(div2, i1);
      append(div2, t7);
      append(div2, p);
    },
    p(ctx2, dirty) {
      if (dirty & /*state*/
      1 && t1_value !== (t1_value = /*state*/
      ctx2[0].title + "")) set_data(t1, t1_value);
      if (current_block_type === (current_block_type = select_block_type_1(ctx2)) && if_block) {
        if_block.p(ctx2, dirty);
      } else {
        if_block.d(1);
        if_block = current_block_type(ctx2);
        if (if_block) {
          if_block.c();
          if_block.m(div1, t4);
        }
      }
      if (dirty & /*checkingArmy*/
      4 && t5_value !== (t5_value = /*checkingArmy*/
      ctx2[2].army.name + "")) set_data(t5, t5_value);
    },
    d(detaching) {
      if (detaching) {
        detach(div0);
        detach(t3);
        detach(div2);
      }
      if_block.d();
    }
  };
}
function create_else_block_5(ctx) {
  let div;
  return {
    c() {
      div = element("div");
      div.innerHTML = `<i class="fas fa-exclamation-triangle"></i> <span>No character assigned</span>`;
      attr(div, "class", "no-character svelte-prm-1a6tw77");
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
function create_if_block_13(ctx) {
  let div;
  let i;
  let t0;
  let span0;
  let t1_value = (
    /*myCharacterCheck*/
    ctx[4].characterName + ""
  );
  let t1;
  let t2;
  let span1;
  let t3;
  let t4;
  let span2;
  let t5;
  let t6;
  let t7;
  let if_block = (
    /*hasUsedCheck*/
    ctx[3] && create_if_block_14()
  );
  return {
    c() {
      div = element("div");
      i = element("i");
      t0 = space();
      span0 = element("span");
      t1 = text(t1_value);
      t2 = space();
      span1 = element("span");
      t3 = text(
        /*displaySkill*/
        ctx[11]
      );
      t4 = space();
      span2 = element("span");
      t5 = text("+");
      t6 = text(
        /*displayBonus*/
        ctx[12]
      );
      t7 = space();
      if (if_block) if_block.c();
      attr(i, "class", "fas fa-user svelte-prm-1a6tw77");
      attr(span0, "class", "character-name svelte-prm-1a6tw77");
      attr(span1, "class", "character-skill svelte-prm-1a6tw77");
      attr(span2, "class", "character-bonus svelte-prm-1a6tw77");
      attr(div, "class", "my-character svelte-prm-1a6tw77");
      toggle_class(
        div,
        "check-used",
        /*hasUsedCheck*/
        ctx[3]
      );
    },
    m(target, anchor) {
      insert(target, div, anchor);
      append(div, i);
      append(div, t0);
      append(div, span0);
      append(span0, t1);
      append(div, t2);
      append(div, span1);
      append(span1, t3);
      append(div, t4);
      append(div, span2);
      append(span2, t5);
      append(span2, t6);
      append(div, t7);
      if (if_block) if_block.m(div, null);
    },
    p(ctx2, dirty) {
      if (dirty & /*myCharacterCheck*/
      16 && t1_value !== (t1_value = /*myCharacterCheck*/
      ctx2[4].characterName + "")) set_data(t1, t1_value);
      if (dirty & /*displaySkill*/
      2048) set_data(
        t3,
        /*displaySkill*/
        ctx2[11]
      );
      if (dirty & /*displayBonus*/
      4096) set_data(
        t6,
        /*displayBonus*/
        ctx2[12]
      );
      if (
        /*hasUsedCheck*/
        ctx2[3]
      ) {
        if (if_block) ;
        else {
          if_block = create_if_block_14();
          if_block.c();
          if_block.m(div, null);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
      if (dirty & /*hasUsedCheck*/
      8) {
        toggle_class(
          div,
          "check-used",
          /*hasUsedCheck*/
          ctx2[3]
        );
      }
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      if (if_block) if_block.d();
    }
  };
}
function create_if_block_14(ctx) {
  let span;
  return {
    c() {
      span = element("span");
      span.textContent = "Used";
      attr(span, "class", "check-used-badge svelte-prm-1a6tw77");
    },
    m(target, anchor) {
      insert(target, span, anchor);
    },
    d(detaching) {
      if (detaching) {
        detach(span);
      }
    }
  };
}
function create_else_block_2(ctx) {
  let t;
  let if_block_anchor;
  let each_value_2 = ensure_array_like(
    /*pendingArmies*/
    ctx[10]
  );
  let each_blocks = [];
  for (let i = 0; i < each_value_2.length; i += 1) {
    each_blocks[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
  }
  let if_block = (
    /*completedArmies*/
    ctx[9].length > 0 && create_if_block_8(ctx)
  );
  return {
    c() {
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      t = space();
      if (if_block) if_block.c();
      if_block_anchor = empty();
    },
    m(target, anchor) {
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(target, anchor);
        }
      }
      insert(target, t, anchor);
      if (if_block) if_block.m(target, anchor);
      insert(target, if_block_anchor, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & /*isCheckDisabled, hasUsedCheck, handleCheckMorale, pendingArmies, displayBonus, myCharacterCheck*/
      37944) {
        each_value_2 = ensure_array_like(
          /*pendingArmies*/
          ctx2[10]
        );
        let i;
        for (i = 0; i < each_value_2.length; i += 1) {
          const child_ctx = get_each_context_2(ctx2, each_value_2, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block_2(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(t.parentNode, t);
          }
        }
        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }
        each_blocks.length = each_value_2.length;
      }
      if (
        /*completedArmies*/
        ctx2[9].length > 0
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
        } else {
          if_block = create_if_block_8(ctx2);
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
        detach(t);
        detach(if_block_anchor);
      }
      destroy_each(each_blocks, detaching);
      if (if_block) if_block.d(detaching);
    }
  };
}
function create_if_block_7(ctx) {
  let p;
  return {
    c() {
      p = element("p");
      p.textContent = "No armies require morale checks";
      attr(p, "class", "empty-message svelte-prm-1a6tw77");
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
function create_else_block_4(ctx) {
  let i;
  return {
    c() {
      i = element("i");
      attr(i, "class", "fas fa-users army-placeholder-icon svelte-prm-1a6tw77");
    },
    m(target, anchor) {
      insert(target, i, anchor);
    },
    p: noop,
    d(detaching) {
      if (detaching) {
        detach(i);
      }
    }
  };
}
function create_if_block_12(ctx) {
  let img;
  let img_src_value;
  let img_alt_value;
  return {
    c() {
      img = element("img");
      if (!src_url_equal(img.src, img_src_value = /*armyStatus*/
      ctx[20].tokenImage)) attr(img, "src", img_src_value);
      attr(img, "alt", img_alt_value = /*armyStatus*/
      ctx[20].army.name);
      attr(img, "class", "army-token-image svelte-prm-1a6tw77");
    },
    m(target, anchor) {
      insert(target, img, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & /*pendingArmies*/
      1024 && !src_url_equal(img.src, img_src_value = /*armyStatus*/
      ctx2[20].tokenImage)) {
        attr(img, "src", img_src_value);
      }
      if (dirty & /*pendingArmies*/
      1024 && img_alt_value !== (img_alt_value = /*armyStatus*/
      ctx2[20].army.name)) {
        attr(img, "alt", img_alt_value);
      }
    },
    d(detaching) {
      if (detaching) {
        detach(img);
      }
    }
  };
}
function create_if_block_11(ctx) {
  let button;
  let i;
  let t0;
  let t1;
  let t2;
  let button_title_value;
  let mounted;
  let dispose;
  function click_handler() {
    return (
      /*click_handler*/
      ctx[17](
        /*armyStatus*/
        ctx[20]
      )
    );
  }
  return {
    c() {
      button = element("button");
      i = element("i");
      t0 = text("\n                Check Morale [+");
      t1 = text(
        /*displayBonus*/
        ctx[12]
      );
      t2 = text("]");
      attr(i, "class", "fas fa-dice-d20");
      attr(button, "class", "btn-check-morale svelte-prm-1a6tw77");
      button.disabled = /*isCheckDisabled*/
      ctx[5];
      attr(button, "title", button_title_value = /*hasUsedCheck*/
      ctx[3] ? "You have already used your morale check this turn" : "");
    },
    m(target, anchor) {
      insert(target, button, anchor);
      append(button, i);
      append(button, t0);
      append(button, t1);
      append(button, t2);
      if (!mounted) {
        dispose = listen(button, "click", click_handler);
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty & /*displayBonus*/
      4096) set_data(
        t1,
        /*displayBonus*/
        ctx[12]
      );
      if (dirty & /*isCheckDisabled*/
      32) {
        button.disabled = /*isCheckDisabled*/
        ctx[5];
      }
      if (dirty & /*hasUsedCheck*/
      8 && button_title_value !== (button_title_value = /*hasUsedCheck*/
      ctx[3] ? "You have already used your morale check this turn" : "")) {
        attr(button, "title", button_title_value);
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
function create_each_block_2(ctx) {
  let div2;
  let div1;
  let t0;
  let div0;
  let span0;
  let t1_value = (
    /*armyStatus*/
    ctx[20].army.name + ""
  );
  let t1;
  let t2;
  let span1;
  let t3;
  let t4_value = (
    /*armyStatus*/
    ctx[20].army.level + ""
  );
  let t4;
  let t5;
  let t6;
  function select_block_type_4(ctx2, dirty) {
    if (
      /*armyStatus*/
      ctx2[20].tokenImage
    ) return create_if_block_12;
    return create_else_block_4;
  }
  let current_block_type = select_block_type_4(ctx);
  let if_block0 = current_block_type(ctx);
  let if_block1 = (
    /*myCharacterCheck*/
    ctx[4] && create_if_block_11(ctx)
  );
  return {
    c() {
      div2 = element("div");
      div1 = element("div");
      if_block0.c();
      t0 = space();
      div0 = element("div");
      span0 = element("span");
      t1 = text(t1_value);
      t2 = space();
      span1 = element("span");
      t3 = text("Level ");
      t4 = text(t4_value);
      t5 = space();
      if (if_block1) if_block1.c();
      t6 = space();
      attr(span0, "class", "army-name svelte-prm-1a6tw77");
      attr(span1, "class", "army-details svelte-prm-1a6tw77");
      attr(div0, "class", "army-info svelte-prm-1a6tw77");
      attr(div1, "class", "army-header svelte-prm-1a6tw77");
      attr(div2, "class", "army-item svelte-prm-1a6tw77");
    },
    m(target, anchor) {
      insert(target, div2, anchor);
      append(div2, div1);
      if_block0.m(div1, null);
      append(div1, t0);
      append(div1, div0);
      append(div0, span0);
      append(span0, t1);
      append(div0, t2);
      append(div0, span1);
      append(span1, t3);
      append(span1, t4);
      append(div2, t5);
      if (if_block1) if_block1.m(div2, null);
      append(div2, t6);
    },
    p(ctx2, dirty) {
      if (current_block_type === (current_block_type = select_block_type_4(ctx2)) && if_block0) {
        if_block0.p(ctx2, dirty);
      } else {
        if_block0.d(1);
        if_block0 = current_block_type(ctx2);
        if (if_block0) {
          if_block0.c();
          if_block0.m(div1, t0);
        }
      }
      if (dirty & /*pendingArmies*/
      1024 && t1_value !== (t1_value = /*armyStatus*/
      ctx2[20].army.name + "")) set_data(t1, t1_value);
      if (dirty & /*pendingArmies*/
      1024 && t4_value !== (t4_value = /*armyStatus*/
      ctx2[20].army.level + "")) set_data(t4, t4_value);
      if (
        /*myCharacterCheck*/
        ctx2[4]
      ) {
        if (if_block1) {
          if_block1.p(ctx2, dirty);
        } else {
          if_block1 = create_if_block_11(ctx2);
          if_block1.c();
          if_block1.m(div2, t6);
        }
      } else if (if_block1) {
        if_block1.d(1);
        if_block1 = null;
      }
    },
    d(detaching) {
      if (detaching) {
        detach(div2);
      }
      if_block0.d();
      if (if_block1) if_block1.d();
    }
  };
}
function create_if_block_8(ctx) {
  let div;
  let t1;
  let each_1_anchor;
  let each_value_1 = ensure_array_like(
    /*completedArmies*/
    ctx[9]
  );
  let each_blocks = [];
  for (let i = 0; i < each_value_1.length; i += 1) {
    each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
  }
  return {
    c() {
      div = element("div");
      div.innerHTML = `<p class="completed-label svelte-prm-1a6tw77">Completed</p>`;
      t1 = space();
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      each_1_anchor = empty();
      attr(div, "class", "completed-divider svelte-prm-1a6tw77");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      insert(target, t1, anchor);
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(target, anchor);
        }
      }
      insert(target, each_1_anchor, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & /*completedArmies, outcomeColors, outcomeLabels*/
      25088) {
        each_value_1 = ensure_array_like(
          /*completedArmies*/
          ctx2[9]
        );
        let i;
        for (i = 0; i < each_value_1.length; i += 1) {
          const child_ctx = get_each_context_1(ctx2, each_value_1, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block_1(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
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
        detach(t1);
        detach(each_1_anchor);
      }
      destroy_each(each_blocks, detaching);
    }
  };
}
function create_else_block_3(ctx) {
  let i;
  return {
    c() {
      i = element("i");
      attr(i, "class", "fas fa-users army-placeholder-icon svelte-prm-1a6tw77");
    },
    m(target, anchor) {
      insert(target, i, anchor);
    },
    p: noop,
    d(detaching) {
      if (detaching) {
        detach(i);
      }
    }
  };
}
function create_if_block_10(ctx) {
  let img;
  let img_src_value;
  let img_alt_value;
  return {
    c() {
      img = element("img");
      if (!src_url_equal(img.src, img_src_value = /*armyStatus*/
      ctx[20].tokenImage)) attr(img, "src", img_src_value);
      attr(img, "alt", img_alt_value = /*armyStatus*/
      ctx[20].army.name);
      attr(img, "class", "army-token-image svelte-prm-1a6tw77");
    },
    m(target, anchor) {
      insert(target, img, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & /*completedArmies*/
      512 && !src_url_equal(img.src, img_src_value = /*armyStatus*/
      ctx2[20].tokenImage)) {
        attr(img, "src", img_src_value);
      }
      if (dirty & /*completedArmies*/
      512 && img_alt_value !== (img_alt_value = /*armyStatus*/
      ctx2[20].army.name)) {
        attr(img, "alt", img_alt_value);
      }
    },
    d(detaching) {
      if (detaching) {
        detach(img);
      }
    }
  };
}
function create_if_block_9(ctx) {
  let span;
  let t0;
  let t1_value = (
    /*result*/
    ctx[21].actorName + ""
  );
  let t1;
  return {
    c() {
      span = element("span");
      t0 = text("Checked by ");
      t1 = text(t1_value);
      attr(span, "class", "army-checker svelte-prm-1a6tw77");
    },
    m(target, anchor) {
      insert(target, span, anchor);
      append(span, t0);
      append(span, t1);
    },
    p(ctx2, dirty) {
      if (dirty & /*completedArmies*/
      512 && t1_value !== (t1_value = /*result*/
      ctx2[21].actorName + "")) set_data(t1, t1_value);
    },
    d(detaching) {
      if (detaching) {
        detach(span);
      }
    }
  };
}
function create_each_block_1(ctx) {
  let div2;
  let div1;
  let t0;
  let div0;
  let span0;
  let t1_value = (
    /*armyStatus*/
    ctx[20].army.name + ""
  );
  let t1;
  let t2;
  let span1;
  let t3_value = (
    /*outcomeLabel*/
    ctx[23] + ""
  );
  let t3;
  let t4;
  let t5;
  function select_block_type_5(ctx2, dirty) {
    if (
      /*armyStatus*/
      ctx2[20].tokenImage
    ) return create_if_block_10;
    return create_else_block_3;
  }
  let current_block_type = select_block_type_5(ctx);
  let if_block0 = current_block_type(ctx);
  let if_block1 = (
    /*result*/
    ctx[21]?.actorName && /*result*/
    ctx[21].actorName !== "Auto-fail" && create_if_block_9(ctx)
  );
  return {
    c() {
      div2 = element("div");
      div1 = element("div");
      if_block0.c();
      t0 = space();
      div0 = element("div");
      span0 = element("span");
      t1 = text(t1_value);
      t2 = space();
      span1 = element("span");
      t3 = text(t3_value);
      t4 = space();
      if (if_block1) if_block1.c();
      t5 = space();
      attr(span0, "class", "army-name svelte-prm-1a6tw77");
      attr(span1, "class", "army-result svelte-prm-1a6tw77");
      set_style(
        span1,
        "color",
        /*outcomeColor*/
        ctx[22]
      );
      attr(div0, "class", "army-info svelte-prm-1a6tw77");
      attr(div1, "class", "army-header svelte-prm-1a6tw77");
      attr(div2, "class", "army-item completed svelte-prm-1a6tw77");
      toggle_class(
        div2,
        "disbanded",
        /*result*/
        ctx[21]?.disbanded
      );
    },
    m(target, anchor) {
      insert(target, div2, anchor);
      append(div2, div1);
      if_block0.m(div1, null);
      append(div1, t0);
      append(div1, div0);
      append(div0, span0);
      append(span0, t1);
      append(div0, t2);
      append(div0, span1);
      append(span1, t3);
      append(div0, t4);
      if (if_block1) if_block1.m(div0, null);
      append(div2, t5);
    },
    p(ctx2, dirty) {
      if (current_block_type === (current_block_type = select_block_type_5(ctx2)) && if_block0) {
        if_block0.p(ctx2, dirty);
      } else {
        if_block0.d(1);
        if_block0 = current_block_type(ctx2);
        if (if_block0) {
          if_block0.c();
          if_block0.m(div1, t0);
        }
      }
      if (dirty & /*completedArmies*/
      512 && t1_value !== (t1_value = /*armyStatus*/
      ctx2[20].army.name + "")) set_data(t1, t1_value);
      if (dirty & /*completedArmies*/
      512 && t3_value !== (t3_value = /*outcomeLabel*/
      ctx2[23] + "")) set_data(t3, t3_value);
      if (dirty & /*completedArmies*/
      512) {
        set_style(
          span1,
          "color",
          /*outcomeColor*/
          ctx2[22]
        );
      }
      if (
        /*result*/
        ctx2[21]?.actorName && /*result*/
        ctx2[21].actorName !== "Auto-fail"
      ) {
        if (if_block1) {
          if_block1.p(ctx2, dirty);
        } else {
          if_block1 = create_if_block_9(ctx2);
          if_block1.c();
          if_block1.m(div0, null);
        }
      } else if (if_block1) {
        if_block1.d(1);
        if_block1 = null;
      }
      if (dirty & /*completedArmies*/
      512) {
        toggle_class(
          div2,
          "disbanded",
          /*result*/
          ctx2[21]?.disbanded
        );
      }
    },
    d(detaching) {
      if (detaching) {
        detach(div2);
      }
      if_block0.d();
      if (if_block1) if_block1.d();
    }
  };
}
function create_if_block_3(ctx) {
  let div;
  let t0;
  let t1;
  let if_block0 = (
    /*outcomeData*/
    ctx[24].disband && create_if_block_6()
  );
  let if_block1 = (
    /*outcomeData*/
    ctx[24].unrest > 0 && create_if_block_5(ctx)
  );
  let if_block2 = (
    /*outcomeData*/
    ctx[24].resetUnsupported && create_if_block_4()
  );
  return {
    c() {
      div = element("div");
      if (if_block0) if_block0.c();
      t0 = space();
      if (if_block1) if_block1.c();
      t1 = space();
      if (if_block2) if_block2.c();
      attr(div, "class", "result-effects svelte-prm-1a6tw77");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      if (if_block0) if_block0.m(div, null);
      append(div, t0);
      if (if_block1) if_block1.m(div, null);
      append(div, t1);
      if (if_block2) if_block2.m(div, null);
    },
    p(ctx2, dirty) {
      if (
        /*outcomeData*/
        ctx2[24].disband
      ) {
        if (if_block0) ;
        else {
          if_block0 = create_if_block_6();
          if_block0.c();
          if_block0.m(div, t0);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }
      if (
        /*outcomeData*/
        ctx2[24].unrest > 0
      ) {
        if (if_block1) {
          if_block1.p(ctx2, dirty);
        } else {
          if_block1 = create_if_block_5(ctx2);
          if_block1.c();
          if_block1.m(div, t1);
        }
      } else if (if_block1) {
        if_block1.d(1);
        if_block1 = null;
      }
      if (
        /*outcomeData*/
        ctx2[24].resetUnsupported
      ) {
        if (if_block2) ;
        else {
          if_block2 = create_if_block_4();
          if_block2.c();
          if_block2.m(div, null);
        }
      } else if (if_block2) {
        if_block2.d(1);
        if_block2 = null;
      }
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      if (if_block0) if_block0.d();
      if (if_block1) if_block1.d();
      if (if_block2) if_block2.d();
    }
  };
}
function create_if_block_6(ctx) {
  let span;
  return {
    c() {
      span = element("span");
      span.textContent = "Disbanded";
      attr(span, "class", "effect effect-negative svelte-prm-1a6tw77");
    },
    m(target, anchor) {
      insert(target, span, anchor);
    },
    d(detaching) {
      if (detaching) {
        detach(span);
      }
    }
  };
}
function create_if_block_5(ctx) {
  let span;
  let t0;
  let t1_value = (
    /*outcomeData*/
    ctx[24].unrest + ""
  );
  let t1;
  let t2;
  return {
    c() {
      span = element("span");
      t0 = text("+");
      t1 = text(t1_value);
      t2 = text(" Unrest");
      attr(span, "class", "effect effect-negative svelte-prm-1a6tw77");
    },
    m(target, anchor) {
      insert(target, span, anchor);
      append(span, t0);
      append(span, t1);
      append(span, t2);
    },
    p(ctx2, dirty) {
      if (dirty & /*completedArmies*/
      512 && t1_value !== (t1_value = /*outcomeData*/
      ctx2[24].unrest + "")) set_data(t1, t1_value);
    },
    d(detaching) {
      if (detaching) {
        detach(span);
      }
    }
  };
}
function create_if_block_4(ctx) {
  let span;
  return {
    c() {
      span = element("span");
      span.textContent = "Rallied";
      attr(span, "class", "effect effect-positive svelte-prm-1a6tw77");
    },
    m(target, anchor) {
      insert(target, span, anchor);
    },
    d(detaching) {
      if (detaching) {
        detach(span);
      }
    }
  };
}
function create_each_block(ctx) {
  let div1;
  let div0;
  let span0;
  let t0_value = (
    /*armyStatus*/
    ctx[20].army.name + ""
  );
  let t0;
  let t1;
  let span1;
  let t2_value = (
    /*outcomeLabel*/
    ctx[23] + ""
  );
  let t2;
  let t3;
  let t4;
  let if_block = (
    /*outcomeData*/
    ctx[24] && create_if_block_3(ctx)
  );
  return {
    c() {
      div1 = element("div");
      div0 = element("div");
      span0 = element("span");
      t0 = text(t0_value);
      t1 = space();
      span1 = element("span");
      t2 = text(t2_value);
      t3 = space();
      if (if_block) if_block.c();
      t4 = space();
      attr(span0, "class", "army-name svelte-prm-1a6tw77");
      attr(span1, "class", "result-outcome svelte-prm-1a6tw77");
      set_style(
        span1,
        "color",
        /*outcomeColor*/
        ctx[22]
      );
      attr(div0, "class", "result-header svelte-prm-1a6tw77");
      attr(div1, "class", "result-card svelte-prm-1a6tw77");
      toggle_class(
        div1,
        "result-disbanded",
        /*result*/
        ctx[21]?.disbanded
      );
    },
    m(target, anchor) {
      insert(target, div1, anchor);
      append(div1, div0);
      append(div0, span0);
      append(span0, t0);
      append(div0, t1);
      append(div0, span1);
      append(span1, t2);
      append(div1, t3);
      if (if_block) if_block.m(div1, null);
      append(div1, t4);
    },
    p(ctx2, dirty) {
      if (dirty & /*completedArmies*/
      512 && t0_value !== (t0_value = /*armyStatus*/
      ctx2[20].army.name + "")) set_data(t0, t0_value);
      if (dirty & /*completedArmies*/
      512 && t2_value !== (t2_value = /*outcomeLabel*/
      ctx2[23] + "")) set_data(t2, t2_value);
      if (dirty & /*completedArmies*/
      512) {
        set_style(
          span1,
          "color",
          /*outcomeColor*/
          ctx2[22]
        );
      }
      if (
        /*outcomeData*/
        ctx2[24]
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
        } else {
          if_block = create_if_block_3(ctx2);
          if_block.c();
          if_block.m(div1, t4);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
      if (dirty & /*completedArmies*/
      512) {
        toggle_class(
          div1,
          "result-disbanded",
          /*result*/
          ctx2[21]?.disbanded
        );
      }
    },
    d(detaching) {
      if (detaching) {
        detach(div1);
      }
      if (if_block) if_block.d();
    }
  };
}
function create_else_block(ctx) {
  let i;
  return {
    c() {
      i = element("i");
      attr(i, "class", "fas fa-users army-placeholder-icon svelte-prm-1a6tw77");
    },
    m(target, anchor) {
      insert(target, i, anchor);
    },
    p: noop,
    d(detaching) {
      if (detaching) {
        detach(i);
      }
    }
  };
}
function create_if_block_1(ctx) {
  let img;
  let img_src_value;
  let img_alt_value;
  return {
    c() {
      img = element("img");
      if (!src_url_equal(img.src, img_src_value = /*checkingArmy*/
      ctx[2].tokenImage)) attr(img, "src", img_src_value);
      attr(img, "alt", img_alt_value = /*checkingArmy*/
      ctx[2].army.name);
      attr(img, "class", "army-token-image svelte-prm-1a6tw77");
    },
    m(target, anchor) {
      insert(target, img, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & /*checkingArmy*/
      4 && !src_url_equal(img.src, img_src_value = /*checkingArmy*/
      ctx2[2].tokenImage)) {
        attr(img, "src", img_src_value);
      }
      if (dirty & /*checkingArmy*/
      4 && img_alt_value !== (img_alt_value = /*checkingArmy*/
      ctx2[2].army.name)) {
        attr(img, "alt", img_alt_value);
      }
    },
    d(detaching) {
      if (detaching) {
        detach(img);
      }
    }
  };
}
function create_fragment(ctx) {
  let div;
  function select_block_type(ctx2, dirty) {
    if (
      /*state*/
      ctx2[0].panelState === "waiting-for-roll" && /*checkingArmy*/
      ctx2[2]
    ) return create_if_block;
    if (
      /*state*/
      ctx2[0].panelState === "completed" || /*allComplete*/
      ctx2[8]
    ) return create_if_block_2;
    return create_else_block_1;
  }
  let current_block_type = select_block_type(ctx);
  let if_block = current_block_type(ctx);
  return {
    c() {
      div = element("div");
      if_block.c();
      attr(div, "class", "morale-observer-panel svelte-prm-1a6tw77");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      if_block.m(div, null);
    },
    p(ctx2, [dirty]) {
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
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      if_block.d();
    }
  };
}
function instance($$self, $$props, $$invalidate) {
  let myCharacterCheck;
  let hasUsedCheck;
  let displayBonus;
  let displaySkill;
  let pendingArmies;
  let completedArmies;
  let checkingArmy;
  let allComplete;
  let usedCheckCount;
  let totalCharacterCount;
  let isCheckDisabled;
  let { state } = $$props;
  let { onCheckMorale } = $$props;
  let { onDone } = $$props;
  const game = globalThis.game;
  const currentUserId = game?.user?.id;
  const outcomeColors = {
    criticalSuccess: "#4CAF50",
    success: "#8BC34A",
    failure: "#ff9800",
    criticalFailure: "#f44336"
  };
  const outcomeLabels = {
    criticalSuccess: "Critical Success",
    success: "Success",
    failure: "Failure",
    criticalFailure: "Critical Failure"
  };
  function handleCheckMorale(armyId) {
    onCheckMorale(armyId);
  }
  const click_handler = (armyStatus) => handleCheckMorale(armyStatus.army.id);
  $$self.$$set = ($$props2) => {
    if ("state" in $$props2) $$invalidate(0, state = $$props2.state);
    if ("onCheckMorale" in $$props2) $$invalidate(16, onCheckMorale = $$props2.onCheckMorale);
    if ("onDone" in $$props2) $$invalidate(1, onDone = $$props2.onDone);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*state*/
    1) {
      $$invalidate(4, myCharacterCheck = Object.values(state.characterChecks || {}).find((c) => c.userId === currentUserId));
    }
    if ($$self.$$.dirty & /*myCharacterCheck*/
    16) {
      $$invalidate(3, hasUsedCheck = myCharacterCheck?.armyId !== null && myCharacterCheck?.armyId !== void 0);
    }
    if ($$self.$$.dirty & /*myCharacterCheck*/
    16) {
      $$invalidate(12, displayBonus = myCharacterCheck?.bonus ?? null);
    }
    if ($$self.$$.dirty & /*myCharacterCheck*/
    16) {
      $$invalidate(11, displaySkill = myCharacterCheck?.skill === "diplomacy" ? "Diplomacy" : "Intimidation");
    }
    if ($$self.$$.dirty & /*state*/
    1) {
      $$invalidate(10, pendingArmies = (state.armyStatuses || []).filter((a) => a.status === "pending"));
    }
    if ($$self.$$.dirty & /*state*/
    1) {
      $$invalidate(9, completedArmies = (state.armyStatuses || []).filter((a) => a.status === "completed"));
    }
    if ($$self.$$.dirty & /*state*/
    1) {
      $$invalidate(2, checkingArmy = (state.armyStatuses || []).find((a) => a.status === "checking"));
    }
    if ($$self.$$.dirty & /*state*/
    1) {
      $$invalidate(8, allComplete = state.armyStatuses?.length > 0 && state.armyStatuses.every((a) => a.status === "completed"));
    }
    if ($$self.$$.dirty & /*state*/
    1) {
      $$invalidate(7, usedCheckCount = Object.values(state.characterChecks || {}).filter((c) => c.armyId !== null).length);
    }
    if ($$self.$$.dirty & /*state*/
    1) {
      $$invalidate(6, totalCharacterCount = Object.keys(state.characterChecks || {}).length);
    }
    if ($$self.$$.dirty & /*hasUsedCheck, checkingArmy, state*/
    13) {
      $$invalidate(5, isCheckDisabled = hasUsedCheck || checkingArmy !== void 0 || state.panelState === "waiting-for-roll");
    }
  };
  return [
    state,
    onDone,
    checkingArmy,
    hasUsedCheck,
    myCharacterCheck,
    isCheckDisabled,
    totalCharacterCount,
    usedCheckCount,
    allComplete,
    completedArmies,
    pendingArmies,
    displaySkill,
    displayBonus,
    outcomeColors,
    outcomeLabels,
    handleCheckMorale,
    onCheckMorale,
    click_handler
  ];
}
class MoraleObserverPanel extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, { state: 0, onCheckMorale: 16, onDone: 1 });
  }
}
export {
  MoraleObserverPanel as default
};
