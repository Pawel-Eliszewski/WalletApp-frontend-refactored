import PropTypes from "prop-types";
import Select from "react-select";

export const DropdownSelect = ({
  name,
  options,
  value,
  styles,
  isMulti,
  isSearchable,
  isClearable,
  isDisabled,
  onChange,
}) => {
  return (
    <Select
      className={styles + "-select-container"}
      classNamePrefix={styles + "-select"}
      name={name}
      options={options}
      value={value}
      initialValue={null}
      isMulti={isMulti}
      isSearchable={isSearchable}
      isClearable={isClearable}
      isDisabled={isDisabled}
      onChange={onChange}
    />
  );
};

DropdownSelect.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  styles: PropTypes.string.isRequired,
  value: PropTypes.object,
  isMulti: PropTypes.bool,
  isSearchable: PropTypes.bool.isRequired,
  isClearable: PropTypes.bool,
  isDisabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};
