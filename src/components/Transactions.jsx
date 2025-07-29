import { ArrowRight } from 'lucide-react'
import React from 'react'
import TransactionInfoCard from './TransactionInfoCard'
import moment from 'moment'

const Transactions = ({ transactions, onMore, type, title }) => {
  return (
    <div className='bg-white rounded-2xl shadow-md p-4'>
      <div className=' flex items-center justify-between'>
        <h5 className='text-lg'>{title}</h5>
        <button
          className='flex items-center gap-x-2 px-4 py-2 bg-gray-200/50 rounded-md shadow hover:bg-gray-300 transition cursor-pointer'
          onClick={onMore}
        >
          More  <ArrowRight className='text-base' size={15}/>
        </button>
      </div>

      <div className='mt-6'>
        {transactions?.slice(0, 5)?.map((item) => (
          <TransactionInfoCard
            key={item.id}
            title={item.name}
            icon={item.icon}
            date={moment(item.date).format('MMM DD, YYYY')}
            amount={item.amount}
            type={type}
            hideDeleteBtn
          />
        ))}
      </div>
    </div>
  )
}

export default Transactions