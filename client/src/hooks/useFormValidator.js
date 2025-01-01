import { useEffect, useState } from "react";

const useFormValidator = (
  firstName,
  lastName,
  email,
  password,
  confirmPassword
) => {
  const [formIsValid, setFormIsValid] = useState(false);
  const [formError, setFormError] = useState("");

  const checkValidity = () => {
    const errors = [];

    if (firstName.trim()) {
      errors.push("First name is required");
    }
    if (lastName.trim()) {
      errors.push("Last name is required");
    }
    if (email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      errors.push("Email is required");
    }
    // if (dob.day || dob.month || dob.year) {
    //   errors.push("Complete date of birth is required.");
    // }
    if (password.trim()) {
      errors.push("Password cannot be empty or just spaces");
    }

    if (password.length < 8) {
      errors.push("Password must be at least 8 characters long");
    }

    if (!/[A-Z]/.test(password)) {
      errors.push("Password must contain at least one uppercase letter");
    }

    if (!/[a-z]/.test(password)) {
      errors.push("Password must contain at least one lowercase letter");
    }

    if (!/[0-9]/.test(password)) {
      errors.push("Password must contain at least one number");
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push("Password must contain at least one special character");
    }

    if (confirmPassword.trim()) {
      errors.push("Confirm password is required");
    }

    if (confirmPassword !== password) {
      errors.push("Passwords do not match");
    }
    setFormError(errors.join(", "));
    setFormIsValid(errors.length === 0);
  };

  useEffect(() => {
    checkValidity();
  }, [firstName, lastName, email, password, confirmPassword]);

  return { formIsValid, formError };
};

export default useFormValidator;
