import PropTypes from "prop-types";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";

export const StatisticsDoughnut = ({ balance, data }) => {
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

  const doughnutData = {
    labels: data.map((element) => element.category),
    datasets: [
      {
        data: data.map((element) => element.amount),
        backgroundColor: data.map((element) => element.color),
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
};
