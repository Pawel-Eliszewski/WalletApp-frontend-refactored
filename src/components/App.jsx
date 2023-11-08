import "../../installPrompt";
import { useEffect, Suspense, lazy } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
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

  useEffect(() => {
    const refresh = () => {
      dispatch(refreshUser());
    };
    refresh();
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(fetchTransactions(user.id));
    }
  }, [user, dispatch]);

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
          <Route path="statistics" element={<DiagramTab />} />
          {isMobile && <Route path="currency" element={<Currency />} />}
          <Route path="*" element={<Navigate to="/login" />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
