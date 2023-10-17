import { useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { selectUser } from "../../redux/session/selectors";
import { Logo } from "../Logo/Logo";
import { Modal } from "../Modal/Modal";
import "./Header.scss";

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
        <div className="header__nav-logout" onClick={handleLogout}>
          <img className="header__nav-icon" src="/assets/icon-exit-doors.svg" />
          <p className="header__nav-text">Exit</p>
        </div>
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
