import React from 'react';
import type { FC } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

import { cnGraph } from './Graph.classname';

import './Graph.css';

type GraphProps = {
    rates: number[]
}

const Graph: FC<GraphProps> = ({ rates }) => {    
    const datesIndexes = rates.map((rate) => rates.indexOf(rate));

    return (
        <div className={cnGraph()} style={{ width: datesIndexes.length < 10 ? '25%' : '50%' }}>
            <LineChart
                xAxis={[{ data: datesIndexes }]}
                yAxis={[{ data: rates }]}
                series={[{ data: rates }]}
                height={200}
                margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
                grid={{ vertical: true, horizontal: true }}
            />
        </div>
    );
}

export { Graph };
