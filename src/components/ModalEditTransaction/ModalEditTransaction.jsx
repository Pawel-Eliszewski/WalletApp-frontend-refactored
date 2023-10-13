import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectIsModalEditTransactionOpen } from "../../redux/global/selectors";
import { selectTransactions } from "../../redux/finance/selectors";
import { setIsModalEditTransactionOpen } from "../../redux/global/globalSlice";
import { selectTransactionId } from "../../redux/global/selectors";
import { updateTransaction } from "../../redux/finance/operations";
import { DropdownMenu } from "../DropdownMenu/DropdownMenu";
import { Calendar } from "../Calendar/Calendar";
import { Button } from "../Button/Button";
import { fakeTransaction } from "../../utils/fakeData";
import "./ModalEditTransaction.scss";

export const ModalEditTransaction = () => {
  const modalRef = useRef(null);
  const dispatch = useDispatch();

  const isModalEditTransactionOpen = useSelector(
    selectIsModalEditTransactionOpen
  );

  useEffect(() => {
    setUpdatedCategory(selectedOrFakeTransaction.category);
  }, [isModalEditTransactionOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        const amount = document.getElementById("amount");
        amount.value = null;
        const textarea = document.getElementById("textarea");
        textarea.value = "";
        document.body.style.overflow = "unset";
        dispatch(setIsModalEditTransactionOpen(false));
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const transactionId = useSelector(selectTransactionId);
  const allTransactions = useSelector(selectTransactions);

  const selectedTransaction = allTransactions.find(
    (transaction) => transaction._id === transactionId
  );

  const selectedOrFakeTransaction = selectedTransaction || fakeTransaction;

  const [updatedCategory, setUpdatedCategory] = useState(
    selectedOrFakeTransaction.category
  );

  const [updatedDate, setUpdatedDate] = useState(
    selectedOrFakeTransaction.date
  );

  const handleUpdatedCategory = (category) => {
    setUpdatedCategory(category);
  };

  const handleUpdatedDate = (newDate) => {
    setUpdatedDate(newDate.format("DD.MM.YYYY"));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedAmount = form.elements.amount.value;
    const cleanedAmount = updatedAmount.replace(/\s/g, "").replace(",", ".");
    const numberUpdatedAmount = parseFloat(cleanedAmount);

    const updatedComment = form.elements.comment.value;

    dispatch(
      updateTransaction({
        transactionId: selectedOrFakeTransaction._id,
        type: selectedOrFakeTransaction.type,
        category:
          selectedOrFakeTransaction.type === "income"
            ? "Income"
            : updatedCategory,
        amount: numberUpdatedAmount || selectedOrFakeTransaction.amount,
        date: updatedDate,
        comment: updatedComment || selectedOrFakeTransaction.comment,
        owner: selectedOrFakeTransaction.owner,
      })
    );

    setUpdatedCategory(selectedOrFakeTransaction.category);
    document.body.style.overflow = "unset";
    form.reset();
    dispatch(setIsModalEditTransactionOpen(false));
  };

  const handleModalClose = () => {
    const amount = document.getElementById("amount");
    amount.value = null;
    const textarea = document.getElementById("textarea");
    textarea.value = "";
    document.body.style.overflow = "unset";
    dispatch(setIsModalEditTransactionOpen(false));
  };

  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      const amount = document.getElementById("amount");
      amount.value = null;
      const textarea = document.getElementById("textarea");
      textarea.value = "";
      document.body.style.overflow = "unset";
      dispatch(setIsModalEditTransactionOpen(false));
    }
  };

  const incomeClass =
    selectedOrFakeTransaction.type === "income" ? "--income" : "";
  const expenseClass =
    selectedOrFakeTransaction.type === "expense" ? "--expense" : "";

  const backdropClass = isModalEditTransactionOpen
    ? "backdropEditIsOpen"
    : "backdropEdit";

  return (
    <div className={backdropClass} onClick={handleBackdropClick}>
      <div className="modal-edit" ref={modalRef}>
        <h2 className="modal-edit__title">Edit transaction</h2>
        <div className="modal-edit__type-wrapper">
          <span
            className={`modal-edit__type-span modal-edit__type-span${incomeClass}`}
          >
            Income
          </span>
          <span className="modal-edit__type-slash">/</span>
          <span
            className={`modal-edit__type-span modal-edit__type-span${expenseClass}`}
          >
            Expense
          </span>
        </div>
        <form id="form" className="modal-edit__form" onSubmit={handleSubmit}>
          {selectedOrFakeTransaction.type === "expense" ? (
            <DropdownMenu
              category={selectedOrFakeTransaction.category}
              onClick={handleUpdatedCategory}
            />
          ) : null}
          <div className="modal-edit__form-wrapper">
            <input
              id="amount"
              name="amount"
              type="text"
              pattern="[0-9]+([,\\.][0-9]+)?"
              onInput={(e) => {
                e.target.value = e.target.value.replace(/[^0-9,\\.]/g, "");
              }}
              className="modal-edit__form-amount"
              placeholder={selectedOrFakeTransaction.amount.toFixed(2) || ""}
            ></input>
            <Calendar
              transactionType={selectedOrFakeTransaction.type}
              editTransactionDate={selectedOrFakeTransaction.date}
              onChange={handleUpdatedDate}
            />
          </div>
          <textarea
            id="textarea"
            name="comment"
            className="modal-edit__form-comment"
            placeholder={selectedOrFakeTransaction.comment}
          ></textarea>
          <Button title="Save" styles="--submit" type="submit" />
        </form>
        <Button
          title="Cancel"
          styles="--cancel"
          onClick={handleModalClose}
          type="button"
        />
      </div>
    </div>
  );
};
