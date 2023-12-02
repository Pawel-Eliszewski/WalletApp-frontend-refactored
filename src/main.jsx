import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { IntlProvider } from "react-intl";
import { store, persistor } from "./redux/store";
import App from "./components/App";
import messagesEn from "./translations/en.json";
import messagesPl from "./translations/pl.json";

const locale = navigator.language.split(/[-_]/)[0];

const messages = {
  en: messagesEn,
  pl: messagesPl,
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <IntlProvider locale={locale} messages={messages[locale]}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </IntlProvider>
    </PersistGate>
  </Provider>
);
