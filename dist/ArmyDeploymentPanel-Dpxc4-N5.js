import { aw as SvelteComponent, ax as init, ay as safe_not_equal, az as noop, aA as detach, aB as insert, aC as element, aD as attr, p as getKingdomData, K as armyMovementMode, aG as space, bd as run_all, aE as set_data, aM as set_style, aF as append, aK as listen, aL as is_function, aH as text, aI as ensure_array_like, aJ as destroy_each, aN as toggle_class, aP as empty } from "./GameCommandUtils-D_sgs3NK.js";
function get_each_context_2(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[38] = list[i].army;
  child_ctx[39] = list[i].hexId;
  return child_ctx;
}
function get_each_context_3(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[38] = list[i].army;
  child_ctx[39] = list[i].hexId;
  child_ctx[42] = list[i].deployed;
  const constants_0 = (
    /*army*/
    child_ctx[38].id === /*selectedArmyId*/
    child_ctx[1]
  );
  child_ctx[43] = constants_0;
  return child_ctx;
}
function get_each_context_1(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[31] = list[i];
  const constants_0 = (
    /*condition*/
    child_ctx[31].includes("penalty") || /*condition*/
    child_ctx[31].includes("fatigued") || /*condition*/
    child_ctx[31].includes("enfeebled")
  );
  child_ctx[32] = constants_0;
  const constants_1 = (
    /*isNegative*/
    child_ctx[32] ? "fa-exclamation-triangle" : "fa-check-circle"
  );
  child_ctx[33] = constants_1;
  return child_ctx;
}
function get_each_context(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[31] = list[i];
  const constants_0 = (
    /*condition*/
    child_ctx[31].includes("penalty") || /*condition*/
    child_ctx[31].includes("fatigued") || /*condition*/
    child_ctx[31].includes("enfeebled")
  );
  child_ctx[32] = constants_0;
  const constants_1 = (
    /*isNegative*/
    child_ctx[32] ? "fa-exclamation-triangle" : "fa-check-circle"
  );
  child_ctx[33] = constants_1;
  return child_ctx;
}
function create_else_block(ctx) {
  let div0;
  let h3;
  let t1;
  let p;
  let t2;
  let span;
  let t3;
  let t4;
  let div1;
  let t5;
  let t6;
  let div2;
  let button0;
  let t8;
  let button1;
  let i2;
  let t9;
  let button1_disabled_value;
  let mounted;
  let dispose;
  function select_block_type_1(ctx2, dirty) {
    if (
      /*armiesOnMap*/
      ctx2[5].length === 0
    ) return create_if_block_7;
    if (
      /*availableArmies*/
      ctx2[20].length === 0
    ) return create_if_block_8;
    return create_else_block_1;
  }
  let current_block_type = select_block_type_1(ctx);
  let if_block0 = current_block_type(ctx);
  let if_block1 = (
    /*selectedArmyId*/
    ctx[1] && /*plottedPath*/
    ctx[2].length > 0 && create_if_block_6(ctx)
  );
  return {
    c() {
      div0 = element("div");
      h3 = element("h3");
      h3.innerHTML = `<i class="fas fa-chess-knight"></i>
        Deploy Army`;
      t1 = space();
      p = element("p");
      t2 = text("Skill: ");
      span = element("span");
      t3 = text(
        /*skill*/
        ctx[0]
      );
      t4 = space();
      div1 = element("div");
      if_block0.c();
      t5 = space();
      if (if_block1) if_block1.c();
      t6 = space();
      div2 = element("div");
      button0 = element("button");
      button0.innerHTML = `<i class="fas fa-times"></i> Cancel`;
      t8 = space();
      button1 = element("button");
      i2 = element("i");
      t9 = text(" Done");
      attr(h3, "class", "svelte-prm-g0pisw");
      attr(span, "class", "skill-name svelte-prm-g0pisw");
      attr(p, "class", "skill-info svelte-prm-g0pisw");
      attr(div0, "class", "panel-header svelte-prm-g0pisw");
      attr(div1, "class", "army-list svelte-prm-g0pisw");
      attr(button0, "class", "btn-cancel svelte-prm-g0pisw");
      attr(i2, "class", "fas fa-check");
      attr(button1, "class", "btn-done svelte-prm-g0pisw");
      button1.disabled = button1_disabled_value = !/*canComplete*/
      ctx[18];
      attr(div2, "class", "panel-actions svelte-prm-g0pisw");
    },
    m(target, anchor) {
      insert(target, div0, anchor);
      append(div0, h3);
      append(div0, t1);
      append(div0, p);
      append(p, t2);
      append(p, span);
      append(span, t3);
      insert(target, t4, anchor);
      insert(target, div1, anchor);
      if_block0.m(div1, null);
      insert(target, t5, anchor);
      if (if_block1) if_block1.m(target, anchor);
      insert(target, t6, anchor);
      insert(target, div2, anchor);
      append(div2, button0);
      append(div2, t8);
      append(div2, button1);
      append(button1, i2);
      append(button1, t9);
      if (!mounted) {
        dispose = [
          listen(button0, "click", function() {
            if (is_function(
              /*onCancel*/
              ctx[7]
            )) ctx[7].apply(this, arguments);
          }),
          listen(button1, "click", function() {
            if (is_function(
              /*onDone*/
              ctx[8]
            )) ctx[8].apply(this, arguments);
          })
        ];
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty[0] & /*skill*/
      1) set_data(
        t3,
        /*skill*/
        ctx[0]
      );
      if (current_block_type === (current_block_type = select_block_type_1(ctx)) && if_block0) {
        if_block0.p(ctx, dirty);
      } else {
        if_block0.d(1);
        if_block0 = current_block_type(ctx);
        if (if_block0) {
          if_block0.c();
          if_block0.m(div1, null);
        }
      }
      if (
        /*selectedArmyId*/
        ctx[1] && /*plottedPath*/
        ctx[2].length > 0
      ) {
        if (if_block1) {
          if_block1.p(ctx, dirty);
        } else {
          if_block1 = create_if_block_6(ctx);
          if_block1.c();
          if_block1.m(t6.parentNode, t6);
        }
      } else if (if_block1) {
        if_block1.d(1);
        if_block1 = null;
      }
      if (dirty[0] & /*canComplete*/
      262144 && button1_disabled_value !== (button1_disabled_value = !/*canComplete*/
      ctx[18])) {
        button1.disabled = button1_disabled_value;
      }
    },
    d(detaching) {
      if (detaching) {
        detach(div0);
        detach(t4);
        detach(div1);
        detach(t5);
        detach(t6);
        detach(div2);
      }
      if_block0.d();
      if (if_block1) if_block1.d(detaching);
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_if_block_4(ctx) {
  let div0;
  let t1;
  let div15;
  let div14;
  let div4;
  let div3;
  let div1;
  let t3;
  let div2;
  let i1;
  let t4;
  let t5;
  let t6;
  let i2;
  let t7;
  let div7;
  let div5;
  let t9;
  let div6;
  let t10;
  let t11;
  let div10;
  let div8;
  let t13;
  let div9;
  let t14_value = (
    /*plottedPath*/
    (ctx[2].length > 0 ? (
      /*plottedPath*/
      ctx[2][
        /*plottedPath*/
        ctx[2].length - 1
      ]
    ) : "Unknown") + ""
  );
  let t14;
  let t15;
  let div13;
  let div11;
  let t17;
  let div12;
  let t18;
  let t19;
  let t20;
  let t21;
  let button;
  let mounted;
  let dispose;
  let if_block = (
    /*conditionsToApply*/
    ctx[12].length > 0 && create_if_block_5(ctx)
  );
  return {
    c() {
      div0 = element("div");
      div0.innerHTML = `<h3 class="svelte-prm-g0pisw"><i class="fas fa-check-circle"></i>
        Deployment Complete</h3>`;
      t1 = space();
      div15 = element("div");
      div14 = element("div");
      div4 = element("div");
      div3 = element("div");
      div1 = element("div");
      div1.textContent = "Outcome";
      t3 = space();
      div2 = element("div");
      i1 = element("i");
      t4 = space();
      t5 = text(
        /*outcomeLabel*/
        ctx[13]
      );
      t6 = space();
      i2 = element("i");
      t7 = space();
      div7 = element("div");
      div5 = element("div");
      div5.textContent = "Army";
      t9 = space();
      div6 = element("div");
      t10 = text(
        /*armyName*/
        ctx[17]
      );
      t11 = space();
      div10 = element("div");
      div8 = element("div");
      div8.textContent = "Destination";
      t13 = space();
      div9 = element("div");
      t14 = text(t14_value);
      t15 = space();
      div13 = element("div");
      div11 = element("div");
      div11.textContent = "Movement";
      t17 = space();
      div12 = element("div");
      t18 = text(
        /*movementUsed*/
        ctx[15]
      );
      t19 = text(" hexes");
      t20 = space();
      if (if_block) if_block.c();
      t21 = space();
      button = element("button");
      button.innerHTML = `<i class="fas fa-check"></i> OK`;
      attr(div0, "class", "panel-header svelte-prm-g0pisw");
      attr(div1, "class", "result-label svelte-prm-g0pisw");
      attr(i1, "class", "fas fa-trophy");
      attr(div2, "class", "result-value svelte-prm-g0pisw");
      set_style(
        div2,
        "color",
        /*outcomeColor*/
        ctx[14]
      );
      attr(div3, "class", "result-outcome svelte-prm-g0pisw");
      attr(i2, "class", "fas fa-chess-knight result-icon svelte-prm-g0pisw");
      attr(div4, "class", "result-header svelte-prm-g0pisw");
      attr(div5, "class", "result-label svelte-prm-g0pisw");
      attr(div6, "class", "result-text svelte-prm-g0pisw");
      attr(div7, "class", "result-detail svelte-prm-g0pisw");
      attr(div8, "class", "result-label svelte-prm-g0pisw");
      attr(div9, "class", "result-text result-hex svelte-prm-g0pisw");
      attr(div10, "class", "result-detail svelte-prm-g0pisw");
      attr(div11, "class", "result-label svelte-prm-g0pisw");
      attr(div12, "class", "result-text svelte-prm-g0pisw");
      attr(div13, "class", "result-detail svelte-prm-g0pisw");
      attr(div14, "class", "result-card svelte-prm-g0pisw");
      attr(button, "class", "btn-ok svelte-prm-g0pisw");
      attr(div15, "class", "result-content svelte-prm-g0pisw");
    },
    m(target, anchor) {
      insert(target, div0, anchor);
      insert(target, t1, anchor);
      insert(target, div15, anchor);
      append(div15, div14);
      append(div14, div4);
      append(div4, div3);
      append(div3, div1);
      append(div3, t3);
      append(div3, div2);
      append(div2, i1);
      append(div2, t4);
      append(div2, t5);
      append(div4, t6);
      append(div4, i2);
      append(div14, t7);
      append(div14, div7);
      append(div7, div5);
      append(div7, t9);
      append(div7, div6);
      append(div6, t10);
      append(div14, t11);
      append(div14, div10);
      append(div10, div8);
      append(div10, t13);
      append(div10, div9);
      append(div9, t14);
      append(div14, t15);
      append(div14, div13);
      append(div13, div11);
      append(div13, t17);
      append(div13, div12);
      append(div12, t18);
      append(div12, t19);
      append(div14, t20);
      if (if_block) if_block.m(div14, null);
      append(div15, t21);
      append(div15, button);
      if (!mounted) {
        dispose = listen(button, "click", function() {
          if (is_function(
            /*onOk*/
            ctx[10]
          )) ctx[10].apply(this, arguments);
        });
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty[0] & /*outcomeLabel*/
      8192) set_data(
        t5,
        /*outcomeLabel*/
        ctx[13]
      );
      if (dirty[0] & /*outcomeColor*/
      16384) {
        set_style(
          div2,
          "color",
          /*outcomeColor*/
          ctx[14]
        );
      }
      if (dirty[0] & /*armyName*/
      131072) set_data(
        t10,
        /*armyName*/
        ctx[17]
      );
      if (dirty[0] & /*plottedPath*/
      4 && t14_value !== (t14_value = /*plottedPath*/
      (ctx[2].length > 0 ? (
        /*plottedPath*/
        ctx[2][
          /*plottedPath*/
          ctx[2].length - 1
        ]
      ) : "Unknown") + "")) set_data(t14, t14_value);
      if (dirty[0] & /*movementUsed*/
      32768) set_data(
        t18,
        /*movementUsed*/
        ctx[15]
      );
      if (
        /*conditionsToApply*/
        ctx[12].length > 0
      ) {
        if (if_block) {
          if_block.p(ctx, dirty);
        } else {
          if_block = create_if_block_5(ctx);
          if_block.c();
          if_block.m(div14, null);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
    },
    d(detaching) {
      if (detaching) {
        detach(div0);
        detach(t1);
        detach(div15);
      }
      if (if_block) if_block.d();
      mounted = false;
      dispose();
    }
  };
}
function create_if_block_3(ctx) {
  let div0;
  let t1;
  let div1;
  return {
    c() {
      div0 = element("div");
      div0.innerHTML = `<h3 class="svelte-prm-g0pisw"><i class="fas fa-route"></i>
        Deploying Army</h3>`;
      t1 = space();
      div1 = element("div");
      div1.innerHTML = `<i class="fas fa-spinner fa-spin animating-spinner svelte-prm-g0pisw"></i> <p class="svelte-prm-g0pisw">Army is moving into position...</p> <p class="waiting-subtitle svelte-prm-g0pisw">Watch the map for animation</p>`;
      attr(div0, "class", "panel-header svelte-prm-g0pisw");
      attr(div1, "class", "waiting-content svelte-prm-g0pisw");
    },
    m(target, anchor) {
      insert(target, div0, anchor);
      insert(target, t1, anchor);
      insert(target, div1, anchor);
    },
    p: noop,
    d(detaching) {
      if (detaching) {
        detach(div0);
        detach(t1);
        detach(div1);
      }
    }
  };
}
function create_if_block_1(ctx) {
  let div0;
  let t1;
  let div20;
  let div17;
  let div4;
  let div3;
  let div1;
  let t3;
  let div2;
  let t4;
  let t5;
  let i1;
  let t6;
  let div7;
  let div5;
  let t8;
  let div6;
  let t9_value = (
    /*rollResult*/
    (ctx[4]?.actorName || "Unknown") + ""
  );
  let t9;
  let t10;
  let div10;
  let div8;
  let t12;
  let div9;
  let t13;
  let t14;
  let div13;
  let div11;
  let t16;
  let div12;
  let t17;
  let t18_value = (
    /*plottedPath*/
    (ctx[2].length > 0 ? (
      /*plottedPath*/
      ctx[2][
        /*plottedPath*/
        ctx[2].length - 1
      ]
    ) : "Unknown") + ""
  );
  let t18;
  let t19;
  let div16;
  let div14;
  let t21;
  let div15;
  let t22_value = (
    /*plottedPath*/
    ctx[2].length + ""
  );
  let t22;
  let t23;
  let t24_value = (
    /*plottedPath*/
    ctx[2].length - 1 + ""
  );
  let t24;
  let t25;
  let t26;
  let t27;
  let div19;
  let div18;
  let button0;
  let t29;
  let button1;
  let t31;
  let button2;
  let i4;
  let t32;
  let span;
  let t33;
  let t34;
  let t35;
  let button2_disabled_value;
  let mounted;
  let dispose;
  let if_block = (
    /*conditionsToApply*/
    ctx[12].length > 0 && create_if_block_2(ctx)
  );
  return {
    c() {
      div0 = element("div");
      div0.innerHTML = `<h3 class="svelte-prm-g0pisw"><i class="fas fa-check-circle"></i>
        Deployment Complete</h3>`;
      t1 = space();
      div20 = element("div");
      div17 = element("div");
      div4 = element("div");
      div3 = element("div");
      div1 = element("div");
      div1.textContent = "Outcome";
      t3 = space();
      div2 = element("div");
      t4 = text(
        /*outcomeLabel*/
        ctx[13]
      );
      t5 = space();
      i1 = element("i");
      t6 = space();
      div7 = element("div");
      div5 = element("div");
      div5.textContent = "Rolled by";
      t8 = space();
      div6 = element("div");
      t9 = text(t9_value);
      t10 = space();
      div10 = element("div");
      div8 = element("div");
      div8.textContent = "Army";
      t12 = space();
      div9 = element("div");
      t13 = text(
        /*armyName*/
        ctx[17]
      );
      t14 = space();
      div13 = element("div");
      div11 = element("div");
      div11.textContent = "Destination";
      t16 = space();
      div12 = element("div");
      t17 = text("Hex: ");
      t18 = text(t18_value);
      t19 = space();
      div16 = element("div");
      div14 = element("div");
      div14.textContent = "Path Length";
      t21 = space();
      div15 = element("div");
      t22 = text(t22_value);
      t23 = text(" hexes (");
      t24 = text(t24_value);
      t25 = text(" movement)");
      t26 = space();
      if (if_block) if_block.c();
      t27 = space();
      div19 = element("div");
      div18 = element("div");
      button0 = element("button");
      button0.innerHTML = `<i class="fas fa-times"></i> Cancel`;
      t29 = space();
      button1 = element("button");
      button1.innerHTML = `<i class="fas fa-check"></i> Confirm`;
      t31 = space();
      button2 = element("button");
      i4 = element("i");
      t32 = text(" Reroll with Fame\n          ");
      span = element("span");
      t33 = text("(");
      t34 = text(
        /*currentFame*/
        ctx[6]
      );
      t35 = text(" left)");
      attr(div0, "class", "panel-header svelte-prm-g0pisw");
      attr(div1, "class", "result-label svelte-prm-g0pisw");
      attr(div2, "class", "result-value svelte-prm-g0pisw");
      set_style(
        div2,
        "color",
        /*outcomeColor*/
        ctx[14]
      );
      attr(div3, "class", "result-outcome svelte-prm-g0pisw");
      attr(i1, "class", "fas fa-chess-knight result-icon svelte-prm-g0pisw");
      attr(div4, "class", "result-header svelte-prm-g0pisw");
      attr(div5, "class", "result-label svelte-prm-g0pisw");
      attr(div6, "class", "result-text svelte-prm-g0pisw");
      attr(div7, "class", "result-detail svelte-prm-g0pisw");
      attr(div8, "class", "result-label svelte-prm-g0pisw");
      attr(div9, "class", "result-text svelte-prm-g0pisw");
      attr(div10, "class", "result-detail svelte-prm-g0pisw");
      attr(div11, "class", "result-label svelte-prm-g0pisw");
      attr(div12, "class", "result-text svelte-prm-g0pisw");
      attr(div13, "class", "result-detail svelte-prm-g0pisw");
      attr(div14, "class", "result-label svelte-prm-g0pisw");
      attr(div15, "class", "result-text svelte-prm-g0pisw");
      attr(div16, "class", "result-detail svelte-prm-g0pisw");
      attr(div17, "class", "result-card svelte-prm-g0pisw");
      attr(button0, "class", "btn-cancel svelte-prm-g0pisw");
      attr(button1, "class", "btn-confirm svelte-prm-g0pisw");
      attr(div18, "class", "result-primary-actions svelte-prm-g0pisw");
      attr(i4, "class", "fas fa-star");
      attr(span, "class", "fame-count svelte-prm-g0pisw");
      attr(button2, "class", "btn-reroll svelte-prm-g0pisw");
      button2.disabled = button2_disabled_value = /*currentFame*/
      ctx[6] === 0;
      attr(div19, "class", "result-actions svelte-prm-g0pisw");
      attr(div20, "class", "result-content svelte-prm-g0pisw");
    },
    m(target, anchor) {
      insert(target, div0, anchor);
      insert(target, t1, anchor);
      insert(target, div20, anchor);
      append(div20, div17);
      append(div17, div4);
      append(div4, div3);
      append(div3, div1);
      append(div3, t3);
      append(div3, div2);
      append(div2, t4);
      append(div4, t5);
      append(div4, i1);
      append(div17, t6);
      append(div17, div7);
      append(div7, div5);
      append(div7, t8);
      append(div7, div6);
      append(div6, t9);
      append(div17, t10);
      append(div17, div10);
      append(div10, div8);
      append(div10, t12);
      append(div10, div9);
      append(div9, t13);
      append(div17, t14);
      append(div17, div13);
      append(div13, div11);
      append(div13, t16);
      append(div13, div12);
      append(div12, t17);
      append(div12, t18);
      append(div17, t19);
      append(div17, div16);
      append(div16, div14);
      append(div16, t21);
      append(div16, div15);
      append(div15, t22);
      append(div15, t23);
      append(div15, t24);
      append(div15, t25);
      append(div17, t26);
      if (if_block) if_block.m(div17, null);
      append(div20, t27);
      append(div20, div19);
      append(div19, div18);
      append(div18, button0);
      append(div18, t29);
      append(div18, button1);
      append(div19, t31);
      append(div19, button2);
      append(button2, i4);
      append(button2, t32);
      append(button2, span);
      append(span, t33);
      append(span, t34);
      append(span, t35);
      if (!mounted) {
        dispose = [
          listen(button0, "click", function() {
            if (is_function(
              /*onCancel*/
              ctx[7]
            )) ctx[7].apply(this, arguments);
          }),
          listen(button1, "click", function() {
            if (is_function(
              /*onConfirm*/
              ctx[9]
            )) ctx[9].apply(this, arguments);
          }),
          listen(button2, "click", function() {
            if (is_function(
              /*onReroll*/
              ctx[11]
            )) ctx[11].apply(this, arguments);
          })
        ];
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty[0] & /*outcomeLabel*/
      8192) set_data(
        t4,
        /*outcomeLabel*/
        ctx[13]
      );
      if (dirty[0] & /*outcomeColor*/
      16384) {
        set_style(
          div2,
          "color",
          /*outcomeColor*/
          ctx[14]
        );
      }
      if (dirty[0] & /*rollResult*/
      16 && t9_value !== (t9_value = /*rollResult*/
      (ctx[4]?.actorName || "Unknown") + "")) set_data(t9, t9_value);
      if (dirty[0] & /*armyName*/
      131072) set_data(
        t13,
        /*armyName*/
        ctx[17]
      );
      if (dirty[0] & /*plottedPath*/
      4 && t18_value !== (t18_value = /*plottedPath*/
      (ctx[2].length > 0 ? (
        /*plottedPath*/
        ctx[2][
          /*plottedPath*/
          ctx[2].length - 1
        ]
      ) : "Unknown") + "")) set_data(t18, t18_value);
      if (dirty[0] & /*plottedPath*/
      4 && t22_value !== (t22_value = /*plottedPath*/
      ctx[2].length + "")) set_data(t22, t22_value);
      if (dirty[0] & /*plottedPath*/
      4 && t24_value !== (t24_value = /*plottedPath*/
      ctx[2].length - 1 + "")) set_data(t24, t24_value);
      if (
        /*conditionsToApply*/
        ctx[12].length > 0
      ) {
        if (if_block) {
          if_block.p(ctx, dirty);
        } else {
          if_block = create_if_block_2(ctx);
          if_block.c();
          if_block.m(div17, null);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
      if (dirty[0] & /*currentFame*/
      64) set_data(
        t34,
        /*currentFame*/
        ctx[6]
      );
      if (dirty[0] & /*currentFame*/
      64 && button2_disabled_value !== (button2_disabled_value = /*currentFame*/
      ctx[6] === 0)) {
        button2.disabled = button2_disabled_value;
      }
    },
    d(detaching) {
      if (detaching) {
        detach(div0);
        detach(t1);
        detach(div20);
      }
      if (if_block) if_block.d();
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_if_block(ctx) {
  let div0;
  let t1;
  let div1;
  return {
    c() {
      div0 = element("div");
      div0.innerHTML = `<h3 class="svelte-prm-g0pisw"><i class="fas fa-dice-d20"></i>
        Deploy Army - Rolling</h3>`;
      t1 = space();
      div1 = element("div");
      div1.innerHTML = `<i class="fas fa-spinner fa-spin waiting-spinner svelte-prm-g0pisw"></i> <p class="svelte-prm-g0pisw">Waiting for roll to complete...</p> <p class="waiting-subtitle svelte-prm-g0pisw">Complete the Foundry roll dialog</p>`;
      attr(div0, "class", "panel-header svelte-prm-g0pisw");
      attr(div1, "class", "waiting-content svelte-prm-g0pisw");
    },
    m(target, anchor) {
      insert(target, div0, anchor);
      insert(target, t1, anchor);
      insert(target, div1, anchor);
    },
    p: noop,
    d(detaching) {
      if (detaching) {
        detach(div0);
        detach(t1);
        detach(div1);
      }
    }
  };
}
function create_else_block_1(ctx) {
  let t;
  let if_block_anchor;
  let each_value_3 = ensure_array_like(
    /*availableArmies*/
    ctx[20]
  );
  let each_blocks = [];
  for (let i = 0; i < each_value_3.length; i += 1) {
    each_blocks[i] = create_each_block_3(get_each_context_3(ctx, each_value_3, i));
  }
  let if_block = (
    /*deployedArmies*/
    ctx[19].length > 0 && create_if_block_9(ctx)
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
      if (dirty[0] & /*availableArmies, selectedArmyId, handleArmyClick*/
      3145730) {
        each_value_3 = ensure_array_like(
          /*availableArmies*/
          ctx2[20]
        );
        let i;
        for (i = 0; i < each_value_3.length; i += 1) {
          const child_ctx = get_each_context_3(ctx2, each_value_3, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block_3(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(t.parentNode, t);
          }
        }
        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }
        each_blocks.length = each_value_3.length;
      }
      if (
        /*deployedArmies*/
        ctx2[19].length > 0
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
      p.innerHTML = `<i class="fas fa-exclamation-triangle"></i> All armies have already moved this turn`;
      attr(p, "class", "error-message svelte-prm-g0pisw");
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
function create_if_block_7(ctx) {
  let p;
  return {
    c() {
      p = element("p");
      p.textContent = "No armies found on current scene";
      attr(p, "class", "empty-message svelte-prm-g0pisw");
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
function create_if_block_11(ctx) {
  let i;
  return {
    c() {
      i = element("i");
      attr(i, "class", "fas fa-check-circle army-selected-icon svelte-prm-g0pisw");
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
function create_else_block_2(ctx) {
  let span;
  return {
    c() {
      span = element("span");
      span.textContent = "Unsupported";
      attr(span, "class", "unsupported");
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
      span.textContent = "Supported";
      attr(span, "class", "supported");
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
function create_each_block_3(ctx) {
  let div3;
  let div0;
  let span;
  let t0_value = (
    /*army*/
    ctx[38].name + ""
  );
  let t0;
  let t1;
  let t2;
  let div1;
  let t3;
  let t4_value = (
    /*army*/
    ctx[38].level + ""
  );
  let t4;
  let t5;
  let t6;
  let div2;
  let t7;
  let t8_value = (
    /*hexId*/
    (ctx[39] || "Unknown") + ""
  );
  let t8;
  let mounted;
  let dispose;
  let if_block0 = (
    /*isSelected*/
    ctx[43] && create_if_block_11()
  );
  function select_block_type_2(ctx2, dirty) {
    if (
      /*army*/
      ctx2[38].supportedBySettlementId
    ) return create_if_block_10;
    return create_else_block_2;
  }
  let current_block_type = select_block_type_2(ctx);
  let if_block1 = current_block_type(ctx);
  function click_handler() {
    return (
      /*click_handler*/
      ctx[25](
        /*army*/
        ctx[38],
        /*deployed*/
        ctx[42]
      )
    );
  }
  function keydown_handler(...args) {
    return (
      /*keydown_handler*/
      ctx[26](
        /*army*/
        ctx[38],
        /*deployed*/
        ctx[42],
        ...args
      )
    );
  }
  return {
    c() {
      div3 = element("div");
      div0 = element("div");
      span = element("span");
      t0 = text(t0_value);
      t1 = space();
      if (if_block0) if_block0.c();
      t2 = space();
      div1 = element("div");
      t3 = text("Level ");
      t4 = text(t4_value);
      t5 = text(" • ");
      if_block1.c();
      t6 = space();
      div2 = element("div");
      t7 = text("Hex: ");
      t8 = text(t8_value);
      attr(span, "class", "army-name svelte-prm-g0pisw");
      attr(div0, "class", "army-header svelte-prm-g0pisw");
      attr(div1, "class", "army-details svelte-prm-g0pisw");
      attr(div2, "class", "army-hex svelte-prm-g0pisw");
      attr(div3, "class", "army-item svelte-prm-g0pisw");
      attr(div3, "role", "button");
      attr(div3, "tabindex", "0");
      toggle_class(
        div3,
        "selected",
        /*isSelected*/
        ctx[43]
      );
    },
    m(target, anchor) {
      insert(target, div3, anchor);
      append(div3, div0);
      append(div0, span);
      append(span, t0);
      append(div0, t1);
      if (if_block0) if_block0.m(div0, null);
      append(div3, t2);
      append(div3, div1);
      append(div1, t3);
      append(div1, t4);
      append(div1, t5);
      if_block1.m(div1, null);
      append(div3, t6);
      append(div3, div2);
      append(div2, t7);
      append(div2, t8);
      if (!mounted) {
        dispose = [
          listen(div3, "click", click_handler),
          listen(div3, "keydown", keydown_handler)
        ];
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty[0] & /*availableArmies*/
      1048576 && t0_value !== (t0_value = /*army*/
      ctx[38].name + "")) set_data(t0, t0_value);
      if (
        /*isSelected*/
        ctx[43]
      ) {
        if (if_block0) ;
        else {
          if_block0 = create_if_block_11();
          if_block0.c();
          if_block0.m(div0, null);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }
      if (dirty[0] & /*availableArmies*/
      1048576 && t4_value !== (t4_value = /*army*/
      ctx[38].level + "")) set_data(t4, t4_value);
      if (current_block_type !== (current_block_type = select_block_type_2(ctx))) {
        if_block1.d(1);
        if_block1 = current_block_type(ctx);
        if (if_block1) {
          if_block1.c();
          if_block1.m(div1, null);
        }
      }
      if (dirty[0] & /*availableArmies*/
      1048576 && t8_value !== (t8_value = /*hexId*/
      (ctx[39] || "Unknown") + "")) set_data(t8, t8_value);
      if (dirty[0] & /*availableArmies, selectedArmyId*/
      1048578) {
        toggle_class(
          div3,
          "selected",
          /*isSelected*/
          ctx[43]
        );
      }
    },
    d(detaching) {
      if (detaching) {
        detach(div3);
      }
      if (if_block0) if_block0.d();
      if_block1.d();
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_if_block_9(ctx) {
  let div;
  let t1;
  let each_1_anchor;
  let each_value_2 = ensure_array_like(
    /*deployedArmies*/
    ctx[19]
  );
  let each_blocks = [];
  for (let i = 0; i < each_value_2.length; i += 1) {
    each_blocks[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
  }
  return {
    c() {
      div = element("div");
      div.innerHTML = `<p class="deployed-label svelte-prm-g0pisw">Already Deployed</p>`;
      t1 = space();
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      each_1_anchor = empty();
      attr(div, "class", "deployed-divider svelte-prm-g0pisw");
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
      if (dirty[0] & /*handleArmyClick, deployedArmies*/
      2621440) {
        each_value_2 = ensure_array_like(
          /*deployedArmies*/
          ctx2[19]
        );
        let i;
        for (i = 0; i < each_value_2.length; i += 1) {
          const child_ctx = get_each_context_2(ctx2, each_value_2, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block_2(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
          }
        }
        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }
        each_blocks.length = each_value_2.length;
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
function create_each_block_2(ctx) {
  let div3;
  let div0;
  let span;
  let t0_value = (
    /*army*/
    ctx[38].name + ""
  );
  let t0;
  let t1;
  let i;
  let t2;
  let div1;
  let t3;
  let t4_value = (
    /*army*/
    ctx[38].level + ""
  );
  let t4;
  let t5;
  let t6;
  let div2;
  let t7;
  let t8_value = (
    /*hexId*/
    (ctx[39] || "Unknown") + ""
  );
  let t8;
  let t9;
  let mounted;
  let dispose;
  function click_handler_1() {
    return (
      /*click_handler_1*/
      ctx[27](
        /*army*/
        ctx[38]
      )
    );
  }
  function keydown_handler_1(...args) {
    return (
      /*keydown_handler_1*/
      ctx[28](
        /*army*/
        ctx[38],
        ...args
      )
    );
  }
  return {
    c() {
      div3 = element("div");
      div0 = element("div");
      span = element("span");
      t0 = text(t0_value);
      t1 = space();
      i = element("i");
      t2 = space();
      div1 = element("div");
      t3 = text("Level ");
      t4 = text(t4_value);
      t5 = text(" • Already moved this turn");
      t6 = space();
      div2 = element("div");
      t7 = text("Hex: ");
      t8 = text(t8_value);
      t9 = space();
      attr(span, "class", "army-name svelte-prm-g0pisw");
      attr(i, "class", "fas fa-check deployed-icon svelte-prm-g0pisw");
      attr(div0, "class", "army-header svelte-prm-g0pisw");
      attr(div1, "class", "army-details svelte-prm-g0pisw");
      attr(div2, "class", "army-hex svelte-prm-g0pisw");
      attr(div3, "class", "army-item deployed svelte-prm-g0pisw");
      attr(div3, "role", "button");
      attr(div3, "tabindex", "0");
    },
    m(target, anchor) {
      insert(target, div3, anchor);
      append(div3, div0);
      append(div0, span);
      append(span, t0);
      append(div0, t1);
      append(div0, i);
      append(div3, t2);
      append(div3, div1);
      append(div1, t3);
      append(div1, t4);
      append(div1, t5);
      append(div3, t6);
      append(div3, div2);
      append(div2, t7);
      append(div2, t8);
      append(div3, t9);
      if (!mounted) {
        dispose = [
          listen(div3, "click", click_handler_1),
          listen(div3, "keydown", keydown_handler_1)
        ];
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty[0] & /*deployedArmies*/
      524288 && t0_value !== (t0_value = /*army*/
      ctx[38].name + "")) set_data(t0, t0_value);
      if (dirty[0] & /*deployedArmies*/
      524288 && t4_value !== (t4_value = /*army*/
      ctx[38].level + "")) set_data(t4, t4_value);
      if (dirty[0] & /*deployedArmies*/
      524288 && t8_value !== (t8_value = /*hexId*/
      (ctx[39] || "Unknown") + "")) set_data(t8, t8_value);
    },
    d(detaching) {
      if (detaching) {
        detach(div3);
      }
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_if_block_6(ctx) {
  let div2;
  let div0;
  let span0;
  let t1;
  let span1;
  let t2_value = (
    /*plottedPath*/
    ctx[2].length + ""
  );
  let t2;
  let t3;
  let t4;
  let div1;
  let span2;
  let t6;
  let span3;
  let t7;
  let t8;
  let t9;
  return {
    c() {
      div2 = element("div");
      div0 = element("div");
      span0 = element("span");
      span0.textContent = "Path Length:";
      t1 = space();
      span1 = element("span");
      t2 = text(t2_value);
      t3 = text(" hexes");
      t4 = space();
      div1 = element("div");
      span2 = element("span");
      span2.textContent = "Movement Used:";
      t6 = space();
      span3 = element("span");
      t7 = text(
        /*movementUsed*/
        ctx[15]
      );
      t8 = text(" / ");
      t9 = text(
        /*maxMovement*/
        ctx[16]
      );
      attr(span1, "class", "movement-value svelte-prm-g0pisw");
      attr(div0, "class", "movement-row svelte-prm-g0pisw");
      attr(span3, "class", "movement-value svelte-prm-g0pisw");
      toggle_class(
        span3,
        "movement-max",
        /*movementUsed*/
        ctx[15] >= /*maxMovement*/
        ctx[16]
      );
      attr(div1, "class", "movement-row svelte-prm-g0pisw");
      attr(div2, "class", "movement-info svelte-prm-g0pisw");
    },
    m(target, anchor) {
      insert(target, div2, anchor);
      append(div2, div0);
      append(div0, span0);
      append(div0, t1);
      append(div0, span1);
      append(span1, t2);
      append(span1, t3);
      append(div2, t4);
      append(div2, div1);
      append(div1, span2);
      append(div1, t6);
      append(div1, span3);
      append(span3, t7);
      append(span3, t8);
      append(span3, t9);
    },
    p(ctx2, dirty) {
      if (dirty[0] & /*plottedPath*/
      4 && t2_value !== (t2_value = /*plottedPath*/
      ctx2[2].length + "")) set_data(t2, t2_value);
      if (dirty[0] & /*movementUsed*/
      32768) set_data(
        t7,
        /*movementUsed*/
        ctx2[15]
      );
      if (dirty[0] & /*maxMovement*/
      65536) set_data(
        t9,
        /*maxMovement*/
        ctx2[16]
      );
      if (dirty[0] & /*movementUsed, maxMovement*/
      98304) {
        toggle_class(
          span3,
          "movement-max",
          /*movementUsed*/
          ctx2[15] >= /*maxMovement*/
          ctx2[16]
        );
      }
    },
    d(detaching) {
      if (detaching) {
        detach(div2);
      }
    }
  };
}
function create_if_block_5(ctx) {
  let div2;
  let div0;
  let t1;
  let div1;
  let each_value_1 = ensure_array_like(
    /*conditionsToApply*/
    ctx[12]
  );
  let each_blocks = [];
  for (let i = 0; i < each_value_1.length; i += 1) {
    each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
  }
  return {
    c() {
      div2 = element("div");
      div0 = element("div");
      div0.textContent = "Effects Applied:";
      t1 = space();
      div1 = element("div");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      attr(div0, "class", "effects-label svelte-prm-g0pisw");
      attr(div1, "class", "effects-list svelte-prm-g0pisw");
      attr(div2, "class", "effects-section svelte-prm-g0pisw");
    },
    m(target, anchor) {
      insert(target, div2, anchor);
      append(div2, div0);
      append(div2, t1);
      append(div2, div1);
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(div1, null);
        }
      }
    },
    p(ctx2, dirty) {
      if (dirty[0] & /*conditionsToApply*/
      4096) {
        each_value_1 = ensure_array_like(
          /*conditionsToApply*/
          ctx2[12]
        );
        let i;
        for (i = 0; i < each_value_1.length; i += 1) {
          const child_ctx = get_each_context_1(ctx2, each_value_1, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block_1(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(div1, null);
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
        detach(div2);
      }
      destroy_each(each_blocks, detaching);
    }
  };
}
function create_each_block_1(ctx) {
  let div;
  let i;
  let i_class_value;
  let t0;
  let span;
  let t1_value = (
    /*condition*/
    ctx[31] + ""
  );
  let t1;
  let t2;
  return {
    c() {
      div = element("div");
      i = element("i");
      t0 = space();
      span = element("span");
      t1 = text(t1_value);
      t2 = space();
      attr(i, "class", i_class_value = "fas " + /*icon*/
      ctx[33] + " svelte-prm-g0pisw");
      attr(span, "class", "svelte-prm-g0pisw");
      attr(div, "class", "effect-item svelte-prm-g0pisw");
      toggle_class(
        div,
        "effect-negative",
        /*isNegative*/
        ctx[32]
      );
    },
    m(target, anchor) {
      insert(target, div, anchor);
      append(div, i);
      append(div, t0);
      append(div, span);
      append(span, t1);
      append(div, t2);
    },
    p(ctx2, dirty) {
      if (dirty[0] & /*conditionsToApply*/
      4096 && i_class_value !== (i_class_value = "fas " + /*icon*/
      ctx2[33] + " svelte-prm-g0pisw")) {
        attr(i, "class", i_class_value);
      }
      if (dirty[0] & /*conditionsToApply*/
      4096 && t1_value !== (t1_value = /*condition*/
      ctx2[31] + "")) set_data(t1, t1_value);
      if (dirty[0] & /*conditionsToApply*/
      4096) {
        toggle_class(
          div,
          "effect-negative",
          /*isNegative*/
          ctx2[32]
        );
      }
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
    }
  };
}
function create_if_block_2(ctx) {
  let div2;
  let div0;
  let t1;
  let div1;
  let each_value = ensure_array_like(
    /*conditionsToApply*/
    ctx[12]
  );
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
  }
  return {
    c() {
      div2 = element("div");
      div0 = element("div");
      div0.textContent = "Effects Applied:";
      t1 = space();
      div1 = element("div");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      attr(div0, "class", "effects-label svelte-prm-g0pisw");
      attr(div1, "class", "effects-list svelte-prm-g0pisw");
      attr(div2, "class", "effects-section svelte-prm-g0pisw");
    },
    m(target, anchor) {
      insert(target, div2, anchor);
      append(div2, div0);
      append(div2, t1);
      append(div2, div1);
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(div1, null);
        }
      }
    },
    p(ctx2, dirty) {
      if (dirty[0] & /*conditionsToApply*/
      4096) {
        each_value = ensure_array_like(
          /*conditionsToApply*/
          ctx2[12]
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
function create_each_block(ctx) {
  let div;
  let i;
  let i_class_value;
  let t0;
  let span;
  let t1_value = (
    /*condition*/
    ctx[31] + ""
  );
  let t1;
  let t2;
  return {
    c() {
      div = element("div");
      i = element("i");
      t0 = space();
      span = element("span");
      t1 = text(t1_value);
      t2 = space();
      attr(i, "class", i_class_value = "fas " + /*icon*/
      ctx[33] + " svelte-prm-g0pisw");
      attr(span, "class", "svelte-prm-g0pisw");
      attr(div, "class", "effect-item svelte-prm-g0pisw");
      toggle_class(
        div,
        "effect-negative",
        /*isNegative*/
        ctx[32]
      );
    },
    m(target, anchor) {
      insert(target, div, anchor);
      append(div, i);
      append(div, t0);
      append(div, span);
      append(span, t1);
      append(div, t2);
    },
    p(ctx2, dirty) {
      if (dirty[0] & /*conditionsToApply*/
      4096 && i_class_value !== (i_class_value = "fas " + /*icon*/
      ctx2[33] + " svelte-prm-g0pisw")) {
        attr(i, "class", i_class_value);
      }
      if (dirty[0] & /*conditionsToApply*/
      4096 && t1_value !== (t1_value = /*condition*/
      ctx2[31] + "")) set_data(t1, t1_value);
      if (dirty[0] & /*conditionsToApply*/
      4096) {
        toggle_class(
          div,
          "effect-negative",
          /*isNegative*/
          ctx2[32]
        );
      }
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
    }
  };
}
function create_fragment(ctx) {
  let div;
  function select_block_type(ctx2, dirty) {
    if (
      /*panelState*/
      ctx2[3] === "waiting-for-roll"
    ) return create_if_block;
    if (
      /*panelState*/
      ctx2[3] === "showing-result"
    ) return create_if_block_1;
    if (
      /*panelState*/
      ctx2[3] === "animating"
    ) return create_if_block_3;
    if (
      /*panelState*/
      ctx2[3] === "completed"
    ) return create_if_block_4;
    return create_else_block;
  }
  let current_block_type = select_block_type(ctx);
  let if_block = current_block_type(ctx);
  return {
    c() {
      div = element("div");
      if_block.c();
      attr(div, "class", "army-deployment-panel svelte-prm-g0pisw");
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
  let availableArmies;
  let deployedArmies;
  let canComplete;
  let kingdom;
  let selectedArmy;
  let armyName;
  let maxMovement;
  let movementUsed;
  let outcomeColor;
  let outcomeLabel;
  let conditionsToApply;
  let { skill } = $$props;
  let { selectedArmyId = null } = $$props;
  let { plottedPath = [] } = $$props;
  let { panelState = "selection" } = $$props;
  let { rollResult = null } = $$props;
  let { armiesOnMap = [] } = $$props;
  let { currentFame = 0 } = $$props;
  let { onCancel } = $$props;
  let { onDone } = $$props;
  let { onConfirm } = $$props;
  let { onOk } = $$props;
  let { onSelectArmy } = $$props;
  let { onReroll } = $$props;
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
  function handleArmyClick(armyId, deployed) {
    if (deployed) {
      const army = armiesOnMap.find((a) => a.army.id === armyId);
      if (army) {
        const ui = globalThis.ui;
        ui?.notifications?.warn(`${army.army.name} has already moved this turn`);
      }
      return;
    }
    onSelectArmy(armyId);
  }
  const click_handler = (army, deployed) => handleArmyClick(army.id, deployed);
  const keydown_handler = (army, deployed, e) => (e.key === "Enter" || e.key === " ") && handleArmyClick(army.id, deployed);
  const click_handler_1 = (army) => handleArmyClick(army.id, true);
  const keydown_handler_1 = (army, e) => (e.key === "Enter" || e.key === " ") && handleArmyClick(army.id, true);
  $$self.$$set = ($$props2) => {
    if ("skill" in $$props2) $$invalidate(0, skill = $$props2.skill);
    if ("selectedArmyId" in $$props2) $$invalidate(1, selectedArmyId = $$props2.selectedArmyId);
    if ("plottedPath" in $$props2) $$invalidate(2, plottedPath = $$props2.plottedPath);
    if ("panelState" in $$props2) $$invalidate(3, panelState = $$props2.panelState);
    if ("rollResult" in $$props2) $$invalidate(4, rollResult = $$props2.rollResult);
    if ("armiesOnMap" in $$props2) $$invalidate(5, armiesOnMap = $$props2.armiesOnMap);
    if ("currentFame" in $$props2) $$invalidate(6, currentFame = $$props2.currentFame);
    if ("onCancel" in $$props2) $$invalidate(7, onCancel = $$props2.onCancel);
    if ("onDone" in $$props2) $$invalidate(8, onDone = $$props2.onDone);
    if ("onConfirm" in $$props2) $$invalidate(9, onConfirm = $$props2.onConfirm);
    if ("onOk" in $$props2) $$invalidate(10, onOk = $$props2.onOk);
    if ("onSelectArmy" in $$props2) $$invalidate(22, onSelectArmy = $$props2.onSelectArmy);
    if ("onReroll" in $$props2) $$invalidate(11, onReroll = $$props2.onReroll);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty[0] & /*armiesOnMap*/
    32) {
      $$invalidate(20, availableArmies = armiesOnMap.filter((a) => !a.deployed));
    }
    if ($$self.$$.dirty[0] & /*armiesOnMap*/
    32) {
      $$invalidate(19, deployedArmies = armiesOnMap.filter((a) => a.deployed));
    }
    if ($$self.$$.dirty[0] & /*selectedArmyId, plottedPath*/
    6) {
      $$invalidate(18, canComplete = selectedArmyId && plottedPath.length > 1);
    }
    if ($$self.$$.dirty[0] & /*kingdom, selectedArmyId*/
    16777218) {
      $$invalidate(23, selectedArmy = kingdom?.armies?.find((a) => a.id === selectedArmyId));
    }
    if ($$self.$$.dirty[0] & /*selectedArmy*/
    8388608) {
      $$invalidate(17, armyName = selectedArmy?.name || "Unknown Army");
    }
    if ($$self.$$.dirty[0] & /*plottedPath*/
    4) {
      $$invalidate(15, movementUsed = plottedPath.length > 0 ? plottedPath.length - 1 : 0);
    }
    if ($$self.$$.dirty[0] & /*rollResult*/
    16) {
      $$invalidate(14, outcomeColor = rollResult ? outcomeColors[rollResult.outcome] || "#999" : "#999");
    }
    if ($$self.$$.dirty[0] & /*rollResult*/
    16) {
      $$invalidate(13, outcomeLabel = rollResult ? outcomeLabels[rollResult.outcome] || rollResult.outcome : "");
    }
    if ($$self.$$.dirty[0] & /*rollResult*/
    16) {
      $$invalidate(12, conditionsToApply = rollResult?.outcome === "criticalSuccess" ? [
        "+1 initiative (status bonus)",
        "+1 saving throws (status bonus)",
        "+1 attack (status bonus)"
      ] : rollResult?.outcome === "failure" ? ["-1 initiative (status penalty)", "fatigued"] : rollResult?.outcome === "criticalFailure" ? ["-2 initiative (status penalty)", "enfeebled 1", "fatigued"] : []);
    }
  };
  $$invalidate(24, kingdom = getKingdomData());
  $$invalidate(16, maxMovement = armyMovementMode.isActive() ? armyMovementMode.maxMovement : 20);
  return [
    skill,
    selectedArmyId,
    plottedPath,
    panelState,
    rollResult,
    armiesOnMap,
    currentFame,
    onCancel,
    onDone,
    onConfirm,
    onOk,
    onReroll,
    conditionsToApply,
    outcomeLabel,
    outcomeColor,
    movementUsed,
    maxMovement,
    armyName,
    canComplete,
    deployedArmies,
    availableArmies,
    handleArmyClick,
    onSelectArmy,
    selectedArmy,
    kingdom,
    click_handler,
    keydown_handler,
    click_handler_1,
    keydown_handler_1
  ];
}
class ArmyDeploymentPanel extends SvelteComponent {
  constructor(options) {
    super();
    init(
      this,
      options,
      instance,
      create_fragment,
      safe_not_equal,
      {
        skill: 0,
        selectedArmyId: 1,
        plottedPath: 2,
        panelState: 3,
        rollResult: 4,
        armiesOnMap: 5,
        currentFame: 6,
        onCancel: 7,
        onDone: 8,
        onConfirm: 9,
        onOk: 10,
        onSelectArmy: 22,
        onReroll: 11
      },
      null,
      [-1, -1]
    );
  }
}
export {
  ArmyDeploymentPanel as default
};
