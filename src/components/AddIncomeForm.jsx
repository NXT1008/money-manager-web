import React, { useEffect, useState } from 'react'
import Input from './Input';
import EmojiPickerPopup from './EmojiPickerPopup';
import { LoaderCircle } from 'lucide-react';

const AddIncomeForm = ({ onAddIncome, categories }) => {
  
  const [income, setIncome] = useState({
    name: '',
    amount: '',
    date: '',
    icon: '',
    categoryId: ''
  });

  const [loading, setLoading] = useState(false);

  const categoryOption = categories.map(category => ({
    value: category.id,
    label: category.name
  }))

  const handleChange = (field, value) => { 
    setIncome({...income, [field]: value });
  }

  const handleAddIncome = async () => {
    setLoading(true);
    try {
      await onAddIncome(income);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (categories.length > 0 && !income.categoryId) {
      setIncome(prev => ({ ...prev, categoryId: categories[0].id }));
    }
  }, [categories, income.categoryId]);

  return (
    <div>
      <EmojiPickerPopup
        icon={income.icon}
        onSelect={(selectedIcon) => handleChange('icon', selectedIcon)}
      />

      <Input
        value={income.name}
        onChange={({ target }) => handleChange('name', target.value)}
        label='Income Source'
        placeholder='e.g., Salary, Freelance'
      />

      <Input
        label='Category'
        value={income.categoryId}
        onChange={({ target }) => handleChange('categoryId', target.value)}
        isSelect={true}
        options={categoryOption}
      />

      <Input
        value={income.amount}
        onChange={({ target }) => handleChange('amount', target.value)}
        label='Amount'
        type='number'
        placeholder='e.g., 1000000'
      />

      <Input
        value={income.date}
        onChange={({ target }) => handleChange('date', target.value)}
        label='Date'
        type='date'
        placeholder='Select date'
      />

      <div className='flex justify-end mt-6'>
        <button
          onClick={handleAddIncome}
          disabled={loading}
          className="flex items-center gap-1 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
        >
          {loading ? (
            <>
              <LoaderCircle className='w-4 h-4 animate-spin' />
              Adding...
            </>
          ) : (
              <> Add Income </>
          )}
        </button>
      </div>

    </div>
  )
}

export default AddIncomeForm