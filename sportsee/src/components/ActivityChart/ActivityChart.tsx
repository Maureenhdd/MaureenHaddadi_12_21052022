import React, { useEffect, useState } from 'react';
import * as d3 from 'd3'
import { chart_bar } from './utils'


type Props = {
    activity: []
}

const ActivityChart: any = ({ activity }: Props) => {

    useEffect(() => {
        if (activity) {
            chart_bar(activity, "#my_dataviz");
        }
    }, [activity])

    return (
        <div className="bar_chart" id="my_dataviz"></div>

    )
}

export default ActivityChart