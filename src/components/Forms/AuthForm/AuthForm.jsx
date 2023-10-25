import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Logo } from "../../Logo/Logo";
import { Button } from "../../Button/Button";
import {
  loginValidationSchema,
  registerValidationSchema,
} from "../../../utils/yupValidationSchemas";
/**
 * @param {{ context: 'login' | 'register', onSubmit: () => void }} props
 */
export const AuthForm = ({ context, onSubmit }) => {
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
  };

  const handleClick = () => {
    navigate(context === "login" ? "/register" : "/login", { replace: true });
  };

  return (
    <div className="auth-form">
      <Logo />
      <Formik
        initialValues={initialValues}
        validationSchema={
          context === "login" ? loginValidationSchema : registerValidationSchema
        }
        onSubmit={onSubmit}
      >
        {() => (
          <Form className="auth-form__wrapper">
            <div className="auth-form__field">
              <img
                className="auth-form__icon auth-form__icon--email"
                src="/assets/icon-email.svg"
                alt="email icon"
                width="21"
                height="16"
              />
              <Field
                className="auth-form__input"
                type="email"
                name="email"
                placeholder="E-mail"
                autoComplete="email"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="auth-form__alert"
              />
            </div>
            <div className="auth-form__field">
              <img
                className="auth-form__icon"
                src="/assets/icon-lock.svg"
                alt="lock icon"
                width="17"
                height="21"
              />
              <Field
                className="auth-form__input"
                type="password"
                name="password"
                placeholder="Password"
                autoComplete="new-password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="auth-form__alert"
              />
            </div>
            {context === "register" ? (
              <>
                <div className="auth-form__field">
                  <img
                    className="auth-form__icon"
                    src="/assets/icon-lock.svg"
                    alt="lock icon"
                    width="17"
                    height="21"
                  />
                  <Field
                    className="auth-form__input"
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    autoComplete="new-password"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="auth-form__alert"
                  />
                </div>
                <div className="auth-form__field">
                  <img
                    className="auth-form__icon auth-form__icon--person"
                    src="/assets/icon-person.svg"
                    alt="person icon"
                    width="19"
                    height="18"
                  />
                  <Field
                    className="auth-form__input"
                    type="name"
                    name="firstName"
                    placeholder="First name"
                    autoComplete="name"
                  />
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="auth-form__alert"
                  />
                </div>
              </>
            ) : null}
            <Button
              title={context === "login" ? "Log in" : "Register"}
              styles="--submit"
              type="submit"
            />
            <Button
              title={context === "login" ? "Register" : "Log in"}
              styles="--cancel"
              type="button"
              onClick={handleClick}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

AuthForm.propTypes = {
  context: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
