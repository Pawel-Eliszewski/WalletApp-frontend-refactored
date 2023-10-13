import PropTypes from "prop-types";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";

const MaterialUISwitch = styled(Switch)(() => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('/assets/icon-expense.svg')`,
      },
    },
  },
  "& .MuiSwitch-thumb": {
    width: 32,
    height: 32,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('/assets/icon-income.svg')`,
    },
  },
}));

export const CustomizedMuiSwitch = ({ onChange, transactionType }) => {
  return (
    <FormGroup>
      <FormControlLabel
        control={
          <MaterialUISwitch
            sx={{ m: 1 }}
            onChange={onChange}
            checked={transactionType === "expense" ? true : false}
          />
        }
      />
    </FormGroup>
  );
};

CustomizedMuiSwitch.propTypes = {
  onChange: PropTypes.func.isRequired,
  transactionType: PropTypes.string.isRequired,
};
