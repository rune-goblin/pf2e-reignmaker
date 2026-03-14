import { aw as SvelteComponent, ax as init, ay as safe_not_equal, aI as ensure_array_like, az as noop, aA as detach, aJ as destroy_each, bd as run_all, aN as toggle_class, aM as set_style, aB as insert, aF as append, aK as listen, bs as globals, aL as is_function, aC as element, aG as space, aD as attr, aE as set_data, aH as text } from "./GameCommandUtils-D_sgs3NK.js";
const { window: window_1 } = globals;
function get_each_context(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[15] = list[i];
  child_ctx[17] = i;
  return child_ctx;
}
function create_each_block(ctx) {
  let button;
  let span0;
  let t0;
  let span1;
  let t1_value = (
    /*province*/
    ctx[15].name + ""
  );
  let t1;
  let t2;
  let span2;
  let t3_value = (
    /*province*/
    ctx[15].hexIds.length + ""
  );
  let t3;
  let t4;
  let mounted;
  let dispose;
  function click_handler_1() {
    return (
      /*click_handler_1*/
      ctx[11](
        /*province*/
        ctx[15]
      )
    );
  }
  return {
    c() {
      button = element("button");
      span0 = element("span");
      t0 = space();
      span1 = element("span");
      t1 = text(t1_value);
      t2 = space();
      span2 = element("span");
      t3 = text(t3_value);
      t4 = space();
      attr(span0, "class", "color-swatch svelte-prm-aw09vu");
      set_style(
        span0,
        "background-color",
        /*getProvinceColor*/
        ctx[6](
          /*index*/
          ctx[17]
        )
      );
      attr(span1, "class", "brush-name svelte-prm-aw09vu");
      attr(span2, "class", "hex-count svelte-prm-aw09vu");
      attr(button, "class", "brush-item svelte-prm-aw09vu");
      toggle_class(
        button,
        "selected",
        /*selectedProvinceId*/
        ctx[1] === /*province*/
        ctx[15].id
      );
    },
    m(target, anchor) {
      insert(target, button, anchor);
      append(button, span0);
      append(button, t0);
      append(button, span1);
      append(span1, t1);
      append(button, t2);
      append(button, span2);
      append(span2, t3);
      append(button, t4);
      if (!mounted) {
        dispose = listen(button, "click", click_handler_1);
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty & /*provinces*/
      1 && t1_value !== (t1_value = /*province*/
      ctx[15].name + "")) set_data(t1, t1_value);
      if (dirty & /*provinces*/
      1 && t3_value !== (t3_value = /*province*/
      ctx[15].hexIds.length + "")) set_data(t3, t3_value);
      if (dirty & /*selectedProvinceId, provinces*/
      3) {
        toggle_class(
          button,
          "selected",
          /*selectedProvinceId*/
          ctx[1] === /*province*/
          ctx[15].id
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
function create_fragment(ctx) {
  let div6;
  let div0;
  let t2;
  let div4;
  let div2;
  let label;
  let t4;
  let div1;
  let button0;
  let t7;
  let t8;
  let div3;
  let t10;
  let div5;
  let button1;
  let t12;
  let button2;
  let mounted;
  let dispose;
  let each_value = ensure_array_like(
    /*provinces*/
    ctx[0]
  );
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
  }
  return {
    c() {
      div6 = element("div");
      div0 = element("div");
      div0.innerHTML = `<i class="fas fa-map svelte-prm-aw09vu"></i> <span class="svelte-prm-aw09vu">Province Editor</span>`;
      t2 = space();
      div4 = element("div");
      div2 = element("div");
      label = element("label");
      label.textContent = "Select brush:";
      t4 = space();
      div1 = element("div");
      button0 = element("button");
      button0.innerHTML = `<span class="color-swatch none-swatch svelte-prm-aw09vu"><i class="fas fa-times"></i></span> <span class="brush-name svelte-prm-aw09vu">None (Unassign)</span>`;
      t7 = space();
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      t8 = space();
      div3 = element("div");
      div3.innerHTML = `<p class="svelte-prm-aw09vu">Click hexes on the map to paint with selected province.</p>`;
      t10 = space();
      div5 = element("div");
      button1 = element("button");
      button1.innerHTML = `<i class="fas fa-check"></i> Done`;
      t12 = space();
      button2 = element("button");
      button2.innerHTML = `<i class="fas fa-times"></i> Cancel`;
      attr(div0, "class", "panel-header svelte-prm-aw09vu");
      attr(label, "class", "svelte-prm-aw09vu");
      attr(button0, "class", "brush-item svelte-prm-aw09vu");
      toggle_class(
        button0,
        "selected",
        /*selectedProvinceId*/
        ctx[1] === null
      );
      attr(div1, "class", "brush-list svelte-prm-aw09vu");
      attr(div2, "class", "brush-section svelte-prm-aw09vu");
      attr(div3, "class", "instructions svelte-prm-aw09vu");
      attr(div4, "class", "panel-content svelte-prm-aw09vu");
      attr(button1, "class", "btn btn-primary svelte-prm-aw09vu");
      attr(button2, "class", "btn btn-secondary svelte-prm-aw09vu");
      attr(div5, "class", "panel-actions svelte-prm-aw09vu");
      attr(div6, "class", "province-editor-panel svelte-prm-aw09vu");
      set_style(
        div6,
        "left",
        /*panelPosition*/
        ctx[5].x + "px"
      );
      set_style(
        div6,
        "top",
        /*panelPosition*/
        ctx[5].y + "px"
      );
    },
    m(target, anchor) {
      insert(target, div6, anchor);
      append(div6, div0);
      append(div6, t2);
      append(div6, div4);
      append(div4, div2);
      append(div2, label);
      append(div2, t4);
      append(div2, div1);
      append(div1, button0);
      append(div1, t7);
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(div1, null);
        }
      }
      append(div4, t8);
      append(div4, div3);
      append(div6, t10);
      append(div6, div5);
      append(div5, button1);
      append(div5, t12);
      append(div5, button2);
      if (!mounted) {
        dispose = [
          listen(
            window_1,
            "mousemove",
            /*handleMouseMove*/
            ctx[8]
          ),
          listen(
            window_1,
            "mouseup",
            /*handleMouseUp*/
            ctx[9]
          ),
          listen(
            div0,
            "mousedown",
            /*handleMouseDown*/
            ctx[7]
          ),
          listen(
            button0,
            "click",
            /*click_handler*/
            ctx[10]
          ),
          listen(button1, "click", function() {
            if (is_function(
              /*onDone*/
              ctx[3]
            )) ctx[3].apply(this, arguments);
          }),
          listen(button2, "click", function() {
            if (is_function(
              /*onCancel*/
              ctx[4]
            )) ctx[4].apply(this, arguments);
          })
        ];
        mounted = true;
      }
    },
    p(new_ctx, [dirty]) {
      ctx = new_ctx;
      if (dirty & /*selectedProvinceId*/
      2) {
        toggle_class(
          button0,
          "selected",
          /*selectedProvinceId*/
          ctx[1] === null
        );
      }
      if (dirty & /*selectedProvinceId, provinces, onProvinceSelect, getProvinceColor*/
      71) {
        each_value = ensure_array_like(
          /*provinces*/
          ctx[0]
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
      if (dirty & /*panelPosition*/
      32) {
        set_style(
          div6,
          "left",
          /*panelPosition*/
          ctx[5].x + "px"
        );
      }
      if (dirty & /*panelPosition*/
      32) {
        set_style(
          div6,
          "top",
          /*panelPosition*/
          ctx[5].y + "px"
        );
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(div6);
      }
      destroy_each(each_blocks, detaching);
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance($$self, $$props, $$invalidate) {
  let { provinces = [] } = $$props;
  let { selectedProvinceId = null } = $$props;
  let { onProvinceSelect } = $$props;
  let { onDone } = $$props;
  let { onCancel } = $$props;
  const PROVINCE_COLORS = [
    "#4CAF50",
    "#2196F3",
    "#FF9800",
    "#9C27B0",
    "#00BCD4",
    "#E91E63",
    "#8BC34A",
    "#3F51B5",
    "#FFEB3B",
    "#795548",
    "#607D8B",
    "#F44336"
  ];
  function getProvinceColor(index) {
    return PROVINCE_COLORS[index % PROVINCE_COLORS.length];
  }
  let isDragging = false;
  let dragOffset = { x: 0, y: 0 };
  let panelPosition = { x: window.innerWidth - 280, y: 100 };
  function handleMouseDown(event) {
    if (event.target.closest(".panel-actions")) return;
    isDragging = true;
    dragOffset = {
      x: event.clientX - panelPosition.x,
      y: event.clientY - panelPosition.y
    };
    event.preventDefault();
  }
  function handleMouseMove(event) {
    if (!isDragging) return;
    $$invalidate(5, panelPosition = {
      x: Math.max(0, Math.min(window.innerWidth - 260, event.clientX - dragOffset.x)),
      y: Math.max(0, Math.min(window.innerHeight - 200, event.clientY - dragOffset.y))
    });
  }
  function handleMouseUp() {
    isDragging = false;
  }
  const click_handler = () => onProvinceSelect(null);
  const click_handler_1 = (province) => onProvinceSelect(province.id);
  $$self.$$set = ($$props2) => {
    if ("provinces" in $$props2) $$invalidate(0, provinces = $$props2.provinces);
    if ("selectedProvinceId" in $$props2) $$invalidate(1, selectedProvinceId = $$props2.selectedProvinceId);
    if ("onProvinceSelect" in $$props2) $$invalidate(2, onProvinceSelect = $$props2.onProvinceSelect);
    if ("onDone" in $$props2) $$invalidate(3, onDone = $$props2.onDone);
    if ("onCancel" in $$props2) $$invalidate(4, onCancel = $$props2.onCancel);
  };
  return [
    provinces,
    selectedProvinceId,
    onProvinceSelect,
    onDone,
    onCancel,
    panelPosition,
    getProvinceColor,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    click_handler,
    click_handler_1
  ];
}
class ProvinceEditorPanel extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, {
      provinces: 0,
      selectedProvinceId: 1,
      onProvinceSelect: 2,
      onDone: 3,
      onCancel: 4
    });
  }
}
export {
  ProvinceEditorPanel as default
};
