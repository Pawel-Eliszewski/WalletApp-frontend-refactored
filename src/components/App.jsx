import "../../installPrompt";
import { useEffect, Suspense, lazy } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useMedia } from "react-use";
import {
  selectIsLoading,
  selectIsRefreshing,
} from "../redux/session/selectors";
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
  const isRefreshing = useSelector(selectIsRefreshing);
  const isMobile = useMedia("(max-width: 767px)");

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
    const refresh = () => {
      dispatch(refreshUser());
    };
    refresh();
  }, [dispatch]);

  return isLoading || isRefreshing ? (
    <Loader />
  ) : (
    <Suspense fallback={<Loader />}>
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
