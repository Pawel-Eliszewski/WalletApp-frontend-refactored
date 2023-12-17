import PropTypes from "prop-types";
import { useIntl, FormattedMessage } from "react-intl";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button } from "../../Button/Button";
import {
  loginValidationSchema,
  registerValidationSchema,
} from "../../../utils/yupValidationSchemas";
/**
 * @param {{ formType: 'login' | 'register', onSubmit: () => void,
 * onDemoLogin: () => void }} props
 */
export const AuthForm = ({ formType, onSubmit, onDemoLogin }) => {
  const intl = useIntl();
  const navigate = useNavigate();
  const btnRegisterRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (btnRegisterRef.current) {
      btnRegisterRef.current.blur();
    }
  }, [formType]);

  const placeholderPassword = intl.formatMessage({
    id: "placeholderPassword",
  });

  const placeholderConfirmPassword = intl.formatMessage({
    id: "placeholderConfirmPassword",
  });

  const placeholderName = intl.formatMessage({
    id: "placeholderName",
  });

  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClick = (formikBag) => {
    formikBag.resetForm();
    navigate(formType === "login" ? "/register" : "/login", { replace: true });
  };

  return (
    <div className="auth-form">
      <Formik
        initialValues={initialValues}
        validationSchema={
          formType === "login"
            ? loginValidationSchema
            : registerValidationSchema
        }
        onSubmit={onSubmit}
        enableReinitialize={true}
      >
        {(formikBag) => (
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
                autoFocus={false}
                className="auth-form__input"
                type="email"
                name="email"
                placeholder="E-mail"
                autoComplete="email"
              />
              <ErrorMessage
                name="email"
                component="span"
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
                autoFocus={false}
                className="auth-form__input"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder={placeholderPassword}
                autoComplete={
                  formType === "login" ? "current-password" : "new-password"
                }
              />
              {formikBag.values.password !== "" && (
                <span
                  className="auth-form__password-toggle"
                  onClick={toggleShowPassword}
                >
                  {showPassword ? "🔒" : "👁️"}
                </span>
              )}
              <ErrorMessage
                name="password"
                component="span"
                className="auth-form__alert"
              />
            </div>
            {formType === "register" ? (
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
                    autoFocus={false}
                    className="auth-form__input"
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder={placeholderConfirmPassword}
                    autoComplete="new-password"
                  />
                  {formikBag.values.confirmPassword !== "" && (
                    <span
                      className="auth-form__password-toggle"
                      onClick={toggleShowPassword}
                    >
                      {showPassword ? "🔒" : "👁️"}
                    </span>
                  )}
                  <ErrorMessage
                    name="confirmPassword"
                    component="span"
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
                    autoFocus={false}
                    className="auth-form__input"
                    type="name"
                    name="name"
                    placeholder={placeholderName}
                    autoComplete="off"
                  />
                  <ErrorMessage
                    name="name"
                    component="span"
                    className="auth-form__alert"
                  />
                </div>
              </>
            ) : null}
            <Button
              ariaLabel={
                formType === "login" ? "submit logging in" : "submit register"
              }
              title={
                formType === "login" ? (
                  <FormattedMessage id="titleLogin" />
                ) : (
                  <FormattedMessage id="titleRegister" />
                )
              }
              styles="--submit"
              type="submit"
            />
            <Button
              ariaLabel={
                formType === "login" ? "go to register" : "go to logging in"
              }
              title={
                formType === "login" ? (
                  <FormattedMessage id="titleRegister" />
                ) : (
                  <FormattedMessage id="titleLogin" />
                )
              }
              styles="--cancel"
              type="button"
              onClick={() => handleClick(formikBag)}
              ref={btnRegisterRef}
            />
            <Button
              ariaLabel="go to demo version"
              title="Demo"
              styles="--cancel"
              type="button"
              onClick={onDemoLogin}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

AuthForm.propTypes = {
  formType: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onDemoLogin: PropTypes.func.isRequired,
};
