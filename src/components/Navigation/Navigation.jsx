import { NavLink, useLocation } from "react-router-dom";
import { useMediaQuery } from "@react-hook/media-query";

export const Navigation = () => {
  const location = useLocation();
  const isMax767px = useMediaQuery("(max-width: 767px)");

  const navItems = [
    { path: "/", label: "Home", icon: "icon-home.svg" },
    { path: "/statistics", label: "Statistics", icon: "icon-statistics.svg" },
    ...(isMax767px
      ? [{ path: "/currency", label: "Currency", icon: "icon-dollar.svg" }]
      : []),
  ];

  return (
    <nav>
      <ul className="nav">
        {navItems.map((item, index) => (
          <li key={index}>
            <NavLink className="nav__item" to={item.path}>
              <img
                className={`nav__logo ${
                  location.pathname === item.path ? "nav__logo--active" : ""
                }`}
                src={`/assets/${item.icon}`}
                alt={item.label}
              />
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
