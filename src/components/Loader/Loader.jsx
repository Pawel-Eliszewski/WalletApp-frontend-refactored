import { useSelector } from "react-redux";
import { selectIsLoading } from "../../redux/global/selectors";

export const Loader = () => {
  const isLoading = useSelector(selectIsLoading);

  return (
    <div
      className={`loader__container ${
        isLoading ? "" : "loader__container--hidden"
      }`}
    >
      <div className="loader__title" data-text="Wallet">
        <span className="loader__circle"></span>
        <span className="loader__circle"></span>
        <span className="loader__circle"></span>
        <span className="loader__circle"></span>
      </div>
    </div>
  );
};
