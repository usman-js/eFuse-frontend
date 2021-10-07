export const focusOnElementHandler = (elementId: string) => {
    const el = document.getElementById(elementId);
    if (el) el.focus();
  };