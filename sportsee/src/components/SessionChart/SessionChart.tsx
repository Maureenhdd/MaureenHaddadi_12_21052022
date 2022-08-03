// @ts-nocheck
import React, { useEffect, useState } from 'react';
import * as d3 from 'd3'
import { sessionChart } from './utils'

/**
 * Component for Sessions graph
 * @component
 * @prop {array} sessisons - stock sessions of the user 
 * 
 * 
 * @return {FunctionalComponent}
 * 
 */


// type Props = {
//     sessions: string[],
// }

const SessionChart: any = ({ sessions }: Props) => {

    useEffect(() => {
        sessions === undefined ? <></> :
            sessionChart(sessions)
    }, [])

    return (
        <div className="line_chart" id="session"></div>
    )
}

export default SessionChart