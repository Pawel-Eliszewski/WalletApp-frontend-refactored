import { useSelector } from "react-redux";
import { selectBalance } from "../../redux/finance/selectors";

export const Balance = () => {
  const balance = useSelector(selectBalance);

  return (
    <div className="balance">
      <h2 className="balance__title">Your balance</h2>
      <p className="balance__amount">{balance.toFixed(2)} PLN</p>
    </div>
  );
};
