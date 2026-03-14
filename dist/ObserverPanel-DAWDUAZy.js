import { aw as SvelteComponent, ax as init, ay as safe_not_equal, az as noop, aA as detach, aE as set_data, aB as insert, aF as append, aC as element, aG as space, aH as text, aD as attr, aK as listen, aL as is_function, p as getKingdomData, aQ as getAdjacentHexIds, aR as getTerrainResourceOptions, aI as ensure_array_like, aJ as destroy_each, aP as empty, aN as toggle_class, aS as update_keyed_each, aT as destroy_block, aU as getTerrainIcon, aM as set_style, aV as getTerrainColor, aW as getResourceIcon, aX as getResourceColor } from "./GameCommandUtils-D_sgs3NK.js";
function get_each_context_1(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[22] = list[i];
  return child_ctx;
}
function get_each_context_2(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[25] = list[i];
  return child_ctx;
}
function get_each_context_3(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[22] = list[i];
  return child_ctx;
}
function get_each_context(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[17] = list[i];
  child_ctx[21] = i;
  const constants_0 = (
    /*selectedHexes*/
    child_ctx[4][
      /*i*/
      child_ctx[21]
    ]
  );
  child_ctx[18] = constants_0;
  const constants_1 = (
    /*hexId*/
    child_ctx[18] ? (
      /*getHexTerrain*/
      child_ctx[11](
        /*hexId*/
        child_ctx[18]
      )
    ) : ""
  );
  child_ctx[19] = constants_1;
  return child_ctx;
}
function create_if_block_9(ctx) {
  let button;
  let mounted;
  let dispose;
  return {
    c() {
      button = element("button");
      button.innerHTML = `<i class="fas fa-times svelte-prm-nrvzmx"></i>`;
      attr(button, "class", "btn-dismiss svelte-prm-nrvzmx");
      attr(button, "title", "Dismiss");
    },
    m(target, anchor) {
      insert(target, button, anchor);
      if (!mounted) {
        dispose = listen(button, "click", function() {
          if (is_function(
            /*onDismiss*/
            ctx[6]
          )) ctx[6].apply(this, arguments);
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
function create_if_block_8(ctx) {
  let div2;
  let div0;
  let t1;
  let div1;
  let t2;
  return {
    c() {
      div2 = element("div");
      div0 = element("div");
      div0.innerHTML = `<i class="fas fa-crown svelte-prm-nrvzmx"></i>
        Capital Name`;
      t1 = space();
      div1 = element("div");
      t2 = text(
        /*settlementName*/
        ctx[9]
      );
      attr(div0, "class", "preview-label svelte-prm-nrvzmx");
      attr(div1, "class", "preview-value svelte-prm-nrvzmx");
      attr(div2, "class", "settlement-preview svelte-prm-nrvzmx");
    },
    m(target, anchor) {
      insert(target, div2, anchor);
      append(div2, div0);
      append(div2, t1);
      append(div2, div1);
      append(div1, t2);
    },
    p(ctx2, dirty) {
      if (dirty & /*settlementName*/
      512) set_data(
        t2,
        /*settlementName*/
        ctx2[9]
      );
    },
    d(detaching) {
      if (detaching) {
        detach(div2);
      }
    }
  };
}
function create_else_block_2(ctx) {
  let div;
  let t;
  let if_block1_anchor;
  function select_block_type_2(ctx2, dirty) {
    if (
      /*selectedHexes*/
      ctx2[4][0]
    ) return create_if_block_7;
    return create_else_block_4;
  }
  let current_block_type = select_block_type_2(ctx);
  let if_block0 = current_block_type(ctx);
  let if_block1 = (
    /*hexResourceInfoList*/
    ctx[7].length > 0 && create_if_block_3(ctx)
  );
  return {
    c() {
      div = element("div");
      if_block0.c();
      t = space();
      if (if_block1) if_block1.c();
      if_block1_anchor = empty();
      attr(div, "class", "hex-slots svelte-prm-nrvzmx");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      if_block0.m(div, null);
      insert(target, t, anchor);
      if (if_block1) if_block1.m(target, anchor);
      insert(target, if_block1_anchor, anchor);
    },
    p(ctx2, dirty) {
      if (current_block_type === (current_block_type = select_block_type_2(ctx2)) && if_block0) {
        if_block0.p(ctx2, dirty);
      } else {
        if_block0.d(1);
        if_block0 = current_block_type(ctx2);
        if (if_block0) {
          if_block0.c();
          if_block0.m(div, null);
        }
      }
      if (
        /*hexResourceInfoList*/
        ctx2[7].length > 0
      ) {
        if (if_block1) {
          if_block1.p(ctx2, dirty);
        } else {
          if_block1 = create_if_block_3(ctx2);
          if_block1.c();
          if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
        }
      } else if (if_block1) {
        if_block1.d(1);
        if_block1 = null;
      }
    },
    d(detaching) {
      if (detaching) {
        detach(div);
        detach(t);
        detach(if_block1_anchor);
      }
      if_block0.d();
      if (if_block1) if_block1.d(detaching);
    }
  };
}
function create_if_block_1(ctx) {
  let div;
  let each_value = ensure_array_like(Array(
    /*count*/
    ctx[3]
  ));
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
  }
  return {
    c() {
      div = element("div");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      attr(div, "class", "hex-slots svelte-prm-nrvzmx");
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
      if (dirty & /*selectedHexes, getHexTerrain, count*/
      2072) {
        each_value = ensure_array_like(Array(
          /*count*/
          ctx2[3]
        ));
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
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      destroy_each(each_blocks, detaching);
    }
  };
}
function create_else_block_4(ctx) {
  let div;
  return {
    c() {
      div = element("div");
      div.innerHTML = `<span class="slot-number svelte-prm-nrvzmx">[1]</span> <span class="hex-empty svelte-prm-nrvzmx">______</span>`;
      attr(div, "class", "hex-slot svelte-prm-nrvzmx");
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
function create_if_block_7(ctx) {
  let div;
  let span0;
  let t1;
  let span1;
  let t2_value = (
    /*selectedHexes*/
    ctx[4][0] + ""
  );
  let t2;
  let t3;
  let span2;
  let t4;
  let t5_value = (
    /*getHexTerrain*/
    ctx[11](
      /*selectedHexes*/
      ctx[4][0]
    ) + ""
  );
  let t5;
  let t6;
  return {
    c() {
      div = element("div");
      span0 = element("span");
      span0.textContent = "[1]";
      t1 = space();
      span1 = element("span");
      t2 = text(t2_value);
      t3 = space();
      span2 = element("span");
      t4 = text("[");
      t5 = text(t5_value);
      t6 = text("]");
      attr(span0, "class", "slot-number svelte-prm-nrvzmx");
      attr(span1, "class", "hex-id svelte-prm-nrvzmx");
      attr(span2, "class", "hex-terrain svelte-prm-nrvzmx");
      attr(div, "class", "hex-slot filled svelte-prm-nrvzmx");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      append(div, span0);
      append(div, t1);
      append(div, span1);
      append(span1, t2);
      append(div, t3);
      append(div, span2);
      append(span2, t4);
      append(span2, t5);
      append(span2, t6);
    },
    p(ctx2, dirty) {
      if (dirty & /*selectedHexes*/
      16 && t2_value !== (t2_value = /*selectedHexes*/
      ctx2[4][0] + "")) set_data(t2, t2_value);
      if (dirty & /*selectedHexes*/
      16 && t5_value !== (t5_value = /*getHexTerrain*/
      ctx2[11](
        /*selectedHexes*/
        ctx2[4][0]
      ) + "")) set_data(t5, t5_value);
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
    }
  };
}
function create_if_block_3(ctx) {
  let div3;
  let div0;
  let t2;
  let div1;
  let each_blocks_1 = [];
  let each0_lookup = /* @__PURE__ */ new Map();
  let t3;
  let div2;
  let span1;
  let t5;
  let each_value_2 = ensure_array_like(
    /*hexResourceInfoList*/
    ctx[7]
  );
  const get_key = (ctx2) => (
    /*hexInfo*/
    ctx2[25].hexId
  );
  for (let i = 0; i < each_value_2.length; i += 1) {
    let child_ctx = get_each_context_2(ctx, each_value_2, i);
    let key = get_key(child_ctx);
    each0_lookup.set(key, each_blocks_1[i] = create_each_block_2(key, child_ctx));
  }
  let each_value_1 = ensure_array_like(
    /*RESOURCE_ORDER*/
    ctx[12]
  );
  let each_blocks = [];
  for (let i = 0; i < each_value_1.length; i += 1) {
    each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
  }
  return {
    c() {
      div3 = element("div");
      div0 = element("div");
      div0.innerHTML = `<i class="fas fa-gem svelte-prm-nrvzmx"></i> <span>Local Resources</span>`;
      t2 = space();
      div1 = element("div");
      for (let i = 0; i < each_blocks_1.length; i += 1) {
        each_blocks_1[i].c();
      }
      t3 = space();
      div2 = element("div");
      span1 = element("span");
      span1.textContent = "Total:";
      t5 = space();
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      attr(div0, "class", "section-header svelte-prm-nrvzmx");
      attr(div1, "class", "hex-resource-list svelte-prm-nrvzmx");
      attr(span1, "class", "totals-label svelte-prm-nrvzmx");
      attr(div2, "class", "totals-summary svelte-prm-nrvzmx");
      attr(div3, "class", "resources-section svelte-prm-nrvzmx");
    },
    m(target, anchor) {
      insert(target, div3, anchor);
      append(div3, div0);
      append(div3, t2);
      append(div3, div1);
      for (let i = 0; i < each_blocks_1.length; i += 1) {
        if (each_blocks_1[i]) {
          each_blocks_1[i].m(div1, null);
        }
      }
      append(div3, t3);
      append(div3, div2);
      append(div2, span1);
      append(div2, t5);
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(div2, null);
        }
      }
    },
    p(ctx2, dirty) {
      if (dirty & /*hexResourceInfoList, formatResourceName, formatTerrainName*/
      128) {
        each_value_2 = ensure_array_like(
          /*hexResourceInfoList*/
          ctx2[7]
        );
        each_blocks_1 = update_keyed_each(each_blocks_1, dirty, get_key, 1, ctx2, each_value_2, each0_lookup, div1, destroy_block, create_each_block_2, null, get_each_context_2);
      }
      if (dirty & /*resourceTotals, RESOURCE_ORDER*/
      4352) {
        each_value_1 = ensure_array_like(
          /*RESOURCE_ORDER*/
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
            each_blocks[i].m(div2, null);
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
        detach(div3);
      }
      for (let i = 0; i < each_blocks_1.length; i += 1) {
        each_blocks_1[i].d();
      }
      destroy_each(each_blocks, detaching);
    }
  };
}
function create_if_block_6(ctx) {
  let span;
  return {
    c() {
      span = element("span");
      span.textContent = "Capital";
      attr(span, "class", "capital-badge svelte-prm-nrvzmx");
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
  let div;
  let each_value_3 = ensure_array_like(
    /*hexInfo*/
    ctx[25].options
  );
  let each_blocks = [];
  for (let i = 0; i < each_value_3.length; i += 1) {
    each_blocks[i] = create_each_block_3(get_each_context_3(ctx, each_value_3, i));
  }
  return {
    c() {
      div = element("div");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      attr(div, "class", "resource-options svelte-prm-nrvzmx");
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
      if (dirty & /*hexResourceInfoList, formatResourceName*/
      128) {
        each_value_3 = ensure_array_like(
          /*hexInfo*/
          ctx2[25].options
        );
        let i;
        for (i = 0; i < each_value_3.length; i += 1) {
          const child_ctx = get_each_context_3(ctx2, each_value_3, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block_3(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(div, null);
          }
        }
        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }
        each_blocks.length = each_value_3.length;
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
function create_if_block_5(ctx) {
  let span1;
  let i;
  let i_class_value;
  let t0;
  let span0;
  let t1_value = formatResourceName(
    /*hexInfo*/
    ctx[25].options[0]
  ) + "";
  let t1;
  return {
    c() {
      span1 = element("span");
      i = element("i");
      t0 = space();
      span0 = element("span");
      t1 = text(t1_value);
      attr(i, "class", i_class_value = "fas " + getResourceIcon(
        /*hexInfo*/
        ctx[25].options[0]
      ) + " svelte-prm-nrvzmx");
      set_style(i, "color", getResourceColor(
        /*hexInfo*/
        ctx[25].options[0]
      ));
      attr(span1, "class", "resource-pill selected svelte-prm-nrvzmx");
    },
    m(target, anchor) {
      insert(target, span1, anchor);
      append(span1, i);
      append(span1, t0);
      append(span1, span0);
      append(span0, t1);
    },
    p(ctx2, dirty) {
      if (dirty & /*hexResourceInfoList*/
      128 && i_class_value !== (i_class_value = "fas " + getResourceIcon(
        /*hexInfo*/
        ctx2[25].options[0]
      ) + " svelte-prm-nrvzmx")) {
        attr(i, "class", i_class_value);
      }
      if (dirty & /*hexResourceInfoList*/
      128) {
        set_style(i, "color", getResourceColor(
          /*hexInfo*/
          ctx2[25].options[0]
        ));
      }
      if (dirty & /*hexResourceInfoList*/
      128 && t1_value !== (t1_value = formatResourceName(
        /*hexInfo*/
        ctx2[25].options[0]
      ) + "")) set_data(t1, t1_value);
    },
    d(detaching) {
      if (detaching) {
        detach(span1);
      }
    }
  };
}
function create_each_block_3(ctx) {
  let span1;
  let i;
  let i_class_value;
  let t0;
  let span0;
  let t1_value = formatResourceName(
    /*resource*/
    ctx[22]
  ) + "";
  let t1;
  let t2;
  return {
    c() {
      span1 = element("span");
      i = element("i");
      t0 = space();
      span0 = element("span");
      t1 = text(t1_value);
      t2 = space();
      attr(i, "class", i_class_value = "fas " + getResourceIcon(
        /*resource*/
        ctx[22]
      ) + " svelte-prm-nrvzmx");
      set_style(i, "color", getResourceColor(
        /*resource*/
        ctx[22]
      ));
      attr(span1, "class", "resource-pill svelte-prm-nrvzmx");
      toggle_class(
        span1,
        "selected",
        /*hexInfo*/
        ctx[25].selectedResource === /*resource*/
        ctx[22]
      );
    },
    m(target, anchor) {
      insert(target, span1, anchor);
      append(span1, i);
      append(span1, t0);
      append(span1, span0);
      append(span0, t1);
      append(span1, t2);
    },
    p(ctx2, dirty) {
      if (dirty & /*hexResourceInfoList*/
      128 && i_class_value !== (i_class_value = "fas " + getResourceIcon(
        /*resource*/
        ctx2[22]
      ) + " svelte-prm-nrvzmx")) {
        attr(i, "class", i_class_value);
      }
      if (dirty & /*hexResourceInfoList*/
      128) {
        set_style(i, "color", getResourceColor(
          /*resource*/
          ctx2[22]
        ));
      }
      if (dirty & /*hexResourceInfoList*/
      128 && t1_value !== (t1_value = formatResourceName(
        /*resource*/
        ctx2[22]
      ) + "")) set_data(t1, t1_value);
      if (dirty & /*hexResourceInfoList*/
      128) {
        toggle_class(
          span1,
          "selected",
          /*hexInfo*/
          ctx2[25].selectedResource === /*resource*/
          ctx2[22]
        );
      }
    },
    d(detaching) {
      if (detaching) {
        detach(span1);
      }
    }
  };
}
function create_each_block_2(key_1, ctx) {
  let div2;
  let div0;
  let i;
  let i_class_value;
  let t0;
  let span;
  let t1_value = formatTerrainName(
    /*hexInfo*/
    ctx[25].terrain
  ) + "";
  let t1;
  let t2;
  let t3;
  let div1;
  let t4;
  let if_block0 = (
    /*hexInfo*/
    ctx[25].isSettlementHex && create_if_block_6()
  );
  function select_block_type_3(ctx2, dirty) {
    if (
      /*hexInfo*/
      ctx2[25].options.length === 1
    ) return create_if_block_5;
    return create_else_block_3;
  }
  let current_block_type = select_block_type_3(ctx);
  let if_block1 = current_block_type(ctx);
  return {
    key: key_1,
    first: null,
    c() {
      div2 = element("div");
      div0 = element("div");
      i = element("i");
      t0 = space();
      span = element("span");
      t1 = text(t1_value);
      t2 = space();
      if (if_block0) if_block0.c();
      t3 = space();
      div1 = element("div");
      if_block1.c();
      t4 = space();
      attr(i, "class", i_class_value = "fas " + getTerrainIcon(
        /*hexInfo*/
        ctx[25].terrain
      ) + " svelte-prm-nrvzmx");
      set_style(i, "color", getTerrainColor(
        /*hexInfo*/
        ctx[25].terrain
      ));
      attr(span, "class", "terrain-name svelte-prm-nrvzmx");
      attr(div0, "class", "hex-terrain-info svelte-prm-nrvzmx");
      attr(div1, "class", "resource-display svelte-prm-nrvzmx");
      attr(div2, "class", "hex-resource-row svelte-prm-nrvzmx");
      toggle_class(
        div2,
        "settlement-hex",
        /*hexInfo*/
        ctx[25].isSettlementHex
      );
      this.first = div2;
    },
    m(target, anchor) {
      insert(target, div2, anchor);
      append(div2, div0);
      append(div0, i);
      append(div0, t0);
      append(div0, span);
      append(span, t1);
      append(div0, t2);
      if (if_block0) if_block0.m(div0, null);
      append(div2, t3);
      append(div2, div1);
      if_block1.m(div1, null);
      append(div2, t4);
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty & /*hexResourceInfoList*/
      128 && i_class_value !== (i_class_value = "fas " + getTerrainIcon(
        /*hexInfo*/
        ctx[25].terrain
      ) + " svelte-prm-nrvzmx")) {
        attr(i, "class", i_class_value);
      }
      if (dirty & /*hexResourceInfoList*/
      128) {
        set_style(i, "color", getTerrainColor(
          /*hexInfo*/
          ctx[25].terrain
        ));
      }
      if (dirty & /*hexResourceInfoList*/
      128 && t1_value !== (t1_value = formatTerrainName(
        /*hexInfo*/
        ctx[25].terrain
      ) + "")) set_data(t1, t1_value);
      if (
        /*hexInfo*/
        ctx[25].isSettlementHex
      ) {
        if (if_block0) ;
        else {
          if_block0 = create_if_block_6();
          if_block0.c();
          if_block0.m(div0, null);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }
      if (current_block_type === (current_block_type = select_block_type_3(ctx)) && if_block1) {
        if_block1.p(ctx, dirty);
      } else {
        if_block1.d(1);
        if_block1 = current_block_type(ctx);
        if (if_block1) {
          if_block1.c();
          if_block1.m(div1, null);
        }
      }
      if (dirty & /*hexResourceInfoList*/
      128) {
        toggle_class(
          div2,
          "settlement-hex",
          /*hexInfo*/
          ctx[25].isSettlementHex
        );
      }
    },
    d(detaching) {
      if (detaching) {
        detach(div2);
      }
      if (if_block0) if_block0.d();
      if_block1.d();
    }
  };
}
function create_if_block_4(ctx) {
  let span;
  let i;
  let t0;
  let t1_value = (
    /*resourceTotals*/
    ctx[8][
      /*resource*/
      ctx[22]
    ] + ""
  );
  let t1;
  let t2;
  return {
    c() {
      span = element("span");
      i = element("i");
      t0 = text("\n                +");
      t1 = text(t1_value);
      t2 = space();
      attr(i, "class", "fas " + getResourceIcon(
        /*resource*/
        ctx[22]
      ) + " svelte-prm-nrvzmx");
      set_style(i, "color", getResourceColor(
        /*resource*/
        ctx[22]
      ));
      attr(span, "class", "total-item svelte-prm-nrvzmx");
    },
    m(target, anchor) {
      insert(target, span, anchor);
      append(span, i);
      append(span, t0);
      append(span, t1);
      append(span, t2);
    },
    p(ctx2, dirty) {
      if (dirty & /*resourceTotals*/
      256 && t1_value !== (t1_value = /*resourceTotals*/
      ctx2[8][
        /*resource*/
        ctx2[22]
      ] + "")) set_data(t1, t1_value);
    },
    d(detaching) {
      if (detaching) {
        detach(span);
      }
    }
  };
}
function create_each_block_1(ctx) {
  let if_block_anchor;
  let if_block = (
    /*resourceTotals*/
    ctx[8][
      /*resource*/
      ctx[22]
    ] > 0 && create_if_block_4(ctx)
  );
  return {
    c() {
      if (if_block) if_block.c();
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if (if_block) if_block.m(target, anchor);
      insert(target, if_block_anchor, anchor);
    },
    p(ctx2, dirty) {
      if (
        /*resourceTotals*/
        ctx2[8][
          /*resource*/
          ctx2[22]
        ] > 0
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
        } else {
          if_block = create_if_block_4(ctx2);
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
        detach(if_block_anchor);
      }
      if (if_block) if_block.d(detaching);
    }
  };
}
function create_else_block_1(ctx) {
  let span;
  return {
    c() {
      span = element("span");
      span.textContent = "______";
      attr(span, "class", "hex-empty svelte-prm-nrvzmx");
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
  let span0;
  let t0_value = (
    /*hexId*/
    ctx[18] + ""
  );
  let t0;
  let t1;
  let span1;
  let t2;
  let t3_value = (
    /*terrain*/
    ctx[19] + ""
  );
  let t3;
  let t4;
  return {
    c() {
      span0 = element("span");
      t0 = text(t0_value);
      t1 = space();
      span1 = element("span");
      t2 = text("[");
      t3 = text(t3_value);
      t4 = text("]");
      attr(span0, "class", "hex-id svelte-prm-nrvzmx");
      attr(span1, "class", "hex-terrain svelte-prm-nrvzmx");
    },
    m(target, anchor) {
      insert(target, span0, anchor);
      append(span0, t0);
      insert(target, t1, anchor);
      insert(target, span1, anchor);
      append(span1, t2);
      append(span1, t3);
      append(span1, t4);
    },
    p(ctx2, dirty) {
      if (dirty & /*selectedHexes*/
      16 && t0_value !== (t0_value = /*hexId*/
      ctx2[18] + "")) set_data(t0, t0_value);
      if (dirty & /*selectedHexes*/
      16 && t3_value !== (t3_value = /*terrain*/
      ctx2[19] + "")) set_data(t3, t3_value);
    },
    d(detaching) {
      if (detaching) {
        detach(span0);
        detach(t1);
        detach(span1);
      }
    }
  };
}
function create_each_block(ctx) {
  let div;
  let span;
  let t3;
  let t4;
  function select_block_type_1(ctx2, dirty) {
    if (
      /*hexId*/
      ctx2[18]
    ) return create_if_block_2;
    return create_else_block_1;
  }
  let current_block_type = select_block_type_1(ctx);
  let if_block = current_block_type(ctx);
  return {
    c() {
      div = element("div");
      span = element("span");
      span.textContent = `[${/*i*/
      ctx[21] + 1}]`;
      t3 = space();
      if_block.c();
      t4 = space();
      attr(span, "class", "slot-number svelte-prm-nrvzmx");
      attr(div, "class", "hex-slot svelte-prm-nrvzmx");
      toggle_class(div, "filled", !!/*hexId*/
      ctx[18]);
    },
    m(target, anchor) {
      insert(target, div, anchor);
      append(div, span);
      append(div, t3);
      if_block.m(div, null);
      append(div, t4);
    },
    p(ctx2, dirty) {
      if (current_block_type === (current_block_type = select_block_type_1(ctx2)) && if_block) {
        if_block.p(ctx2, dirty);
      } else {
        if_block.d(1);
        if_block = current_block_type(ctx2);
        if (if_block) {
          if_block.c();
          if_block.m(div, t4);
        }
      }
      if (dirty & /*selectedHexes*/
      16) {
        toggle_class(div, "filled", !!/*hexId*/
        ctx2[18]);
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
function create_else_block(ctx) {
  let div;
  return {
    c() {
      div = element("div");
      div.innerHTML = `<i class="fas fa-hourglass-half spinning svelte-prm-nrvzmx"></i> <span>Selection in progress...</span>`;
      attr(div, "class", "status-indicator selecting svelte-prm-nrvzmx");
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
      div.innerHTML = `<i class="fas fa-check-circle"></i> <span>Waiting for confirmation...</span>`;
      attr(div, "class", "status-indicator completed svelte-prm-nrvzmx");
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
  let div5;
  let div2;
  let div1;
  let div0;
  let t2;
  let t3;
  let h3;
  let i1;
  let t4;
  let t5;
  let t6;
  let div3;
  let i2;
  let t7;
  let span1;
  let t8;
  let t9;
  let span2;
  let t10;
  let t11;
  let t12;
  let t13;
  let div4;
  let if_block0 = (
    /*onDismiss*/
    ctx[6] && create_if_block_9(ctx)
  );
  let if_block1 = (
    /*colorType*/
    ctx[2] === "first-settlement" && /*settlementName*/
    ctx[9] && create_if_block_8(ctx)
  );
  function select_block_type(ctx2, dirty) {
    if (
      /*colorType*/
      ctx2[2] !== "first-settlement"
    ) return create_if_block_1;
    return create_else_block_2;
  }
  let current_block_type = select_block_type(ctx);
  let if_block2 = current_block_type(ctx);
  function select_block_type_4(ctx2, dirty) {
    if (
      /*panelState*/
      ctx2[5] === "completed"
    ) return create_if_block;
    return create_else_block;
  }
  let current_block_type_1 = select_block_type_4(ctx);
  let if_block3 = current_block_type_1(ctx);
  return {
    c() {
      div5 = element("div");
      div2 = element("div");
      div1 = element("div");
      div0 = element("div");
      div0.innerHTML = `<i class="fas fa-eye svelte-prm-nrvzmx"></i> <span>Observing</span>`;
      t2 = space();
      if (if_block0) if_block0.c();
      t3 = space();
      h3 = element("h3");
      i1 = element("i");
      t4 = space();
      t5 = text(
        /*title*/
        ctx[1]
      );
      t6 = space();
      div3 = element("div");
      i2 = element("i");
      t7 = space();
      span1 = element("span");
      t8 = text(
        /*initiatorName*/
        ctx[0]
      );
      t9 = space();
      span2 = element("span");
      t10 = text(
        /*statusText*/
        ctx[10]
      );
      t11 = space();
      if (if_block1) if_block1.c();
      t12 = space();
      if_block2.c();
      t13 = space();
      div4 = element("div");
      if_block3.c();
      attr(div0, "class", "observer-badge svelte-prm-nrvzmx");
      attr(div1, "class", "header-top svelte-prm-nrvzmx");
      attr(i1, "class", "fas fa-map-marked-alt svelte-prm-nrvzmx");
      attr(h3, "class", "svelte-prm-nrvzmx");
      attr(div2, "class", "panel-header svelte-prm-nrvzmx");
      attr(i2, "class", "fas fa-user svelte-prm-nrvzmx");
      attr(span1, "class", "initiator-name svelte-prm-nrvzmx");
      attr(span2, "class", "status-text svelte-prm-nrvzmx");
      attr(div3, "class", "initiator-info svelte-prm-nrvzmx");
      attr(div4, "class", "panel-footer svelte-prm-nrvzmx");
      attr(div5, "class", "observer-panel svelte-prm-nrvzmx");
    },
    m(target, anchor) {
      insert(target, div5, anchor);
      append(div5, div2);
      append(div2, div1);
      append(div1, div0);
      append(div1, t2);
      if (if_block0) if_block0.m(div1, null);
      append(div2, t3);
      append(div2, h3);
      append(h3, i1);
      append(h3, t4);
      append(h3, t5);
      append(div5, t6);
      append(div5, div3);
      append(div3, i2);
      append(div3, t7);
      append(div3, span1);
      append(span1, t8);
      append(div3, t9);
      append(div3, span2);
      append(span2, t10);
      append(div5, t11);
      if (if_block1) if_block1.m(div5, null);
      append(div5, t12);
      if_block2.m(div5, null);
      append(div5, t13);
      append(div5, div4);
      if_block3.m(div4, null);
    },
    p(ctx2, [dirty]) {
      if (
        /*onDismiss*/
        ctx2[6]
      ) {
        if (if_block0) {
          if_block0.p(ctx2, dirty);
        } else {
          if_block0 = create_if_block_9(ctx2);
          if_block0.c();
          if_block0.m(div1, null);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }
      if (dirty & /*title*/
      2) set_data(
        t5,
        /*title*/
        ctx2[1]
      );
      if (dirty & /*initiatorName*/
      1) set_data(
        t8,
        /*initiatorName*/
        ctx2[0]
      );
      if (dirty & /*statusText*/
      1024) set_data(
        t10,
        /*statusText*/
        ctx2[10]
      );
      if (
        /*colorType*/
        ctx2[2] === "first-settlement" && /*settlementName*/
        ctx2[9]
      ) {
        if (if_block1) {
          if_block1.p(ctx2, dirty);
        } else {
          if_block1 = create_if_block_8(ctx2);
          if_block1.c();
          if_block1.m(div5, t12);
        }
      } else if (if_block1) {
        if_block1.d(1);
        if_block1 = null;
      }
      if (current_block_type === (current_block_type = select_block_type(ctx2)) && if_block2) {
        if_block2.p(ctx2, dirty);
      } else {
        if_block2.d(1);
        if_block2 = current_block_type(ctx2);
        if (if_block2) {
          if_block2.c();
          if_block2.m(div5, t13);
        }
      }
      if (current_block_type_1 !== (current_block_type_1 = select_block_type_4(ctx2))) {
        if_block3.d(1);
        if_block3 = current_block_type_1(ctx2);
        if (if_block3) {
          if_block3.c();
          if_block3.m(div4, null);
        }
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(div5);
      }
      if (if_block0) if_block0.d();
      if (if_block1) if_block1.d();
      if_block2.d();
      if_block3.d();
    }
  };
}
function calculateTotals(infos) {
  const totals = { food: 0, lumber: 0, stone: 0, ore: 0 };
  infos.forEach((info) => {
    if (info.selectedResource) {
      totals[info.selectedResource]++;
    }
  });
  return totals;
}
function formatTerrainName(terrain) {
  return terrain.charAt(0).toUpperCase() + terrain.slice(1);
}
function formatResourceName(resource) {
  return resource.charAt(0).toUpperCase() + resource.slice(1);
}
function instance($$self, $$props, $$invalidate) {
  let statusText;
  let settlementName;
  let resourceAllocationsArray;
  let resourceAllocations;
  let hexResourceInfoList;
  let resourceTotals;
  let { initiatorName } = $$props;
  let { title } = $$props;
  let { colorType } = $$props;
  let { count } = $$props;
  let { selectedHexes } = $$props;
  let { panelState } = $$props;
  let { metadata } = $$props;
  let { onDismiss = void 0 } = $$props;
  function getHexTerrain(hexId) {
    const kingdom = getKingdomData();
    const hex = kingdom.hexes?.find((h) => h.id === hexId);
    return hex?.terrain || "Unknown";
  }
  function buildHexResourceInfoList(settlementHexId, allocations) {
    if (!settlementHexId || colorType !== "first-settlement") return [];
    const kingdom = getKingdomData();
    const adjacentHexIds = getAdjacentHexIds(settlementHexId);
    const allHexIds = [settlementHexId, ...adjacentHexIds];
    const list = [];
    allHexIds.forEach((hexId) => {
      const hex = kingdom.hexes?.find((h) => h.id === hexId);
      if (hex) {
        const terrain = (hex.terrain || "").toLowerCase();
        const options = getTerrainResourceOptions(terrain);
        if (options.length > 0) {
          const allocated = allocations?.[hexId];
          list.push({
            hexId,
            terrain,
            options,
            selectedResource: allocated || options[0] || null,
            isSettlementHex: hexId === settlementHexId
          });
        }
      }
    });
    return list;
  }
  const RESOURCE_ORDER = ["food", "lumber", "stone", "ore"];
  $$self.$$set = ($$props2) => {
    if ("initiatorName" in $$props2) $$invalidate(0, initiatorName = $$props2.initiatorName);
    if ("title" in $$props2) $$invalidate(1, title = $$props2.title);
    if ("colorType" in $$props2) $$invalidate(2, colorType = $$props2.colorType);
    if ("count" in $$props2) $$invalidate(3, count = $$props2.count);
    if ("selectedHexes" in $$props2) $$invalidate(4, selectedHexes = $$props2.selectedHexes);
    if ("panelState" in $$props2) $$invalidate(5, panelState = $$props2.panelState);
    if ("metadata" in $$props2) $$invalidate(13, metadata = $$props2.metadata);
    if ("onDismiss" in $$props2) $$invalidate(6, onDismiss = $$props2.onDismiss);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*panelState*/
    32) {
      $$invalidate(10, statusText = panelState === "completed" ? "Confirming selection..." : `Selecting hexes...`);
    }
    if ($$self.$$.dirty & /*metadata*/
    8192) {
      $$invalidate(9, settlementName = metadata?.settlementName);
    }
    if ($$self.$$.dirty & /*metadata*/
    8192) {
      $$invalidate(15, resourceAllocationsArray = metadata?.resourceAllocations);
    }
    if ($$self.$$.dirty & /*resourceAllocationsArray*/
    32768) {
      $$invalidate(14, resourceAllocations = resourceAllocationsArray?.reduce(
        (acc, item) => {
          acc[item.hexId] = item.resource;
          return acc;
        },
        {}
      ));
    }
    if ($$self.$$.dirty & /*selectedHexes, resourceAllocations*/
    16400) {
      $$invalidate(7, hexResourceInfoList = buildHexResourceInfoList(selectedHexes[0], resourceAllocations));
    }
    if ($$self.$$.dirty & /*hexResourceInfoList*/
    128) {
      $$invalidate(8, resourceTotals = calculateTotals(hexResourceInfoList));
    }
  };
  return [
    initiatorName,
    title,
    colorType,
    count,
    selectedHexes,
    panelState,
    onDismiss,
    hexResourceInfoList,
    resourceTotals,
    settlementName,
    statusText,
    getHexTerrain,
    RESOURCE_ORDER,
    metadata,
    resourceAllocations,
    resourceAllocationsArray
  ];
}
class ObserverPanel extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, {
      initiatorName: 0,
      title: 1,
      colorType: 2,
      count: 3,
      selectedHexes: 4,
      panelState: 5,
      metadata: 13,
      onDismiss: 6
    });
  }
}
export {
  ObserverPanel as default
};
