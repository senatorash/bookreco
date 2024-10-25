import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useResetPasswordRequestMutation } from "../../lib/apis/authApis";
import Errors from "../commons/Errors";
import classes from "./Auth.module.css";

const ResetPasswordForm = () => {
  const [email, setEmail] = useState("");

  const [resetPasswordRequest, { data, isSuccess, isError, isLoading, error }] =
    useResetPasswordRequestMutation();

  const navigate = useNavigate();

  const submitHandler = async (event) => {
    event.preventDefault();
    if (!email) {
      return;
    }
    return await resetPasswordRequest({ email });
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/auth/update-password");
    }
  }, [isSuccess]);
  return (
    <form onSubmit={submitHandler}>
      <div className={classes.wrapper}>
        <h3 className="mb-5 mt-5">Email Verification</h3>

        {isError && (
          <Errors
            errorMessage={
              error?.data?.errors ||
              error?.data?.error ||
              "something went wrong"
            }
          />
        )}

        <div className={`form-group mb-3 ${classes.input_field}`}>
          <input
            className="form-control"
            type="text"
            placeholder="Email"
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div className="form-group mb-3">
          <input
            className={`form-control btn btn-secondary ${classes.signup_btn}`}
            type="submit"
            value={isLoading ? "Please wait..." : "Send Email"}
          />
        </div>
      </div>
    </form>
  );
};

export default ResetPasswordForm;
