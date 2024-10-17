const Errors = ({ errorMessage }) => {
  return (
    <div className="alert alert-danger" role="alert" style={{ width: "100%" }}>
      {errorMessage}
    </div>
  );
};

export default Errors;
