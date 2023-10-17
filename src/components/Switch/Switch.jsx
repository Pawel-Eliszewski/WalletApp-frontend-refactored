import PropTypes from "prop-types";
import "./Switch.scss";
/**
 * @param {{ onChange: () => void }} props
 */
export const Switch = ({ onChange }) => {
  return (
    <div className="switch">
      <label className="switch__label" htmlFor="checkbox">
        <input
          className="switch__input"
          type="checkbox"
          id="checkbox"
          onChange={onChange}
          defaultChecked
        />
        <div className="switch__slider"></div>
      </label>
    </div>
  );
};

Switch.propTypes = {
  onChange: PropTypes.func.isRequired,
};
