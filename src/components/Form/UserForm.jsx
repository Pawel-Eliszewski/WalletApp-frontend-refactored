import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Logo } from "../Logo/Logo";
import { Button } from "../Button/Button";
import "./UserForm.scss";
/**
 * @param {{ validation: { loginValidationSchema } | { registerValidationSchema },
 * onSubmit?: (ev?: import('react').MouseEvent) => void,
 * context: 'login' | 'register' }} props
 */
export const UserForm = ({ context, validation, onSubmit }) => {
  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
  };

  return (
    <div className="user-form__container">
      <Logo />
      <Formik
        initialValues={initialValues}
        validationSchema={validation}
        onSubmit={onSubmit}
      >
        {() => (
          <Form className="user-form__form">
            <div className="user-form__field">
              <img
                className="user-form__icon user-form__icon--email"
                src="/assets/icon-email.svg"
                alt="email icon"
              />
              <Field
                className="user-form__input"
                type="email"
                name="email"
                placeholder="E-mail"
                autoComplete="email"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="user-form__alert"
              />
            </div>
            <div className="user-form__field">
              <img
                className="user-form__icon"
                src="/assets/icon-lock.svg"
                alt="lock icon"
              />
              <Field
                className="user-form__input"
                type="password"
                name="password"
                placeholder="Password"
                autoComplete="new-password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="user-form__alert"
              />
            </div>
            {context === "register" ? (
              <>
                <div className="user-form__field">
                  <img
                    className="user-form__icon"
                    src="/assets/icon-lock.svg"
                    alt="lock icon"
                  />
                  <Field
                    className="user-form__input"
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    autoComplete="new-password"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="user-form__alert"
                  />
                </div>
                <div className="user-form__field">
                  <img
                    className="user-form__icon user-form__icon--person"
                    src="/assets/icon-person.svg"
                    alt="person icon"
                  />
                  <Field
                    className="user-form__input"
                    type="name"
                    name="firstName"
                    placeholder="First name"
                    autoComplete="name"
                  />
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="user-form__alert"
                  />
                </div>
              </>
            ) : null}
            <Button
              title={context === "login" ? "Log in" : "Register"}
              styles="--submit"
              type="submit"
            />
            <Link to={context === "login" ? "/register" : "/login"}>
              <Button
                title={context === "login" ? "Register" : "Log in"}
                styles="--cancel"
                type="button"
              />
            </Link>
          </Form>
        )}
      </Formik>
    </div>
  );
};

UserForm.propTypes = {
  validation: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  context: PropTypes.string.isRequired,
};
