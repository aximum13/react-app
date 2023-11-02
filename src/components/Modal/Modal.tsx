import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

interface ModalTypes {
  show?: boolean;
  isForm?: boolean;
  isEdit?: boolean;
  isShow?: boolean;
  isNew?: boolean;
  title?: string;
  btnCancelText?: string;
  btnSubmitText?: string;
  handleClose?: () => void;
  handleSubmit?: () => void;
  handleDelete?: () => void;
  children: React.ReactNode;
}

const ModalCmp = ({
  children,
  isForm,
  isShow,
  isNew,
  isEdit,
  show,
  handleClose,
  handleSubmit,
  handleDelete,
}: ModalTypes) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {isNew ? 'Новое произведение' : isShow ? 'Просмотр' : 'Редактировать'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={isEdit ? handleDelete : handleClose}
        >
          {isEdit ? 'Удалить' : isShow ? 'Закрыть' : 'Отмена'}
        </Button>
        {isForm && (
          <Button variant="primary" onClick={handleSubmit}>
            {isNew ? 'Добавить' : 'Сохранить'}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};
export default ModalCmp;
