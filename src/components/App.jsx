import "../../installPrompt";
import { useEffect, useState, Suspense, lazy } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useMedia } from "react-use";
import {
  selectIsLoading,
  selectUser,
  selectIsAuth,
} from "../redux/session/selectors";
import { selectTransactions } from "../redux/finance/selectors";
import { fetchTransactions } from "../redux/finance/operations";
import { refreshUser } from "../redux/session/operations";
import { Loader } from "./Loader/Loader";
import { ProtectedRoute } from "./Routes/ProtectedRoute";
import { RestrictedRoute } from "./Routes/RestrictedRoute";
import { HomeTab } from "./HomeTab/HomeTab";
import { Currency } from "./Currency/Currency";
import { StatisticsTab } from "./StatisticsTab/StatisticsTab";
import { configureNotiflixStyles } from "../utils/notiflixStyles";
import "../styles/main.css";

const AuthPage = lazy(() => import("../Pages/AuthPage/AuthPage"));
const DashboardPage = lazy(() =>
  import("../Pages/DashboardPage/DashboardPage")
);

export default function App() {
  const dispatch = useDispatch();

  const isLoading = useSelector(selectIsLoading);
  const user = useSelector(selectUser);
  const isAuth = useSelector(selectIsAuth);
  const allTransactions = useSelector(selectTransactions);
  const isMobile = useMedia("(max-width: 767px)");
  const [delayedLoading, setDelayedLoading] = useState(false);

  useEffect(() => {
    let timeout;
    isLoading
      ? setDelayedLoading(true)
      : (timeout = setTimeout(() => {
          setDelayedLoading(false);
        }, 500));
    return () => clearTimeout(timeout);
  }, [isLoading]);

  useEffect(() => {
    const storedColorScheme = window.localStorage.getItem("colorScheme");
    if (storedColorScheme) {
      document.body.setAttribute("data-color-scheme", storedColorScheme);
    } else {
      const prefersDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      const initialColorScheme = prefersDarkMode ? "dark" : "light";
      document.body.setAttribute("data-color-scheme", initialColorScheme);
      window.localStorage.setItem("colorScheme", initialColorScheme);
    }
    configureNotiflixStyles(storedColorScheme);
  }, []);

  useEffect(() => {
    if (isAuth && user && allTransactions === null) {
      dispatch(fetchTransactions(user.id));
    }
  }, [isAuth, user, allTransactions, dispatch]);

  useEffect(() => {
    const refresh = () => {
      dispatch(refreshUser());
    };
    refresh();
  }, [dispatch]);

  return delayedLoading ? (
    <Loader />
  ) : (
    <Suspense fallback={null}>
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
          <Route path="statistics" element={<StatisticsTab />} />
          {isMobile && <Route path="currency" element={<Currency />} />}
          <Route path="*" element={<Navigate to="/login" />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
