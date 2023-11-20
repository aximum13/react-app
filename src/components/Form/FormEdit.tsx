import { Formik, Form, Field, FormikHelpers } from 'formik';

import { useAppDispatch } from 'hooks';
import { editSong, getSong } from 'models/songs';
import { SongState } from 'models/songs/types';

import { validationSchema } from 'utils/validation';
import { trimText } from 'utils/trimText';

import { Button } from 'react-bootstrap';

type Props = {
  id: number;
  isDetail?: boolean;
  linkOnYouTube: string;
  author: string;
  title: string;
  handleClose: () => void;
  handleDelete: () => void;
};
type Values = SongState;

const FormEdit: React.FC<Props> = ({
  id,
  handleClose,
  handleDelete,
  isDetail,
  linkOnYouTube,
  author,
  title,
}) => {
  const initialValues: Values = {
    id: id,
    author: author,
    title: title,
    linkOnYouTube: linkOnYouTube,
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

        dispatch(
          editSong({
            id: id,
            author: author,
            title: title,
            linkOnYouTube: linkOnYouTube,
          })
        );

        !isDetail && dispatch(getSong(id));

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
              onClick={isDetail ? handleDelete : handleClose}
            >
              {isDetail ? 'Удалить' : 'Закрыть'}
            </Button>
            <Button type="submit" variant="primary">
              Сохранить
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
export default FormEdit;
