// src/utils/validation.js
export function validateForm(fields, requiredKeys = []) {
  const errors = {};

  requiredKeys.forEach((key) => {
    if (!fields[key] || fields[key].toString().trim() === "") {
      errors[key] = `${key} is required`;
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export const validateRegistrationForm = (form) => {
  const errors = {};

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!form.username.trim()) {
    errors.username = "Username is required";
  }

  if (!emailRegex.test(form.email)) {
    errors.email = "Invalid email format";
  }

  if (!passwordRegex.test(form.password)) {
    errors.password =
      "Password must be at least 8 characters, include uppercase, lowercase, number, and special character";
  }

  return errors;
};
