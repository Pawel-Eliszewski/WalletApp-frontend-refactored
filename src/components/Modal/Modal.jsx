import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import { TransactionForm } from "../Forms/TransactionForm/TransactionForm";
import { Button } from "../Button/Button";
import "./Modal.scss";
/**
 * @param {{ isModalOpen: boolean, context: 'add' | 'edit' | 'logout',
 * onModalClose: () => void }} props
 */
export const Modal = ({ isModalOpen, context, onModalClose }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        document.body.style.overflow = "unset";
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
      document.body.style.overflow = "unset";
      onModalClose();
    }
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
          {context === "add" ? "Add transaction" : "Edit transaction"}
        </h2>
        {context !== "logout" ? (
          <>
            <TransactionForm context={context} onModalClose={onModalClose} />
            <Button
              title="Cancel"
              styles="--cancel"
              type="button"
              onClick={onModalClose}
            />
          </>
        ) : null}
      </div>
    </div>
  );
};

Modal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  context: PropTypes.string.isRequired,
  onModalClose: PropTypes.func.isRequired,
};
