// @ts-nocheck
import React, { useEffect, useState } from 'react';
import * as d3 from 'd3'
import { chart_bar } from './utils'
import PropTypes from 'prop-types';

/**
 * Component for Sessions graph
 * @component
 * @prop {array} activity - stock weight and calories bruned of the user 
 * 
 * 
 * @return {FunctionalComponent}
 * 
 */


// type Props = {
//     activity: []
// }

const ActivityChart: any = ({ activity }) => {

    useEffect(() => {
        if (activity) {
            chart_bar(activity, "#my_dataviz");
        }
    }, [activity])

    return (
        <div className="bar_chart" id="my_dataviz"></div>

    )
}


ActivityChart.propTypes = {
    activity: PropTypes.array,

}


export default ActivityChart