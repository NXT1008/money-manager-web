import React, { useEffect, useState } from 'react'
import { prepareIncomeLineChartData } from '../util/util';
import CustomLineChart from './CustomLineChart';
import { Plus } from 'lucide-react';

const IncomeOverview = ({ transactions, onAddIncome }) => {
  
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareIncomeLineChartData(transactions);
    setChartData(result);

    return () => {}
  }, [transactions]);

  return (
    <div className="bg-white rounded-2xl shadow-md px-4 py-3 mt-5">
      <div className='flex items-center justify-between'>
        <div>
          <h5 className='text-lg'>
            Income Overview
          </h5>
          <p className='text-xs text-gray-400 mt-0.5'>
            Track your earnings over time and analyze your income trends.
          </p>
        </div>
        {/* Button to add income */}
        <div>
          <button
            onClick={onAddIncome}
            className="flex items-center gap-1 rounded-md bg-green-100 text-green-700 font-medium px-3 py-1 hover:bg-green-200 cursor-pointer">
            <Plus size={16} className='text-lg'/> Add Income
          </button>
        </div>
      </div>

       <div className='mt-10'>
          {/* Create line chart */}
          <CustomLineChart data={chartData} />
        </div>
    </div>
  )
}

export default IncomeOverview