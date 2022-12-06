import React, { useEffect } from "react";
import { sessionChart } from "./utils";
import PropTypes from "prop-types";

/**
 * Component for Sessions graph
 * @component
 * @prop {array} sessisons - stock sessions of the user
 *
 *
 * @return {Component}
 *
 */

const SessionChart = ({ sessions }: any) => {
  useEffect(() => {
    sessions === undefined ? <></> : sessionChart(sessions);
  }, []);

  return <div className="line_chart" id="session"></div>;
};

SessionChart.propTypes = {
  sessions: PropTypes.array,
};
export default SessionChart;


