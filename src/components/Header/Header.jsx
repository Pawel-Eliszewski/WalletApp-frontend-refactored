import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/session/selectors";
import { setIsModalOpen, setContext } from "../../redux/global/globalSlice";
import { Logo } from "../Logo/Logo";
import { Switch } from "../Switch/Switch";
import { Button } from "../Button/Button";
import { configureNotiflixStyles } from "../../utils/notiflixStyles";

export const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [colorScheme, setColorScheme] = useState("light");

  useEffect(() => {
    const storedColorScheme = localStorage.getItem("colorScheme");
    if (storedColorScheme) {
      setColorScheme(storedColorScheme);
    }
  }, []);

  const handleChange = () => {
    const body = document.body;
    const currentColorScheme = body.getAttribute("data-color-scheme");

    if (currentColorScheme === "dark") {
      body.setAttribute("data-color-scheme", "light");
      localStorage.setItem("colorScheme", "light");
      setColorScheme("light");
      configureNotiflixStyles("light");
    } else {
      body.setAttribute("data-color-scheme", "dark");
      localStorage.setItem("colorScheme", "dark");
      setColorScheme("dark");
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
        onChange={handleChange}
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
