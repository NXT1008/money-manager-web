import React from 'react';
import {
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  CartesianGrid,
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;

  const { totalAmount, items } = payload[0].payload;

  return (
    <div className="bg-white shadow-lg rounded-md p-4 border border-gray-200">
      <p className="font-bold text-sm">{label}</p>
      <p className="text-purple-700 font-semibold text-sm">Total: {totalAmount.toLocaleString('vi-VN')} ₫</p>
      <div className="text-xs text-gray-500 mt-1">
        <p className="font-semibold">Details:</p>
        {items?.map((item, index) => (
          <p key={index}>
            - {item.categoryName}: {item.amount.toLocaleString('vi-VN')} ₫
          </p>
        ))}
      </div>
    </div>
  );
};

const CustomDot = ({ cx, cy }) => {
  return (
    <circle cx={cx} cy={cy} r={4} fill="#8b5cf6" stroke="#fff" strokeWidth={2} />
  );
};

const CustomLineChart = ({ data }) => {
  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={data}
          margin={{ top: 30, right: 30, bottom: 20, left: 50 }} // tăng left để không bị cắt số
        >
          <defs>
            <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
            </linearGradient>
          </defs>

          <XAxis
            dataKey="month"
            fontSize={12}
            axisLine={false}   // ❌ Ẩn đường trục X
            tickLine={false}   // ❌ Ẩn gạch chia nhỏ
          />
          <YAxis
            tickFormatter={(value) => value.toLocaleString('vi-VN')}
            fontSize={12}
            axisLine={false}   // ❌ Ẩn đường trục X
            tickLine={false}   // ❌ Ẩn gạch chia nhỏ
          />

          {/* ❌ KHÔNG CÓ ĐƯỜNG KẺ NGANG */}
          {/* <CartesianGrid strokeDasharray="3 3" /> */}

          {/* Tooltip đẹp */}
          <Tooltip content={<CustomTooltip />} />

          {/* Đổ bóng bằng Area */}
          <Area
            type="monotone"
            dataKey="totalAmount"
            stroke={false}
            fill="url(#purpleGradient)"
            activeDot={false}
          />

          <Line
            type="monotone"
            dataKey="totalAmount"
            stroke="#8b5cf6"
            strokeWidth={3}
            dot={<CustomDot />}
            activeDot={{ r: 6 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomLineChart;
