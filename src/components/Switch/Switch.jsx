import PropTypes from "prop-types";
import { useRef } from "react";
/**
 * @param {{ context: 'colorScheme' | 'transactionType',
 * checked: boolean, onChange: () => void }} props
 */
export const Switch = ({ context, checked, onChange }) => {
  const checkboxRef = useRef(null);

  const id = `${context}-checkbox`;

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
    <div className={context + "-switch"} onKeyDown={handleKeyDown} tabIndex={0}>
      <label className={context + "-switch__label"} htmlFor={id}>
        <input
          id={id}
          ref={checkboxRef}
          className={context + "-switch__input"}
          type="checkbox"
          onChange={onChange}
          checked={checked}
        />
        <div className={context + "-switch__slider"}></div>
      </label>
    </div>
  );
};

Switch.propTypes = {
  context: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};
