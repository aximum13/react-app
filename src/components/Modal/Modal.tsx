import Modal from 'react-bootstrap/Modal';

interface ModalTypes {
  show?: boolean;
  isShow?: boolean;
  isNew?: boolean;
  handleClose?: () => void;
  children: React.ReactNode;
}

const ModalCmp = ({
  children,
  isShow,
  isNew,
  show,
  handleClose,
}: ModalTypes) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {isNew ? 'Новое произведение' : isShow ? 'Просмотр' : 'Редактировать'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};
export default ModalCmp;
