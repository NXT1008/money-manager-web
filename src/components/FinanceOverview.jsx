import React from 'react'
import { addThousandsSeparator } from '../util/util';
import CustomPieChart from './CustomPieChart';

const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {
  console.log('🚀 ~ FinanceOverview ~ totalBalance, totalIncome, totalExpense:', totalBalance, totalIncome, totalExpense)
  
  const COLORS = ["#591688", "#a0090e", "#016630"];

  const balanceData = [
    { name: 'Total Balance', amount: totalBalance },
    { name: 'Total Expenses', amount: totalExpense },
    { name: 'Total Incomes', amount: totalIncome },
  ]

  return (
    <div className='bg-white rounded-2xl shadow-md p-4'>
      <div className='flex items-center justify-between'>
        <h5 className='text-lg'>Financial Overview</h5>
      </div>

      <CustomPieChart data={balanceData}
        label="Total Balance"
        totalAmount={`${addThousandsSeparator(totalBalance)} đ`}
        colors={COLORS}
        showTextAnchor
      />
    </div>
  )
}

export default FinanceOverview