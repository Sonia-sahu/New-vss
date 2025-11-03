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
