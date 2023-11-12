const fetchAndTransformCurrencyData = async (query) => {
  const response = await fetch(
    `https://api.nbp.pl/api/exchangerates/rates/c/${query}/last/`
  );

  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.statusText}`);
  }

  const data = await response.json();

  const transformedData = data.rates.map((rate) => {
    return {
      sale: rate.ask,
      buy: rate.bid,
    };
  });

  return transformedData;
};

export const getAndStoreCurrencyData = async () => {
  try {
    const dataEUR = await fetchAndTransformCurrencyData("EUR");
    const dataUSD = await fetchAndTransformCurrencyData("USD");
    const dataGBP = await fetchAndTransformCurrencyData("GBP");
    const dataCHF = await fetchAndTransformCurrencyData("CHF");
    const dataCZK = await fetchAndTransformCurrencyData("CZK");
    const dataSEK = await fetchAndTransformCurrencyData("SEK");
    const dataNOK = await fetchAndTransformCurrencyData("NOK");

    const modifiedDataEUR = dataEUR.map((element) => ({
      ...element,
      currency: "EUR",
    }));

    const modifiedDataUSD = dataUSD.map((element) => ({
      ...element,
      currency: "USD",
    }));

    const modifiedDataGBP = dataGBP.map((element) => ({
      ...element,
      currency: "GBP",
    }));

    const modifiedDataCHF = dataCHF.map((element) => ({
      ...element,
      currency: "CHF",
    }));

    const modifiedDataCZK = dataCZK.map((element) => ({
      ...element,
      currency: "CZK",
    }));

    const modifiedDataSEK = dataSEK.map((element) => ({
      ...element,
      currency: "SEK",
    }));

    const modifiedDataNOK = dataNOK.map((element) => ({
      ...element,
      currency: "NOK",
    }));

    const combinedData = [
      ...modifiedDataEUR,
      ...modifiedDataUSD,
      ...modifiedDataGBP,
      ...modifiedDataCHF,
      ...modifiedDataCZK,
      ...modifiedDataSEK,
      ...modifiedDataNOK,
    ];

    localStorage.setItem("currencyData", JSON.stringify(combinedData));

    return combinedData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
