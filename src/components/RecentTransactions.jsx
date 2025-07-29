import { ArrowRight } from 'lucide-react'
import React from 'react'
import TransactionInfoCard from './TransactionInfoCard'
import moment from 'moment'

const RecentTransactions = ({transactions, onMore}) => {
  return (
    <div className='bg-white rounded-2xl shadow-md p-4'>
      <div className='flex items-center justify-between'>
        <h4 className='text-lg'>Recent Transactions</h4>
        <button  className="flex items-center gap-x-2 px-4 py-2 bg-gray-200/50 rounded-md shadow hover:bg-gray-300 transition cursor-pointer"
          onClick={onMore}
        >
          More  <ArrowRight className='text-base' size={15}/>
        </button>
      </div>

      <div className='mt-6'>
        {transactions?.slice(0.5)?.map((item) => (
          <TransactionInfoCard
            key={item.id}
            title={item.name}
            icon={item.icon}
            date={moment(item.date).format('MMM DD, YYYY')}
            amount={item.amount}
            type={item.type}
            hideDeleteBtn
          />
        ))}
      </div>
    </div>
  )
}

export default RecentTransactions