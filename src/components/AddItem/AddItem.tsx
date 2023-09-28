import classNames from 'classnames';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import { addItem } from 'actions/actionCreator';
import { getItems } from 'selectors/itemsSelector';
import { errorTexts } from 'utils/errorTexts';

import styles from './AddItem.module.scss';

const AddItem = () => {
  const dispatch = useDispatch();

  const items = useSelector(getItems);
  const initialId = items.length > 0 ? items[items.length - 1].id : 0;

  const [currentId, setCurrentId] = useState(initialId);
  const [show, setShow] = useState(false);
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

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
      formValues.author,
      formValues.title,
      formValues.linkOnYouTube
    );

    if (newErrors.errorAuthor || newErrors.errorTitle || newErrors.errorLink) {
      return setErrors(newErrors);
    }

    dispatch(
      addItem(
        currentId + 1,
        formValues.author.trim(),
        formValues.title.trim(),
        formValues.linkOnYouTube.trim()
      )
    );

    setFormValues({ id: 0, author: '', title: '', linkOnYouTube: '' });
    setErrors({ errorAuthor: '', errorTitle: '', errorLink: '' });
    setCurrentId(currentId + 1);
    setShow(false);
  };

  return (
    <>
      <Button
        variant="primary"
        className={classNames(styles.AddItem)}
        onClick={handleShow}
      >
        Добавить
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Новое произведение</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formAuthor">
              <Form.Label>Композитор</Form.Label>
              <Form.Control
                type="text"
                name="author"
                value={formValues.author}
                onChange={handleInputChange}
                autoFocus
                placeholder="John Williams"
                isInvalid={!!errors.errorAuthor}
              />
              <Form.Control.Feedback type="invalid">
                {errors.errorAuthor}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formTitle">
              <Form.Label>Название произведения</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formValues.title}
                onChange={handleInputChange}
                placeholder="Home Alone Main Title"
                isInvalid={!!errors.errorTitle}
              />
              <Form.Control.Feedback type="invalid">
                {errors.errorTitle}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLinkOnYouTube">
              <Form.Label>Ссылка на YouTube (необязательно)</Form.Label>
              <Form.Control
                type="text"
                name="linkOnYouTube"
                value={formValues.linkOnYouTube}
                onChange={handleInputChange}
                placeholder="https://www.youtube.com/watch?v=_bVOuOnO6mY"
                isInvalid={!!errors.errorLink}
              />
              <Form.Control.Feedback type="invalid">
                {errors.errorLink}
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Отмена
          </Button>
          <Button variant="primary" onClick={handleFormSubmit}>
            Добавить
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddItem;
