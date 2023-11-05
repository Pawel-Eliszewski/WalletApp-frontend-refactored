import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setIsLoading } from "../../redux/global/globalSlice";
import { login, register } from "../../redux/session/operations";
import { AuthForm } from "../../components/Forms/AuthForm/AuthForm";
/**
 * @param {{ context: 'login' | 'register' }} props
 */
const AuthPage = ({ context }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    dispatch(setIsLoading(true));
    try {
      const formData = {
        email: values.email,
        password: values.password,
      };
      await dispatch(login(formData)).unwrap();
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const handleRegister = async (values) => {
    dispatch(setIsLoading(true));
    try {
      const formData = {
        email: values.email,
        password: values.password,
        firstname: values.firstName,
      };
      await dispatch(register(formData)).unwrap();
      navigate("/login", { replace: "true" });
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-page__ellipse auth-page__ellipse--top"></div>
      <div className="auth-page__hero-container">
        <img
          className="auth-page__hero-img"
          src={
            context === "login"
              ? "/assets/image-hero-login.svg"
              : "/assets/image-hero-register.svg"
          }
          alt="Illustration of a login page"
        />
        <h3 className="auth-page__hero-title">Finance App</h3>
      </div>
      <div className="auth-page__form-container">
        <AuthForm
          context={context}
          onSubmit={context === "login" ? handleLogin : handleRegister}
        />
      </div>
      <div className="auth-page__ellipse auth-page__ellipse--bottom"></div>
    </div>
  );
};

AuthPage.propTypes = {
  context: PropTypes.string.isRequired,
};

export default AuthPage;
