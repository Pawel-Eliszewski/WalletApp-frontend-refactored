import { NavLink, useLocation } from "react-router-dom";
import { useMediaQuery } from "@react-hook/media-query";
import IconHome from "../../../public/assets/icon-home.svg?react";
import IconStatistics from "../../../public/assets/icon-statistics.svg?react";
import IconDollar from "../../../public/assets/icon-dollar.svg?react";

export const Navigation = () => {
  const location = useLocation();
  const isMax767px = useMediaQuery("(max-width: 767px)");

  const navItems = [
    { path: "/", label: "Home", icon: <IconHome /> },
    {
      path: "/statistics",
      label: "Statistics",
      icon: <IconStatistics />,
    },
    ...(isMax767px
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
