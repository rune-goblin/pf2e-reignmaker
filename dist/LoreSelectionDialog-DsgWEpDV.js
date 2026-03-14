import { aw as SvelteComponent, ax as init, ay as safe_not_equal, b0 as Dialog, b1 as binding_callbacks, b2 as bind, aL as is_function, b3 as destroy_component, b4 as transition_out, b5 as transition_in, b6 as add_flush_callback, b7 as mount_component, b8 as create_component, b9 as createEventDispatcher, aA as detach, bk as group_outros, bl as check_outros, aB as insert, aC as element, aD as attr, bm as select_value, aI as ensure_array_like, bn as Notification, aJ as destroy_each, bo as select_option, aK as listen, aG as space, bp as add_render_callback, az as noop, aE as set_data, bq as set_input_value, aF as append, aH as text } from "./GameCommandUtils-D_sgs3NK.js";
function get_each_context(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[8] = list[i];
  return child_ctx;
}
function create_else_block(ctx) {
  let div;
  let notification;
  let current;
  notification = new Notification({
    props: {
      variant: "warning",
      title: "No Lore Skills",
      description: "You have no Lore skills. Add a Lore skill to your character sheet to use this option."
    }
  });
  return {
    c() {
      div = element("div");
      create_component(notification.$$.fragment);
      attr(div, "class", "notification-wrapper svelte-prm-1j7xe0j");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      mount_component(notification, div, null);
      current = true;
    },
    p: noop,
    i(local) {
      if (current) return;
      transition_in(notification.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(notification.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      destroy_component(notification);
    }
  };
}
function create_if_block(ctx) {
  let label;
  let t1;
  let select;
  let t2;
  let div;
  let notification;
  let current;
  let mounted;
  let dispose;
  let each_value = ensure_array_like(
    /*loreItems*/
    ctx[1]
  );
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
  }
  notification = new Notification({
    props: {
      variant: "info",
      title: "GM Approval",
      description: "The GM will determine if your chosen Lore is applicable to this action."
    }
  });
  return {
    c() {
      label = element("label");
      label.textContent = "Choose which Lore skill to use:";
      t1 = space();
      select = element("select");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      t2 = space();
      div = element("div");
      create_component(notification.$$.fragment);
      attr(label, "for", "lore-selection");
      attr(label, "class", "dialog-label svelte-prm-1j7xe0j");
      attr(select, "id", "lore-selection");
      attr(select, "class", "lore-select rm-select svelte-prm-1j7xe0j");
      select.autofocus = true;
      if (
        /*selectedSlug*/
        ctx[2] === void 0
      ) add_render_callback(() => (
        /*select_change_handler*/
        ctx[5].call(select)
      ));
      attr(div, "class", "notification-wrapper svelte-prm-1j7xe0j");
    },
    m(target, anchor) {
      insert(target, label, anchor);
      insert(target, t1, anchor);
      insert(target, select, anchor);
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(select, null);
        }
      }
      select_option(
        select,
        /*selectedSlug*/
        ctx[2],
        true
      );
      insert(target, t2, anchor);
      insert(target, div, anchor);
      mount_component(notification, div, null);
      current = true;
      select.focus();
      if (!mounted) {
        dispose = listen(
          select,
          "change",
          /*select_change_handler*/
          ctx[5]
        );
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (dirty & /*loreItems*/
      2) {
        each_value = ensure_array_like(
          /*loreItems*/
          ctx2[1]
        );
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(select, null);
          }
        }
        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }
        each_blocks.length = each_value.length;
      }
      if (dirty & /*selectedSlug, loreItems*/
      6) {
        select_option(
          select,
          /*selectedSlug*/
          ctx2[2]
        );
      }
    },
    i(local) {
      if (current) return;
      transition_in(notification.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(notification.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(label);
        detach(t1);
        detach(select);
        detach(t2);
        detach(div);
      }
      destroy_each(each_blocks, detaching);
      destroy_component(notification);
      mounted = false;
      dispose();
    }
  };
}
function create_each_block(ctx) {
  let option;
  let t_value = (
    /*item*/
    ctx[8].name + ""
  );
  let t;
  let option_value_value;
  return {
    c() {
      option = element("option");
      t = text(t_value);
      option.__value = option_value_value = /*item*/
      ctx[8].slug;
      set_input_value(option, option.__value);
      attr(option, "class", "svelte-prm-1j7xe0j");
    },
    m(target, anchor) {
      insert(target, option, anchor);
      append(option, t);
    },
    p(ctx2, dirty) {
      if (dirty & /*loreItems*/
      2 && t_value !== (t_value = /*item*/
      ctx2[8].name + "")) set_data(t, t_value);
      if (dirty & /*loreItems*/
      2 && option_value_value !== (option_value_value = /*item*/
      ctx2[8].slug)) {
        option.__value = option_value_value;
        set_input_value(option, option.__value);
      }
    },
    d(detaching) {
      if (detaching) {
        detach(option);
      }
    }
  };
}
function create_default_slot(ctx) {
  let div;
  let current_block_type_index;
  let if_block;
  let current;
  const if_block_creators = [create_if_block, create_else_block];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (
      /*loreItems*/
      ctx2[1].length > 0
    ) return 0;
    return 1;
  }
  current_block_type_index = select_block_type(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  return {
    c() {
      div = element("div");
      if_block.c();
      attr(div, "class", "lore-dialog-content svelte-prm-1j7xe0j");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      if_blocks[current_block_type_index].m(div, null);
      current = true;
    },
    p(ctx2, dirty) {
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx2);
      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx2, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];
        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
          if_block.c();
        } else {
          if_block.p(ctx2, dirty);
        }
        transition_in(if_block, 1);
        if_block.m(div, null);
      }
    },
    i(local) {
      if (current) return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      if_blocks[current_block_type_index].d();
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
    title: "Select Applicable Lore Skill",
    confirmLabel: (
      /*loreItems*/
      ctx[1].length > 0 ? "Roll" : "OK"
    ),
    width: "450px",
    confirmDisabled: (
      /*loreItems*/
      ctx[1].length === 0
    ),
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
  dialog.$on("confirm", function() {
    if (is_function(
      /*loreItems*/
      ctx[1].length > 0 ? (
        /*handleSelect*/
        ctx[3]
      ) : (
        /*handleCancel*/
        ctx[4]
      )
    )) /*loreItems*/
    (ctx[1].length > 0 ? (
      /*handleSelect*/
      ctx[3]
    ) : (
      /*handleCancel*/
      ctx[4]
    )).apply(this, arguments);
  });
  dialog.$on(
    "cancel",
    /*handleCancel*/
    ctx[4]
  );
  return {
    c() {
      create_component(dialog.$$.fragment);
    },
    m(target, anchor) {
      mount_component(dialog, target, anchor);
      current = true;
    },
    p(new_ctx, [dirty]) {
      ctx = new_ctx;
      const dialog_changes = {};
      if (dirty & /*loreItems*/
      2) dialog_changes.confirmLabel = /*loreItems*/
      ctx[1].length > 0 ? "Roll" : "OK";
      if (dirty & /*loreItems*/
      2) dialog_changes.confirmDisabled = /*loreItems*/
      ctx[1].length === 0;
      if (dirty & /*$$scope, selectedSlug, loreItems*/
      2054) {
        dialog_changes.$$scope = { dirty, ctx };
      }
      if (!updating_show && dirty & /*show*/
      1) {
        updating_show = true;
        dialog_changes.show = /*show*/
        ctx[0];
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
  let { loreItems = [] } = $$props;
  const dispatch = createEventDispatcher();
  let selectedSlug = "";
  function handleSelect() {
    const selectedItem = loreItems.find((item) => item.slug === selectedSlug);
    if (selectedItem) {
      dispatch("select", { loreItem: selectedItem });
      $$invalidate(0, show = false);
      $$invalidate(2, selectedSlug = "");
    }
  }
  function handleCancel() {
    dispatch("cancel");
    $$invalidate(0, show = false);
    $$invalidate(2, selectedSlug = "");
  }
  function select_change_handler() {
    selectedSlug = select_value(this);
    $$invalidate(2, selectedSlug), $$invalidate(0, show), $$invalidate(1, loreItems);
    $$invalidate(1, loreItems);
  }
  function dialog_show_binding(value) {
    show = value;
    $$invalidate(0, show);
  }
  $$self.$$set = ($$props2) => {
    if ("show" in $$props2) $$invalidate(0, show = $$props2.show);
    if ("loreItems" in $$props2) $$invalidate(1, loreItems = $$props2.loreItems);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*show, loreItems, selectedSlug*/
    7) {
      if (show && loreItems.length > 0 && !selectedSlug) {
        $$invalidate(2, selectedSlug = loreItems[0].slug);
      }
    }
  };
  return [
    show,
    loreItems,
    selectedSlug,
    handleSelect,
    handleCancel,
    select_change_handler,
    dialog_show_binding
  ];
}
class LoreSelectionDialog extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, { show: 0, loreItems: 1 });
  }
}
export {
  LoreSelectionDialog as default
};
