import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
/**
 * @param {{ component: React.ReactNode, redirectTo?: string }} props
 */
export const RestrictedRoute = ({ component: Component, redirectTo = "/" }) => {
  const { isAuth } = useAuth();

  return isAuth ? <Navigate to={redirectTo} /> : Component;
};

RestrictedRoute.propTypes = {
  component: PropTypes.node.isRequired,
  redirectTo: PropTypes.string,
};
