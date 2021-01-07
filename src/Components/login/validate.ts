export const validate = (formValues) => {
  const errors = { email: "", password: "" };

  if (!formValues.email) {
    errors.email = "You must enter a email";
  }

  if (!formValues.password) {
    errors.password = "You must enter a password";
  }

  return errors;
};
