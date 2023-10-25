import PropTypes from "prop-types";
/**
 * @param {{ ariaLabel?: string, title?: string, onClick?: (ev?: import('react').MouseEvent) => void,
 *  styles: '--submit' | '--cancel' | '--add' | '--edit' | '--edit-mobile'
 * | '--delete' | '--yes' | '--no' | '--close',
 *  type: 'submit' | 'button' }} props
 */
export const Button = ({ ariaLabel, title, styles, type, onClick }) => {
  return (
    <button
      aria-label={title ? title : ariaLabel}
      onClick={onClick}
      className={"btn btn" + styles}
      type={type}
    >
      {title}
    </button>
  );
};

Button.propTypes = {
  ariaLabel: PropTypes.string,
  title: PropTypes.string,
  styles: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};
