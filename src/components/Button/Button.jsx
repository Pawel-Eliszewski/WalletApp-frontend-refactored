import PropTypes from "prop-types";
import "./Button.scss";
/**
 * @param {{ title: string, onClick?: (ev?: import('react').MouseEvent) => void,
 *  styles: '--submit' | '--cancel' | '--add' | '--edit' | '--edit-mobile'
 * | '--delete' | '--yes' | '--no'
 *  type: 'submit' | 'button' }} props
 */
export const Button = ({ title, onClick, styles, type }) => {
  return (
    <button onClick={onClick} className={"btn btn" + styles} type={type}>
      {title}
    </button>
  );
};

Button.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func,
  styles: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
