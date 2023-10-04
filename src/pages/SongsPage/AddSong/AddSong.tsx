import classNames from 'classnames';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getItems } from 'selectors/itemsSelector';
import { errorTexts } from 'utils/errorTexts';
import { trimText } from 'utils/trimText';

import styles from './AddSong.module.scss';
import { addSong } from 'store/slices/songsSlice/songsSlice';

import { Button } from 'react-bootstrap';
import ModalCmp from 'components/Modal/Modal';
import FormCmp from 'components/Form/Form';

const AddSong = () => {
  const dispatch = useDispatch();

  const items = useSelector(getItems);
  const initialId = items.length > 0 ? items[items.length - 1].id : 0;
  const [currentId, setCurrentId] = useState(initialId);

  const [formValues, setFormValues] = useState({
    id: 0,
    author: '',
    title: '',
    linkOnYouTube: '',
  });

  let newErrors = {
    errorAuthor: '',
    errorTitle: '',
    errorLink: '',
  };

  const [errors, setErrors] = useState(newErrors);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);

  const handleInputChange = (e: {
    target: { name: string; value: string };
  }) => {
    const { name, value } = e.target;
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value,
    }));
  };

  const handleFormSubmit = () => {
    newErrors = errorTexts(
      formValues.author.trim(),
      formValues.title.trim(),
      formValues.linkOnYouTube
    );

    if (newErrors.errorAuthor || newErrors.errorTitle || newErrors.errorLink) {
      return (
        setErrors(newErrors),
        setFormValues({
          id: initialId,
          author: trimText(formValues.author),
          title: trimText(formValues.title),
          linkOnYouTube: trimText(formValues.linkOnYouTube),
        })
      );
    }

    dispatch(
      addSong({
        id: currentId + 1,
        author: formValues.author.trim(),
        title: formValues.title.trim(),
        url: formValues.linkOnYouTube.trim(),
      })
    );

    setFormValues({ id: 0, author: '', title: '', linkOnYouTube: '' });
    setErrors({ errorAuthor: '', errorTitle: '', errorLink: '' });
    setCurrentId(currentId + 1);
    setShow(false);
  };

  return (
    <>
      <Button onClick={handleOpen} className={classNames(styles.AddSong)}>
        Добавить
      </Button>
      <ModalCmp
        show={show}
        isForm={true}
        handleClose={handleClose}
        modalSubmitBtn={handleFormSubmit}
        title={'Новое произведение'}
        btnCancelText={'Отмена'}
        btnSubmitText={'Добавить'}
      >
        <FormCmp
          formValues={formValues}
          errors={errors}
          handleInputChange={handleInputChange}
        ></FormCmp>
      </ModalCmp>
    </>
  );
};

export default AddSong;
