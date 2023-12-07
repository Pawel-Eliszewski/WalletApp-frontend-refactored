import { useEffect } from "react";
import { useMedia } from "react-use";
import { FormattedMessage } from "react-intl";
import { useSelector, useDispatch } from "react-redux";
import { selectContext, selectIsModalOpen } from "../../redux/global/selectors";
import { setContext, setIsModalOpen } from "../../redux/global/globalSlice";
import { logout } from "../../redux/session/operations";
import { setTransactionId } from "../../redux/finance/financeSlice";
import { deleteTransaction } from "../../redux/finance/operations";
import { motion, AnimatePresence } from "framer-motion";
import { Backdrop } from "./Backdrop/Backdrop";
import { Button } from "../Button/Button";
import { TransactionForm } from "../Forms/TransactionForm/TransactionForm";
import { SearchForm } from "../Forms/SearchForm/SearchForm";
import { Overlay } from "../Overlay/Overlay";
import {
  dropIn,
  flip,
  setOverlayVisible,
  setOverlayNotVisible,
} from "../../utils/backdropAndAnimationsStyles";
import { Loading } from "notiflix";
import { selectTransactionId } from "../../redux/finance/selectors";

export const Modal = () => {
  const dispatch = useDispatch();
  const context = useSelector(selectContext);
  const isModalOpen = useSelector(selectIsModalOpen);
  const transactionId = useSelector(selectTransactionId);
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
    dispatch(setTransactionId(null));
    document.body.classList.remove("modal-open");
  };

  const handleLogout = () => {
    dispatch(logout());
    handleModalClose();
  };

  const handleDeleteTransaction = () => {
    try {
      Loading.hourglass();
      dispatch(deleteTransaction(transactionId));
      handleModalClose();
      Loading.remove(600);
    } catch (error) {
      handleModalClose();
      Loading.remove(600);
      console.error(error);
    }
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
            <Overlay />
            <h2 className="modal__title">
              {context === "logout" ? (
                <FormattedMessage id="titleLogOut" />
              ) : context === "add" ? (
                <FormattedMessage id="titleAddTransaction" />
              ) : context === "edit" ? (
                <FormattedMessage id="titleEditTransaction" />
              ) : context === "search" ? (
                <FormattedMessage id="titleSearchTransactions" />
              ) : context === "delete" ? (
                <FormattedMessage id="titleDeleteTransaction" />
              ) : (
                ""
              )}
            </h2>
            {context === "add" || context === "edit" ? (
              <>
                <TransactionForm
                  onMenuOpen={setOverlayVisible}
                  onMenuClose={setOverlayNotVisible}
                  onModalClose={handleModalClose}
                />
                <Button
                  ariaLabel="cancel and close modal"
                  title={<FormattedMessage id="titleCancel" />}
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
                  onMenuOpen={setOverlayVisible}
                  onMenuClose={setOverlayNotVisible}
                  onModalClose={handleModalClose}
                />
                <Button
                  ariaLabel="cancel and close modal"
                  title={<FormattedMessage id="titleCancel" />}
                  styles="--cancel"
                  type="button"
                  onClick={handleModalClose}
                />
              </>
            ) : null}
            {context === "logout" || context === "delete" ? (
              <div className="modal__controls">
                <Button
                  ariaLabel={
                    context === "logout"
                      ? "submit logging out"
                      : "submit transaction delete"
                  }
                  title={<FormattedMessage id="titleYes" />}
                  styles="--yes"
                  type="button"
                  onClick={
                    context === "logout"
                      ? handleLogout
                      : handleDeleteTransaction
                  }
                />
                <Button
                  ariaLabel="cancel and close modal"
                  title={<FormattedMessage id="titleNo" />}
                  styles="--no"
                  type="button"
                  onClick={handleModalClose}
                />
              </div>
            ) : null}
          </motion.div>
        </Backdrop>
      )}
    </AnimatePresence>
  );
};
