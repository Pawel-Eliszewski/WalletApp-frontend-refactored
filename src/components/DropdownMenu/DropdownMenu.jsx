import PropTypes from "prop-types";
import { useState } from "react";
import css from "./DropdownMenu.module.css";
/**
 * @param {{ category: string, onClick: () => void }} props
 */
export const DropdownMenu = ({ category, onClick }) => {
  const [isActive, setIsActive] = useState(false);
  const [updatedCategory, setUpdatedCategory] = useState(null);

  let categories = [
    "Main expenses",
    "Products",
    "Car",
    "Self care",
    "Child care",
    "Household products",
    "Education",
    "Leisure",
    "Other expenses",
    "Entertainment",
  ];

  const iconArrowClass = isActive ? css.iconArrowUp : css.iconArrowDown;
  const categoryClass =
    category !== "Select a category" ? css.dropdownBtnActive : css.dropdownBtn;

  return (
    <div className={css.dropdown} role="button" aria-expanded>
      <div
        onClick={() => {
          setIsActive(!isActive);
        }}
        className={categoryClass}
      >
        {updatedCategory || category}
        <img
          className={iconArrowClass}
          src="/assets/icon-arrow.svg"
          aria-hidden="true"
        ></img>
      </div>
      <div
        className={css.dropdownContent}
        style={{ display: isActive ? "block" : "none" }}
      >
        {categories.map((item) => (
          <div
            key={item}
            onClick={() => {
              onClick(item);
              setIsActive(!isActive);
              setUpdatedCategory(item);
            }}
            className={css.item}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

DropdownMenu.propTypes = {
  category: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
