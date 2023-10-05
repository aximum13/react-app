import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

const ModalCmp = ({
  children,
  isForm,
  isEdit,
  show,
  title,
  btnCancelText,
  btnSubmitText,
  handleSubmit,
  handleClose,
  handleDelete,
}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={isEdit ? handleDelete : handleClose}
        >
          {btnCancelText}
        </Button>
        {isForm && (
          <Button variant="primary" onClick={handleSubmit}>
            {btnSubmitText}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};
export default ModalCmp;
