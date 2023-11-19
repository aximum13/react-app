interface AlertType {
  text?: string | null;
}

const Alert: React.FC<AlertType> = ({ text }) => {
  return (
    <div
      className="alert alert-danger text-danger text-center w-75 m-auto mb-3"
      role="alert"
    >
      {text}
    </div>
  );
};

export default Alert;
