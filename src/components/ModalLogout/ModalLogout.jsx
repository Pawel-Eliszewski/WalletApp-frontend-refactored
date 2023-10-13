import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsModalLogoutOpen } from "../../redux/global/selectors";
import { setIsModalLogoutOpen } from "../../redux/global/globalSlice";
import { logout } from "../../redux/session/operations";
import { Button } from "../Button/Button";
import "./ModalLogout.scss";

export const ModalLogout = () => {
  const modalRef = useRef(null);
  const dispatch = useDispatch();

  const isModalLogoutOpen = useSelector(selectIsModalLogoutOpen);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(setIsModalLogoutOpen(false));
  };

  const handleModalClose = () => {
    dispatch(setIsModalLogoutOpen(false));
    document.body.style.overflow = "unset";
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        dispatch(setIsModalLogoutOpen(false));
        document.body.style.overflow = "unset";
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleBackdropClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      document.body.style.overflow = "unset";
      dispatch(setIsModalLogoutOpen(false));
    }
  };

  const backdropClass = isModalLogoutOpen ? "backdropIsOpen" : "backdrop";

  return (
    <div className={backdropClass} onClick={handleBackdropClick}>
      <div className="modal-logout" ref={modalRef}>
        <p className="modal-logout__confirmation">
          Are you sure you want to leave?
        </p>
        <div className="modal-logout__buttons-wrapper">
          <Button
            styles="--yes"
            title="Yes"
            onClick={handleLogout}
            type="button"
          />
          <Button
            styles="--no"
            title="No"
            onClick={handleModalClose}
            type="button"
          />
        </div>
      </div>
    </div>
  );
};
