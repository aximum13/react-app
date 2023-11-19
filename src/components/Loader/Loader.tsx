import { Spinner } from 'react-bootstrap';

const Loader: React.FC = () => {
  return (
    <Spinner className="m-auto d-block" animation="border" variant="primary" />
  );
};

export default Loader;
