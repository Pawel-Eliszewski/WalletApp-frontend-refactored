import "../../installPrompt";
import { useEffect, useState, Suspense, lazy } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useMedia } from "react-use";
import {
  selectIsLoading,
  selectIsRefreshing,
  selectUser,
} from "../redux/session/selectors";
import { refreshUser } from "../redux/session/operations";
import { fetchTransactions } from "../redux/finance/operations";
import { Loader } from "./Loader/Loader";
import { ProtectedRoute } from "./Routes/ProtectedRoute";
import { RestrictedRoute } from "./Routes/RestrictedRoute";
import { HomeTab } from "./HomeTab/HomeTab";
import { Currency } from "./Currency/Currency";
import { DiagramTab } from "./DiagramTab/DiagramTab";
import "../styles/main.css";

const AuthPage = lazy(() => import("../Pages/AuthPage/AuthPage"));
const DashboardPage = lazy(() =>
  import("../Pages/DashboardPage/DashboardPage")
);

export default function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const isRefreshing = useSelector(selectIsRefreshing);
  const user = useSelector(selectUser);
  const isMobile = useMedia("(max-width: 767px)");
  const location = useLocation();
  const [hasRefreshed, setHasRefreshed] = useState(false);

  useEffect(() => {
    if (!hasRefreshed) {
      const refresh = async () => {
        if (
          location.pathname !== "/login" &&
          location.pathname !== "/register"
        ) {
          dispatch(refreshUser());
          setHasRefreshed(true);
        }
      };
      refresh();
    }
    user && dispatch(fetchTransactions(user.id));
  }, [location, user, hasRefreshed, dispatch]);

  return isLoading || isRefreshing ? (
    <Loader />
  ) : (
    <Suspense fallback={"Loading"}>
      <Routes>
        <Route
          path="/register"
          element={
            <RestrictedRoute
              redirectTo="/"
              component={<AuthPage context="register" />}
            />
          }
        />
        <Route
          path="/login"
          element={
            <RestrictedRoute
              redirectTo="/"
              component={<AuthPage context="login" />}
            />
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute redirectTo="/login" component={<DashboardPage />} />
          }
        >
          <Route index element={<HomeTab />} />
          <Route path="statistics" element={<DiagramTab />} />
          {isMobile && <Route path="currency" element={<Currency />} />}
          <Route path="*" element={<Navigate to="login" />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
