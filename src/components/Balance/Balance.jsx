import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FormattedMessage } from "react-intl";
import { selectTransactions } from "../../redux/finance/selectors";
import { countTransactionsSummary } from "../../utils/transactionsDataOperations";
import { SmallLoader } from "../Loader/SmallLoader/SmallLoader";

export const Balance = () => {
  const allTransactions = useSelector(selectTransactions);
  const [loadingData, setLoadingData] = useState(true);
  const [countedBalance, setCountedBalance] = useState(null);

  useEffect(() => {
    if (allTransactions !== null) {
      const { balance } = countTransactionsSummary(allTransactions);
      setCountedBalance(balance);
      setLoadingData(false);
    }
  }, [allTransactions]);

  return (
    <div className="balance__wrapper">
      <h2 className="balance__title">
        <FormattedMessage id="totalBalance" />
      </h2>
      {loadingData ? (
        <div className="balance__loading-box">
          <SmallLoader />
        </div>
      ) : (
        <p className="balance__amount">{countedBalance.toFixed(2)} PLN</p>
      )}
    </div>
  );
};

//h2 or h1 ?
