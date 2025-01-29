const SuccessCard = ({ successMessage }) => {
  return (
    <div className="alert alert-success mt-5" role="alert">
      {successMessage}
    </div>
  );
};

export default SuccessCard;
