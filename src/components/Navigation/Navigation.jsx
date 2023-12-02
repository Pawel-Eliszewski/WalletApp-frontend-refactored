import { useMedia } from "react-use";
import { NavLink, useLocation } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import IconHome from "../../../public/assets/icon-home.svg?react";
import IconStatistics from "../../../public/assets/icon-statistics.svg?react";
import IconDollar from "../../../public/assets/icon-dollar.svg?react";

export const Navigation = () => {
  const location = useLocation();
  const isMobile = useMedia("(max-width: 767px)");

  const navItems = [
    {
      path: "/",
      label: <FormattedMessage id="linkHome" />,
      icon: <IconHome />,
    },
    {
      path: "/statistics",
      label: <FormattedMessage id="linkStatistics" />,

      icon: <IconStatistics />,
    },
    ...(isMobile
      ? [
          {
            path: "/currency",
            label: "Dollar",
            icon: <IconDollar />,
          },
        ]
      : []),
  ];

  return (
    <nav>
      <ul className="nav">
        {navItems.map((item, index) => (
          <li key={index}>
            <NavLink className="nav__item" to={item.path}>
              <div
                className={`nav__logo ${
                  location.pathname === item.path ? "nav__logo--active" : ""
                }`}
              >
                {item.icon}
              </div>
              <p
                className={`nav__description ${
                  location.pathname === item.path
                    ? "nav__description--active"
                    : ""
                }`}
              >
                {item.label}
              </p>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
