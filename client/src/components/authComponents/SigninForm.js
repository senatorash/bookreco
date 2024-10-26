import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../../lib/apis/authApis";
import { useGetCurrentUserMutation } from "../../lib/apis/userApis";
import Errors from "../commons/Errors";
import classes from "./Auth.module.css";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SigninForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [getCurrentUser, { isSuccess: getUserSuccess }] =
    useGetCurrentUserMutation();

  const [loginUser, { error, data, isError, isLoading, isSuccess }] =
    useLoginUserMutation();

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      return;
    }
    return await loginUser({ email, password });
  };

  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem("refreshToken", data?.refreshToken);
      getCurrentUser();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (getUserSuccess) {
      navigate("/dashboard");
    }
  }, [getUserSuccess]);
  return (
    <form onSubmit={submitHandler}>
      <div className={classes.wrapper}>
        <h3 className="mt-5 mb-5">Sign in </h3>

        {isError && (
          <Errors
            errorMessage={
              error?.data?.error ||
              error?.data?.message ||
              "something went wrong"
            }
          />
        )}

        <div className={`form-group mb-3 ${classes.input_field}`}>
          <input
            className="form-control"
            type="email"
            placeholder="Email"
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

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

        <div className={classes.forget}>
          <label for="remember">
            <input type="checkbox" id="remember" />
            <p>Remember Me</p>
          </label>
          <Link to="/auth/reset-password">Forget Password?</Link>
        </div>

        <div className="form-group mb-3">
          <input
            className={`form-control btn btn-secondary ${classes.signup_btn}`}
            type="submit"
            value={isLoading ? "Please Wait..." : "Sign in"}
          />
        </div>

        <div className={classes.register}>
          <p>
            Don't have an account <Link to="/auth/signup">Sign up</Link>
          </p>
        </div>
      </div>
    </form>
  );
};

export default SigninForm;
