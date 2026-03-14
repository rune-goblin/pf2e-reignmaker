async function mountSvelteDialog(ComponentClass, props = {}) {
  return new Promise((resolve) => {
    const container = document.createElement("div");
    container.style.position = "fixed";
    container.style.top = "0";
    container.style.left = "0";
    container.style.width = "100%";
    container.style.height = "100%";
    container.style.zIndex = "1000";
    container.style.pointerEvents = "none";
    container.style.setProperty("pointer-events", "none", "important");
    document.body.appendChild(container);
    const component = new ComponentClass({
      target: container,
      props: {
        ...props,
        show: true
      }
    });
    setTimeout(() => {
      const dialogElements = container.querySelectorAll(".dialog-backdrop, .dialog");
      dialogElements.forEach((el) => {
        el.style.pointerEvents = "auto";
      });
    }, 0);
    const cleanup = () => {
      component.$destroy();
      document.body.removeChild(container);
    };
    component.$on("confirm", () => {
      cleanup();
      resolve({ confirmed: true });
    });
    component.$on("cancel", () => {
      cleanup();
      resolve({ confirmed: false });
    });
    component.$on("close", () => {
      cleanup();
      resolve({ confirmed: false });
    });
  });
}
export {
  mountSvelteDialog
};
