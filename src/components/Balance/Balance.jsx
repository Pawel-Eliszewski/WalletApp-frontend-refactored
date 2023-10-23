import { useSelector } from "react-redux";
import { selectBalance } from "../../redux/finance/selectors";

export const Balance = () => {
  const balance = useSelector(selectBalance);

  return (
    <div className="balance">
      <div className="balance__title">Your balance</div>
      <div className="balance__amount-wrapper">
        <span className="balance__amount"></span>
        {balance.toFixed(2)} PLN
      </div>
    </div>
  );
};
