import { aw as SvelteComponent, ax as init, ay as safe_not_equal, b0 as Dialog, b1 as binding_callbacks, b2 as bind, b3 as destroy_component, b4 as transition_out, b5 as transition_in, b6 as add_flush_callback, b7 as mount_component, b8 as create_component, b9 as createEventDispatcher, aA as detach, bd as run_all, aE as set_data, aB as insert, aF as append, aK as listen, aC as element, aH as text, aG as space, aD as attr } from "./GameCommandUtils-D_sgs3NK.js";
function create_default_slot(ctx) {
  let p0;
  let t0;
  let strong0;
  let t1;
  let t2;
  let t3;
  let p1;
  let t4;
  let strong1;
  let t5;
  let t6;
  let t7;
  let div;
  let button0;
  let t8;
  let t9;
  let t10;
  let button0_disabled_value;
  let t11;
  let button1;
  let mounted;
  let dispose;
  return {
    c() {
      p0 = element("p");
      t0 = text("An event consumed your available food supply, but ");
      strong0 = element("strong");
      t1 = text(
        /*shortfallAmount*/
        ctx[1]
      );
      t2 = text(" more\n     food is needed.");
      t3 = space();
      p1 = element("p");
      t4 = text("You have ");
      strong1 = element("strong");
      t5 = text(
        /*availableStored*/
        ctx[2]
      );
      t6 = text(" food in granary storage.");
      t7 = space();
      div = element("div");
      button0 = element("button");
      t8 = text("Pay from Granary (");
      t9 = text(
        /*shortfallAmount*/
        ctx[1]
      );
      t10 = text(" food)");
      t11 = space();
      button1 = element("button");
      button1.textContent = "Accept Shortage (+1 Unrest)";
      attr(button0, "class", "choice-btn pay svelte-prm-1cb4b9i");
      button0.disabled = button0_disabled_value = !/*canPay*/
      ctx[3];
      attr(button1, "class", "choice-btn shortage svelte-prm-1cb4b9i");
      attr(div, "class", "choices svelte-prm-1cb4b9i");
    },
    m(target, anchor) {
      insert(target, p0, anchor);
      append(p0, t0);
      append(p0, strong0);
      append(strong0, t1);
      append(p0, t2);
      insert(target, t3, anchor);
      insert(target, p1, anchor);
      append(p1, t4);
      append(p1, strong1);
      append(strong1, t5);
      append(p1, t6);
      insert(target, t7, anchor);
      insert(target, div, anchor);
      append(div, button0);
      append(button0, t8);
      append(button0, t9);
      append(button0, t10);
      append(div, t11);
      append(div, button1);
      if (!mounted) {
        dispose = [
          listen(
            button0,
            "click",
            /*handlePay*/
            ctx[4]
          ),
          listen(
            button1,
            "click",
            /*handleShortfall*/
            ctx[5]
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (dirty & /*shortfallAmount*/
      2) set_data(
        t1,
        /*shortfallAmount*/
        ctx2[1]
      );
      if (dirty & /*availableStored*/
      4) set_data(
        t5,
        /*availableStored*/
        ctx2[2]
      );
      if (dirty & /*shortfallAmount*/
      2) set_data(
        t9,
        /*shortfallAmount*/
        ctx2[1]
      );
      if (dirty & /*canPay*/
      8 && button0_disabled_value !== (button0_disabled_value = !/*canPay*/
      ctx2[3])) {
        button0.disabled = button0_disabled_value;
      }
    },
    d(detaching) {
      if (detaching) {
        detach(p0);
        detach(t3);
        detach(p1);
        detach(t7);
        detach(div);
      }
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
    ctx[6](value);
  }
  let dialog_props = {
    title: "Food Shortage",
    showConfirm: false,
    showCancel: false,
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
      if (dirty & /*$$scope, canPay, shortfallAmount, availableStored*/
      270) {
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
  let canPay;
  let { show = true } = $$props;
  let { shortfallAmount } = $$props;
  let { availableStored } = $$props;
  const dispatch = createEventDispatcher();
  function handlePay() {
    dispatch("confirm", { choice: "pay" });
  }
  function handleShortfall() {
    dispatch("confirm", { choice: "shortfall" });
  }
  function dialog_show_binding(value) {
    show = value;
    $$invalidate(0, show);
  }
  $$self.$$set = ($$props2) => {
    if ("show" in $$props2) $$invalidate(0, show = $$props2.show);
    if ("shortfallAmount" in $$props2) $$invalidate(1, shortfallAmount = $$props2.shortfallAmount);
    if ("availableStored" in $$props2) $$invalidate(2, availableStored = $$props2.availableStored);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*availableStored, shortfallAmount*/
    6) {
      $$invalidate(3, canPay = availableStored >= shortfallAmount);
    }
  };
  return [
    show,
    shortfallAmount,
    availableStored,
    canPay,
    handlePay,
    handleShortfall,
    dialog_show_binding
  ];
}
class FoodShortfallDialog extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, {
      show: 0,
      shortfallAmount: 1,
      availableStored: 2
    });
  }
}
export {
  FoodShortfallDialog as default
};
