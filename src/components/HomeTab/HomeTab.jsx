import { useEffect, useState } from "react";
import { useMedia } from "react-use";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import {
  setIsModalAddTransactionOpen,
  setIsModalEditTransactionOpen,
  setTransactionId,
} from "../../redux/global/globalSlice";
import {
  fetchTransactions,
  deleteTransaction,
} from "../../redux/finance/operations";
import { selectUser } from "../../redux/session/selectors";
import { Pagination } from "../Pagination/Pagination";
import { Button } from "../Button/Button";
import { Balance } from "../Balance/Balance";
import { paginateTransactions } from "../../utils/pagination";
import { nanoid } from "nanoid";
import "./HomeTab.scss";

export const HomeTab = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const [itemOffset, setItemOffset] = useState(0);
  const isMobile = useMedia("(max-width: 767px)");

  let paginationData = paginateTransactions(itemOffset);
  let transactions = paginationData.paginatedTransactions;
  let pageCount = paginationData.pages;

  useEffect(() => {
    dispatch(fetchTransactions(user.id));
  }, [dispatch, user.id]);

  const handleItemOffset = (event) => {
    setItemOffset(event);
  };

  function formatDate(inputDate) {
    const parts = inputDate.split(".");
    if (parts.length !== 3) {
      return "Invalid Date";
    }
    const day = parts[0].toString().padStart(2, "0");
    const month = parts[1].toString().padStart(2, "0");
    const year = parts[2].toString().slice(2);

    return `${day}.${month}.${year}`;
  }

  const openModalAddTransaction = () => {
    dispatch(setIsModalAddTransactionOpen(true));
    document.body.style.overflow = "hidden";
  };

  const openModalEditTransaction = (_id) => {
    dispatch(setTransactionId(_id));
    dispatch(setIsModalEditTransactionOpen(true));
    document.body.style.overflow = "hidden";
  };

  const handleDelete = (transactionId) => {
    dispatch(deleteTransaction(transactionId));
  };

  return (
    <div className="home__container">
      {isMobile && <Balance />}
      {isMobile && (
        <div className="home__mobile-table mobile-table">
          {transactions.map(
            ({ _id, date, type, category, comment, amount }) => (
              <ul
                key={nanoid()}
                className="mobile-table__list"
                data-type={type}
              >
                <li className="mobile-table__item">
                  <span className="mobile-table__item-header">Date</span>
                  {formatDate(date)}
                </li>
                <li className="mobile-table__item">
                  <span className="mobile-table__item-header">Type</span>
                  {type === "income" ? "+" : "-"}
                </li>
                <li className="mobile-table__item">
                  <span className="mobile-table__item-header">Category</span>
                  {category}
                </li>
                <li className="mobile-table__item">
                  <span className="mobile-table__item-header">Comment</span>
                  <span className="mobile-table__item-comment">{comment}</span>
                </li>
                <li className="mobile-table__item">
                  <span className="mobile-table__item-header">Sum</span>
                  <span className="mobile-table__item-sum" data-type={type}>
                    {amount.toFixed(2)}
                  </span>
                </li>
                <li className="mobile-table__controls">
                  <Button
                    title="Delete"
                    onClick={() => handleDelete(_id)}
                    styles="--delete"
                    type="button"
                  />
                  <Button
                    title="Edit"
                    onClick={() => openModalEditTransaction(_id)}
                    styles="--edit-mobile"
                    type="button"
                  />
                </li>
              </ul>
            )
          )}
        </div>
      )}

      {!isMobile && (
        <table className="home__table table">
          <thead className="table__head">
            <tr key={nanoid()} className="table__head-list">
              <th className="table__head-item table__head-item--date">Date</th>
              <th className="table__head-item table__head-item--type">Type</th>
              <th className="table__head-item table__head-item--category">
                Category
              </th>
              <th className="table__head-item table__head-item--comment">
                Comment
              </th>
              <th className="table__head-item table__head-item--sum">Sum</th>
            </tr>
          </thead>
          <tbody className="table__body">
            {transactions.map(
              ({ _id, date, type, category, comment, amount }) => (
                <tr key={nanoid()} className="table__body-list">
                  <td className="table__body-item body-item--date">
                    {formatDate(date)}
                  </td>
                  <td className="table__body-item table__body-item--type">
                    {type === "income" ? "+" : "-"}
                  </td>
                  <td className="table__body-item table__body-item--category">
                    {category}
                  </td>
                  <td className="table__body-item table__body-item--comment">
                    {comment}
                  </td>
                  <td
                    className="table__body-item table__body-item--sum"
                    data-type={type}
                  >
                    {amount.toFixed(2)}
                  </td>
                  <td className="table__body-item">
                    <div className="table__body-item-controls">
                      <Button
                        onClick={() => openModalEditTransaction(_id)}
                        styles="--edit"
                        type="button"
                      />
                      <Button
                        title="Delete"
                        onClick={() => handleDelete(_id)}
                        styles="--delete"
                        type="button"
                      />
                    </div>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      )}

      {pageCount > 1 && (
        <Pagination
          isMobile={isMobile}
          pageCount={pageCount}
          onItemOffsetChange={handleItemOffset}
        />
      )}
      <Button
        title="+"
        onClick={openModalAddTransaction}
        styles="--add"
        type="button"
      />
    </div>
  );
};
