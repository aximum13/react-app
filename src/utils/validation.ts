import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  author: Yup.string()
    .transform((value) => (value ? value.trim() : value))
    .required('Введите имя и/или фамилию композитора')
    .test(
      'notOnlyWhitespace',
      'Введите имя и/или фамилию композитора',
      (value) => {
        return /\S/.test(value);
      }
    )
    .min(3, 'Введите не менее 3 символов')
    .max(50, 'Введите не более 50 символов'),
  title: Yup.string()
    .transform((value) => (value ? value.trim() : value))
    .required('Введите название произведения')
    .test('notOnlyWhitespace', 'Введите название произведения', (value) => {
      return /\S/.test(value);
    })
    .max(100, 'Введите не более 100 символов'),
  linkOnYouTube: Yup.string().test(
    'startsWith',
    'Введите или вставьте ссылку с YouTube',
    (value) => {
      if (
        value &&
        !value.startsWith('https://www.youtube.com/') &&
        !value.startsWith('https://youtu.be/')
      ) {
        return false;
      }
      return true;
    }
  ),
});
