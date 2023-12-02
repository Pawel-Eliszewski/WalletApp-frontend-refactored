import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { SmallLoader } from "../Loader/SmallLoader/SmallLoader";
import { getAndStoreCurrencyData } from "../../utils/currencyDataOperations";
import { nanoid } from "nanoid";

export function Currency() {
  const [currencyData, setCurrencyData] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    const fetchCurrencyData = async () => {
      try {
        const lastFetchTime = localStorage.getItem("lastCurrencyFetchTime");
        const currentTime = new Date().getTime();
        const oneHour = 3600000;

        if (!lastFetchTime || currentTime - lastFetchTime >= oneHour) {
          const data = await getAndStoreCurrencyData();
          setCurrencyData(data);
          localStorage.setItem("lastCurrencyFetchTime", currentTime.toString());
        } else {
          const cachedData = JSON.parse(localStorage.getItem("currencyData"));
          if (cachedData) {
            setCurrencyData(cachedData);
          }
        }
        setLoadingData(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCurrencyData();
  }, []);

  return (
    <div className="currency__container">
      <table className="currency__table">
        <thead className="currency__head">
          <tr key={nanoid()} className="currency__head-row">
            <th className="currency__header">
              <FormattedMessage id="headerCurrency" />
            </th>
            <th className="currency__header">
              <FormattedMessage id="headerPurchase" />
            </th>
            <th className="currency__header">
              <FormattedMessage id="headerSale" />
            </th>
          </tr>
        </thead>
        <tbody className="currency__body">
          {loadingData ? (
            <tr key={nanoid()} className="currency__body-row">
              <td className="currency__loading-box">
                <SmallLoader />
              </td>
            </tr>
          ) : (
            currencyData.map((element) => (
              <tr key={nanoid()} className="currency__body-row">
                <td className="currency__item">{element.currency}</td>
                <td className="currency__item">
                  {(Math.round(element.buy * 100) / 100).toFixed(2)}
                </td>
                <td className="currency__item">
                  {(Math.round(element.sale * 100) / 100).toFixed(2)}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
