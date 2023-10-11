export const ucFirst = (text: string) => {
  if (!text) return text;

  return text.replace(/(^|\s)\S/g, (word) => {
    return word.toUpperCase();
  });
};
