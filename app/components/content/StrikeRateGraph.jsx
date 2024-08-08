import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import React from 'react';

const StrikeRateGraph = ({ }) => {
    const data = [
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 },
        { name: 'Group C', value: 300 },
        { name: 'Group D', value: 200 },
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <div className="bg-gray-100 shadow-md mb-8 rounded-lg p-4">
            <div className="flex flex-col md:flex-row md:items-center mb-4">
                <div className="flex-1 flex items-center gap-4">

                    <PieChart width={400} height={400}>
                        <Pie
                            data={data}
                            cx={200}
                            cy={200}
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>

                </div>
            </div>
        </div>
    );
};

export default StrikeRateGraph;
