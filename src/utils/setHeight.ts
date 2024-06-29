export const setHeight = (element: HTMLTextAreaElement) => {
  element.style.height = 'auto';
  element.style.height = element.scrollHeight + 'px';
};
