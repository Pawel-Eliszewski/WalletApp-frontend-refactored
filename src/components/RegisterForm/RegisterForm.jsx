import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "../../redux/session/operations";
import { Logo } from "../Logo/Logo";
import { Button } from "../Button/Button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { registerValidationSchema } from "../../utils/yupValidationSchema";
import "./RegisterForm.scss";

export const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = async (values) => {
    const formData = {
      email: values.email,
      password: values.password,
    };
    try {
      await dispatch(register(formData)).unwrap();
      navigate("login", { replace: "true" });
    } catch (error) {
      console.error("Registration failure", error);
    }
  };

  return (
    <div className="register-form">
      <Logo />
      <Formik
        initialValues={initialValues}
        validationSchema={registerValidationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className="register-form__form">
            <div className="register-form__form-box">
              <img
                className="register-form__form-icon"
                src="/assets/icon-email.svg"
                alt="email icon"
              />
              <Field
                className="register-form__form-input"
                type="email"
                name="email"
                placeholder="E-mail"
                autoComplete="email"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="register-form__form-error"
              />
            </div>
            <div className="register-form__form-box">
              <img
                className="register-form__form-icon"
                src="/assets/icon-lock.svg"
                alt="lock icon"
              />
              <Field
                className="register-form__form-input"
                type="password"
                name="password"
                placeholder="Password"
                autoComplete="new-password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="register-form__form-error"
              />
            </div>
            <div className="register-form__form-box">
              <img
                className="register-form__form-icon"
                src="/assets/icon-lock.svg"
                alt="lock"
              />
              <Field
                className="register-form__form-input"
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                autoComplete="new-password"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="register-form__form-error"
              />
            </div>
            <div className="register-form__form-box">
              <img
                className="register-form__form-icon"
                src="/assets/icon-person.svg"
                alt="lock"
              />
              <Field
                className="register-form__form-input"
                type="name"
                name="first name"
                placeholder="First name"
                autoComplete="name"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="register-form__form-error"
              />
            </div>
            <Button
              title="Register"
              styles="--submit"
              onClick={handleSubmit}
              type="submit"
            />
            <Link to="/login">
              <Button title="Log in" styles="--cancel" type="button" />
            </Link>
          </Form>
        )}
      </Formik>
    </div>
  );
};
