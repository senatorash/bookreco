import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUpdateUserPasswordMutation } from "../../lib/apis/authApis";
import Errors from "../commons/Errors";
import { formatTime } from "../../helpers/date";
import classes from "./Auth.module.css";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UpdatePasswordForm = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetPasswordToken, setResetPasswordToken] = useState("");
  const [timeLeft, setTimeLeft] = useState(300);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const [updateUserPassword, { isError, error, data, isSuccess, isLoading }] =
    useUpdateUserPasswordMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (timeLeft > 0) {
      const timerInterval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timerInterval);
    }
  }, [timeLeft]);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    if (!password || !confirmPassword || !resetPasswordToken) {
      return;
    }
    return await updateUserPassword({
      password,
      confirmPassword,
      resetPasswordToken,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/auth/signin");
    }
  }, [isSuccess]);
  return (
    <form onSubmit={submitHandler}>
      <div className={classes.wrapper}>
        <h3 className="mb-5 mt-5">Update Password Here</h3>

        {isError && (
          <Errors
            errorMessage={
              error?.data?.errors ||
              error?.data?.error ||
              "something went wrong"
            }
          />
        )}

        <div className={`d-flex form-group mb-3 ${classes.input_field}`}>
          <input
            className="form-control"
            type={passwordVisible ? "text" : "password"}
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
          />
          <span
            onClick={togglePasswordVisibility}
            style={{ border: "none", marginLeft: "10px", background: "none" }}
          >
            <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
          </span>
        </div>

        <div className={`d-flex form-group mb-3 ${classes.input_field}`}>
          <input
            className="form-control"
            type={confirmPasswordVisible ? "text" : "password"}
            placeholder="Confirm Password"
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
          <span
            onClick={toggleConfirmPasswordVisibility}
            style={{ border: "none", marginLeft: "10px", background: "none" }}
          >
            <FontAwesomeIcon
              icon={confirmPasswordVisible ? faEyeSlash : faEye}
            />
          </span>
        </div>

        <div className={`form-group mb-3 ${classes.input_field}`}>
          <input
            className="form-control"
            type="text"
            placeholder="Reset Password Token"
            onChange={(event) => setResetPasswordToken(event.target.value)}
          />
        </div>

        <p>Otp expires in: {formatTime(timeLeft)}</p>

        <div className="form-group mb-3">
          <input
            className={`form-control btn btn-secondary ${classes.signup_btn}`}
            type="submit"
            value={isLoading ? "Please Wait.." : "Update Password"}
          />
        </div>
      </div>
    </form>
  );
};

export default UpdatePasswordForm;
