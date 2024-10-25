import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useVerifyUserAccountMutation } from "../../lib/apis/userApis";
import Errors from "../commons/Errors";
import { formatTime } from "../../helpers/date";
import classes from "./Auth.module.css";

const VerifyAccountForm = () => {
  const [verificationToken, setVerificationToken] = useState("");
  const [timeLeft, setTimeLeft] = useState(300);

  const [verifyUserAccount, { isError, error, data, isLoading, isSuccess }] =
    useVerifyUserAccountMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (timeLeft > 0) {
      const timerInterval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timerInterval);
    }
  }, [timeLeft]);

  const submitHandler = async (event) => {
    event.preventDefault();

    if (!verificationToken) {
      return;
    }

    return await verifyUserAccount({ verificationToken });
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/auth/signin");
    }
  }, [isSuccess]);
  return (
    <form onSubmit={submitHandler}>
      <div className={classes.wrapper}>
        <h3 className="mb-5 mt-5">Verify Account Here</h3>

        {isError && (
          <Errors errorMessage={error?.data.error || "something went wrong"} />
        )}

        <div className={`form-group mb-5 ${classes.input_field}`}>
          <input
            className="form-control"
            type="text"
            placeholder="Verification Token"
            onChange={(event) => setVerificationToken(event.target.value)}
          />
        </div>

        <p>Otp expires in: {formatTime(timeLeft)}</p>

        <div className="form-group mb-3">
          <input
            className={`form-control btn btn-secondary ${classes.signup_btn}`}
            type="submit"
            value={isLoading ? "Please Wait" : "Verify"}
          />
        </div>
      </div>
    </form>
  );
};

export default VerifyAccountForm;
