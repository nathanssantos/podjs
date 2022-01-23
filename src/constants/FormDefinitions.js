import * as Yup from "yup";
import { REQUIRED_FIELD, INVALID_EMAIL, PASSWORD_MIN_LENGTH } from "./Messages";

const loginFormDefinitions = {
  schema: {
    email: Yup.string().email(INVALID_EMAIL).required(REQUIRED_FIELD),
    password: Yup.string().required(REQUIRED_FIELD).min(6, PASSWORD_MIN_LENGTH),
  },
  initialValues: {
    email: "",
    password: "",
  },
};

loginFormDefinitions.validationSchema = Yup.object().shape(
  loginFormDefinitions.schema
);

const searchBarFormDefinitions = {
  schema: {
    text: Yup.string().nullable(),
  },
  initialValues: {
    text: "",
  },
};

searchBarFormDefinitions.validationSchema = Yup.object().shape(
  searchBarFormDefinitions.schema
);

export { loginFormDefinitions, searchBarFormDefinitions };
