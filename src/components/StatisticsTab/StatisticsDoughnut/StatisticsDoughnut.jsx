import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";

export const StatisticsDoughnut = () => {
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

  const data = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: ["red", "blue", "yellow", "green", "purple", "orange"],
      },
    ],
  };

  return (
    <div className="doughnut__box">
      {/* <span className="doughnut__balance" role="status" aria-live="polite">{difference.toFixed(2)} PLN</span> */}
      <span className="doughnut__balance" role="status" aria-live="polite">
        1000000 PLN
      </span>
      <Doughnut
        // data={{
        //   labels: expensesLabels.length > 0 ? expensesLabels : ["Income"],
        //   datasets: [
        //     {
        //       data: expensesData.length > 0 ? expensesData : [incomeSum],
        //       backgroundColor: expensesLabels.map(
        //         (category) => transactionColors[category]
        //       ),
        //     },
        //   ],
        // }}
        data={data}
        options={chartOptions}
      />
    </div>
  );
};
