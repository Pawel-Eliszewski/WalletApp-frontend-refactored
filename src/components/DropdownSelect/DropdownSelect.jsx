import PropTypes from "prop-types";
import Select from "react-select";

export const DropdownSelect = ({
  context,
  name,
  isSearchable,
  options,
  value,
  onChange,
}) => {
  return (
    <Select
      isSearchable={isSearchable}
      className="react-select-container"
      classNamePrefix="react-select"
      name={name}
      options={options}
      value={value}
      onChange={onChange}
    />
  );
};

DropdownSelect.propTypes = {
  context: PropTypes.string,
  name: PropTypes.string,
  isSearchable: PropTypes.bool,
  // options: PropTypes,
  // value: PropTypes,
  onChange: PropTypes.func,
};
