import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { setIsModalLogoutOpen } from "../../redux/global/globalSlice";
import { selectUser } from "../../redux/session/selectors";
import { Logo } from "../Logo/Logo";
import "./Header.scss";

export const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleOpenModalLogout = () => {
    dispatch(setIsModalLogoutOpen(true));
    document.body.style.overflow = "hidden";
  };

  return (
    <div className="header">
      <Logo />
      <div className="header__nav">
        <p className="header__nav-user">{user.email}</p>
        <div className="header__nav-logout" onClick={handleOpenModalLogout}>
          <img className="header__nav-icon" src="/assets/icon-exit-doors.svg" />
          <p className="header__nav-text">Exit</p>
        </div>
      </div>
    </div>
  );
};
