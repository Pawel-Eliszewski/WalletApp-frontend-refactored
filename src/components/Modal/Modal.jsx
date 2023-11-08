import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/session/operations";
import { TransactionForm } from "../Forms/TransactionForm/TransactionForm";
import { Button } from "../Button/Button";
/**
 * @param {{ isModalOpen: boolean, context?: 'add' | 'edit' | 'logout',
 * onModalClose: () => void }} props
 */
export const Modal = ({ isModalOpen, context, onModalClose }) => {
  const dispatch = useDispatch();
  const modalRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onModalClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onModalClose]);

  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onModalClose();
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    onModalClose();
  };

  return (
    <div
      className={`modal__backdrop ${
        isModalOpen ? "modal__backdrop--visible" : ""
      }`}
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className={`modal__container ${
          isModalOpen ? "modal__container--visible" : ""
        }`}
      >
        <Button styles="--close" type="button" onClick={onModalClose} />
        <h2 className="modal__title">
          {context === "logout"
            ? "Log out?"
            : context === "add"
            ? "Add transaction"
            : "Edit transaction"}
        </h2>
        {context === "add" || context === "edit" ? (
          <>
            <TransactionForm
              isModalOpen={isModalOpen}
              context={context}
              onModalClose={onModalClose}
            />
            <Button
              title="Cancel"
              styles="--cancel"
              type="button"
              onClick={onModalClose}
            />
          </>
        ) : null}
        {context === "logout" && (
          <div className="modal__controls">
            <Button
              title="Yes"
              styles="--yes"
              type="button"
              onClick={handleLogout}
            />
            <Button
              title="No"
              styles="--no"
              type="button"
              onClick={onModalClose}
            />
          </div>
        )}
      </div>
    </div>
  );
};

Modal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  context: PropTypes.string,
  onModalClose: PropTypes.func.isRequired,
};
