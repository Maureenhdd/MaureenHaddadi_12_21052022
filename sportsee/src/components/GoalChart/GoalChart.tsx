import { useEffect } from 'react';
import { donut_chart } from './utils'
import PropTypes from 'prop-types';

/**
 * Component for Sessions graph
 * @component
 * @prop {number} score - daily goal of the user 
 * 
 * 
 * @return {FunctionalComponent}
 * 
 */

const GoalChart = ({ score }: any) => {

    useEffect(() => {
        score === undefined ? <></> :
            donut_chart(score)
    }, [])


    return (
        <div id="donut"></div>
    )
}

GoalChart.propTypes = {

    score: PropTypes.number.isRequired,
}

export default GoalChart
