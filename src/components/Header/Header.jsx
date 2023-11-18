import { useState, useEffect } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { selectUser } from "../../redux/session/selectors";
import { Logo } from "../Logo/Logo";
import { Switch } from "../Switch/Switch";
import { Button } from "../Button/Button";
import { Modal } from "../Modal/Modal";
import { configureNotiflixStyles } from "../../utils/notiflixStyles";

export const Header = () => {
  const user = useSelector(selectUser);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    } else {
      body.setAttribute("data-color-scheme", "dark");
      localStorage.setItem("colorScheme", "dark");
      setColorScheme("dark");
    }
    configureNotiflixStyles(colorScheme);
  };

  const handleLogout = () => {
    setIsModalOpen(true);
    document.body.classList.add("modal-open");
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    document.body.classList.remove("modal-open");
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
          ariaLabel="Exit"
          title={window.innerWidth >= 768 ? "Exit" : ""}
          styles="--logout"
          type="button"
          onClick={handleLogout}
        />
        {isModalOpen && (
          <Modal
            isModalOpen={isModalOpen}
            onModalClose={handleModalClose}
            context="logout"
          />
        )}
      </div>
    </div>
  );
};
