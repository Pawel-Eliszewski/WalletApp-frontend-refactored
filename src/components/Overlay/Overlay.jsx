import PropTypes from "prop-types";

export const Overlay = ({ styles }) => {
  return <div className={"overlay " + styles}></div>;
};

Overlay.propTypes = {
  styles: PropTypes.string,
};
