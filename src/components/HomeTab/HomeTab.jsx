import { useState, useEffect } from "react";
import { useMedia } from "react-use";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { selectUser } from "../../redux/session/selectors";
import { fetchTransactions } from "../../redux/finance/operations";
import { setTransactionId } from "../../redux/finance/financeSlice";
import { deleteTransaction } from "../../redux/finance/operations";
import { selectTransactions } from "../../redux/finance/selectors";
import { Balance } from "../Balance/Balance";
import { Button } from "../Button/Button";
import { Pagination } from "../Pagination/Pagination";
import { Modal } from "../Modal/Modal";
import { paginateTransactions } from "../../utils/paginationHandlers";
import { nanoid } from "nanoid";

export const HomeTab = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const allTransactions = useSelector(selectTransactions);
  const isMobile = useMedia("(max-width: 767px)");
  const [context, setContext] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    if (allTransactions === null) {
      dispatch(fetchTransactions(user.id));
    }
  }, [allTransactions, user.id, dispatch]);

  let paginationData = paginateTransactions(allTransactions, itemOffset);
  let transactions = paginationData.paginatedTransactions;
  let pageCount = paginationData.pages;

  const handleItemOffset = (event) => {
    setItemOffset(event);
  };

  const openModalAdd = () => {
    setContext("add");
    setIsModalOpen(true);
    document.body.classList.add("modal-open");
  };

  const openModalEdit = (_id) => {
    setContext("edit");
    setIsModalOpen(true);
    dispatch(setTransactionId(_id));
    document.body.classList.add("modal-open");
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setContext(null);
    document.body.classList.remove("modal-open");
  };

  const handleDeleteTransaction = (transactionId) => {
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
                  {date}
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
                    onClick={() => handleDeleteTransaction(_id)}
                    styles="--delete"
                    type="button"
                  />
                  <Button
                    title="Edit"
                    onClick={() => openModalEdit(_id)}
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
              <th className="table__head-item table__head-item--controls">
                Controls
              </th>
            </tr>
          </thead>
          <tbody className="table__body">
            {transactions.map(
              ({ _id, date, type, category, comment, amount }) => (
                <tr key={nanoid()} className="table__body-list">
                  <td className="table__body-item body-item--date">{date}</td>
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
                        ariaLabel="Edit"
                        onClick={() => openModalEdit(_id)}
                        styles="--edit"
                        type="button"
                      />
                      <Button
                        title="Delete"
                        onClick={() => handleDeleteTransaction(_id)}
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

      {pageCount > 1 ? (
        <Pagination
          isMobile={isMobile}
          pageCount={pageCount}
          onItemOffsetChange={handleItemOffset}
        />
      ) : (
        <div className="home__placeholder"></div>
      )}
      <Button title="+" onClick={openModalAdd} styles="--add" type="button" />
      <Modal
        isModalOpen={isModalOpen}
        context={context}
        onModalClose={handleModalClose}
      />
    </div>
  );
};
