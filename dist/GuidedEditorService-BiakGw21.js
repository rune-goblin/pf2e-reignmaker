import { aw as SvelteComponent, ax as init, ay as safe_not_equal, az as noop, aA as detach, aB as insert, aP as empty, bu as component_subscribe, b9 as createEventDispatcher, bv as onDestroy, bw as onMount, aI as ensure_array_like, aJ as destroy_each, bd as run_all, aD as attr, aE as set_data, aM as set_style, aN as toggle_class, aF as append, aK as listen, aC as element, aG as space, aH as text, bx as bubble, by as stop_propagation, R as ReignMakerMapLayer, bz as setMapSetupComplete, g as getPartyActor, bA as openKingdomUI, x as get_store_value, bB as closeKingdomUI } from "./GameCommandUtils-D_sgs3NK.js";
import { w as wizardState, a as wizardStepIndex, c as currentStepConfig, b as clearActiveEditorSection, s as setActiveEditorSection, W as WIZARD_STEPS, t as totalWizardSteps, g as getEditorModeService, n as nextStep, p as previousStep, d as setGuidedModePositions, e as startWizard, f as clearGuidedModePositions, h as finishWizard } from "./EditorModeService-pyvG--bK.js";
function get_each_context(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[20] = list[i];
  return child_ctx;
}
function create_if_block(ctx) {
  let div11;
  let div4;
  let div1;
  let i0;
  let i0_class_value;
  let t0;
  let div0;
  let span;
  let t1_value = (
    /*$currentStepConfig*/
    ctx[7].title + ""
  );
  let t1;
  let t2;
  let t3;
  let div3;
  let div2;
  let t4;
  let t5_value = (
    /*$wizardStepIndex*/
    ctx[1] + 1 + ""
  );
  let t5;
  let t6;
  let t7;
  let t8;
  let button0;
  let t9;
  let div6;
  let div5;
  let t10;
  let div8;
  let p;
  let t11_value = (
    /*$currentStepConfig*/
    ctx[7].description + ""
  );
  let t11;
  let t12;
  let div7;
  let h4;
  let t14;
  let ul;
  let t15;
  let div10;
  let div9;
  let button1;
  let i2;
  let t16;
  let t17;
  let button2;
  let t18_value = (
    /*canFinish*/
    ctx[5] ? "Done" : "Next"
  );
  let t18;
  let t19;
  let i3;
  let i3_class_value;
  let button2_title_value;
  let t20;
  let if_block1_anchor;
  let mounted;
  let dispose;
  let if_block0 = (
    /*$currentStepConfig*/
    ctx[7].optional && create_if_block_2()
  );
  let each_value = ensure_array_like(
    /*$currentStepConfig*/
    ctx[7].tips
  );
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
  }
  let if_block1 = (
    /*showConfirmDialog*/
    ctx[4] && create_if_block_1(ctx)
  );
  return {
    c() {
      div11 = element("div");
      div4 = element("div");
      div1 = element("div");
      i0 = element("i");
      t0 = space();
      div0 = element("div");
      span = element("span");
      t1 = text(t1_value);
      t2 = space();
      if (if_block0) if_block0.c();
      t3 = space();
      div3 = element("div");
      div2 = element("div");
      t4 = text("Step ");
      t5 = text(t5_value);
      t6 = text(" of ");
      t7 = text(totalWizardSteps);
      t8 = space();
      button0 = element("button");
      button0.innerHTML = `<i class="fas fa-times svelte-prm-lmr5k6"></i>`;
      t9 = space();
      div6 = element("div");
      div5 = element("div");
      t10 = space();
      div8 = element("div");
      p = element("p");
      t11 = text(t11_value);
      t12 = space();
      div7 = element("div");
      h4 = element("h4");
      h4.textContent = "Tips";
      t14 = space();
      ul = element("ul");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      t15 = space();
      div10 = element("div");
      div9 = element("div");
      button1 = element("button");
      i2 = element("i");
      t16 = text("\n          Back");
      t17 = space();
      button2 = element("button");
      t18 = text(t18_value);
      t19 = space();
      i3 = element("i");
      t20 = space();
      if (if_block1) if_block1.c();
      if_block1_anchor = empty();
      attr(i0, "class", i0_class_value = "fas " + /*$currentStepConfig*/
      ctx[7].icon + " svelte-prm-lmr5k6");
      attr(span, "class", "title svelte-prm-lmr5k6");
      attr(div0, "class", "title-group svelte-prm-lmr5k6");
      attr(div1, "class", "header-content svelte-prm-lmr5k6");
      attr(div2, "class", "step-indicator svelte-prm-lmr5k6");
      attr(button0, "class", "close-button svelte-prm-lmr5k6");
      attr(button0, "title", "Cancel guided setup");
      attr(div3, "class", "header-right svelte-prm-lmr5k6");
      attr(div4, "class", "panel-header svelte-prm-lmr5k6");
      attr(div5, "class", "progress-fill svelte-prm-lmr5k6");
      set_style(
        div5,
        "width",
        /*$wizardStepIndex*/
        (ctx[1] + 1) / totalWizardSteps * 100 + "%"
      );
      attr(div6, "class", "progress-bar svelte-prm-lmr5k6");
      attr(p, "class", "description svelte-prm-lmr5k6");
      attr(h4, "class", "svelte-prm-lmr5k6");
      attr(ul, "class", "svelte-prm-lmr5k6");
      attr(div7, "class", "tips svelte-prm-lmr5k6");
      attr(div8, "class", "panel-content svelte-prm-lmr5k6");
      attr(i2, "class", "fas fa-chevron-left");
      attr(button1, "class", "nav-button back svelte-prm-lmr5k6");
      button1.disabled = /*isFirstStep*/
      ctx[6];
      attr(button1, "title", "Go to previous layer");
      attr(i3, "class", i3_class_value = "fas " + /*canFinish*/
      (ctx[5] ? "fa-check" : "fa-chevron-right"));
      attr(button2, "class", "nav-button next svelte-prm-lmr5k6");
      attr(button2, "title", button2_title_value = /*canFinish*/
      ctx[5] ? "Finish setup" : "Go to next layer");
      attr(div9, "class", "nav-buttons svelte-prm-lmr5k6");
      attr(div10, "class", "panel-actions svelte-prm-lmr5k6");
      attr(div11, "class", "guided-panel svelte-prm-lmr5k6");
      set_style(
        div11,
        "left",
        /*position*/
        ctx[2].x + "px"
      );
      set_style(
        div11,
        "top",
        /*position*/
        ctx[2].y + "px"
      );
      attr(div11, "role", "dialog");
      attr(div11, "aria-label", "Map Setup Guide");
      toggle_class(
        div11,
        "dragging",
        /*isDragging*/
        ctx[3]
      );
    },
    m(target, anchor) {
      insert(target, div11, anchor);
      append(div11, div4);
      append(div4, div1);
      append(div1, i0);
      append(div1, t0);
      append(div1, div0);
      append(div0, span);
      append(span, t1);
      append(div0, t2);
      if (if_block0) if_block0.m(div0, null);
      append(div4, t3);
      append(div4, div3);
      append(div3, div2);
      append(div2, t4);
      append(div2, t5);
      append(div2, t6);
      append(div2, t7);
      append(div3, t8);
      append(div3, button0);
      append(div11, t9);
      append(div11, div6);
      append(div6, div5);
      append(div11, t10);
      append(div11, div8);
      append(div8, p);
      append(p, t11);
      append(div8, t12);
      append(div8, div7);
      append(div7, h4);
      append(div7, t14);
      append(div7, ul);
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(ul, null);
        }
      }
      append(div11, t15);
      append(div11, div10);
      append(div10, div9);
      append(div9, button1);
      append(button1, i2);
      append(button1, t16);
      append(div9, t17);
      append(div9, button2);
      append(button2, t18);
      append(button2, t19);
      append(button2, i3);
      insert(target, t20, anchor);
      if (if_block1) if_block1.m(target, anchor);
      insert(target, if_block1_anchor, anchor);
      if (!mounted) {
        dispose = [
          listen(
            button0,
            "click",
            /*handleCancelClick*/
            ctx[10]
          ),
          listen(
            button1,
            "click",
            /*handleBack*/
            ctx[9]
          ),
          listen(
            button2,
            "click",
            /*handleNext*/
            ctx[8]
          ),
          listen(
            div11,
            "mousedown",
            /*handleMouseDown*/
            ctx[13]
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (dirty & /*$currentStepConfig*/
      128 && i0_class_value !== (i0_class_value = "fas " + /*$currentStepConfig*/
      ctx2[7].icon + " svelte-prm-lmr5k6")) {
        attr(i0, "class", i0_class_value);
      }
      if (dirty & /*$currentStepConfig*/
      128 && t1_value !== (t1_value = /*$currentStepConfig*/
      ctx2[7].title + "")) set_data(t1, t1_value);
      if (
        /*$currentStepConfig*/
        ctx2[7].optional
      ) {
        if (if_block0) ;
        else {
          if_block0 = create_if_block_2();
          if_block0.c();
          if_block0.m(div0, null);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }
      if (dirty & /*$wizardStepIndex*/
      2 && t5_value !== (t5_value = /*$wizardStepIndex*/
      ctx2[1] + 1 + "")) set_data(t5, t5_value);
      if (dirty & /*$wizardStepIndex*/
      2) {
        set_style(
          div5,
          "width",
          /*$wizardStepIndex*/
          (ctx2[1] + 1) / totalWizardSteps * 100 + "%"
        );
      }
      if (dirty & /*$currentStepConfig*/
      128 && t11_value !== (t11_value = /*$currentStepConfig*/
      ctx2[7].description + "")) set_data(t11, t11_value);
      if (dirty & /*$currentStepConfig*/
      128) {
        each_value = ensure_array_like(
          /*$currentStepConfig*/
          ctx2[7].tips
        );
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(ul, null);
          }
        }
        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }
        each_blocks.length = each_value.length;
      }
      if (dirty & /*isFirstStep*/
      64) {
        button1.disabled = /*isFirstStep*/
        ctx2[6];
      }
      if (dirty & /*canFinish*/
      32 && t18_value !== (t18_value = /*canFinish*/
      ctx2[5] ? "Done" : "Next")) set_data(t18, t18_value);
      if (dirty & /*canFinish*/
      32 && i3_class_value !== (i3_class_value = "fas " + /*canFinish*/
      (ctx2[5] ? "fa-check" : "fa-chevron-right"))) {
        attr(i3, "class", i3_class_value);
      }
      if (dirty & /*canFinish*/
      32 && button2_title_value !== (button2_title_value = /*canFinish*/
      ctx2[5] ? "Finish setup" : "Go to next layer")) {
        attr(button2, "title", button2_title_value);
      }
      if (dirty & /*position*/
      4) {
        set_style(
          div11,
          "left",
          /*position*/
          ctx2[2].x + "px"
        );
      }
      if (dirty & /*position*/
      4) {
        set_style(
          div11,
          "top",
          /*position*/
          ctx2[2].y + "px"
        );
      }
      if (dirty & /*isDragging*/
      8) {
        toggle_class(
          div11,
          "dragging",
          /*isDragging*/
          ctx2[3]
        );
      }
      if (
        /*showConfirmDialog*/
        ctx2[4]
      ) {
        if (if_block1) {
          if_block1.p(ctx2, dirty);
        } else {
          if_block1 = create_if_block_1(ctx2);
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
        detach(div11);
        detach(t20);
        detach(if_block1_anchor);
      }
      if (if_block0) if_block0.d();
      destroy_each(each_blocks, detaching);
      if (if_block1) if_block1.d(detaching);
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_if_block_2(ctx) {
  let span;
  return {
    c() {
      span = element("span");
      span.textContent = "Optional";
      attr(span, "class", "optional-badge svelte-prm-lmr5k6");
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
  let li;
  let t_value = (
    /*tip*/
    ctx[20] + ""
  );
  let t;
  return {
    c() {
      li = element("li");
      t = text(t_value);
      attr(li, "class", "svelte-prm-lmr5k6");
    },
    m(target, anchor) {
      insert(target, li, anchor);
      append(li, t);
    },
    p(ctx2, dirty) {
      if (dirty & /*$currentStepConfig*/
      128 && t_value !== (t_value = /*tip*/
      ctx2[20] + "")) set_data(t, t_value);
    },
    d(detaching) {
      if (detaching) {
        detach(li);
      }
    }
  };
}
function create_if_block_1(ctx) {
  let div3;
  let div2;
  let div0;
  let t2;
  let p;
  let t4;
  let div1;
  let button0;
  let t6;
  let button1;
  let mounted;
  let dispose;
  return {
    c() {
      div3 = element("div");
      div2 = element("div");
      div0 = element("div");
      div0.innerHTML = `<i class="fas fa-exclamation-triangle svelte-prm-lmr5k6"></i> <h3 id="confirm-title" class="svelte-prm-lmr5k6">Setup Required</h3>`;
      t2 = space();
      p = element("p");
      p.textContent = "You must complete editing your Kingdom Map before starting ReignMaker.";
      t4 = space();
      div1 = element("div");
      button0 = element("button");
      button0.textContent = "Finish Later";
      t6 = space();
      button1 = element("button");
      button1.textContent = "Keep Editing";
      attr(div0, "class", "confirm-header svelte-prm-lmr5k6");
      attr(p, "class", "confirm-message svelte-prm-lmr5k6");
      attr(button0, "class", "confirm-button dismiss svelte-prm-lmr5k6");
      attr(button1, "class", "confirm-button ok svelte-prm-lmr5k6");
      attr(div1, "class", "confirm-actions svelte-prm-lmr5k6");
      attr(div2, "class", "confirm-dialog svelte-prm-lmr5k6");
      attr(div2, "role", "dialog");
      attr(div2, "aria-modal", "true");
      attr(div2, "aria-labelledby", "confirm-title");
      attr(div3, "class", "confirm-overlay svelte-prm-lmr5k6");
      attr(div3, "role", "presentation");
    },
    m(target, anchor) {
      insert(target, div3, anchor);
      append(div3, div2);
      append(div2, div0);
      append(div2, t2);
      append(div2, p);
      append(div2, t4);
      append(div2, div1);
      append(div1, button0);
      append(div1, t6);
      append(div1, button1);
      if (!mounted) {
        dispose = [
          listen(
            button0,
            "click",
            /*handleConfirmDismiss*/
            ctx[12]
          ),
          listen(
            button1,
            "click",
            /*handleConfirmOK*/
            ctx[11]
          ),
          listen(div2, "click", stop_propagation(
            /*click_handler*/
            ctx[14]
          )),
          listen(
            div3,
            "click",
            /*handleConfirmOK*/
            ctx[11]
          ),
          listen(
            div3,
            "keydown",
            /*keydown_handler*/
            ctx[15]
          )
        ];
        mounted = true;
      }
    },
    p: noop,
    d(detaching) {
      if (detaching) {
        detach(div3);
      }
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_fragment(ctx) {
  let if_block_anchor;
  let if_block = (
    /*$wizardState*/
    ctx[0].active && /*$currentStepConfig*/
    ctx[7] && create_if_block(ctx)
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
    p(ctx2, [dirty]) {
      if (
        /*$wizardState*/
        ctx2[0].active && /*$currentStepConfig*/
        ctx2[7]
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
        } else {
          if_block = create_if_block(ctx2);
          if_block.c();
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(if_block_anchor);
      }
      if (if_block) if_block.d(detaching);
    }
  };
}
function instance($$self, $$props, $$invalidate) {
  let canFinish;
  let isFirstStep;
  let $wizardState;
  let $wizardStepIndex;
  let $currentStepConfig;
  component_subscribe($$self, wizardState, ($$value) => $$invalidate(0, $wizardState = $$value));
  component_subscribe($$self, wizardStepIndex, ($$value) => $$invalidate(1, $wizardStepIndex = $$value));
  component_subscribe($$self, currentStepConfig, ($$value) => $$invalidate(7, $currentStepConfig = $$value));
  const dispatch = createEventDispatcher();
  let position = { x: window.innerWidth - 420, y: 100 };
  let isDragging = false;
  let dragStart = { x: 0, y: 0 };
  let showConfirmDialog = false;
  onDestroy(() => {
    clearActiveEditorSection();
  });
  async function handleNext() {
    if (canFinish) {
      dispatch("complete");
    } else {
      const currentStep = $wizardState.currentStep;
      if (currentStep) {
        const editorService = getEditorModeService();
        await editorService.commitStep(currentStep);
      }
      nextStep();
    }
  }
  function handleBack() {
    previousStep();
  }
  function handleCancelClick() {
    $$invalidate(4, showConfirmDialog = true);
  }
  function handleConfirmOK() {
    $$invalidate(4, showConfirmDialog = false);
  }
  function handleConfirmDismiss() {
    $$invalidate(4, showConfirmDialog = false);
    dispatch("dismiss");
  }
  function handleMouseDown(e) {
    if (e.target.closest("button")) return;
    $$invalidate(3, isDragging = true);
    dragStart = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    };
    e.preventDefault();
  }
  function handleMouseMove(e) {
    if (!isDragging) return;
    $$invalidate(2, position = {
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  }
  function handleMouseUp() {
    $$invalidate(3, isDragging = false);
  }
  onMount(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  });
  function click_handler(event) {
    bubble.call(this, $$self, event);
  }
  const keydown_handler = (e) => e.key === "Escape" && handleConfirmOK();
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*$wizardState*/
    1) {
      if ($wizardState.currentStep) {
        setActiveEditorSection($wizardState.currentStep);
      }
    }
    if ($$self.$$.dirty & /*$wizardStepIndex*/
    2) {
      $$invalidate(5, canFinish = $wizardStepIndex === WIZARD_STEPS.length - 1);
    }
    if ($$self.$$.dirty & /*$wizardStepIndex*/
    2) {
      $$invalidate(6, isFirstStep = $wizardStepIndex === 0);
    }
  };
  return [
    $wizardState,
    $wizardStepIndex,
    position,
    isDragging,
    showConfirmDialog,
    canFinish,
    isFirstStep,
    $currentStepConfig,
    handleNext,
    handleBack,
    handleCancelClick,
    handleConfirmOK,
    handleConfirmDismiss,
    handleMouseDown,
    click_handler,
    keydown_handler
  ];
}
class GuidedEditorPanel extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, {});
  }
}
let guidedPanelComponent = null;
let guidedPanelMountPoint = null;
async function openGuidedEditor() {
  closeGuidedEditor();
  console.log("[GuidedEditor] Starting guided editor...");
  const windowHeight = window.innerHeight;
  const toolbarY = (windowHeight - 400) / 2;
  setGuidedModePositions({
    overlayToolbar: { x: 8, y: toolbarY },
    editorPanel: { x: 216, y: toolbarY }
  });
  console.log("[GuidedEditor] Panel positions set for guided layout");
  const mapLayer = ReignMakerMapLayer.getInstance();
  if (!mapLayer.getToggleState()) {
    console.log("[GuidedEditor] Activating overlay system...");
    await mapLayer.handleSceneControlToggle();
  }
  console.log("[GuidedEditor] Opening editor panel...");
  window.dispatchEvent(new CustomEvent("reignmaker:open-editor"));
  setActiveEditorSection("terrain");
  startWizard();
  guidedPanelMountPoint = document.createElement("div");
  guidedPanelMountPoint.id = "guided-panel-mount";
  document.body.appendChild(guidedPanelMountPoint);
  guidedPanelComponent = new GuidedEditorPanel({
    target: guidedPanelMountPoint
  });
  guidedPanelComponent.$on("complete", handleComplete);
  guidedPanelComponent.$on("dismiss", handleDismiss);
  console.log("[GuidedEditor] Guided editor panel mounted");
}
function closeGuidedEditor() {
  clearGuidedModePositions();
  if (guidedPanelComponent) {
    guidedPanelComponent.$destroy();
    guidedPanelComponent = null;
  }
  if (guidedPanelMountPoint) {
    guidedPanelMountPoint.remove();
    guidedPanelMountPoint = null;
  }
}
async function handleDismiss() {
  console.log("[GuidedEditor] handleDismiss called - saving progress and marking as not ready");
  const currentStep = get_store_value(wizardState).currentStep;
  console.log(`[GuidedEditor] Current step before dismiss: ${currentStep}`);
  finishWizard();
  closeGuidedEditor();
  try {
    const editorService = getEditorModeService();
    if (currentStep) {
      console.log(`[GuidedEditor] Committing step: ${currentStep}`);
      await editorService.commitStep(currentStep);
    }
    await editorService.save(true);
  } catch (error) {
    console.error("[GuidedEditor] Error saving editor:", error);
  }
  window.dispatchEvent(new CustomEvent("reignmaker:close-editor"));
  const mapLayer = ReignMakerMapLayer.getInstance();
  if (mapLayer.getToggleState()) {
    await mapLayer.handleSceneControlToggle();
  }
  console.log("[GuidedEditor] Calling setMapSetupComplete(false)...");
  await setMapSetupComplete(false);
  console.log("[GuidedEditor] setMapSetupComplete(false) complete");
  closeKingdomUI();
  console.log("[GuidedEditor] Setup dismissed - progress saved, kingdom marked as not ready");
}
async function handleComplete() {
  console.log("[GuidedEditor] Guided experience complete - saving and opening Kingdom UI");
  finishWizard();
  closeGuidedEditor();
  try {
    const editorService = getEditorModeService();
    await editorService.save();
    console.log("[GuidedEditor] Editor changes saved");
  } catch (error) {
    console.error("[GuidedEditor] Failed to save editor changes:", error);
    const ui = globalThis.ui;
    ui?.notifications?.error("Failed to save map changes. Please save manually.");
  }
  console.log("[GuidedEditor] Calling setMapSetupComplete(true)...");
  await setMapSetupComplete(true);
  console.log("[GuidedEditor] Map setup marked as complete");
  window.dispatchEvent(new CustomEvent("reignmaker:close-editor"));
  const partyActor = await getPartyActor();
  if (partyActor) {
    openKingdomUI(partyActor.id);
    console.log("[GuidedEditor] Kingdom UI opened");
  }
}
export {
  closeGuidedEditor,
  openGuidedEditor
};
