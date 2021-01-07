export const validate = (formValues) => {
  const errors = { email: "", password: "", username: "", phone: "" };

  if (!formValues.email) {
    errors.email = "You must enter a email";
  }

  var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
  if (!pattern.test(formValues.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (!formValues.password) {
    errors.password = "You must enter a password";
  }

  if (!formValues.username) {
    errors.username = "You must enter a Name";
  }

  return errors;
};
