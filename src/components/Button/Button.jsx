import PropTypes from "prop-types";
import { forwardRef } from "react";
/**
 * @param {{ ariaLabel?: string, title?: string, onClick?: (ev?: import('react').MouseEvent) => void,
 *  styles: '--submit' | '--cancel' | '--add' | '--edit' | '--edit-mobile'
 * | '--delete' | '--yes' | '--no' | '--close',
 *  type: 'submit' | 'button' }} props
 */
export const Button = forwardRef(
  ({ ariaLabel, title, styles, type, onClick }, ref) => (
    <button
      ref={ref}
      aria-label={title ? title : ariaLabel}
      onClick={onClick}
      className={"btn btn" + styles}
      type={type}
    >
      {title}
    </button>
  )
);

Button.displayName = "Button";

Button.propTypes = {
  ariaLabel: PropTypes.string,
  title: PropTypes.string,
  styles: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};
