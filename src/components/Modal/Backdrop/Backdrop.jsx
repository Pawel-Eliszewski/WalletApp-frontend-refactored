import PropTypes from "prop-types";
import { motion } from "framer-motion";
/**
 * @param {{ children: {}, onClick: () => void }} props
 */
export const Backdrop = ({ children, onClick }) => {
  return (
    <motion.div
      onClick={onClick}
      className="backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};

Backdrop.propTypes = {
  children: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};
