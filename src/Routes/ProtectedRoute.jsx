import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
/**
 * @param {{ component: React.ReactNode, redirectTo?: string }} props
 */
export const ProtectedRoute = ({ component: Component, redirectTo = "/" }) => {
  const { isAuth, isRefreshing } = useAuth();
  const shouldRedirect = !isAuth && !isRefreshing;

  return shouldRedirect ? <Navigate to={redirectTo} /> : Component;
};

ProtectedRoute.propTypes = {
  component: PropTypes.node.isRequired,
  redirectTo: PropTypes.string,
};
