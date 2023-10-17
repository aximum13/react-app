import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

interface ModalTypes {
  show: boolean;
  handleClose: () => void;
  isForm?: boolean;
  isEdit?: boolean;
  title: string;
  btnCancelText: string;
  btnSubmitText?: string;
  handleSubmit?: () => void;
  handleDelete?: () => void;
  children: React.ReactNode;
}

const ModalCmp = ({
  children,
  isForm,
  isEdit,
  show,
  title,
  btnCancelText,
  btnSubmitText,
  handleClose,
  handleSubmit,
  handleDelete,
}: ModalTypes) => {
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
