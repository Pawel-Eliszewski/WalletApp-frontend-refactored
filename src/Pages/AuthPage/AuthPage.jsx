import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, register } from "../../redux/session/operations";
import { AuthForm } from "../../components/Forms/AuthForm/AuthForm";
import { PageBackground } from "../../components/PageBackground/PageBackground";
import { Header } from "../../components/Header/Header";
/**
 * @param {{ formType: 'login' | 'register' }} props
 */
const AuthPage = ({ formType }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    const formData = {
      email: values.email.trim(),
      password: values.password,
    };
    await dispatch(login(formData)).unwrap();
  };

  const handleRegister = async (values) => {
    const formData = {
      email: values.email.trim(),
      password: values.password,
      firstname: values.name.trim(),
    };
    await dispatch(register(formData)).unwrap();
    navigate("/login", { replace: "true" });
  };

  return (
    <>
      <PageBackground />
      <Header />
      <div className="auth-page">
        <div className="auth-page__hero-container">
          <img
            className="auth-page__hero-img"
            src={
              formType === "login"
                ? "/assets/image-hero-login.svg"
                : "/assets/image-hero-register.svg"
            }
            alt="Illustration of a login page"
          />
          <h3 className="auth-page__hero-title">Finance App</h3>
        </div>
        <div className="auth-page__form-container">
          <AuthForm
            formType={formType}
            onSubmit={formType === "login" ? handleLogin : handleRegister}
          />
        </div>
      </div>
    </>
  );
};

AuthPage.propTypes = {
  formType: PropTypes.string.isRequired,
};

export default AuthPage;
