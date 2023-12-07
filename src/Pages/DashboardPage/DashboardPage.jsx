import Media from "react-media";
import { Suspense } from "react";
import { useLocation, Outlet } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { Navigation } from "../../components/Navigation/Navigation";
import { Balance } from "../../components/Balance/Balance";
import { Currency } from "../../components/Currency/Currency";
import { PageBackground } from "../../components/PageBackground/PageBackground";
import { Modal } from "../../components/Modal/Modal";
import { Overlay } from "../../components/Overlay/Overlay";

const MobileDashboard = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isStatisticsPage = location.pathname === "/statistics";

  return (
    <>
      {isStatisticsPage && <Overlay styles="overlay-statistics-page" />}
      <Header />
      <Modal />
      <div className="container container--mobile">
        <Suspense fallback={null}>
          <Navigation />
          {isHomePage && <Balance />}
          <Outlet />
        </Suspense>
      </div>
    </>
  );
};

const TabletDashboard = () => {
  return (
    <>
      <PageBackground />
      <Header />
      <Modal />
      <div className="container container--tablet">
        <Suspense fallback={null}>
          <div className="wrapper wrapper--tablet">
            <div className="wrapper__inner wrapper__inner--tablet">
              <Navigation />
              <Balance />
            </div>
            <Currency />
          </div>
          <Outlet />
        </Suspense>
      </div>
    </>
  );
};

const DesktopDashboard = () => {
  return (
    <>
      <PageBackground />
      <Header />
      <Modal />
      <div className="container container--desktop">
        <Suspense fallback={null}>
          <div className="wrapper wrapper--desktop">
            <Navigation />
            <Balance />
            <Currency />
          </div>
          <Outlet />
        </Suspense>
      </div>
    </>
  );
};

export default function DashboardPage() {
  return (
    <Media
      queries={{
        mobile: "(max-width: 767px)",
        tablet: "(min-width: 768px) and (max-width: 1279px)",
        desktop: "(min-width: 1280px)",
      }}
    >
      {(matches) => (
        <>
          {matches.mobile && <MobileDashboard />}
          {matches.tablet && <TabletDashboard />}
          {matches.desktop && <DesktopDashboard />}
        </>
      )}
    </Media>
  );
}
