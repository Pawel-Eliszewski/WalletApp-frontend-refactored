import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/session/selectors";
import {
  selectAppLanguage,
  selectColorScheme,
} from "../../redux/global/selectors";
import {
  setAppLanguage,
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

  const appLanguage = useSelector(selectAppLanguage);
  const colorScheme = useSelector(selectColorScheme);
  const user = useSelector(selectUser);

  const handleAppLanguageChange = () => {
    if (appLanguage === "pl") {
      localStorage.setItem("appLanguage", "en");
      dispatch(setAppLanguage("en"));
    } else {
      localStorage.setItem("appLanguage", "pl");
      dispatch(setAppLanguage("pl"));
    }
  };

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

  const openModalLogout = () => {
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
      <Switch
        context="appLanguage"
        checked={appLanguage === "pl"}
        onChange={handleAppLanguageChange}
      />
      <div className="header__nav">
        <p className="header__nav-user">{user.firstname}</p>
        <Button
          ariaLabel="exit and log out from application"
          title={window.innerWidth >= 768 ? "Exit" : ""}
          styles="--logout"
          type="button"
          onClick={openModalLogout}
        />
      </div>
    </div>
  );
};
