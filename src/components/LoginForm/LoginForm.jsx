import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/session/operations";
import { Logo } from "../Logo/Logo";
import { Button } from "../Button/Button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { loginValidationSchema } from "../../utils/yupValidationSchema";
import "./LoginForm.scss";

export const LoginForm = () => {
  const dispatch = useDispatch();

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values) => {
    const formData = {
      email: values.email,
      password: values.password,
    };
    await dispatch(login(formData)).unwrap();
  };

  return (
    <div className="login-form">
      <Logo />
      <Formik
        initialValues={initialValues}
        validationSchema={loginValidationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className="login-form__form">
            <div className="login-form__form-box">
              <img
                className="login-form__form-icon"
                src="/assets/icon-email.svg"
                alt="email"
              />
              <Field
                className="login-form__form-input"
                type="email"
                name="email"
                placeholder="E-mail"
                autoComplete="email"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="login-form__form-error"
              />
            </div>
            <div className="login-form__form-box">
              <img
                className="login-form__form-icon"
                src="/assets/icon-lock.svg"
                alt="lock"
              />
              <Field
                className="login-form__form-input"
                type="password"
                name="password"
                placeholder="Password"
                autoComplete="current-password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="login-form__form-error"
              />
            </div>
            <Button title="Log in" styles="--submit" type="submit" />
            <Link to="/register">
              <Button title="Register" styles="--cancel" type="button" />
            </Link>
          </Form>
        )}
      </Formik>
    </div>
  );
};
