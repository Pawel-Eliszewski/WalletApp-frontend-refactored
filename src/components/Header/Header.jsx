import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/session/selectors";
import { selectColorScheme } from "../../redux/global/selectors";
import {
  setColorScheme,
  setIsModalOpen,
  setContext,
} from "../../redux/global/globalSlice";
import { Logo } from "../Logo/Logo";
import { Switch } from "../Switch/Switch";
import { Button } from "../Button/Button";
import { configureNotiflixStyles } from "../../utils/notiflixStyles";

export const Header = () => {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const colorScheme = useSelector(selectColorScheme);

  const handleColorSchemeChange = () => {
    if (colorScheme === "dark") {
      document.body.setAttribute("data-color-scheme", "light");
      localStorage.setItem("colorScheme", "light");
      dispatch(setColorScheme("light"));
      configureNotiflixStyles("light");
    } else {
      document.body.setAttribute("data-color-scheme", "dark");
      localStorage.setItem("colorScheme", "dark");
      dispatch(setColorScheme("dark"));
      configureNotiflixStyles("dark");
    }
  };

  const handleLogout = () => {
    dispatch(setContext("logout"));
    dispatch(setIsModalOpen(true));
    document.body.classList.add("modal-open");
  };

  return (
    <div className="header">
      <Logo />
      <Switch
        context="colorScheme"
        checked={colorScheme === "light"}
        onChange={handleColorSchemeChange}
      />
      <div className="header__nav">
        <p className="header__nav-user">{user.firstname}</p>
        <Button
          ariaLabel="exit and log out from application"
          title={window.innerWidth >= 768 ? "Exit" : ""}
          styles="--logout"
          type="button"
          onClick={handleLogout}
        />
      </div>
    </div>
  );
};
