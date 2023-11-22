import { useState } from "react";
import { useMedia } from "react-use";
import { useSelector, useDispatch } from "react-redux";
import { setIsModalOpen, setContext } from "../../redux/global/globalSlice";
import { setTransactionId } from "../../redux/finance/financeSlice";
import { deleteTransaction } from "../../redux/finance/operations";
import { selectTransactions } from "../../redux/finance/selectors";
import { Button } from "../Button/Button";
import { Pagination } from "../Pagination/Pagination";
import { paginateTransactions } from "../../utils/paginationHandlers";
import { nanoid } from "nanoid";
import { Loading } from "notiflix";
import { IoIosSearch } from "react-icons/io";

export const HomeTab = () => {
  const dispatch = useDispatch();
  const allTransactions = useSelector(selectTransactions);
  const isMobile = useMedia("(max-width: 767px)");
  const [itemOffset, setItemOffset] = useState(0);

  let paginationData = paginateTransactions(allTransactions, itemOffset);
  let transactions = paginationData.paginatedTransactions;
  let pageCount = paginationData.pages;

  const handleItemOffset = (event) => {
    setItemOffset(event);
  };

  const openModalAdd = () => {
    dispatch(setContext("add"));
    dispatch(setIsModalOpen(true));
    document.body.classList.add("modal-open");
  };

  const openModalEdit = (_id) => {
    dispatch(setContext("edit"));
    dispatch(setTransactionId(_id));
    dispatch(setIsModalOpen(true));
    document.body.classList.add("modal-open");
  };

  const openModalSearch = () => {
    dispatch(setContext("search"));
    dispatch(setIsModalOpen(true));
    document.body.classList.add("modal-open");
  };

  const handleDeleteTransaction = async (transactionId) => {
    try {
      Loading.hourglass();
      dispatch(deleteTransaction(transactionId));
      Loading.remove(600);
    } catch (error) {
      console.error(error);
      Loading.remove(600);
    }
  };

  return (
    <div className="home__container">
      {isMobile && (
        <div className="home__mobile-table mobile-table">
          {transactions.map(
            ({ _id, date, type, category, comment, amount }) => (
              <ul key={_id} className="mobile-table__list" data-type={type}>
                <li key={nanoid()} className="mobile-table__item">
                  <h4 className="mobile-table__item-header">Date</h4>
                  <p>{date}</p>
                </li>
                <li key={nanoid()} className="mobile-table__item">
                  <h4 className="mobile-table__item-header">Type</h4>
                  <p className="mobile-table__item-type" data-type={type}>
                    {type === "income" ? "+" : "-"}
                  </p>
                </li>
                <li key={nanoid()} className="mobile-table__item">
                  <h4 className="mobile-table__item-header">Category</h4>
                  <p>{category}</p>
                </li>
                <li key={nanoid()} className="mobile-table__item">
                  <h4 className="mobile-table__item-header">Comment</h4>
                  <p className="mobile-table__item-comment">{comment}</p>
                </li>
                <li key={nanoid()} className="mobile-table__item">
                  <h4 className="mobile-table__item-header">Sum</h4>
                  <p className="mobile-table__item-sum" data-type={type}>
                    {amount.toFixed(2)}
                  </p>
                </li>
                <li className="mobile-table__controls">
                  <Button
                    ariaLabel="delete selected transaction"
                    title="Delete"
                    styles="--delete"
                    type="button"
                    onClick={() => handleDeleteTransaction(_id)}
                  />
                  <Button
                    ariaLabel="open modal to edit selected transaction"
                    title="Edit"
                    styles="--edit-mobile"
                    type="button"
                    onClick={() => openModalEdit(_id)}
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
                  <td
                    className="table__body-item table__body-item--type"
                    data-type={type}
                  >
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
                        ariaLabel="open modal to edit selected transaction"
                        styles="--edit"
                        type="button"
                        onClick={() => openModalEdit(_id)}
                      />
                      <Button
                        ariaLabel="delete selected transaction"
                        title="Delete"
                        styles="--delete"
                        type="button"
                        onClick={() => handleDeleteTransaction(_id)}
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
      <Button
        ariaLabel="open modal to search transactions"
        icon={<IoIosSearch />}
        styles="--search"
        type="button"
        onClick={openModalSearch}
      />
      <Button
        ariaLabel="open modal to add transaction "
        icon="+"
        styles="--add"
        type="button"
        onClick={openModalAdd}
      />
    </div>
  );
};
