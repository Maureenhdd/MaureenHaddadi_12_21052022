import { useEffect } from "react";
import { chart_bar } from "./utils";
import PropTypes from "prop-types";

/**
 * Component for Sessions graph
 * @component
 * @prop {array} activity - stock weight and calories bruned of the user
 *
 *
 * @return {FunctionalComponent}
 *
 */

const ActivityChart = ({ activity }: any) => {
  useEffect(() => {
    activity === undefined ? <></> : chart_bar(activity);
  }, []);

  return <div className="bar_chart" id="my_dataviz"></div>;
};

ActivityChart.propTypes = {
  activity: PropTypes.array.isRequired,
};

export default ActivityChart;
