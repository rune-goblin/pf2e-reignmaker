import { aw as SvelteComponent, ax as init, ay as safe_not_equal, b0 as Dialog, b1 as binding_callbacks, b2 as bind, b3 as destroy_component, b4 as transition_out, b5 as transition_in, b6 as add_flush_callback, b7 as mount_component, b8 as create_component, b9 as createEventDispatcher, aA as detach, aE as set_data, aM as set_style, aB as insert, aF as append, aC as element, aH as text, aG as space, aD as attr } from "./GameCommandUtils-D_sgs3NK.js";
function create_default_slot(ctx) {
  let div3;
  let div0;
  let span;
  let strong;
  let t0;
  let t1;
  let t2;
  let div2;
  let div1;
  let t3;
  let p;
  return {
    c() {
      div3 = element("div");
      div0 = element("div");
      span = element("span");
      strong = element("strong");
      t0 = text(
        /*kingdomName*/
        ctx[1]
      );
      t1 = text(" has grown");
      t2 = space();
      div2 = element("div");
      div1 = element("div");
      t3 = space();
      p = element("p");
      p.textContent = "As the kingdom grows, its fate rests ever more on the strength of its leaders. Each turn, a different leader will make a Cohesion Check to influence the stability of the realm.";
      attr(strong, "class", "svelte-prm-1s0t7o6");
      attr(span, "class", "banner-text svelte-prm-1s0t7o6");
      attr(div0, "class", "establishment-banner svelte-prm-1s0t7o6");
      attr(div1, "class", "parallax-image svelte-prm-1s0t7o6");
      set_style(div1, "background-image", "url('" + /*celebrationImagePath*/
      ctx[2] + "')");
      attr(div2, "class", "parallax-container svelte-prm-1s0t7o6");
      attr(p, "class", "message svelte-prm-1s0t7o6");
      attr(div3, "class", "cohesion-intro-content svelte-prm-1s0t7o6");
    },
    m(target, anchor) {
      insert(target, div3, anchor);
      append(div3, div0);
      append(div0, span);
      append(span, strong);
      append(strong, t0);
      append(span, t1);
      append(div3, t2);
      append(div3, div2);
      append(div2, div1);
      append(div3, t3);
      append(div3, p);
    },
    p(ctx2, dirty) {
      if (dirty & /*kingdomName*/
      2) set_data(
        t0,
        /*kingdomName*/
        ctx2[1]
      );
      if (dirty & /*celebrationImagePath*/
      4) {
        set_style(div1, "background-image", "url('" + /*celebrationImagePath*/
        ctx2[2] + "')");
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
    ctx[5](value);
  }
  let dialog_props = {
    showCancel: false,
    confirmLabel: "OK",
    width: "680px",
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
    ctx[4]
  );
  dialog.$on(
    "close",
    /*close_handler*/
    ctx[6]
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
      if (dirty & /*$$scope, celebrationImagePath, kingdomName*/
      134) {
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
  let { show = false } = $$props;
  let { kingdomName = "" } = $$props;
  let { celebrationImagePath = "" } = $$props;
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
    if ("kingdomName" in $$props2) $$invalidate(1, kingdomName = $$props2.kingdomName);
    if ("celebrationImagePath" in $$props2) $$invalidate(2, celebrationImagePath = $$props2.celebrationImagePath);
  };
  return [
    show,
    kingdomName,
    celebrationImagePath,
    dispatch,
    handleConfirm,
    dialog_show_binding,
    close_handler
  ];
}
class CohesionIntroDialog extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, {
      show: 0,
      kingdomName: 1,
      celebrationImagePath: 2
    });
  }
}
export {
  CohesionIntroDialog as default
};
