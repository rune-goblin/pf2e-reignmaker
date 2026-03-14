import { aw as SvelteComponent, ax as init, ay as safe_not_equal, br as DisbandArmyDialog, aA as detach, b3 as destroy_component, b4 as transition_out, b5 as transition_in, b7 as mount_component, aB as insert, b8 as create_component, aG as space, aC as element, aD as attr, aE as set_data, aF as append, aH as text, aI as ensure_array_like, aJ as destroy_each, aK as listen, aL as is_function, aM as set_style, aN as toggle_class, $ as MORALE_OUTCOMES, aO as src_url_equal, az as noop, aP as empty } from "./GameCommandUtils-D_sgs3NK.js";
function get_each_context_1(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[35] = list[i];
  const constants_0 = (
    /*armyStatus*/
    child_ctx[35].result
  );
  child_ctx[36] = constants_0;
  const constants_1 = (
    /*result*/
    child_ctx[36] ? (
      /*outcomeColors*/
      child_ctx[17][
        /*result*/
        child_ctx[36].outcome
      ]
    ) : "#999"
  );
  child_ctx[37] = constants_1;
  const constants_2 = (
    /*result*/
    child_ctx[36] ? (
      /*outcomeLabels*/
      child_ctx[18][
        /*result*/
        child_ctx[36].outcome
      ]
    ) : "Unknown"
  );
  child_ctx[38] = constants_2;
  const constants_3 = (
    /*result*/
    child_ctx[36] ? MORALE_OUTCOMES[
      /*result*/
      child_ctx[36].outcome
    ] : null
  );
  child_ctx[39] = constants_3;
  const constants_4 = (
    /*result*/
    child_ctx[36]?.actorName === "Auto-fail"
  );
  child_ctx[42] = constants_4;
  return child_ctx;
}
function get_each_context_2(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[35] = list[i];
  return child_ctx;
}
function get_each_context(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[35] = list[i];
  const constants_0 = (
    /*armyStatus*/
    child_ctx[35].result
  );
  child_ctx[36] = constants_0;
  const constants_1 = (
    /*result*/
    child_ctx[36] ? (
      /*outcomeColors*/
      child_ctx[17][
        /*result*/
        child_ctx[36].outcome
      ]
    ) : "#999"
  );
  child_ctx[37] = constants_1;
  const constants_2 = (
    /*result*/
    child_ctx[36] ? (
      /*outcomeLabels*/
      child_ctx[18][
        /*result*/
        child_ctx[36].outcome
      ]
    ) : "Unknown"
  );
  child_ctx[38] = constants_2;
  const constants_3 = (
    /*result*/
    child_ctx[36] ? MORALE_OUTCOMES[
      /*result*/
      child_ctx[36].outcome
    ] : null
  );
  child_ctx[39] = constants_3;
  return child_ctx;
}
function create_else_block_2(ctx) {
  let div0;
  let h3;
  let i0;
  let t0;
  let t1;
  let t2;
  let t3;
  let t4;
  let div1;
  let t5;
  let div2;
  let button;
  let i1;
  let t6;
  let button_disabled_value;
  let mounted;
  let dispose;
  function select_block_type_3(ctx2, dirty) {
    if (
      /*displayCharacterName*/
      ctx2[12]
    ) return create_if_block_20;
    return create_else_block_8;
  }
  let current_block_type = select_block_type_3(ctx);
  let if_block0 = current_block_type(ctx);
  let if_block1 = (
    /*totalCharacterCount*/
    ctx[6] > 0 && create_if_block_18(ctx)
  );
  function select_block_type_4(ctx2, dirty) {
    if (
      /*armies*/
      ctx2[1].length === 0
    ) return create_if_block_8;
    return create_else_block_3;
  }
  let current_block_type_1 = select_block_type_4(ctx);
  let if_block2 = current_block_type_1(ctx);
  return {
    c() {
      div0 = element("div");
      h3 = element("h3");
      i0 = element("i");
      t0 = space();
      t1 = text(
        /*title*/
        ctx[0]
      );
      t2 = space();
      if_block0.c();
      t3 = space();
      if (if_block1) if_block1.c();
      t4 = space();
      div1 = element("div");
      if_block2.c();
      t5 = space();
      div2 = element("div");
      button = element("button");
      i1 = element("i");
      t6 = text(" Done");
      attr(i0, "class", "fas fa-flag");
      attr(h3, "class", "svelte-prm-es6vdb");
      attr(div0, "class", "panel-header svelte-prm-es6vdb");
      attr(div1, "class", "army-list svelte-prm-es6vdb");
      attr(i1, "class", "fas fa-check");
      attr(button, "class", "btn-done svelte-prm-es6vdb");
      button.disabled = button_disabled_value = !/*canDone*/
      ctx[13];
      attr(div2, "class", "panel-actions svelte-prm-es6vdb");
    },
    m(target, anchor) {
      insert(target, div0, anchor);
      append(div0, h3);
      append(h3, i0);
      append(h3, t0);
      append(h3, t1);
      append(div0, t2);
      if_block0.m(div0, null);
      append(div0, t3);
      if (if_block1) if_block1.m(div0, null);
      insert(target, t4, anchor);
      insert(target, div1, anchor);
      if_block2.m(div1, null);
      insert(target, t5, anchor);
      insert(target, div2, anchor);
      append(div2, button);
      append(button, i1);
      append(button, t6);
      if (!mounted) {
        dispose = listen(button, "click", function() {
          if (is_function(
            /*onDone*/
            ctx[7]
          )) ctx[7].apply(this, arguments);
        });
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty[0] & /*title*/
      1) set_data(
        t1,
        /*title*/
        ctx[0]
      );
      if (current_block_type === (current_block_type = select_block_type_3(ctx)) && if_block0) {
        if_block0.p(ctx, dirty);
      } else {
        if_block0.d(1);
        if_block0 = current_block_type(ctx);
        if (if_block0) {
          if_block0.c();
          if_block0.m(div0, t3);
        }
      }
      if (
        /*totalCharacterCount*/
        ctx[6] > 0
      ) {
        if (if_block1) {
          if_block1.p(ctx, dirty);
        } else {
          if_block1 = create_if_block_18(ctx);
          if_block1.c();
          if_block1.m(div0, null);
        }
      } else if (if_block1) {
        if_block1.d(1);
        if_block1 = null;
      }
      if (current_block_type_1 === (current_block_type_1 = select_block_type_4(ctx)) && if_block2) {
        if_block2.p(ctx, dirty);
      } else {
        if_block2.d(1);
        if_block2 = current_block_type_1(ctx);
        if (if_block2) {
          if_block2.c();
          if_block2.m(div1, null);
        }
      }
      if (dirty[0] & /*canDone*/
      8192 && button_disabled_value !== (button_disabled_value = !/*canDone*/
      ctx[13])) {
        button.disabled = button_disabled_value;
      }
    },
    d(detaching) {
      if (detaching) {
        detach(div0);
        detach(t4);
        detach(div1);
        detach(t5);
        detach(div2);
      }
      if_block0.d();
      if (if_block1) if_block1.d();
      if_block2.d();
      mounted = false;
      dispose();
    }
  };
}
function create_if_block_2(ctx) {
  let div0;
  let h3;
  let i0;
  let t0;
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
    ctx[14]
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
      t1 = text(
        /*title*/
        ctx[0]
      );
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
      attr(h3, "class", "svelte-prm-es6vdb");
      attr(div0, "class", "panel-header svelte-prm-es6vdb");
      attr(div1, "class", "results-summary svelte-prm-es6vdb");
      attr(button, "class", "btn-done svelte-prm-es6vdb");
      attr(div2, "class", "result-content svelte-prm-es6vdb");
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
            ctx[7]
          )) ctx[7].apply(this, arguments);
        });
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty[0] & /*title*/
      1) set_data(
        t1,
        /*title*/
        ctx[0]
      );
      if (dirty[0] & /*completedArmies, outcomeColors, outcomeLabels*/
      409600) {
        each_value = ensure_array_like(
          /*completedArmies*/
          ctx[14]
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
  let t1;
  let t2;
  let t3;
  let div2;
  let div1;
  let t4;
  let span;
  let t5_value = (
    /*checkingArmy*/
    ctx[8].army.name + ""
  );
  let t5;
  let t6;
  let i1;
  let t7;
  let p0;
  let t9;
  let p1;
  function select_block_type_1(ctx2, dirty) {
    if (
      /*checkingArmy*/
      ctx2[8].tokenImage
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
      t1 = text(
        /*title*/
        ctx[0]
      );
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
      p0 = element("p");
      p0.textContent = "Waiting for roll to complete...";
      t9 = space();
      p1 = element("p");
      p1.textContent = "Complete the Foundry roll dialog";
      attr(i0, "class", "fas fa-dice-d20");
      attr(h3, "class", "svelte-prm-es6vdb");
      attr(div0, "class", "panel-header svelte-prm-es6vdb");
      attr(span, "class", "army-name svelte-prm-es6vdb");
      attr(div1, "class", "checking-army svelte-prm-es6vdb");
      attr(i1, "class", "fas fa-spinner fa-spin waiting-spinner svelte-prm-es6vdb");
      attr(p0, "class", "svelte-prm-es6vdb");
      attr(p1, "class", "waiting-subtitle svelte-prm-es6vdb");
      attr(div2, "class", "waiting-content svelte-prm-es6vdb");
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
      append(div2, p0);
      append(div2, t9);
      append(div2, p1);
    },
    p(ctx2, dirty) {
      if (dirty[0] & /*title*/
      1) set_data(
        t1,
        /*title*/
        ctx2[0]
      );
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
      if (dirty[0] & /*checkingArmy*/
      256 && t5_value !== (t5_value = /*checkingArmy*/
      ctx2[8].army.name + "")) set_data(t5, t5_value);
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
function create_else_block_8(ctx) {
  let div;
  return {
    c() {
      div = element("div");
      div.innerHTML = `<i class="fas fa-exclamation-triangle"></i> <span>No character available</span>`;
      attr(div, "class", "no-character svelte-prm-es6vdb");
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
function create_if_block_20(ctx) {
  let div;
  let i;
  let t0;
  let span0;
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
    ctx[4] && create_if_block_21()
  );
  return {
    c() {
      div = element("div");
      i = element("i");
      t0 = space();
      span0 = element("span");
      t1 = text(
        /*displayCharacterName*/
        ctx[12]
      );
      t2 = space();
      span1 = element("span");
      t3 = text(
        /*displaySkillLabel*/
        ctx[10]
      );
      t4 = space();
      span2 = element("span");
      t5 = text("+");
      t6 = text(
        /*displayCharacterBonus*/
        ctx[11]
      );
      t7 = space();
      if (if_block) if_block.c();
      attr(i, "class", "fas fa-user svelte-prm-es6vdb");
      attr(span0, "class", "character-name svelte-prm-es6vdb");
      attr(span1, "class", "character-skill svelte-prm-es6vdb");
      attr(span2, "class", "character-bonus svelte-prm-es6vdb");
      attr(div, "class", "best-character svelte-prm-es6vdb");
      toggle_class(
        div,
        "check-used",
        /*hasUsedCheck*/
        ctx[4]
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
      if (dirty[0] & /*displayCharacterName*/
      4096) set_data(
        t1,
        /*displayCharacterName*/
        ctx2[12]
      );
      if (dirty[0] & /*displaySkillLabel*/
      1024) set_data(
        t3,
        /*displaySkillLabel*/
        ctx2[10]
      );
      if (dirty[0] & /*displayCharacterBonus*/
      2048) set_data(
        t6,
        /*displayCharacterBonus*/
        ctx2[11]
      );
      if (
        /*hasUsedCheck*/
        ctx2[4]
      ) {
        if (if_block) ;
        else {
          if_block = create_if_block_21();
          if_block.c();
          if_block.m(div, null);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
      if (dirty[0] & /*hasUsedCheck*/
      16) {
        toggle_class(
          div,
          "check-used",
          /*hasUsedCheck*/
          ctx2[4]
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
function create_if_block_21(ctx) {
  let span;
  return {
    c() {
      span = element("span");
      span.textContent = "Used";
      attr(span, "class", "check-used-badge svelte-prm-es6vdb");
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
function create_if_block_18(ctx) {
  let div;
  let i;
  let t0;
  let span;
  let t1;
  let t2;
  let t3;
  let t4;
  let t5;
  let if_block = (
    /*usedCheckCount*/
    ctx[5] < /*totalCharacterCount*/
    ctx[6] && /*pendingArmies*/
    ctx[15].length > 0 && create_if_block_19()
  );
  return {
    c() {
      div = element("div");
      i = element("i");
      t0 = space();
      span = element("span");
      t1 = text("Characters Used: ");
      t2 = text(
        /*usedCheckCount*/
        ctx[5]
      );
      t3 = text("/");
      t4 = text(
        /*totalCharacterCount*/
        ctx[6]
      );
      t5 = space();
      if (if_block) if_block.c();
      attr(i, "class", "fas fa-users svelte-prm-es6vdb");
      attr(div, "class", "character-usage svelte-prm-es6vdb");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      append(div, i);
      append(div, t0);
      append(div, span);
      append(span, t1);
      append(span, t2);
      append(span, t3);
      append(span, t4);
      append(div, t5);
      if (if_block) if_block.m(div, null);
    },
    p(ctx2, dirty) {
      if (dirty[0] & /*usedCheckCount*/
      32) set_data(
        t2,
        /*usedCheckCount*/
        ctx2[5]
      );
      if (dirty[0] & /*totalCharacterCount*/
      64) set_data(
        t4,
        /*totalCharacterCount*/
        ctx2[6]
      );
      if (
        /*usedCheckCount*/
        ctx2[5] < /*totalCharacterCount*/
        ctx2[6] && /*pendingArmies*/
        ctx2[15].length > 0
      ) {
        if (if_block) ;
        else {
          if_block = create_if_block_19();
          if_block.c();
          if_block.m(div, null);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
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
function create_if_block_19(ctx) {
  let span;
  return {
    c() {
      span = element("span");
      span.textContent = "(each player may check one army)";
      attr(span, "class", "usage-hint svelte-prm-es6vdb");
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
function create_else_block_3(ctx) {
  let t;
  let if_block_anchor;
  let each_value_2 = ensure_array_like(
    /*pendingArmies*/
    ctx[15]
  );
  let each_blocks = [];
  for (let i = 0; i < each_value_2.length; i += 1) {
    each_blocks[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
  }
  let if_block = (
    /*completedArmies*/
    ctx[14].length > 0 && create_if_block_9(ctx)
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
      if (dirty[0] & /*isCheckDisabled, hasUsedCheck, handleCheckMorale, pendingArmies, displayCharacterBonus*/
      559632) {
        each_value_2 = ensure_array_like(
          /*pendingArmies*/
          ctx2[15]
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
        ctx2[14].length > 0
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
        } else {
          if_block = create_if_block_9(ctx2);
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
function create_if_block_8(ctx) {
  let p;
  return {
    c() {
      p = element("p");
      p.textContent = "No armies require morale checks";
      attr(p, "class", "empty-message svelte-prm-es6vdb");
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
function create_else_block_7(ctx) {
  let i;
  return {
    c() {
      i = element("i");
      attr(i, "class", "fas fa-users army-placeholder-icon svelte-prm-es6vdb");
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
function create_if_block_17(ctx) {
  let img;
  let img_src_value;
  let img_alt_value;
  return {
    c() {
      img = element("img");
      if (!src_url_equal(img.src, img_src_value = /*armyStatus*/
      ctx[35].tokenImage)) attr(img, "src", img_src_value);
      attr(img, "alt", img_alt_value = /*armyStatus*/
      ctx[35].army.name);
      attr(img, "class", "army-token-image svelte-prm-es6vdb");
    },
    m(target, anchor) {
      insert(target, img, anchor);
    },
    p(ctx2, dirty) {
      if (dirty[0] & /*pendingArmies*/
      32768 && !src_url_equal(img.src, img_src_value = /*armyStatus*/
      ctx2[35].tokenImage)) {
        attr(img, "src", img_src_value);
      }
      if (dirty[0] & /*pendingArmies*/
      32768 && img_alt_value !== (img_alt_value = /*armyStatus*/
      ctx2[35].army.name)) {
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
function create_if_block_16(ctx) {
  let span;
  let t0;
  let t1_value = (
    /*armyStatus*/
    ctx[35].hexId + ""
  );
  let t1;
  return {
    c() {
      span = element("span");
      t0 = text("Hex: ");
      t1 = text(t1_value);
      attr(span, "class", "army-hex svelte-prm-es6vdb");
    },
    m(target, anchor) {
      insert(target, span, anchor);
      append(span, t0);
      append(span, t1);
    },
    p(ctx2, dirty) {
      if (dirty[0] & /*pendingArmies*/
      32768 && t1_value !== (t1_value = /*armyStatus*/
      ctx2[35].hexId + "")) set_data(t1, t1_value);
    },
    d(detaching) {
      if (detaching) {
        detach(span);
      }
    }
  };
}
function create_else_block_6(ctx) {
  let t;
  return {
    c() {
      t = text("Check Morale");
    },
    m(target, anchor) {
      insert(target, t, anchor);
    },
    p: noop,
    d(detaching) {
      if (detaching) {
        detach(t);
      }
    }
  };
}
function create_if_block_15(ctx) {
  let t0;
  let t1;
  let t2;
  return {
    c() {
      t0 = text("Check Morale [+");
      t1 = text(
        /*displayCharacterBonus*/
        ctx[11]
      );
      t2 = text("]");
    },
    m(target, anchor) {
      insert(target, t0, anchor);
      insert(target, t1, anchor);
      insert(target, t2, anchor);
    },
    p(ctx2, dirty) {
      if (dirty[0] & /*displayCharacterBonus*/
      2048) set_data(
        t1,
        /*displayCharacterBonus*/
        ctx2[11]
      );
    },
    d(detaching) {
      if (detaching) {
        detach(t0);
        detach(t1);
        detach(t2);
      }
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
    ctx[35].army.name + ""
  );
  let t1;
  let t2;
  let span1;
  let t3;
  let t4_value = (
    /*armyStatus*/
    ctx[35].army.level + ""
  );
  let t4;
  let t5;
  let t6;
  let button;
  let i;
  let t7;
  let button_title_value;
  let t8;
  let mounted;
  let dispose;
  function select_block_type_5(ctx2, dirty) {
    if (
      /*armyStatus*/
      ctx2[35].tokenImage
    ) return create_if_block_17;
    return create_else_block_7;
  }
  let current_block_type = select_block_type_5(ctx);
  let if_block0 = current_block_type(ctx);
  let if_block1 = (
    /*armyStatus*/
    ctx[35].hexId && create_if_block_16(ctx)
  );
  function select_block_type_6(ctx2, dirty) {
    if (
      /*displayCharacterBonus*/
      ctx2[11] !== null
    ) return create_if_block_15;
    return create_else_block_6;
  }
  let current_block_type_1 = select_block_type_6(ctx);
  let if_block2 = current_block_type_1(ctx);
  function click_handler() {
    return (
      /*click_handler*/
      ctx[33](
        /*armyStatus*/
        ctx[35]
      )
    );
  }
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
      button = element("button");
      i = element("i");
      t7 = space();
      if_block2.c();
      t8 = space();
      attr(span0, "class", "army-name svelte-prm-es6vdb");
      attr(span1, "class", "army-details svelte-prm-es6vdb");
      attr(div0, "class", "army-info svelte-prm-es6vdb");
      attr(div1, "class", "army-header svelte-prm-es6vdb");
      attr(i, "class", "fas fa-dice-d20");
      attr(button, "class", "btn-check-morale svelte-prm-es6vdb");
      button.disabled = /*isCheckDisabled*/
      ctx[9];
      attr(button, "title", button_title_value = /*hasUsedCheck*/
      ctx[4] ? "You have already used your morale check this turn" : "");
      attr(div2, "class", "army-item svelte-prm-es6vdb");
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
      append(div0, t5);
      if (if_block1) if_block1.m(div0, null);
      append(div2, t6);
      append(div2, button);
      append(button, i);
      append(button, t7);
      if_block2.m(button, null);
      append(div2, t8);
      if (!mounted) {
        dispose = listen(button, "click", click_handler);
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (current_block_type === (current_block_type = select_block_type_5(ctx)) && if_block0) {
        if_block0.p(ctx, dirty);
      } else {
        if_block0.d(1);
        if_block0 = current_block_type(ctx);
        if (if_block0) {
          if_block0.c();
          if_block0.m(div1, t0);
        }
      }
      if (dirty[0] & /*pendingArmies*/
      32768 && t1_value !== (t1_value = /*armyStatus*/
      ctx[35].army.name + "")) set_data(t1, t1_value);
      if (dirty[0] & /*pendingArmies*/
      32768 && t4_value !== (t4_value = /*armyStatus*/
      ctx[35].army.level + "")) set_data(t4, t4_value);
      if (
        /*armyStatus*/
        ctx[35].hexId
      ) {
        if (if_block1) {
          if_block1.p(ctx, dirty);
        } else {
          if_block1 = create_if_block_16(ctx);
          if_block1.c();
          if_block1.m(div0, null);
        }
      } else if (if_block1) {
        if_block1.d(1);
        if_block1 = null;
      }
      if (current_block_type_1 === (current_block_type_1 = select_block_type_6(ctx)) && if_block2) {
        if_block2.p(ctx, dirty);
      } else {
        if_block2.d(1);
        if_block2 = current_block_type_1(ctx);
        if (if_block2) {
          if_block2.c();
          if_block2.m(button, null);
        }
      }
      if (dirty[0] & /*isCheckDisabled*/
      512) {
        button.disabled = /*isCheckDisabled*/
        ctx[9];
      }
      if (dirty[0] & /*hasUsedCheck*/
      16 && button_title_value !== (button_title_value = /*hasUsedCheck*/
      ctx[4] ? "You have already used your morale check this turn" : "")) {
        attr(button, "title", button_title_value);
      }
    },
    d(detaching) {
      if (detaching) {
        detach(div2);
      }
      if_block0.d();
      if (if_block1) if_block1.d();
      if_block2.d();
      mounted = false;
      dispose();
    }
  };
}
function create_if_block_9(ctx) {
  let div;
  let t1;
  let each_1_anchor;
  let each_value_1 = ensure_array_like(
    /*completedArmies*/
    ctx[14]
  );
  let each_blocks = [];
  for (let i = 0; i < each_value_1.length; i += 1) {
    each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
  }
  return {
    c() {
      div = element("div");
      div.innerHTML = `<p class="completed-label svelte-prm-es6vdb">Completed</p>`;
      t1 = space();
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      each_1_anchor = empty();
      attr(div, "class", "completed-divider svelte-prm-es6vdb");
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
      if (dirty[0] & /*completedArmies, outcomeColors, outcomeLabels*/
      409600) {
        each_value_1 = ensure_array_like(
          /*completedArmies*/
          ctx2[14]
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
function create_else_block_5(ctx) {
  let i;
  return {
    c() {
      i = element("i");
      attr(i, "class", "fas fa-users army-placeholder-icon svelte-prm-es6vdb");
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
function create_if_block_14(ctx) {
  let img;
  let img_src_value;
  let img_alt_value;
  return {
    c() {
      img = element("img");
      if (!src_url_equal(img.src, img_src_value = /*armyStatus*/
      ctx[35].tokenImage)) attr(img, "src", img_src_value);
      attr(img, "alt", img_alt_value = /*armyStatus*/
      ctx[35].army.name);
      attr(img, "class", "army-token-image svelte-prm-es6vdb");
    },
    m(target, anchor) {
      insert(target, img, anchor);
    },
    p(ctx2, dirty) {
      if (dirty[0] & /*completedArmies*/
      16384 && !src_url_equal(img.src, img_src_value = /*armyStatus*/
      ctx2[35].tokenImage)) {
        attr(img, "src", img_src_value);
      }
      if (dirty[0] & /*completedArmies*/
      16384 && img_alt_value !== (img_alt_value = /*armyStatus*/
      ctx2[35].army.name)) {
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
function create_if_block_13(ctx) {
  let span;
  return {
    c() {
      span = element("span");
      span.textContent = "No character available";
      attr(span, "class", "army-checker auto-fail svelte-prm-es6vdb");
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
function create_if_block_12(ctx) {
  let span;
  let t0;
  let t1_value = (
    /*result*/
    ctx[36].actorName + ""
  );
  let t1;
  return {
    c() {
      span = element("span");
      t0 = text("Checked by ");
      t1 = text(t1_value);
      attr(span, "class", "army-checker svelte-prm-es6vdb");
    },
    m(target, anchor) {
      insert(target, span, anchor);
      append(span, t0);
      append(span, t1);
    },
    p(ctx2, dirty) {
      if (dirty[0] & /*completedArmies*/
      16384 && t1_value !== (t1_value = /*result*/
      ctx2[36].actorName + "")) set_data(t1, t1_value);
    },
    d(detaching) {
      if (detaching) {
        detach(span);
      }
    }
  };
}
function create_else_block_4(ctx) {
  let span;
  return {
    c() {
      span = element("span");
      span.textContent = "Holds";
      attr(span, "class", "effect-badge svelte-prm-es6vdb");
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
function create_if_block_11(ctx) {
  let span;
  return {
    c() {
      span = element("span");
      span.textContent = "Rallied";
      attr(span, "class", "effect-badge effect-positive svelte-prm-es6vdb");
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
function create_if_block_10(ctx) {
  let span;
  return {
    c() {
      span = element("span");
      span.textContent = "Disbanded";
      attr(span, "class", "effect-badge effect-negative svelte-prm-es6vdb");
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
function create_each_block_1(ctx) {
  let div3;
  let div1;
  let t0;
  let div0;
  let span0;
  let t1_value = (
    /*armyStatus*/
    ctx[35].army.name + ""
  );
  let t1;
  let t2;
  let span1;
  let t3_value = (
    /*outcomeLabel*/
    ctx[38] + ""
  );
  let t3;
  let t4;
  let t5;
  let div2;
  let t6;
  function select_block_type_7(ctx2, dirty) {
    if (
      /*armyStatus*/
      ctx2[35].tokenImage
    ) return create_if_block_14;
    return create_else_block_5;
  }
  let current_block_type = select_block_type_7(ctx);
  let if_block0 = current_block_type(ctx);
  function select_block_type_8(ctx2, dirty) {
    if (
      /*result*/
      ctx2[36]?.actorName && !/*isAutoFail*/
      ctx2[42]
    ) return create_if_block_12;
    if (
      /*isAutoFail*/
      ctx2[42]
    ) return create_if_block_13;
  }
  let current_block_type_1 = select_block_type_8(ctx);
  let if_block1 = current_block_type_1 && current_block_type_1(ctx);
  function select_block_type_9(ctx2, dirty) {
    if (
      /*outcomeData*/
      ctx2[39]?.disband
    ) return create_if_block_10;
    if (
      /*outcomeData*/
      ctx2[39]?.resetUnsupported
    ) return create_if_block_11;
    return create_else_block_4;
  }
  let current_block_type_2 = select_block_type_9(ctx);
  let if_block2 = current_block_type_2(ctx);
  return {
    c() {
      div3 = element("div");
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
      div2 = element("div");
      if_block2.c();
      t6 = space();
      attr(span0, "class", "army-name svelte-prm-es6vdb");
      attr(span1, "class", "army-result svelte-prm-es6vdb");
      set_style(
        span1,
        "color",
        /*outcomeColor*/
        ctx[37]
      );
      attr(div0, "class", "army-info svelte-prm-es6vdb");
      attr(div1, "class", "army-header svelte-prm-es6vdb");
      attr(div2, "class", "army-effects svelte-prm-es6vdb");
      attr(div3, "class", "army-item completed svelte-prm-es6vdb");
      toggle_class(
        div3,
        "disbanded",
        /*result*/
        ctx[36]?.disbanded
      );
    },
    m(target, anchor) {
      insert(target, div3, anchor);
      append(div3, div1);
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
      append(div3, t5);
      append(div3, div2);
      if_block2.m(div2, null);
      append(div3, t6);
    },
    p(ctx2, dirty) {
      if (current_block_type === (current_block_type = select_block_type_7(ctx2)) && if_block0) {
        if_block0.p(ctx2, dirty);
      } else {
        if_block0.d(1);
        if_block0 = current_block_type(ctx2);
        if (if_block0) {
          if_block0.c();
          if_block0.m(div1, t0);
        }
      }
      if (dirty[0] & /*completedArmies*/
      16384 && t1_value !== (t1_value = /*armyStatus*/
      ctx2[35].army.name + "")) set_data(t1, t1_value);
      if (dirty[0] & /*completedArmies*/
      16384 && t3_value !== (t3_value = /*outcomeLabel*/
      ctx2[38] + "")) set_data(t3, t3_value);
      if (dirty[0] & /*completedArmies*/
      16384) {
        set_style(
          span1,
          "color",
          /*outcomeColor*/
          ctx2[37]
        );
      }
      if (current_block_type_1 === (current_block_type_1 = select_block_type_8(ctx2)) && if_block1) {
        if_block1.p(ctx2, dirty);
      } else {
        if (if_block1) if_block1.d(1);
        if_block1 = current_block_type_1 && current_block_type_1(ctx2);
        if (if_block1) {
          if_block1.c();
          if_block1.m(div0, null);
        }
      }
      if (current_block_type_2 !== (current_block_type_2 = select_block_type_9(ctx2))) {
        if_block2.d(1);
        if_block2 = current_block_type_2(ctx2);
        if (if_block2) {
          if_block2.c();
          if_block2.m(div2, null);
        }
      }
      if (dirty[0] & /*completedArmies*/
      16384) {
        toggle_class(
          div3,
          "disbanded",
          /*result*/
          ctx2[36]?.disbanded
        );
      }
    },
    d(detaching) {
      if (detaching) {
        detach(div3);
      }
      if_block0.d();
      if (if_block1) {
        if_block1.d();
      }
      if_block2.d();
    }
  };
}
function create_else_block_1(ctx) {
  let i;
  return {
    c() {
      i = element("i");
      attr(i, "class", "fas fa-users army-placeholder-icon-sm svelte-prm-es6vdb");
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
function create_if_block_7(ctx) {
  let img;
  let img_src_value;
  let img_alt_value;
  return {
    c() {
      img = element("img");
      if (!src_url_equal(img.src, img_src_value = /*armyStatus*/
      ctx[35].tokenImage)) attr(img, "src", img_src_value);
      attr(img, "alt", img_alt_value = /*armyStatus*/
      ctx[35].army.name);
      attr(img, "class", "army-token-image-sm svelte-prm-es6vdb");
    },
    m(target, anchor) {
      insert(target, img, anchor);
    },
    p(ctx2, dirty) {
      if (dirty[0] & /*completedArmies*/
      16384 && !src_url_equal(img.src, img_src_value = /*armyStatus*/
      ctx2[35].tokenImage)) {
        attr(img, "src", img_src_value);
      }
      if (dirty[0] & /*completedArmies*/
      16384 && img_alt_value !== (img_alt_value = /*armyStatus*/
      ctx2[35].army.name)) {
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
function create_if_block_3(ctx) {
  let div;
  let t0;
  let t1;
  let if_block0 = (
    /*outcomeData*/
    ctx[39].disband && create_if_block_6()
  );
  let if_block1 = (
    /*outcomeData*/
    ctx[39].unrest > 0 && create_if_block_5(ctx)
  );
  let if_block2 = (
    /*outcomeData*/
    ctx[39].resetUnsupported && create_if_block_4()
  );
  return {
    c() {
      div = element("div");
      if (if_block0) if_block0.c();
      t0 = space();
      if (if_block1) if_block1.c();
      t1 = space();
      if (if_block2) if_block2.c();
      attr(div, "class", "result-effects svelte-prm-es6vdb");
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
        ctx2[39].disband
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
        ctx2[39].unrest > 0
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
        ctx2[39].resetUnsupported
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
      span.innerHTML = `<i class="fas fa-times-circle"></i> Disbanded`;
      attr(span, "class", "effect effect-negative svelte-prm-es6vdb");
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
  let i;
  let t0;
  let t1_value = (
    /*outcomeData*/
    ctx[39].unrest + ""
  );
  let t1;
  let t2;
  return {
    c() {
      span = element("span");
      i = element("i");
      t0 = text(" +");
      t1 = text(t1_value);
      t2 = text(" Unrest");
      attr(i, "class", "fas fa-exclamation-triangle");
      attr(span, "class", "effect effect-negative svelte-prm-es6vdb");
    },
    m(target, anchor) {
      insert(target, span, anchor);
      append(span, i);
      append(span, t0);
      append(span, t1);
      append(span, t2);
    },
    p(ctx2, dirty) {
      if (dirty[0] & /*completedArmies*/
      16384 && t1_value !== (t1_value = /*outcomeData*/
      ctx2[39].unrest + "")) set_data(t1, t1_value);
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
      span.innerHTML = `<i class="fas fa-heart"></i> Morale Restored`;
      attr(span, "class", "effect effect-positive svelte-prm-es6vdb");
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
  let div2;
  let div1;
  let t0;
  let div0;
  let span0;
  let t1_value = (
    /*armyStatus*/
    ctx[35].army.name + ""
  );
  let t1;
  let t2;
  let span1;
  let t3_value = (
    /*outcomeLabel*/
    ctx[38] + ""
  );
  let t3;
  let t4;
  let t5;
  function select_block_type_2(ctx2, dirty) {
    if (
      /*armyStatus*/
      ctx2[35].tokenImage
    ) return create_if_block_7;
    return create_else_block_1;
  }
  let current_block_type = select_block_type_2(ctx);
  let if_block0 = current_block_type(ctx);
  let if_block1 = (
    /*outcomeData*/
    ctx[39] && create_if_block_3(ctx)
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
      attr(span0, "class", "army-name svelte-prm-es6vdb");
      attr(span1, "class", "result-outcome svelte-prm-es6vdb");
      set_style(
        span1,
        "color",
        /*outcomeColor*/
        ctx[37]
      );
      attr(div0, "class", "result-info svelte-prm-es6vdb");
      attr(div1, "class", "result-header svelte-prm-es6vdb");
      attr(div2, "class", "result-card svelte-prm-es6vdb");
      toggle_class(
        div2,
        "result-disbanded",
        /*result*/
        ctx[36]?.disbanded
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
      append(div2, t4);
      if (if_block1) if_block1.m(div2, null);
      append(div2, t5);
    },
    p(ctx2, dirty) {
      if (current_block_type === (current_block_type = select_block_type_2(ctx2)) && if_block0) {
        if_block0.p(ctx2, dirty);
      } else {
        if_block0.d(1);
        if_block0 = current_block_type(ctx2);
        if (if_block0) {
          if_block0.c();
          if_block0.m(div1, t0);
        }
      }
      if (dirty[0] & /*completedArmies*/
      16384 && t1_value !== (t1_value = /*armyStatus*/
      ctx2[35].army.name + "")) set_data(t1, t1_value);
      if (dirty[0] & /*completedArmies*/
      16384 && t3_value !== (t3_value = /*outcomeLabel*/
      ctx2[38] + "")) set_data(t3, t3_value);
      if (dirty[0] & /*completedArmies*/
      16384) {
        set_style(
          span1,
          "color",
          /*outcomeColor*/
          ctx2[37]
        );
      }
      if (
        /*outcomeData*/
        ctx2[39]
      ) {
        if (if_block1) {
          if_block1.p(ctx2, dirty);
        } else {
          if_block1 = create_if_block_3(ctx2);
          if_block1.c();
          if_block1.m(div2, t5);
        }
      } else if (if_block1) {
        if_block1.d(1);
        if_block1 = null;
      }
      if (dirty[0] & /*completedArmies*/
      16384) {
        toggle_class(
          div2,
          "result-disbanded",
          /*result*/
          ctx2[36]?.disbanded
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
function create_else_block(ctx) {
  let i;
  return {
    c() {
      i = element("i");
      attr(i, "class", "fas fa-users army-placeholder-icon svelte-prm-es6vdb");
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
      ctx[8].tokenImage)) attr(img, "src", img_src_value);
      attr(img, "alt", img_alt_value = /*checkingArmy*/
      ctx[8].army.name);
      attr(img, "class", "army-token-image svelte-prm-es6vdb");
    },
    m(target, anchor) {
      insert(target, img, anchor);
    },
    p(ctx2, dirty) {
      if (dirty[0] & /*checkingArmy*/
      256 && !src_url_equal(img.src, img_src_value = /*checkingArmy*/
      ctx2[8].tokenImage)) {
        attr(img, "src", img_src_value);
      }
      if (dirty[0] & /*checkingArmy*/
      256 && img_alt_value !== (img_alt_value = /*checkingArmy*/
      ctx2[8].army.name)) {
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
  let disbandarmydialog;
  let t;
  let div;
  let current;
  disbandarmydialog = new DisbandArmyDialog({
    props: {
      show: (
        /*showDisbandDialog*/
        ctx[16]
      ),
      armyName: (
        /*pendingDisbandArmy*/
        ctx[3]?.name || ""
      ),
      armyLevel: (
        /*pendingDisbandArmy*/
        ctx[3]?.level || 0
      ),
      hasLinkedActor: !!/*pendingDisbandArmy*/
      ctx[3]?.actorId,
      isSupported: false,
      supportedBySettlement: ""
    }
  });
  disbandarmydialog.$on(
    "confirm",
    /*handleDisbandConfirm*/
    ctx[20]
  );
  disbandarmydialog.$on(
    "cancel",
    /*handleDisbandCancel*/
    ctx[21]
  );
  function select_block_type(ctx2, dirty) {
    if (
      /*panelState*/
      ctx2[2] === "waiting-for-roll" && /*checkingArmy*/
      ctx2[8]
    ) return create_if_block;
    if (
      /*panelState*/
      ctx2[2] === "completed"
    ) return create_if_block_2;
    return create_else_block_2;
  }
  let current_block_type = select_block_type(ctx);
  let if_block = current_block_type(ctx);
  return {
    c() {
      create_component(disbandarmydialog.$$.fragment);
      t = space();
      div = element("div");
      if_block.c();
      attr(div, "class", "army-morale-panel svelte-prm-es6vdb");
    },
    m(target, anchor) {
      mount_component(disbandarmydialog, target, anchor);
      insert(target, t, anchor);
      insert(target, div, anchor);
      if_block.m(div, null);
      current = true;
    },
    p(ctx2, dirty) {
      const disbandarmydialog_changes = {};
      if (dirty[0] & /*showDisbandDialog*/
      65536) disbandarmydialog_changes.show = /*showDisbandDialog*/
      ctx2[16];
      if (dirty[0] & /*pendingDisbandArmy*/
      8) disbandarmydialog_changes.armyName = /*pendingDisbandArmy*/
      ctx2[3]?.name || "";
      if (dirty[0] & /*pendingDisbandArmy*/
      8) disbandarmydialog_changes.armyLevel = /*pendingDisbandArmy*/
      ctx2[3]?.level || 0;
      if (dirty[0] & /*pendingDisbandArmy*/
      8) disbandarmydialog_changes.hasLinkedActor = !!/*pendingDisbandArmy*/
      ctx2[3]?.actorId;
      disbandarmydialog.$set(disbandarmydialog_changes);
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
    i(local) {
      if (current) return;
      transition_in(disbandarmydialog.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(disbandarmydialog.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(t);
        detach(div);
      }
      destroy_component(disbandarmydialog, detaching);
      if_block.d();
    }
  };
}
function instance($$self, $$props, $$invalidate) {
  let showDisbandDialog;
  let pendingArmies;
  let completedArmies;
  let checkingArmy;
  let allComplete;
  let canDone;
  let displayCharacterName;
  let displayCharacterBonus;
  let displayCharacterSkill;
  let displaySkillLabel;
  let isCheckDisabled;
  let { title = "Morale Check" } = $$props;
  let { skill = "diplomacy" } = $$props;
  let { armies = [] } = $$props;
  let { panelState = "selection" } = $$props;
  let { currentArmyId = null } = $$props;
  let { pendingDisbandArmy = null } = $$props;
  let { currentUserCharacter = null } = $$props;
  let { hasUsedCheck = false } = $$props;
  let { characterChecks = {} } = $$props;
  let { usedCheckCount = 0 } = $$props;
  let { totalCharacterCount = 0 } = $$props;
  let { bestCharacterName = null } = $$props;
  let { bestCharacterBonus = null } = $$props;
  let { onCheckMorale } = $$props;
  let { onDone } = $$props;
  let { onDisbandConfirm } = $$props;
  let { onDisbandCancel } = $$props;
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
  function handleDisbandConfirm(event) {
    if (pendingDisbandArmy) {
      onDisbandConfirm(pendingDisbandArmy.id, event.detail.deleteActor);
    }
  }
  function handleDisbandCancel() {
    if (pendingDisbandArmy) {
      onDisbandCancel(pendingDisbandArmy.id);
    }
  }
  const click_handler = (armyStatus) => handleCheckMorale(armyStatus.army.id);
  $$self.$$set = ($$props2) => {
    if ("title" in $$props2) $$invalidate(0, title = $$props2.title);
    if ("skill" in $$props2) $$invalidate(22, skill = $$props2.skill);
    if ("armies" in $$props2) $$invalidate(1, armies = $$props2.armies);
    if ("panelState" in $$props2) $$invalidate(2, panelState = $$props2.panelState);
    if ("currentArmyId" in $$props2) $$invalidate(23, currentArmyId = $$props2.currentArmyId);
    if ("pendingDisbandArmy" in $$props2) $$invalidate(3, pendingDisbandArmy = $$props2.pendingDisbandArmy);
    if ("currentUserCharacter" in $$props2) $$invalidate(24, currentUserCharacter = $$props2.currentUserCharacter);
    if ("hasUsedCheck" in $$props2) $$invalidate(4, hasUsedCheck = $$props2.hasUsedCheck);
    if ("characterChecks" in $$props2) $$invalidate(25, characterChecks = $$props2.characterChecks);
    if ("usedCheckCount" in $$props2) $$invalidate(5, usedCheckCount = $$props2.usedCheckCount);
    if ("totalCharacterCount" in $$props2) $$invalidate(6, totalCharacterCount = $$props2.totalCharacterCount);
    if ("bestCharacterName" in $$props2) $$invalidate(26, bestCharacterName = $$props2.bestCharacterName);
    if ("bestCharacterBonus" in $$props2) $$invalidate(27, bestCharacterBonus = $$props2.bestCharacterBonus);
    if ("onCheckMorale" in $$props2) $$invalidate(28, onCheckMorale = $$props2.onCheckMorale);
    if ("onDone" in $$props2) $$invalidate(7, onDone = $$props2.onDone);
    if ("onDisbandConfirm" in $$props2) $$invalidate(29, onDisbandConfirm = $$props2.onDisbandConfirm);
    if ("onDisbandCancel" in $$props2) $$invalidate(30, onDisbandCancel = $$props2.onDisbandCancel);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty[0] & /*pendingDisbandArmy*/
    8) {
      $$invalidate(16, showDisbandDialog = pendingDisbandArmy !== null);
    }
    if ($$self.$$.dirty[0] & /*armies*/
    2) {
      $$invalidate(15, pendingArmies = armies.filter((a) => a.status === "pending"));
    }
    if ($$self.$$.dirty[0] & /*armies*/
    2) {
      $$invalidate(14, completedArmies = armies.filter((a) => a.status === "completed"));
    }
    if ($$self.$$.dirty[0] & /*armies*/
    2) {
      $$invalidate(8, checkingArmy = armies.find((a) => a.status === "checking"));
    }
    if ($$self.$$.dirty[0] & /*armies*/
    2) {
      $$invalidate(32, allComplete = armies.length > 0 && armies.every((a) => a.status === "completed"));
    }
    if ($$self.$$.dirty[1] & /*allComplete*/
    2) {
      $$invalidate(13, canDone = allComplete);
    }
    if ($$self.$$.dirty[0] & /*currentUserCharacter, bestCharacterName*/
    83886080) {
      $$invalidate(12, displayCharacterName = currentUserCharacter?.characterName || bestCharacterName);
    }
    if ($$self.$$.dirty[0] & /*currentUserCharacter, bestCharacterBonus*/
    150994944) {
      $$invalidate(11, displayCharacterBonus = currentUserCharacter?.bonus ?? bestCharacterBonus);
    }
    if ($$self.$$.dirty[0] & /*currentUserCharacter, skill*/
    20971520) {
      $$invalidate(31, displayCharacterSkill = currentUserCharacter?.skill || skill);
    }
    if ($$self.$$.dirty[1] & /*displayCharacterSkill*/
    1) {
      $$invalidate(10, displaySkillLabel = displayCharacterSkill === "diplomacy" ? "Diplomacy" : "Intimidation");
    }
    if ($$self.$$.dirty[0] & /*hasUsedCheck, checkingArmy*/
    272) {
      $$invalidate(9, isCheckDisabled = hasUsedCheck || checkingArmy !== void 0);
    }
    if ($$self.$$.dirty[0] & /*skill*/
    4194304) ;
  };
  return [
    title,
    armies,
    panelState,
    pendingDisbandArmy,
    hasUsedCheck,
    usedCheckCount,
    totalCharacterCount,
    onDone,
    checkingArmy,
    isCheckDisabled,
    displaySkillLabel,
    displayCharacterBonus,
    displayCharacterName,
    canDone,
    completedArmies,
    pendingArmies,
    showDisbandDialog,
    outcomeColors,
    outcomeLabels,
    handleCheckMorale,
    handleDisbandConfirm,
    handleDisbandCancel,
    skill,
    currentArmyId,
    currentUserCharacter,
    characterChecks,
    bestCharacterName,
    bestCharacterBonus,
    onCheckMorale,
    onDisbandConfirm,
    onDisbandCancel,
    displayCharacterSkill,
    allComplete,
    click_handler
  ];
}
class ArmyMoralePanel extends SvelteComponent {
  constructor(options) {
    super();
    init(
      this,
      options,
      instance,
      create_fragment,
      safe_not_equal,
      {
        title: 0,
        skill: 22,
        armies: 1,
        panelState: 2,
        currentArmyId: 23,
        pendingDisbandArmy: 3,
        currentUserCharacter: 24,
        hasUsedCheck: 4,
        characterChecks: 25,
        usedCheckCount: 5,
        totalCharacterCount: 6,
        bestCharacterName: 26,
        bestCharacterBonus: 27,
        onCheckMorale: 28,
        onDone: 7,
        onDisbandConfirm: 29,
        onDisbandCancel: 30
      },
      null,
      [-1, -1]
    );
  }
}
export {
  ArmyMoralePanel as default
};
