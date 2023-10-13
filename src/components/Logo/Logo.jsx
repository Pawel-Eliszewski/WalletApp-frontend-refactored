import "./Logo.scss";

export const Logo = () => {
  return (
    <div className="logo">
      <img
        className="logo__icon"
        src="/assets/icon-wallet.png"
        alt="wallet icon"
      />
      <h2 className="logo__title">Wallet</h2>
    </div>
  );
};
