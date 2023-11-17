import PropTypes from "prop-types";
import Select from "react-select";

export const DropdownSelect = ({
  name,
  options,
  value,
  styles,
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
  isSearchable: PropTypes.bool.isRequired,
  isClearable: PropTypes.bool,
  isDisabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};
