import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { Doughnut } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { selectColorScheme } from "../../../redux/global/selectors";
import "chart.js/auto";

export const StatisticsDoughnut = ({ balance, data, incomes }) => {
  const intl = useIntl();
  const colorScheme = useSelector(selectColorScheme);

  const chartOptions = {
    cutout: "70%",
    plugins: {
      legend: {
        display: false,
      },
    },
    elements: {
      arc: {
        borderWidth: 0,
      },
    },
  };

  const isEmptyData = !data || data.length === 0;

  const doughnutData = {
    labels: isEmptyData
      ? [intl.formatMessage({ id: "labelIncomes" })]
      : data.map((element) =>
          intl.formatMessage({ id: `expenseCategories${element.category}` })
        ),
    datasets: [
      {
        data: isEmptyData ? [incomes] : data.map((element) => element.amount),
        backgroundColor: isEmptyData
          ? [`${colorScheme === "dark" ? "#127962" : "#24cca7"}`]
          : data.map((element) => element.color),
      },
    ],
  };

  return (
    <div className="doughnut__box">
      <span className="doughnut__balance" role="status" aria-live="polite">
        {balance.toFixed(2)} PLN
      </span>
      <Doughnut data={doughnutData} options={chartOptions} />
    </div>
  );
};

StatisticsDoughnut.propTypes = {
  balance: PropTypes.number.isRequired,
  data: PropTypes.array,
  incomes: PropTypes.number,
};
