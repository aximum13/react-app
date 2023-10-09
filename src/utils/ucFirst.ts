export const ucFirst = (text: string) => {
  if (!text) return text;

  return text.replace(/(^|\s)\S/g, function (word) {
    return word.toUpperCase();
  });
};
