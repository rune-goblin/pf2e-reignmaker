import { aw as SvelteComponent, ax as init, ay as safe_not_equal, b0 as Dialog, b1 as binding_callbacks, b2 as bind, b3 as destroy_component, b4 as transition_out, b5 as transition_in, b6 as add_flush_callback, b7 as mount_component, b8 as create_component, b9 as createEventDispatcher, be as SETTLEMENT_MAP_ICONS, aA as detach, aO as src_url_equal, aD as attr, aE as set_data, aB as insert, aF as append, aC as element, aG as space, aH as text } from "./GameCommandUtils-D_sgs3NK.js";
function create_default_slot(ctx) {
  let div;
  let img;
  let img_src_value;
  let t0;
  let h2;
  let t1;
  let t2;
  let t3;
  let t4;
  let t5;
  let ul;
  let li0;
  let i0;
  let t6;
  let t7;
  let t8;
  let t9;
  let li1;
  let i1;
  let t10;
  let t11;
  let t12;
  let li2;
  let i2;
  let t13;
  let t14;
  let t15;
  let t16;
  let li3;
  let i3;
  let t17;
  let t18;
  let t19;
  let t20;
  let li4;
  let i4;
  let t21;
  let t22;
  let t23;
  let t24;
  let li5;
  let i5;
  let t25;
  let t26;
  let t27;
  return {
    c() {
      div = element("div");
      img = element("img");
      t0 = space();
      h2 = element("h2");
      t1 = text(
        /*settlementName*/
        ctx[1]
      );
      t2 = text(" has become a ");
      t3 = text(
        /*tierName*/
        ctx[2]
      );
      t4 = text("!");
      t5 = space();
      ul = element("ul");
      li0 = element("li");
      i0 = element("i");
      t6 = text(" May build tier ");
      t7 = text(
        /*tierNumber*/
        ctx[3]
      );
      t8 = text(" structures");
      t9 = space();
      li1 = element("li");
      i1 = element("i");
      t10 = text(" Max structures: ");
      t11 = text(
        /*maxStructuresDisplay*/
        ctx[8]
      );
      t12 = space();
      li2 = element("li");
      i2 = element("i");
      t13 = space();
      t14 = text(
        /*goldIncome*/
        ctx[4]
      );
      t15 = text(" gold per turn");
      t16 = space();
      li3 = element("li");
      i3 = element("i");
      t17 = text(" Needs ");
      t18 = text(
        /*foodConsumption*/
        ctx[5]
      );
      t19 = text(" food per turn");
      t20 = space();
      li4 = element("li");
      i4 = element("i");
      t21 = text(" Collection radius: ");
      t22 = text(
        /*collectionRadius*/
        ctx[6]
      );
      t23 = text(" hexes");
      t24 = space();
      li5 = element("li");
      i5 = element("i");
      t25 = text(" Material storage: ");
      t26 = text(
        /*materialStorage*/
        ctx[7]
      );
      t27 = text(" each");
      attr(img, "class", "tier-icon svelte-prm-gaf5hx");
      if (!src_url_equal(img.src, img_src_value = /*tierIcon*/
      ctx[9])) attr(img, "src", img_src_value);
      attr(
        img,
        "alt",
        /*tierName*/
        ctx[2]
      );
      attr(h2, "class", "tier-heading svelte-prm-gaf5hx");
      attr(i0, "class", "fas fa-hammer svelte-prm-gaf5hx");
      attr(li0, "class", "svelte-prm-gaf5hx");
      attr(i1, "class", "fas fa-building svelte-prm-gaf5hx");
      attr(li1, "class", "svelte-prm-gaf5hx");
      attr(i2, "class", "fas fa-coins svelte-prm-gaf5hx");
      attr(li2, "class", "svelte-prm-gaf5hx");
      attr(i3, "class", "fas fa-wheat-awn svelte-prm-gaf5hx");
      attr(li3, "class", "svelte-prm-gaf5hx");
      attr(i4, "class", "fas fa-circle-dot svelte-prm-gaf5hx");
      attr(li4, "class", "svelte-prm-gaf5hx");
      attr(i5, "class", "fas fa-warehouse svelte-prm-gaf5hx");
      attr(li5, "class", "svelte-prm-gaf5hx");
      attr(ul, "class", "tier-properties svelte-prm-gaf5hx");
      attr(div, "class", "tier-up-content svelte-prm-gaf5hx");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      append(div, img);
      append(div, t0);
      append(div, h2);
      append(h2, t1);
      append(h2, t2);
      append(h2, t3);
      append(h2, t4);
      append(div, t5);
      append(div, ul);
      append(ul, li0);
      append(li0, i0);
      append(li0, t6);
      append(li0, t7);
      append(li0, t8);
      append(ul, t9);
      append(ul, li1);
      append(li1, i1);
      append(li1, t10);
      append(li1, t11);
      append(ul, t12);
      append(ul, li2);
      append(li2, i2);
      append(li2, t13);
      append(li2, t14);
      append(li2, t15);
      append(ul, t16);
      append(ul, li3);
      append(li3, i3);
      append(li3, t17);
      append(li3, t18);
      append(li3, t19);
      append(ul, t20);
      append(ul, li4);
      append(li4, i4);
      append(li4, t21);
      append(li4, t22);
      append(li4, t23);
      append(ul, t24);
      append(ul, li5);
      append(li5, i5);
      append(li5, t25);
      append(li5, t26);
      append(li5, t27);
    },
    p(ctx2, dirty) {
      if (dirty & /*tierIcon*/
      512 && !src_url_equal(img.src, img_src_value = /*tierIcon*/
      ctx2[9])) {
        attr(img, "src", img_src_value);
      }
      if (dirty & /*tierName*/
      4) {
        attr(
          img,
          "alt",
          /*tierName*/
          ctx2[2]
        );
      }
      if (dirty & /*settlementName*/
      2) set_data(
        t1,
        /*settlementName*/
        ctx2[1]
      );
      if (dirty & /*tierName*/
      4) set_data(
        t3,
        /*tierName*/
        ctx2[2]
      );
      if (dirty & /*tierNumber*/
      8) set_data(
        t7,
        /*tierNumber*/
        ctx2[3]
      );
      if (dirty & /*maxStructuresDisplay*/
      256) set_data(
        t11,
        /*maxStructuresDisplay*/
        ctx2[8]
      );
      if (dirty & /*goldIncome*/
      16) set_data(
        t14,
        /*goldIncome*/
        ctx2[4]
      );
      if (dirty & /*foodConsumption*/
      32) set_data(
        t18,
        /*foodConsumption*/
        ctx2[5]
      );
      if (dirty & /*collectionRadius*/
      64) set_data(
        t22,
        /*collectionRadius*/
        ctx2[6]
      );
      if (dirty & /*materialStorage*/
      128) set_data(
        t26,
        /*materialStorage*/
        ctx2[7]
      );
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
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
    showCancel: false,
    confirmLabel: "OK",
    width: "420px",
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
    ctx[11]
  );
  dialog.$on(
    "close",
    /*close_handler*/
    ctx[14]
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
      if (dirty & /*$$scope, materialStorage, collectionRadius, foodConsumption, goldIncome, maxStructuresDisplay, tierNumber, tierName, settlementName, tierIcon*/
      33790) {
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
  let { tierName = "" } = $$props;
  let { tierNumber = 1 } = $$props;
  let { goldIncome = 1 } = $$props;
  let { foodConsumption = 2 } = $$props;
  let { maxStructures = 6 } = $$props;
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
    if ("tierName" in $$props2) $$invalidate(2, tierName = $$props2.tierName);
    if ("tierNumber" in $$props2) $$invalidate(3, tierNumber = $$props2.tierNumber);
    if ("goldIncome" in $$props2) $$invalidate(4, goldIncome = $$props2.goldIncome);
    if ("foodConsumption" in $$props2) $$invalidate(5, foodConsumption = $$props2.foodConsumption);
    if ("maxStructures" in $$props2) $$invalidate(12, maxStructures = $$props2.maxStructures);
    if ("collectionRadius" in $$props2) $$invalidate(6, collectionRadius = $$props2.collectionRadius);
    if ("materialStorage" in $$props2) $$invalidate(7, materialStorage = $$props2.materialStorage);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*tierName*/
    4) {
      $$invalidate(9, tierIcon = SETTLEMENT_MAP_ICONS[tierName] || SETTLEMENT_MAP_ICONS.Village);
    }
    if ($$self.$$.dirty & /*maxStructures*/
    4096) {
      $$invalidate(8, maxStructuresDisplay = maxStructures === Infinity ? "Unlimited" : String(maxStructures));
    }
  };
  return [
    show,
    settlementName,
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
class SettlementTierUpDialog extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, {
      show: 0,
      settlementName: 1,
      tierName: 2,
      tierNumber: 3,
      goldIncome: 4,
      foodConsumption: 5,
      maxStructures: 12,
      collectionRadius: 6,
      materialStorage: 7
    });
  }
}
export {
  SettlementTierUpDialog as default
};
