import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCreateNewUserMutation } from "../../lib/apis/userApis";
import { months, years, days } from "../../helpers/date";
import Errors from "../commons/Errors";
import classes from "./Auth.module.css";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SignupForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState({ day: "", month: "", year: "" });
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const navigate = useNavigate();
  const [createNewUser, { isError, error, data, isLoading, isSuccess }] =
    useCreateNewUserMutation();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleDobChange = (event) => {
    const { name, value } = event.target;
    setDob((prevDob) => ({ ...prevDob, [name]: value }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    if (
      !firstName ||
      !lastName ||
      !email ||
      !dob.day ||
      !dob.month ||
      !dob.year ||
      !password ||
      !confirmPassword
    ) {
      return;
    }

    const monthIndex = months.indexOf(dob.month) + 1;
    const dobString = `${dob.year}-${monthIndex
      .toString()
      .padStart(2, "0")}-${dob.day.toString().padStart(2, "0")}`;

    return await createNewUser({
      firstName,
      lastName,
      email,
      dob: dobString,
      password,
      confirmPassword,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/auth/verify");
    }
  }, [isSuccess]);

  return (
    <form onSubmit={submitHandler}>
      <div className={classes.wrapper}>
        <h3 className="mb-3 mt-5">Sign Up</h3>

        {isError && (
          <Errors
            errorMessage={
              error?.data?.errors ||
              error?.data?.message ||
              "something went wrong"
            }
          />
        )}

        <div className={`form-group mb-3 ${classes.input_field}`}>
          <input
            className="form-control"
            type="text"
            placeholder="First Name"
            onChange={(event) => setFirstName(event.target.value)}
          />
        </div>

        <div className={`form-group mb-3 ${classes.input_field}`}>
          <input
            className="form-control"
            type="text"
            placeholder="Last Name"
            onChange={(event) => setLastName(event.target.value)}
          />
        </div>

        <div className={`form-group mb-3 ${classes.input_field}`}>
          <input
            className="form-control"
            type="text"
            placeholder="Email"
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div className={`form-group mb-3 `}>
          <label className="mb-3">Date Of Birth</label>
          <div style={{ display: "flex", gap: "10px" }}>
            <select
              className="form-control"
              name="year"
              value={dob.year}
              onChange={handleDobChange}
            >
              <option value="">Year</option>
              {years.map((y, index) => (
                <option key={index} value={y}>
                  {y}
                </option>
              ))}
            </select>

            <select
              className="form-control"
              name="month"
              value={dob.month}
              onChange={handleDobChange}
            >
              <option value="">Month</option>
              {months.map((m, index) => (
                <option key={index} value={m}>
                  {m}
                </option>
              ))}
            </select>

            <select
              className="form-control"
              name="day"
              value={dob.day}
              onChange={handleDobChange}
            >
              <option value="">Day</option>
              {days.map((d, index) => (
                <option key={index} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
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

        <div className="form-group mb-3">
          <input
            className={`form-control btn btn-secondary ${classes.signup_btn}`}
            type="submit"
            value={isLoading ? "Please wait..." : "Sign Up"}
          />
        </div>

        <div className={classes.register}>
          <p>
            Already have an account?<Link to="/auth/signin">Sign in</Link>
          </p>
          <p></p>
        </div>
      </div>
    </form>
  );
};

export default SignupForm;
