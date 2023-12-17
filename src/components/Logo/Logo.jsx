import { useEffect } from "react";

export const Logo = () => {
  useEffect(() => {
    document.getElementById("app-title").focus();
  }, []);

  return (
    <div className="logo">
      <img
        className="logo__icon"
        src="/assets/icon-wallet.svg"
        alt="wallet icon"
      />
      <h2 className="logo__title" id="app-title" tabIndex={-1}>
        Wallet
      </h2>
    </div>
  );
};
