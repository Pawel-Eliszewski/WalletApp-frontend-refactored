import PropTypes from "prop-types";
import Select from "react-select";

export const DropdownSelect = ({
  name,
  defaultValue,
  value,
  options,
  styles,
  isMulti,
  isSearchable,
  isClearable,
  isDisabled,
  placeholder,
  onChange,
}) => {
  return (
    <Select
      className={styles + "-select-container"}
      classNamePrefix={styles + "-select"}
      name={name}
      defaultValue={defaultValue}
      value={value}
      options={options}
      isMulti={isMulti}
      isSearchable={isSearchable}
      isClearable={isClearable}
      isDisabled={isDisabled}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

DropdownSelect.propTypes = {
  name: PropTypes.string.isRequired,
  defaultValue: PropTypes.object,
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  options: PropTypes.array.isRequired,
  styles: PropTypes.string.isRequired,
  isMulti: PropTypes.bool,
  isSearchable: PropTypes.bool.isRequired,
  isClearable: PropTypes.bool,
  isDisabled: PropTypes.bool,
  placeholder: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  onChange: PropTypes.func.isRequired,
};
