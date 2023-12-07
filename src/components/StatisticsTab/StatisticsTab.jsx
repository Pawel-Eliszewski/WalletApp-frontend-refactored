import { useMedia } from "react-use";
import { FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";
import { useState } from "react";
import { selectTransactions } from "../../redux/finance/selectors";
import { StatisticsDoughnut } from "./StatisticsDoughnut/StatisticsDoughnut";
import { DropdownSelect } from "../DropdownSelect/DropdownSelect";
import {
  getTransactionsYears,
  countTransactionsSummary,
  getMonthsForSelectedYear,
  sumExpensesWithColors,
  filterTransactions,
} from "../../utils/transactionsDataOperations";
import { expenseCategories } from "../../utils/transactionCategories";
import {
  setOverlayVisible,
  setOverlayNotVisible,
} from "../../utils/backdropAndAnimationsStyles";
import { nanoid } from "nanoid";

export const StatisticsTab = () => {
  const isMobile = useMedia("(max-width: 767px)");
  const allTransactions = useSelector(selectTransactions);

  const [selectedRangeTransactions, setSelectedRangeTransactions] =
    useState(allTransactions);

  const [selectedYear, setSelectedYear] = useState({
    label: isMobile ? (
      <FormattedMessage id="labelSelectYear" />
    ) : (
      <FormattedMessage id="labelYear" />
    ),
    value: "",
  });
  const [selectedMonth, setSelectedMonth] = useState({
    label: isMobile ? (
      <FormattedMessage id="labelSelectMonth" />
    ) : (
      <FormattedMessage id="labelMonth" />
    ),
    value: "",
  });

  const summedExpensesWithColors = sumExpensesWithColors(
    selectedRangeTransactions,
    expenseCategories
  );

  const { income, expense, balance } = countTransactionsSummary(
    selectedRangeTransactions
  );

  const handleSelectYear = (year) => {
    if (year !== null) {
      setSelectedYear(year);
      setSelectedMonth({
        label: isMobile ? (
          <FormattedMessage id="labelSelectMonth" />
        ) : (
          <FormattedMessage id="labelMonth" />
        ),
        value: "",
      });
      setSelectedRangeTransactions(
        filterTransactions(allTransactions, year.value)
      );
    } else {
      setSelectedYear({
        label: isMobile ? (
          <FormattedMessage id="labelSelectYear" />
        ) : (
          <FormattedMessage id="labelYear" />
        ),
        value: "",
      });
      setSelectedMonth({
        label: isMobile ? (
          <FormattedMessage id="labelSelectMonth" />
        ) : (
          <FormattedMessage id="labelMonth" />
        ),
        value: "",
      });
      setSelectedRangeTransactions(allTransactions);
    }
  };

  const handleSelectMonth = (month) => {
    if (month !== null) {
      setSelectedMonth(month);
      setSelectedRangeTransactions(
        filterTransactions(allTransactions, selectedYear.value, month.value)
      );
    } else {
      setSelectedMonth({
        label: isMobile ? (
          <FormattedMessage id="labelSelectMonth" />
        ) : (
          <FormattedMessage id="labelMonth" />
        ),
        value: "",
      });
      setSelectedRangeTransactions(
        filterTransactions(allTransactions, selectedYear.value)
      );
    }
  };

  return (
    <div className="statistics__container">
      <div className="statistics__doughnut-wrapper">
        <h2 className="statistics__title">
          <FormattedMessage id="linkStatistics" />
        </h2>
        <StatisticsDoughnut balance={balance} data={summedExpensesWithColors} />
        <div className="statistics__data-range-wrapper">
          <h4 className="statistics__data-range">
            <FormattedMessage id="labelDateRange" />:{" "}
            {selectedYear.value === "" ? (
              <FormattedMessage id="labelAllTime" />
            ) : (
              selectedYear.value
            )}{" "}
            {selectedMonth.value === "" && selectedYear.value !== "" ? (
              <FormattedMessage id="labelFullYear" />
            ) : selectedMonth.value === "" ? null : (
              selectedMonth.label
            )}
          </h4>
        </div>
      </div>
      <div className="statistics__content">
        <div className="statistics__dropdown-wrapper">
          <DropdownSelect
            styles="statistics-tab"
            isClearable={selectedYear.value !== "" ? true : false}
            name="year"
            isSearchable={false}
            options={getTransactionsYears(allTransactions)}
            value={selectedYear}
            onMenuOpen={isMobile && setOverlayVisible}
            onMenuClose={isMobile && setOverlayNotVisible}
            onChange={handleSelectYear}
          />
          <DropdownSelect
            styles="statistics-tab"
            isClearable={selectedMonth.value !== "" ? true : false}
            name="month"
            isDisabled={selectedYear.value === "" ? true : false}
            isSearchable={false}
            options={getMonthsForSelectedYear(
              allTransactions,
              selectedYear.value
            )}
            value={selectedMonth}
            onMenuOpen={isMobile && setOverlayVisible}
            onMenuClose={isMobile && setOverlayNotVisible}
            onChange={handleSelectMonth}
          />
        </div>
        <div className="statistics__legend">
          <ul className="statistics__legend-headers">
            <li className="statistics__legend-header">
              <FormattedMessage id="headerCategory" />
            </li>
            <li className="statistics__legend-header">
              <FormattedMessage id="headerSum" />
            </li>
          </ul>
          <ul className="statistics__legend-list">
            {summedExpensesWithColors?.length > 0 ? (
              summedExpensesWithColors.map(({ category, amount, color }) => (
                <li key={nanoid()} className="statistics__legend-item">
                  <div
                    className="statistics__legend-icon"
                    style={{
                      backgroundColor: `${color}`,
                    }}
                  ></div>
                  <p className="statistics__legend-category">
                    {" "}
                    <FormattedMessage id={`expenseCategories${category}`} />
                  </p>
                  <p className="statistics__legend-amount">
                    {amount.toFixed(2)} PLN
                  </p>
                </li>
              ))
            ) : (
              <li className="statistics__legend-item">
                <p className="statistics__legend-info">
                  <FormattedMessage id="statisticsLegendInfo" />
                </p>
              </li>
            )}
          </ul>
        </div>
        <div className="statistics__summary">
          <ul className="statistics__summary-list">
            <li className="statistics__summary-item">
              <p className="statistics__summary-type">
                <FormattedMessage id="labelExpenses" />:
              </p>
              <p className="statistics__summary-type statistics__summary-type--expense">
                {expense.toFixed(2)} PLN
              </p>
            </li>
            <li className="statistics__summary-item">
              <p className="statistics__summary-type">
                <FormattedMessage id="labelIncomes" />:
              </p>
              <p className="statistics__summary-type statistics__summary-type--income">
                {income.toFixed(2)} PLN
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
