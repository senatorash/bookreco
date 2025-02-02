import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { GoogleLogin } from "@react-oauth/google";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  useLoginUserMutation,
  useLoginUserWithGoogleMutation,
} from "../../lib/apis/authApis";
import Errors from "../commons/Errors";
import classes from "./Auth.module.css";
import SuccessCard from "../commons/SuccessCard";

const SigninForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [loginUser, { error, data, isError, isLoading, isSuccess }] =
    useLoginUserMutation();

  const [
    loginUserWithGoogle,
    {
      isSuccess: getSuccess,
      isError: getIsError,
      data: getData,
      error: getError,
    },
  ] = useLoginUserWithGoogleMutation();

  const { user } = useSelector((state) => state.userState);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user]);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      return;
    }
    await loginUser({ email, password });
  };

  const googleResponse = async (response) => {
    await loginUserWithGoogle({ token: response.credential });
  };

  useEffect(() => {
    if (getError?.status === 400) {
      // navigate("/auth/verify");
    }
  }, [getError, navigate]);

  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem("refreshToken", data?.refreshToken);
    }
  }, [isSuccess, data]);

  // useEffect(() => {
  //   if (getUserSuccess && getData?.user) {
  //     navigate("/dashboard");
  //   }
  // }, [getUserSuccess, getData, navigate]);
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

        {getIsError && <Errors errorMessage={getError?.data?.error} />}

        {getData?.message && (
          <SuccessCard
            successMessage={`${getData?.message} A mail has been sent to ${getData?.user?.email}`}
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
          <label htmlFor="remember">
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

        <GoogleLogin onSuccess={googleResponse} />

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
