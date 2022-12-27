import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import PropTypes from 'prop-types';
import './SpiderChart.css';



/**
 * Component for session graph
 * @component
 * @prop {Array} perfData stock performance of the user 
 * 
 * @return {FunctionalComponent}
 * 
 */

const SpiderChart = ({ perfData }: any) => {

    return (
        <div className="spider_chart">
            <RadarChart
                outerRadius={75} width={260} height={289}
                data={perfData}
            >
                <PolarGrid radialLines={false} />
                <PolarAngleAxis dataKey="kind" tick={{

                    fontSize: 12,
                    fontWeight: 500,

                }} stroke="white" tickLine={false}
                />
                <Radar
                    name="Mike"
                    dataKey="value"
                    fill="#FF0101B2"
                    fillOpacity={0.8}
                />
                <PolarRadiusAxis tick={false} axisLine={false} tickCount={6} />

            </RadarChart>
        </div>

    )

}

SpiderChart.propTypes = {

    perfData: PropTypes.array.isRequired,
}

export default SpiderChart