import { Formik, Form, Field, FormikHelpers } from 'formik';
import { useState } from 'react';

import { useAppDispatch } from 'hooks';
import { addSong } from 'models/songs';
import { SongState } from 'models/songs/types';

import { validationSchema } from 'utils/validation';
import { trimText } from 'utils/trimText';

import { Button } from 'react-bootstrap';

type Props = {
  songs: SongState[];
  handleClose: () => void;
};
type Values = SongState;

const FormAdd: React.FC<Props> = ({ songs, handleClose }) => {
  const initialId: number = songs.length > 0 ? songs[songs.length - 1].id : 0;

  const [currentId, setCurrentId] = useState(initialId);

  const initialValues: Values = {
    id: initialId,
    author: '',
    title: '',
    linkOnYouTube: '',
  };

  const dispatch = useAppDispatch();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values: Values, { setSubmitting }: FormikHelpers<Values>) => {
        const author = trimText(values.author);
        const title = trimText(values.title);
        const linkOnYouTube = trimText(values.linkOnYouTube);

        setCurrentId(currentId + 1);
        dispatch(
          addSong({
            id: currentId + 1,
            author: author,
            title: title,
            linkOnYouTube: linkOnYouTube,
          })
        );

        setSubmitting(false);
        handleClose();
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <label className={'mb-3 d-block'}>
            Композитор
            <Field
              autoComplete="off"
              className={'form-control mt-1 w-100 d-block'}
              name="author"
              placeholder="John Williams"
            />
            {errors.author && touched.author ? (
              <div className={'mt-1 text-danger'}>{errors.author}</div>
            ) : null}
          </label>
          <label className={'mb-3 d-block'}>
            Название произведения
            <Field
              autoComplete="off"
              className={'form-control mt-1 w-100 d-block'}
              name="title"
              placeholder="Home Alone Main Title"
            />
            {errors.title && touched.title ? (
              <div className={'mt-1 text-danger'}>{errors.title}</div>
            ) : null}
          </label>
          <label className={'d-block'}>
            Ссылка на YouTube (необязательно)
            <Field
              autoComplete="off"
              className={'form-control mt-1 w-100 d-block'}
              name="linkOnYouTube"
              placeholder="https://www.youtube.com/watch?v=_bVOuOnO6mY"
            />
            {errors.linkOnYouTube && touched.linkOnYouTube ? (
              <div className={'mt-1 text-danger'}>{errors.linkOnYouTube}</div>
            ) : null}
          </label>
          <div className={'mt-4 d-flex justify-content-end'}>
            <Button
              className={'me-2'}
              variant="secondary"
              onClick={handleClose}
            >
              Отмена
            </Button>
            <Button type="submit" variant="primary">
              Добавить
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
export default FormAdd;
