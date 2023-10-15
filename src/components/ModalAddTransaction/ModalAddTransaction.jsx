import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/session/selectors";
import { selectIsModalAddTransactionOpen } from "../../redux/global/selectors";
import { setIsModalAddTransactionOpen } from "../../redux/global/globalSlice";
import { addTransaction } from "../../redux/finance/operations";
import { Calendar } from "../Calendar/Calendar";
import { CustomizedMuiSwitch } from "./CustomizedMuiSwitch/CustomizedMuiSwitch";
import { DropdownMenu } from "../DropdownMenu/DropdownMenu";
import { Button } from "../Button/Button";
import { Notify } from "notiflix";
import "./ModalAddTransaction.scss";

export const ModalAddTransaction = () => {
  const modalRef = useRef(null);
  const dispatch = useDispatch();

  const isModalAddTransactionOpen = useSelector(
    selectIsModalAddTransactionOpen
  );

  useEffect(() => {
    const form = document.getElementById("form");
    form.reset();
    setTransactionType("expense");
    setTransactionCategory("Select a category");
    setAddTransactionDate(formattedTodayDate);
  }, [isModalAddTransactionOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        const form = document.getElementById("form");
        form.reset();
        document.body.style.overflow = "unset";
        setTransactionType("expense");
        setTransactionCategory("Select a category");
        setAddTransactionDate(formattedTodayDate);
        dispatch(setIsModalAddTransactionOpen(false));
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const user = useSelector(selectUser);

  const today = new Date();
  const dateOptions = { year: "numeric", month: "2-digit", day: "2-digit" };
  const formattedTodayDate = today.toLocaleDateString("pl-PL", dateOptions);
  const [addTransactionDate, setAddTransactionDate] =
    useState(formattedTodayDate);

  const [transactionType, setTransactionType] = useState("expense");
  const [transactionCategory, setTransactionCategory] =
    useState("Select a category");

  const handleNewDate = (newDate) => {
    setAddTransactionDate(newDate.format("DD.MM.YYYY"));
  };

  const handleTransactionTypeChange = () => {
    transactionType === "expense"
      ? setTransactionType("income")
      : [
          setTransactionType("expense"),
          setTransactionCategory("Select a category"),
        ];
  };

  const handleTransactionCategoryChange = (category) => {
    setTransactionCategory(category);
  };

  const [text, setText] = useState("");
  const maxLength = 30;

  const handleTextareaChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length <= maxLength) {
      setText(inputValue);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const amount = form.elements.amount.value;
    const cleanedAmount = amount.replace(/\s/g, "").replace(",", ".");
    const numberAmount = parseFloat(cleanedAmount);
    const comment = form.elements.comment.value;

    if (
      transactionType === "expense" &&
      transactionCategory === "Select a category"
    ) {
      Notify.info("Please select a category.");
      return;
    } else if (amount === "" || undefined) {
      Notify.info("Please provide the correct amount.");
      return;
    }

    dispatch(
      addTransaction({
        type: transactionType,
        category: transactionType === "income" ? "Income" : transactionCategory,
        amount: numberAmount,
        date: addTransactionDate,
        comment: comment,
        owner: user.id,
      })
    );

    document.body.style.overflow = "unset";
    form.reset();
    setTransactionType("expense");
    setTransactionCategory("Select a category");
    dispatch(setIsModalAddTransactionOpen(false));
  };

  const handleModalClose = () => {
    document.body.style.overflow = "unset";
    const form = document.getElementById("form");
    form.reset();
    setTransactionType("expense");
    setTransactionCategory("Select a category");
    setAddTransactionDate(formattedTodayDate);
    dispatch(setIsModalAddTransactionOpen(false));
  };

  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      const form = document.getElementById("form");
      form.reset();
      document.body.style.overflow = "unset";
      setTransactionType("expense");
      setTransactionCategory("Select a category");
      setAddTransactionDate(formattedTodayDate);
      dispatch(setIsModalAddTransactionOpen(false));
    }
  };

  const incomeClass = transactionType === "income" ? "--income" : "";
  const expenseClass = transactionType === "expense" ? "--expense" : "";

  const backdropClass = isModalAddTransactionOpen
    ? "backdropIsOpen"
    : "backdrop";

  return (
    <div className={backdropClass} onClick={handleBackdropClick}>
      <div className="modal-add" ref={modalRef}>
        <h2 className="modal-add__title">Add transaction</h2>
        <div className="modal-add__switch-wrapper">
          <span
            className={`modal-add__switch-span modal-add__switch-span${incomeClass}`}
          >
            Income
          </span>
          <CustomizedMuiSwitch
            onChange={handleTransactionTypeChange}
            transactionType={transactionType}
          />
          <span
            className={`modal-add__switch-span modal-add__switch-span${expenseClass}`}
          >
            Expense
          </span>
        </div>
        <form id="form" className="modal-add__form" onSubmit={handleSubmit}>
          {transactionType === "expense" ? (
            <DropdownMenu
              category={transactionCategory}
              onClick={handleTransactionCategoryChange}
            />
          ) : null}
          <div className="modal-add__form-wrapper">
            <input
              name="amount"
              type="text"
              pattern="[0-9]+([,\\.][0-9]+)?"
              onInput={(e) => {
                e.target.value = e.target.value.replace(/[^0-9,\\.]/g, "");
              }}
              className="modal-add__form-amount"
              placeholder="0.00"
            ></input>
            <Calendar
              transactionType={transactionType}
              addTransactionDate={addTransactionDate}
              onChange={handleNewDate}
            />
          </div>
          <textarea
            name="comment"
            className="modal-add__form-comment"
            placeholder="Comment"
            value={text}
            onChange={handleTextareaChange}
            maxLength={maxLength}
          ></textarea>
          <span className="modal-add__form-info">
            Characters remaining: {maxLength - text.length}.
          </span>
          <Button title="Add" styles="--submit" type="submit" />
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
