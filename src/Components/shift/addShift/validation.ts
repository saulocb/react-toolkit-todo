import IAddShiftForm from "../../../features/shift/Interfaces/IAddShiftForm";

export const validate = (formValues: IAddShiftForm) => {
  const errors = {
    qdtBouncer: "",
    creationDate: "",
    pay: "",
    interval: "",
    userId: "",
  };

  if (!formValues.qdtBouncer) {
    errors.qdtBouncer = "You must say How many Bouncer ";
  }

  if (!formValues.interval) {
    errors.interval = "You must say How many hours";
  }

  if (!formValues.pay) {
    errors.pay = "You must enter with Payment p/hour";
  }

  return errors;
};
