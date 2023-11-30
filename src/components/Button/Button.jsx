import PropTypes from "prop-types";
import { forwardRef } from "react";
/**
 * @param {{ ariaLabel?: string, icon?: {} | string, title?: string,
 *  styles: '--submit' | '--cancel' | '--add' | '--edit' | '--edit-mobile'
 * | '--delete' | '--yes' | '--no' | '--close' | '--search', type: 'submit' | 'button',
 *   onClick?: () => void, }} props
 */
export const Button = forwardRef(
  ({ ariaLabel, icon, title, styles, type, onClick }, ref) => (
    <button
      aria-label={ariaLabel}
      className={"btn btn" + styles}
      type={type}
      onClick={onClick}
      ref={ref}
    >
      {icon}
      {title}
    </button>
  )
);

Button.displayName = "Button";

Button.propTypes = {
  ariaLabel: PropTypes.string.isRequired,
  icon: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  styles: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};
