// @ts-nocheck
import React, { useEffect, useState } from 'react';
import * as d3 from 'd3'
import { donut_chart } from './utils'



type Props = {
    score: number
}

const GoalChart: any = ({ score }: Props) => {
    
  

    useEffect(() => {
        score === undefined ? <></> :
            donut_chart(score)
    }, [score])

    return (
        <div id="donut"></div>
    )
}

export default GoalChart
