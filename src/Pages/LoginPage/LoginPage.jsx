import { useDispatch } from "react-redux";
import { login } from "../../redux/session/operations";
import { AuthForm } from "../../components/Forms/AuthForm/AuthForm";
import { loginValidationSchema } from "../../utils/yupValidationSchema";
import styles from "./LoginPage.module.css";

export default function LoginPage() {
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    const formData = {
      email: values.email,
      password: values.password,
    };
    await dispatch(login(formData)).unwrap();
  };

  return (
    <div className={styles.login__container}>
      <div className={styles.login__tablet}>
        {window.innerWidth > 1200 ? (
          <img src="/assets/desktop-frame.svg" alt="framedesktop" />
        ) : (
          <img src="/assets/tablet-frame.svg" alt="frametablet" />
        )}

        <h3 className={styles.finance}>Finance App</h3>
        <div className={styles.firstelipse}></div>
        <div className={styles.secondelipse}>
          <img src="/assets/ellipse.svg" alt="ellipse" />
        </div>
      </div>
      <div className={styles.login__desktop}>
        <AuthForm
          context="login"
          validation={loginValidationSchema}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
