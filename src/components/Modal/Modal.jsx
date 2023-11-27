import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectContext, selectIsModalOpen } from "../../redux/global/selectors";
import { setContext, setIsModalOpen } from "../../redux/global/globalSlice";
import { logout } from "../../redux/session/operations";
import { TransactionForm } from "../Forms/TransactionForm/TransactionForm";
import { SearchForm } from "../Forms/SearchForm/SearchForm";
import { Button } from "../Button/Button";

export const Modal = () => {
  const dispatch = useDispatch();
  const modalRef = useRef(null);
  const context = useSelector(selectContext);
  const isModalOpen = useSelector(selectIsModalOpen);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        dispatch(setIsModalOpen(false));
        dispatch(setContext(null));
        document.body.classList.remove("modal-open");
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [dispatch]);

  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      dispatch(setIsModalOpen(false));
      dispatch(setContext(null));
      const modalChildren = modalRef.current.querySelectorAll("*");
      modalChildren.forEach((child) => {
        child.setAttribute("tabIndex", "-1");
      });
      document.body.classList.remove("modal-open");
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(setIsModalOpen(false));
    dispatch(setContext(null));
    document.body.classList.remove("modal-open");
  };

  const handleModalClose = () => {
    dispatch(setIsModalOpen(false));
    dispatch(setContext(null));
    const modalChildren = modalRef.current.querySelectorAll("*");
    modalChildren.forEach((child) => {
      child.setAttribute("tabIndex", "-1");
    });
    document.body.classList.remove("modal-open");
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
        <Button
          ariaLabel="cancel and close modal"
          styles="--close"
          type="button"
          onClick={handleModalClose}
        />
        <h2 className="modal__title">
          {context === "logout"
            ? "Log out?"
            : context === "add"
            ? "Add transaction"
            : context === "edit"
            ? "Edit transaction"
            : context === "search"
            ? "Search transactions"
            : ""}
        </h2>
        {context === "add" || context === "edit" ? (
          <>
            <TransactionForm onModalClose={handleModalClose} />
            <Button
              ariaLabel="cancel and close modal"
              title="Cancel"
              styles="--cancel"
              type="button"
              onClick={handleModalClose}
            />
          </>
        ) : null}
        {context === "search" ? (
          <>
            <SearchForm
              isModalOpen={isModalOpen}
              context={context}
              onModalClose={handleModalClose}
            />
            <Button
              ariaLabel="cancel and close modal"
              title="Cancel"
              styles="--cancel"
              type="button"
              onClick={handleModalClose}
            />
          </>
        ) : null}
        {context === "logout" && (
          <div className="modal__controls">
            <Button
              ariaLabel="submit logging out"
              title="Yes"
              styles="--yes"
              type="button"
              onClick={handleLogout}
            />
            <Button
              ariaLabel="cancel and close modal"
              title="No"
              styles="--no"
              type="button"
              onClick={handleModalClose}
            />
          </div>
        )}
      </div>
    </div>
  );
};
