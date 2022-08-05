import React, { useEffect, useState } from 'react';
import * as d3 from 'd3'
import { donut_chart } from './utils'
import PropTypes from 'prop-types';

/**
 * Component for Sessions graph
 * @component
 * @prop {array} score - daily goal of the user 
 * 
 * 
 * @return {FunctionalComponent}
 * 
 */

// type Props = {
//     score: number
// }

const GoalChart = ({ score }: any) => {



    useEffect(() => {
        score === undefined ? <></> :
            donut_chart(score)
    }, [score])

    return (
        <div id="donut"></div>
    )
}

GoalChart.propTypes = {
    
    score: PropTypes.number.isRequired,
}

export default GoalChart
