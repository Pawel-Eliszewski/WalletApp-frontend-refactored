import Media from "react-media";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { Navigation } from "../../components/Navigation/Navigation";
import { Balance } from "../../components/Balance/Balance";
import { Currency } from "../../components/Currency/Currency";

const MobileDashboard = () => {
  return (
    <>
      <Header />
      <div className="container container--mobile">
        <Suspense fallback={null}>
          <Navigation />
          <Outlet />
        </Suspense>
      </div>
    </>
  );
};

const TabletDashboard = () => {
  return (
    <>
      <Header />
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
      <Header />
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
