export const errorTexts = (author: string, title: string, link?: string) => {
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

  if (
    link &&
    !link.startsWith('https://www.youtube.com/') &&
    !link.startsWith('https://youtu.be/')
  ) {
    text.errorLink = 'Введите или вставьте ссылку с YouTube';
  }

  return text;
};
