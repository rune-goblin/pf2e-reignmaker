import { aw as SvelteComponent, ax as init, ay as safe_not_equal, b0 as Dialog, b1 as binding_callbacks, b2 as bind, b3 as destroy_component, b4 as transition_out, b5 as transition_in, b6 as add_flush_callback, b7 as mount_component, b8 as create_component, b9 as createEventDispatcher, be as SETTLEMENT_MAP_ICONS, aA as detach, aE as set_data, aO as src_url_equal, aD as attr, aB as insert, aF as append, aC as element, aH as text, aG as space } from "./GameCommandUtils-D_sgs3NK.js";
function create_default_slot(ctx) {
  let div3;
  let h2;
  let t0;
  let t1;
  let t2;
  let t3;
  let t4;
  let div2;
  let div0;
  let ul;
  let li0;
  let i0;
  let t5;
  let t6;
  let t7;
  let t8;
  let li1;
  let i1;
  let t9;
  let t10;
  let t11;
  let li2;
  let i2;
  let t12;
  let t13;
  let t14;
  let t15;
  let li3;
  let i3;
  let t16;
  let t17;
  let t18;
  let t19;
  let li4;
  let i4;
  let t20;
  let t21;
  let t22;
  let t23;
  let li5;
  let i5;
  let t24;
  let t25;
  let t26;
  let t27;
  let div1;
  let img;
  let img_src_value;
  return {
    c() {
      div3 = element("div");
      h2 = element("h2");
      t0 = text(
        /*settlementName*/
        ctx[1]
      );
      t1 = text(" has become part of ");
      t2 = text(
        /*kingdomName*/
        ctx[2]
      );
      t3 = text(".");
      t4 = space();
      div2 = element("div");
      div0 = element("div");
      ul = element("ul");
      li0 = element("li");
      i0 = element("i");
      t5 = text(" May build tier ");
      t6 = text(
        /*tierNumber*/
        ctx[4]
      );
      t7 = text(" structures");
      t8 = space();
      li1 = element("li");
      i1 = element("i");
      t9 = text(" Max structures: ");
      t10 = text(
        /*maxStructuresDisplay*/
        ctx[9]
      );
      t11 = space();
      li2 = element("li");
      i2 = element("i");
      t12 = space();
      t13 = text(
        /*goldIncome*/
        ctx[5]
      );
      t14 = text(" gold per turn");
      t15 = space();
      li3 = element("li");
      i3 = element("i");
      t16 = text(" Needs ");
      t17 = text(
        /*foodConsumption*/
        ctx[6]
      );
      t18 = text(" food per turn");
      t19 = space();
      li4 = element("li");
      i4 = element("i");
      t20 = text(" Collection radius: ");
      t21 = text(
        /*collectionRadius*/
        ctx[7]
      );
      t22 = text(" hexes");
      t23 = space();
      li5 = element("li");
      i5 = element("i");
      t24 = text(" Material storage: ");
      t25 = text(
        /*materialStorage*/
        ctx[8]
      );
      t26 = text(" each");
      t27 = space();
      div1 = element("div");
      img = element("img");
      attr(h2, "class", "claimed-heading svelte-prm-4ozgq7");
      attr(i0, "class", "fas fa-hammer svelte-prm-4ozgq7");
      attr(li0, "class", "svelte-prm-4ozgq7");
      attr(i1, "class", "fas fa-building svelte-prm-4ozgq7");
      attr(li1, "class", "svelte-prm-4ozgq7");
      attr(i2, "class", "fas fa-coins svelte-prm-4ozgq7");
      attr(li2, "class", "svelte-prm-4ozgq7");
      attr(i3, "class", "fas fa-wheat-awn svelte-prm-4ozgq7");
      attr(li3, "class", "svelte-prm-4ozgq7");
      attr(i4, "class", "fas fa-circle-dot svelte-prm-4ozgq7");
      attr(li4, "class", "svelte-prm-4ozgq7");
      attr(i5, "class", "fas fa-warehouse svelte-prm-4ozgq7");
      attr(li5, "class", "svelte-prm-4ozgq7");
      attr(ul, "class", "tier-properties svelte-prm-4ozgq7");
      attr(div0, "class", "info-column svelte-prm-4ozgq7");
      attr(img, "class", "tier-icon svelte-prm-4ozgq7");
      if (!src_url_equal(img.src, img_src_value = /*tierIcon*/
      ctx[10])) attr(img, "src", img_src_value);
      attr(
        img,
        "alt",
        /*tierName*/
        ctx[3]
      );
      attr(div1, "class", "icon-column svelte-prm-4ozgq7");
      attr(div2, "class", "claimed-body svelte-prm-4ozgq7");
      attr(div3, "class", "hex-claimed-content svelte-prm-4ozgq7");
    },
    m(target, anchor) {
      insert(target, div3, anchor);
      append(div3, h2);
      append(h2, t0);
      append(h2, t1);
      append(h2, t2);
      append(h2, t3);
      append(div3, t4);
      append(div3, div2);
      append(div2, div0);
      append(div0, ul);
      append(ul, li0);
      append(li0, i0);
      append(li0, t5);
      append(li0, t6);
      append(li0, t7);
      append(ul, t8);
      append(ul, li1);
      append(li1, i1);
      append(li1, t9);
      append(li1, t10);
      append(ul, t11);
      append(ul, li2);
      append(li2, i2);
      append(li2, t12);
      append(li2, t13);
      append(li2, t14);
      append(ul, t15);
      append(ul, li3);
      append(li3, i3);
      append(li3, t16);
      append(li3, t17);
      append(li3, t18);
      append(ul, t19);
      append(ul, li4);
      append(li4, i4);
      append(li4, t20);
      append(li4, t21);
      append(li4, t22);
      append(ul, t23);
      append(ul, li5);
      append(li5, i5);
      append(li5, t24);
      append(li5, t25);
      append(li5, t26);
      append(div2, t27);
      append(div2, div1);
      append(div1, img);
    },
    p(ctx2, dirty) {
      if (dirty & /*settlementName*/
      2) set_data(
        t0,
        /*settlementName*/
        ctx2[1]
      );
      if (dirty & /*kingdomName*/
      4) set_data(
        t2,
        /*kingdomName*/
        ctx2[2]
      );
      if (dirty & /*tierNumber*/
      16) set_data(
        t6,
        /*tierNumber*/
        ctx2[4]
      );
      if (dirty & /*maxStructuresDisplay*/
      512) set_data(
        t10,
        /*maxStructuresDisplay*/
        ctx2[9]
      );
      if (dirty & /*goldIncome*/
      32) set_data(
        t13,
        /*goldIncome*/
        ctx2[5]
      );
      if (dirty & /*foodConsumption*/
      64) set_data(
        t17,
        /*foodConsumption*/
        ctx2[6]
      );
      if (dirty & /*collectionRadius*/
      128) set_data(
        t21,
        /*collectionRadius*/
        ctx2[7]
      );
      if (dirty & /*materialStorage*/
      256) set_data(
        t25,
        /*materialStorage*/
        ctx2[8]
      );
      if (dirty & /*tierIcon*/
      1024 && !src_url_equal(img.src, img_src_value = /*tierIcon*/
      ctx2[10])) {
        attr(img, "src", img_src_value);
      }
      if (dirty & /*tierName*/
      8) {
        attr(
          img,
          "alt",
          /*tierName*/
          ctx2[3]
        );
      }
    },
    d(detaching) {
      if (detaching) {
        detach(div3);
      }
    }
  };
}
function create_fragment(ctx) {
  let dialog;
  let updating_show;
  let current;
  function dialog_show_binding(value) {
    ctx[14](value);
  }
  let dialog_props = {
    title: "Claim Settlement",
    showCancel: false,
    confirmLabel: "OK",
    width: "560px",
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
    ctx[12]
  );
  dialog.$on(
    "close",
    /*close_handler*/
    ctx[15]
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
      if (dirty & /*$$scope, tierIcon, tierName, materialStorage, collectionRadius, foodConsumption, goldIncome, maxStructuresDisplay, tierNumber, kingdomName, settlementName*/
      67582) {
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
  let tierIcon;
  let maxStructuresDisplay;
  let { show = false } = $$props;
  let { settlementName = "" } = $$props;
  let { kingdomName = "your kingdom" } = $$props;
  let { tierName = "Village" } = $$props;
  let { tierNumber = 1 } = $$props;
  let { goldIncome = 1 } = $$props;
  let { foodConsumption = 2 } = $$props;
  let { maxStructures = 3 } = $$props;
  let { collectionRadius = 1 } = $$props;
  let { materialStorage = 2 } = $$props;
  const dispatch = createEventDispatcher();
  function handleConfirm() {
    dispatch("confirm");
    $$invalidate(0, show = false);
  }
  function dialog_show_binding(value) {
    show = value;
    $$invalidate(0, show);
  }
  const close_handler = () => {
    dispatch("close");
    $$invalidate(0, show = false);
  };
  $$self.$$set = ($$props2) => {
    if ("show" in $$props2) $$invalidate(0, show = $$props2.show);
    if ("settlementName" in $$props2) $$invalidate(1, settlementName = $$props2.settlementName);
    if ("kingdomName" in $$props2) $$invalidate(2, kingdomName = $$props2.kingdomName);
    if ("tierName" in $$props2) $$invalidate(3, tierName = $$props2.tierName);
    if ("tierNumber" in $$props2) $$invalidate(4, tierNumber = $$props2.tierNumber);
    if ("goldIncome" in $$props2) $$invalidate(5, goldIncome = $$props2.goldIncome);
    if ("foodConsumption" in $$props2) $$invalidate(6, foodConsumption = $$props2.foodConsumption);
    if ("maxStructures" in $$props2) $$invalidate(13, maxStructures = $$props2.maxStructures);
    if ("collectionRadius" in $$props2) $$invalidate(7, collectionRadius = $$props2.collectionRadius);
    if ("materialStorage" in $$props2) $$invalidate(8, materialStorage = $$props2.materialStorage);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*tierName*/
    8) {
      $$invalidate(10, tierIcon = SETTLEMENT_MAP_ICONS[tierName] || SETTLEMENT_MAP_ICONS.Village);
    }
    if ($$self.$$.dirty & /*maxStructures*/
    8192) {
      $$invalidate(9, maxStructuresDisplay = maxStructures === Infinity ? "Unlimited" : String(maxStructures));
    }
  };
  return [
    show,
    settlementName,
    kingdomName,
    tierName,
    tierNumber,
    goldIncome,
    foodConsumption,
    collectionRadius,
    materialStorage,
    maxStructuresDisplay,
    tierIcon,
    dispatch,
    handleConfirm,
    maxStructures,
    dialog_show_binding,
    close_handler
  ];
}
class HexClaimedDialog extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, {
      show: 0,
      settlementName: 1,
      kingdomName: 2,
      tierName: 3,
      tierNumber: 4,
      goldIncome: 5,
      foodConsumption: 6,
      maxStructures: 13,
      collectionRadius: 7,
      materialStorage: 8
    });
  }
}
export {
  HexClaimedDialog as default
};
