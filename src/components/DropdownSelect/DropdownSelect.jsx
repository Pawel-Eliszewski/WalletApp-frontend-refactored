import PropTypes from "prop-types";
import Select from "react-select";

export const DropdownSelect = ({
  context,
  name,
  options,
  value,
  isSearchable,
  isClearable,
  isDisabled,
  onChange,
}) => {
  return (
    <Select
      className="react-select-container"
      classNamePrefix="react-select"
      name={name}
      options={options}
      value={value}
      isSearchable={isSearchable}
      isClearable={isClearable}
      isDisabled={isDisabled}
      onChange={onChange}
    />
  );
};

DropdownSelect.propTypes = {
  context: PropTypes.string,
  name: PropTypes.string,
  isSearchable: PropTypes.bool,
  isClearable: PropTypes.bool,
  isDisabled: PropTypes.bool,
  // options: PropTypes,
  // value: PropTypes,
  onChange: PropTypes.func,
};
