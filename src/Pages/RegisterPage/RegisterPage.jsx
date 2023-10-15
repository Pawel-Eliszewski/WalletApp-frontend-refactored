import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "../../redux/session/operations";
import { AuthForm } from "../../components/Forms/AuthForm/AuthForm";
import { registerValidationSchema } from "../../utils/yupValidationSchema";
import styles from "./RegisterPage.module.css";

export default function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    const formData = {
      email: values.email,
      password: values.password,
    };
    await dispatch(register(formData)).unwrap();
    navigate("login", { replace: "true" });
  };

  return (
    <div className={styles.register__container}>
      <div className={styles.register__tablet}>
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
      <div className={styles.register__desktop}>
        <AuthForm
          context="register"
          validation={registerValidationSchema}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
