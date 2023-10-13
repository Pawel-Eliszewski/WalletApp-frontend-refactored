import { useEffect, useState } from "react";
import { fetchCurrency } from "../../utils/currencyExchange";
import { nanoid } from "nanoid";
import "./Currency.scss";

export function Currency() {
  const [currencyData, setCurrencyData] = useState([]);

  useEffect(() => {
    const isDataFetched = localStorage.getItem("isDataFetched");

    if (isDataFetched !== "true") {
      fetchData();
      localStorage.setItem("isDataFetched", "true");
    } else {
      const cachedData = JSON.parse(localStorage.getItem("currencyData"));
      if (cachedData) {
        setCurrencyData(cachedData);
      }
    }

    const intervalId = setInterval(fetchData, 3600000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const fetchData = async () => {
    try {
      const dataEUR = await fetchCurrency("EUR");
      const dataUSD = await fetchCurrency("USD");

      const modifiedDataEUR = dataEUR.map((element) => ({
        ...element,
        currency: "EUR",
      }));

      const modifiedDataUSD = dataUSD.map((element) => ({
        ...element,
        currency: "USD",
      }));

      const combinedData = [...modifiedDataEUR, ...modifiedDataUSD];
      setCurrencyData(combinedData);

      localStorage.setItem("currencyData", JSON.stringify(combinedData));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="currency">
      <table className="currency__table">
        <thead className="currency__head">
          <tr key={nanoid()} className="currency__head-row">
            <th className="currency__header">Currency</th>
            <th className="currency__header">Purchase</th>
            <th className="currency__header">Sale</th>
          </tr>
        </thead>
        <tbody className="currency__body">
          {currencyData.map((element) => (
            <tr key={nanoid()} className="currency__body-row">
              <td className="currency__item">{element.currency}</td>
              <td className="currency__item">
                {Math.round(element.buy * 100) / 100}
              </td>
              <td className="currency__item">
                {Math.round(element.sale * 100) / 100}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
