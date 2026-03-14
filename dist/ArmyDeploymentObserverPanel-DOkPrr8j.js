import { aw as SvelteComponent, ax as init, ay as safe_not_equal, az as noop, aA as detach, aE as set_data, aB as insert, aF as append, aC as element, aG as space, aH as text, aD as attr, aK as listen, aL as is_function, aM as set_style, aI as ensure_array_like, aJ as destroy_each, aN as toggle_class } from "./GameCommandUtils-D_sgs3NK.js";
function get_each_context(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[13] = list[i];
  child_ctx[17] = i;
  const constants_0 = (
    /*i*/
    child_ctx[17] === 0
  );
  child_ctx[14] = constants_0;
  const constants_1 = (
    /*i*/
    child_ctx[17] === /*path*/
    child_ctx[2].length - 1
  );
  child_ctx[15] = constants_1;
  return child_ctx;
}
function create_if_block_8(ctx) {
  let button;
  let mounted;
  let dispose;
  return {
    c() {
      button = element("button");
      button.innerHTML = `<i class="fas fa-times svelte-prm-1sxgdv8"></i>`;
      attr(button, "class", "btn-dismiss svelte-prm-1sxgdv8");
      attr(button, "title", "Dismiss");
    },
    m(target, anchor) {
      insert(target, button, anchor);
      if (!mounted) {
        dispose = listen(button, "click", function() {
          if (is_function(
            /*onDismiss*/
            ctx[5]
          )) ctx[5].apply(this, arguments);
        });
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
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
function create_else_block_1(ctx) {
  let div;
  return {
    c() {
      div = element("div");
      div.innerHTML = `<i class="fas fa-route"></i> <span>No path plotted yet</span>`;
      attr(div, "class", "path-empty svelte-prm-1sxgdv8");
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
function create_if_block_5(ctx) {
  let div2;
  let div0;
  let span;
  let t0;
  let t1;
  let t2;
  let t3;
  let div1;
  let each_value = ensure_array_like(
    /*path*/
    ctx[2]
  );
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
  }
  return {
    c() {
      div2 = element("div");
      div0 = element("div");
      span = element("span");
      t0 = text("Path (");
      t1 = text(
        /*movementUsed*/
        ctx[6]
      );
      t2 = text(" movement)");
      t3 = space();
      div1 = element("div");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      attr(span, "class", "path-label svelte-prm-1sxgdv8");
      attr(div0, "class", "path-header svelte-prm-1sxgdv8");
      attr(div1, "class", "path-hexes svelte-prm-1sxgdv8");
      attr(div2, "class", "path-section svelte-prm-1sxgdv8");
    },
    m(target, anchor) {
      insert(target, div2, anchor);
      append(div2, div0);
      append(div0, span);
      append(span, t0);
      append(span, t1);
      append(span, t2);
      append(div2, t3);
      append(div2, div1);
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(div1, null);
        }
      }
    },
    p(ctx2, dirty) {
      if (dirty & /*movementUsed*/
      64) set_data(
        t1,
        /*movementUsed*/
        ctx2[6]
      );
      if (dirty & /*path*/
      4) {
        each_value = ensure_array_like(
          /*path*/
          ctx2[2]
        );
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context(ctx2, each_value, i);
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
        detach(div2);
      }
      destroy_each(each_blocks, detaching);
    }
  };
}
function create_if_block_7(ctx) {
  let span;
  return {
    c() {
      span = element("span");
      span.textContent = "End";
      attr(span, "class", "hex-tag svelte-prm-1sxgdv8");
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
function create_if_block_6(ctx) {
  let span;
  return {
    c() {
      span = element("span");
      span.textContent = "Start";
      attr(span, "class", "hex-tag svelte-prm-1sxgdv8");
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
  let div;
  let span0;
  let t1;
  let span1;
  let t2_value = (
    /*hexId*/
    ctx[13] + ""
  );
  let t2;
  let t3;
  let t4;
  function select_block_type_1(ctx2, dirty) {
    if (
      /*isOrigin*/
      ctx2[14]
    ) return create_if_block_6;
    if (
      /*isDestination*/
      ctx2[15]
    ) return create_if_block_7;
  }
  let current_block_type = select_block_type_1(ctx);
  let if_block = current_block_type && current_block_type(ctx);
  return {
    c() {
      div = element("div");
      span0 = element("span");
      span0.textContent = `${/*i*/
      ctx[17] + 1}`;
      t1 = space();
      span1 = element("span");
      t2 = text(t2_value);
      t3 = space();
      if (if_block) if_block.c();
      t4 = space();
      attr(span0, "class", "hex-number svelte-prm-1sxgdv8");
      attr(span1, "class", "hex-id svelte-prm-1sxgdv8");
      attr(div, "class", "path-hex svelte-prm-1sxgdv8");
      toggle_class(
        div,
        "origin",
        /*isOrigin*/
        ctx[14]
      );
      toggle_class(
        div,
        "destination",
        /*isDestination*/
        ctx[15]
      );
    },
    m(target, anchor) {
      insert(target, div, anchor);
      append(div, span0);
      append(div, t1);
      append(div, span1);
      append(span1, t2);
      append(div, t3);
      if (if_block) if_block.m(div, null);
      append(div, t4);
    },
    p(ctx2, dirty) {
      if (dirty & /*path*/
      4 && t2_value !== (t2_value = /*hexId*/
      ctx2[13] + "")) set_data(t2, t2_value);
      if (current_block_type !== (current_block_type = select_block_type_1(ctx2))) {
        if (if_block) if_block.d(1);
        if_block = current_block_type && current_block_type(ctx2);
        if (if_block) {
          if_block.c();
          if_block.m(div, t4);
        }
      }
      if (dirty & /*path*/
      4) {
        toggle_class(
          div,
          "destination",
          /*isDestination*/
          ctx2[15]
        );
      }
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      if (if_block) {
        if_block.d();
      }
    }
  };
}
function create_if_block_4(ctx) {
  let div3;
  let div0;
  let t1;
  let div1;
  let i;
  let t2;
  let t3;
  let t4;
  let div2;
  let t5;
  let t6_value = (
    /*rollResult*/
    ctx[4].actorName + ""
  );
  let t6;
  return {
    c() {
      div3 = element("div");
      div0 = element("div");
      div0.innerHTML = `<span class="result-label svelte-prm-1sxgdv8">Roll Result</span>`;
      t1 = space();
      div1 = element("div");
      i = element("i");
      t2 = space();
      t3 = text(
        /*outcomeLabel*/
        ctx[8]
      );
      t4 = space();
      div2 = element("div");
      t5 = text("Rolled by ");
      t6 = text(t6_value);
      attr(div0, "class", "result-header svelte-prm-1sxgdv8");
      attr(i, "class", "fas fa-dice-d20");
      attr(div1, "class", "result-outcome svelte-prm-1sxgdv8");
      set_style(
        div1,
        "color",
        /*outcomeColor*/
        ctx[9]
      );
      attr(div2, "class", "result-actor svelte-prm-1sxgdv8");
      attr(div3, "class", "result-section svelte-prm-1sxgdv8");
    },
    m(target, anchor) {
      insert(target, div3, anchor);
      append(div3, div0);
      append(div3, t1);
      append(div3, div1);
      append(div1, i);
      append(div1, t2);
      append(div1, t3);
      append(div3, t4);
      append(div3, div2);
      append(div2, t5);
      append(div2, t6);
    },
    p(ctx2, dirty) {
      if (dirty & /*outcomeLabel*/
      256) set_data(
        t3,
        /*outcomeLabel*/
        ctx2[8]
      );
      if (dirty & /*outcomeColor*/
      512) {
        set_style(
          div1,
          "color",
          /*outcomeColor*/
          ctx2[9]
        );
      }
      if (dirty & /*rollResult*/
      16 && t6_value !== (t6_value = /*rollResult*/
      ctx2[4].actorName + "")) set_data(t6, t6_value);
    },
    d(detaching) {
      if (detaching) {
        detach(div3);
      }
    }
  };
}
function create_else_block(ctx) {
  let div;
  return {
    c() {
      div = element("div");
      div.innerHTML = `<i class="fas fa-mouse-pointer"></i> <span>Plotting path...</span>`;
      attr(div, "class", "status-indicator selecting svelte-prm-1sxgdv8");
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
function create_if_block_3(ctx) {
  let div;
  return {
    c() {
      div = element("div");
      div.innerHTML = `<i class="fas fa-route spinning svelte-prm-1sxgdv8"></i> <span>Moving army...</span>`;
      attr(div, "class", "status-indicator animating svelte-prm-1sxgdv8");
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
function create_if_block_2(ctx) {
  let div;
  return {
    c() {
      div = element("div");
      div.innerHTML = `<i class="fas fa-hourglass-half spinning svelte-prm-1sxgdv8"></i> <span>Reviewing result...</span>`;
      attr(div, "class", "status-indicator result svelte-prm-1sxgdv8");
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
function create_if_block_1(ctx) {
  let div;
  return {
    c() {
      div = element("div");
      div.innerHTML = `<i class="fas fa-dice-d20 spinning svelte-prm-1sxgdv8"></i> <span>Waiting for roll...</span>`;
      attr(div, "class", "status-indicator rolling svelte-prm-1sxgdv8");
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
function create_if_block(ctx) {
  let div;
  return {
    c() {
      div = element("div");
      div.innerHTML = `<i class="fas fa-check-circle"></i> <span>Deployment complete</span>`;
      attr(div, "class", "status-indicator completed svelte-prm-1sxgdv8");
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
function create_fragment(ctx) {
  let div8;
  let div2;
  let div1;
  let div0;
  let t2;
  let t3;
  let h3;
  let t5;
  let div3;
  let i2;
  let t6;
  let span1;
  let t7;
  let t8;
  let span2;
  let t9;
  let t10;
  let div6;
  let div4;
  let t12;
  let div5;
  let t13;
  let t14;
  let t15;
  let t16;
  let div7;
  let if_block0 = (
    /*onDismiss*/
    ctx[5] && create_if_block_8(ctx)
  );
  function select_block_type(ctx2, dirty) {
    if (
      /*path*/
      ctx2[2].length > 0
    ) return create_if_block_5;
    return create_else_block_1;
  }
  let current_block_type = select_block_type(ctx);
  let if_block1 = current_block_type(ctx);
  let if_block2 = (
    /*rollResult*/
    ctx[4] && /*panelState*/
    (ctx[3] === "showing-result" || /*panelState*/
    ctx[3] === "animating" || /*panelState*/
    ctx[3] === "completed") && create_if_block_4(ctx)
  );
  function select_block_type_2(ctx2, dirty) {
    if (
      /*panelState*/
      ctx2[3] === "completed"
    ) return create_if_block;
    if (
      /*panelState*/
      ctx2[3] === "waiting-for-roll"
    ) return create_if_block_1;
    if (
      /*panelState*/
      ctx2[3] === "showing-result"
    ) return create_if_block_2;
    if (
      /*panelState*/
      ctx2[3] === "animating"
    ) return create_if_block_3;
    return create_else_block;
  }
  let current_block_type_1 = select_block_type_2(ctx);
  let if_block3 = current_block_type_1(ctx);
  return {
    c() {
      div8 = element("div");
      div2 = element("div");
      div1 = element("div");
      div0 = element("div");
      div0.innerHTML = `<i class="fas fa-eye svelte-prm-1sxgdv8"></i> <span>Observing</span>`;
      t2 = space();
      if (if_block0) if_block0.c();
      t3 = space();
      h3 = element("h3");
      h3.innerHTML = `<i class="fas fa-chess-knight svelte-prm-1sxgdv8"></i>
      Deploy Army`;
      t5 = space();
      div3 = element("div");
      i2 = element("i");
      t6 = space();
      span1 = element("span");
      t7 = text(
        /*initiatorName*/
        ctx[0]
      );
      t8 = space();
      span2 = element("span");
      t9 = text(
        /*statusText*/
        ctx[7]
      );
      t10 = space();
      div6 = element("div");
      div4 = element("div");
      div4.innerHTML = `<i class="fas fa-shield-alt svelte-prm-1sxgdv8"></i>
      Army`;
      t12 = space();
      div5 = element("div");
      t13 = text(
        /*armyName*/
        ctx[1]
      );
      t14 = space();
      if_block1.c();
      t15 = space();
      if (if_block2) if_block2.c();
      t16 = space();
      div7 = element("div");
      if_block3.c();
      attr(div0, "class", "observer-badge svelte-prm-1sxgdv8");
      attr(div1, "class", "header-top svelte-prm-1sxgdv8");
      attr(h3, "class", "svelte-prm-1sxgdv8");
      attr(div2, "class", "panel-header svelte-prm-1sxgdv8");
      attr(i2, "class", "fas fa-user svelte-prm-1sxgdv8");
      attr(span1, "class", "initiator-name svelte-prm-1sxgdv8");
      attr(span2, "class", "status-text svelte-prm-1sxgdv8");
      attr(div3, "class", "initiator-info svelte-prm-1sxgdv8");
      attr(div4, "class", "info-label svelte-prm-1sxgdv8");
      attr(div5, "class", "info-value svelte-prm-1sxgdv8");
      attr(div6, "class", "army-info svelte-prm-1sxgdv8");
      attr(div7, "class", "panel-footer svelte-prm-1sxgdv8");
      attr(div8, "class", "observer-panel svelte-prm-1sxgdv8");
    },
    m(target, anchor) {
      insert(target, div8, anchor);
      append(div8, div2);
      append(div2, div1);
      append(div1, div0);
      append(div1, t2);
      if (if_block0) if_block0.m(div1, null);
      append(div2, t3);
      append(div2, h3);
      append(div8, t5);
      append(div8, div3);
      append(div3, i2);
      append(div3, t6);
      append(div3, span1);
      append(span1, t7);
      append(div3, t8);
      append(div3, span2);
      append(span2, t9);
      append(div8, t10);
      append(div8, div6);
      append(div6, div4);
      append(div6, t12);
      append(div6, div5);
      append(div5, t13);
      append(div8, t14);
      if_block1.m(div8, null);
      append(div8, t15);
      if (if_block2) if_block2.m(div8, null);
      append(div8, t16);
      append(div8, div7);
      if_block3.m(div7, null);
    },
    p(ctx2, [dirty]) {
      if (
        /*onDismiss*/
        ctx2[5]
      ) {
        if (if_block0) {
          if_block0.p(ctx2, dirty);
        } else {
          if_block0 = create_if_block_8(ctx2);
          if_block0.c();
          if_block0.m(div1, null);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }
      if (dirty & /*initiatorName*/
      1) set_data(
        t7,
        /*initiatorName*/
        ctx2[0]
      );
      if (dirty & /*statusText*/
      128) set_data(
        t9,
        /*statusText*/
        ctx2[7]
      );
      if (dirty & /*armyName*/
      2) set_data(
        t13,
        /*armyName*/
        ctx2[1]
      );
      if (current_block_type === (current_block_type = select_block_type(ctx2)) && if_block1) {
        if_block1.p(ctx2, dirty);
      } else {
        if_block1.d(1);
        if_block1 = current_block_type(ctx2);
        if (if_block1) {
          if_block1.c();
          if_block1.m(div8, t15);
        }
      }
      if (
        /*rollResult*/
        ctx2[4] && /*panelState*/
        (ctx2[3] === "showing-result" || /*panelState*/
        ctx2[3] === "animating" || /*panelState*/
        ctx2[3] === "completed")
      ) {
        if (if_block2) {
          if_block2.p(ctx2, dirty);
        } else {
          if_block2 = create_if_block_4(ctx2);
          if_block2.c();
          if_block2.m(div8, t16);
        }
      } else if (if_block2) {
        if_block2.d(1);
        if_block2 = null;
      }
      if (current_block_type_1 !== (current_block_type_1 = select_block_type_2(ctx2))) {
        if_block3.d(1);
        if_block3 = current_block_type_1(ctx2);
        if (if_block3) {
          if_block3.c();
          if_block3.m(div7, null);
        }
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(div8);
      }
      if (if_block0) if_block0.d();
      if_block1.d();
      if (if_block2) if_block2.d();
      if_block3.d();
    }
  };
}
function instance($$self, $$props, $$invalidate) {
  let outcomeColor;
  let outcomeLabel;
  let statusText;
  let movementUsed;
  let { initiatorName } = $$props;
  let { armyName } = $$props;
  let { path } = $$props;
  let { panelState } = $$props;
  let { rollResult } = $$props;
  let { onDismiss = void 0 } = $$props;
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
  $$self.$$set = ($$props2) => {
    if ("initiatorName" in $$props2) $$invalidate(0, initiatorName = $$props2.initiatorName);
    if ("armyName" in $$props2) $$invalidate(1, armyName = $$props2.armyName);
    if ("path" in $$props2) $$invalidate(2, path = $$props2.path);
    if ("panelState" in $$props2) $$invalidate(3, panelState = $$props2.panelState);
    if ("rollResult" in $$props2) $$invalidate(4, rollResult = $$props2.rollResult);
    if ("onDismiss" in $$props2) $$invalidate(5, onDismiss = $$props2.onDismiss);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*rollResult*/
    16) {
      $$invalidate(9, outcomeColor = rollResult ? outcomeColors[rollResult.outcome] || "#999" : "#999");
    }
    if ($$self.$$.dirty & /*rollResult*/
    16) {
      $$invalidate(8, outcomeLabel = rollResult ? outcomeLabels[rollResult.outcome] || rollResult.outcome : "");
    }
    if ($$self.$$.dirty & /*panelState*/
    8) {
      $$invalidate(7, statusText = panelState === "waiting-for-roll" ? "Rolling..." : panelState === "showing-result" ? "Reviewing result..." : panelState === "animating" ? "Moving army..." : panelState === "completed" ? "Deployment complete" : "Plotting path...");
    }
    if ($$self.$$.dirty & /*path*/
    4) {
      $$invalidate(6, movementUsed = path.length > 0 ? path.length - 1 : 0);
    }
    if ($$self.$$.dirty & /*path*/
    4) {
      path.length > 0 ? path[path.length - 1] : null;
    }
  };
  return [
    initiatorName,
    armyName,
    path,
    panelState,
    rollResult,
    onDismiss,
    movementUsed,
    statusText,
    outcomeLabel,
    outcomeColor
  ];
}
class ArmyDeploymentObserverPanel extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, {
      initiatorName: 0,
      armyName: 1,
      path: 2,
      panelState: 3,
      rollResult: 4,
      onDismiss: 5
    });
  }
}
export {
  ArmyDeploymentObserverPanel as default
};
