import PropTypes from "prop-types";
import { useRef } from "react";
import "./Switch.scss";
/**
 * @param {{ onChange: () => void }} props
 */
export const Switch = ({ onChange }) => {
  const checkboxRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === "Tab" && e.shiftKey) {
      if (document.activeElement === checkboxRef.current) {
        e.preventDefault();
      }
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      checkboxRef.current.click();
    } else if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault();
      const isChecked = checkboxRef.current.checked;
      if (
        (e.key === "ArrowLeft" && isChecked) ||
        (e.key === "ArrowRight" && !isChecked)
      ) {
        checkboxRef.current.click();
      }
    }
  };

  return (
    <div className="switch" onKeyDown={handleKeyDown} tabIndex={0}>
      <label className="switch__label" htmlFor="checkbox">
        <input
          ref={checkboxRef}
          className="switch__input"
          type="checkbox"
          id="checkbox"
          onClick={onChange}
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
