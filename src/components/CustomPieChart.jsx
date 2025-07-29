import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip
} from 'recharts';

const CustomPieChart = ({ data, label, totalAmount, colors }) => {
  const renderCenterText = () => {
    return (
      <>
        <text
          x="50%"
          y="48%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="font-semibold text-sm"
          fill="#333"
        >
          {label}
        </text>
        <text
          x="50%"
          y="60%"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="16"
          fill="#000"
          fontWeight="bold"
        >
          {totalAmount}
        </text>
      </>
    );
  };

  return (
    <div className="w-full h-80 flex flex-col items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="amount"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={3}
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>

          {renderCenterText()}

          <Tooltip
            formatter={(value) => `${value.toLocaleString('vi-VN')} ₫`}
          />
        </PieChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <span
              className="inline-block w-3 h-3 rounded-full"
              style={{ backgroundColor: colors[index % colors.length] }}
            ></span>
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomPieChart;
