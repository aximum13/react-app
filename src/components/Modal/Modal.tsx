import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

const ModalCmp = ({
  children,
  isForm,
  title,
  modalSubmitBtn,
  btnCancelText,
  btnSubmitText,
  show,
  handleClose,
}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {btnCancelText}
        </Button>
        {isForm && (
          <Button variant="primary" onClick={modalSubmitBtn}>
            {btnSubmitText}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};
export default ModalCmp;
