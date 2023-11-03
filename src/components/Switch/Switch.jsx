import PropTypes from "prop-types";
import { useRef } from "react";
/**
 * @param {{ checked: boolean, onChange: () => void }} props
 */
export const Switch = ({ checked, onChange }) => {
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
          onChange={onChange}
          checked={checked}
        />
        <div className="switch__slider"></div>
      </label>
    </div>
  );
};

Switch.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};
