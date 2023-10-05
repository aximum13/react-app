import Form from 'react-bootstrap/Form';

interface FormTypes {
  formValues: {
    id?: number;
    author: string;
    title: string;
    linkOnYouTube?: string;
  };
  errors: {
    errorAuthor: string;
    errorTitle: string;
    errorLink: string;
  };
  handleInputChange: (e: { target: { name: string; value: string } }) => void;
}
const FormCmp = ({ handleInputChange, formValues, errors }: FormTypes) => {
  return (
    <>
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
    </>
  );
};

export default FormCmp;
