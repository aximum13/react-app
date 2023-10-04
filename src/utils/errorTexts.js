export const errorTexts = (author, title, link) => {
  const text = {
    errorAuthor: '',
    errorTitle: '',
    errorLink: '',
  };

  const isOnlySpace = /^\s*$/;

  if (!author || isOnlySpace.test(author)) {
    text.errorAuthor = 'Введите имя и/или фамилию композитора';
  } else if (author.length < 3) {
    text.errorAuthor = 'Введите не менее 3 символов';
  }

  if (!title || isOnlySpace.test(title)) {
    text.errorTitle = 'Введите название произведения';
  }

  if (!link.startsWith('https://www.youtube.com/') && link) {
    text.errorLink = 'Введите или вставьте ссылку с YouTube';
  }

  return text;
};
