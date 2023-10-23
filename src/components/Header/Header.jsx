import { useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { selectUser } from "../../redux/session/selectors";
import { Logo } from "../Logo/Logo";
import { Button } from "../Button/Button";
import { Modal } from "../Modal/Modal";

export const Header = () => {
  const user = useSelector(selectUser);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "unset";
  };

  return (
    <div className="header">
      <Logo />
      <div className="header__nav">
        <p className="header__nav-user">{user.email}</p>
        <Button
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
