import { Download, LoaderCircle, Mail } from 'lucide-react'
import React, { useState } from 'react'
import TransactionInfoCard from './TransactionInfoCard'
import moment from 'moment'

const IncomeList = ({ transactions, onDelete, onDownload, onEmail }) => {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      await onDownload();
    } finally {
      setLoading(false);
    }
  }

  const handleEmail = async () => {
    setLoading(true);
    try {
      await onEmail();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='bg-white rounded-2xl shadow-sm px-4 py-3'>
      <div className='flex items-center justify-between'>
        <h5 className='text-base font-semibold text-gray-900'>
          Income Sources
        </h5>

        <div className='flex items-center justify-end gap-2'>
          <button
            disabled={loading}
            onClick={handleEmail}
            className='bg-gray-300/50 flex items-center gap-2 px-3 py-1.5 border border-gray-200 text-green-600 text-sm rounded-lg hover:bg-gray-50 transition'>
            {loading ? (
              <>
                <LoaderCircle className='w-4 h-4 animate-spin' />
                Emailing...
              </>
            ) : (
                <>
                  <Mail size={16} className='text-green-600' />
                  Email
                </>
            )}
          </button>
          <button
            disabled={loading}
            onClick={handleDownload}
            className='bg-gray-300/50 flex items-center gap-2 px-3 py-1.5 border border-gray-200 text-green-600 text-sm rounded-lg hover:bg-gray-50 transition'>
            {loading ? (
              <>
                <LoaderCircle className='w-4 h-4 animate-spin' />
                Downloading...
              </>
            ) : (
                <>
                  <Download size={16} className='text-green-600' />
                  Download
                </>
            )}
          </button>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2'>
        {/* Display the incomes */}
        {transactions?.map((income) => (
          <TransactionInfoCard
            key={income.id}
            title={income.name}
            icon={income.icon}
            date={moment(income.date).format('DD MMM YYYY')}
            amount={income.amount}
            type='income'
            onDelete={() => onDelete(income.id)}
          />
        ))}
      </div>
    </div>
  )
}

export default IncomeList
