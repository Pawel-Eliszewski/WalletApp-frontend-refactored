import { useEffect } from "react";
import { useMedia } from "react-use";
import { useSelector, useDispatch } from "react-redux";
import { selectContext, selectIsModalOpen } from "../../redux/global/selectors";
import { setContext, setIsModalOpen } from "../../redux/global/globalSlice";
import { logout } from "../../redux/session/operations";
import { motion, AnimatePresence } from "framer-motion";
import { Backdrop } from "./Backdrop/Backdrop";
import { TransactionForm } from "../Forms/TransactionForm/TransactionForm";
import { SearchForm } from "../Forms/SearchForm/SearchForm";
import { Button } from "../Button/Button";
import { dropIn, flip } from "../../utils/framerMotionStyles";

export const Modal = () => {
  const dispatch = useDispatch();
  const context = useSelector(selectContext);
  const isModalOpen = useSelector(selectIsModalOpen);
  const isMobile = useMedia("(max-width: 767px)");

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

  const handleModalClose = () => {
    dispatch(setIsModalOpen(false));
    dispatch(setContext(null));
    document.body.classList.remove("modal-open");
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(setIsModalOpen(false));
    dispatch(setContext(null));
    document.body.classList.remove("modal-open");
  };

  return (
    <AnimatePresence>
      {isModalOpen && (
        <Backdrop onClick={handleModalClose}>
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className="modal__container"
            variants={isMobile ? dropIn : flip}
            initial="hidden"
            animate="visible"
            exit="exit"
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
          </motion.div>
        </Backdrop>
      )}
    </AnimatePresence>
  );
};
