import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import useData from '../../hooks/useData'


/**
 * Component for session graph
 * @param {Array} perfData stock performance of the user 
 * 
 * @return {FunctionalComponent}
 * 
 */
type Props = {
    perfData: string[]
}
const SpiderChart: any = ({ perfData }: Props) => {

    return (
        <div className="spider_chart" style={{ width: 260, height: 289, backgroundColor: "#282D30", borderRadius: 10 }}>
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


export default SpiderChart