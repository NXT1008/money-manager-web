import React, { useState } from 'react'
import Input from './Input';
import EmojiPickerPopup from './EmojiPickerPopup';
import { LoaderCircle } from 'lucide-react';
import { useEffect } from 'react';

const AddCategoryForm = ({ onAddCategory, initialCategoryData, isEditting }) => {

  const [category, setCategory] = useState({
    id: '',
    name: '',
    type: 'income', // Default type can be 'income' or 'expense'
    icon: '',
  });
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    if (isEditting && initialCategoryData) {
      setCategory(initialCategoryData);
    } else {
      setCategory({
        name: '',
        type: 'income',
        icon: '',
      });
    }
  }, [isEditting, initialCategoryData]);

  const categoryTypeOptions = [
    { value: 'income', label: 'Income' },
    { value: 'expense', label: 'Expense' },
  ]

  const handleChange = (field, value) => {
    setCategory({...category, [field]: value });
  }

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await onAddCategory(category)
    } finally {
      setLoading(false);
      setCategory({
        name: '',
        type: 'income',
        icon: '',
      });
    }
  }

  return (
    <div className='p-4 '>

      <EmojiPickerPopup
        icon={category.icon}
        onSelect={(icon) => handleChange('icon', icon)}
      />

      <Input
        value={category.name}
        onChange={({ target }) => handleChange('name', target.value)}
        label='Category Name'
        placeholder='e.g. Salary, Food, Freelane'
        type='text'
      />

      <Input
        label={'Category Type'}
        value={category.type}
        onChange={({ target }) => handleChange('type', target.value)}
        isSelect={true}
        options={categoryTypeOptions}
      />

      <div className='flex justify-end mt-6'>
        <button
          type='button'
          onClick={handleSubmit}
          disabled={loading}
          className="flex items-center gap-1 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition cursor-pointer"
        >
          {loading ? (
            <>
              <LoaderCircle className='w-4 h-4 animate-spin' />
              {isEditting ? 'Updating...' : 'Adding...'}
            </>
          ) : (
              <>
                {isEditting ? 'Update Category' : 'Add Category'}
              </>
          )}
        </button>
      </div>
    </div>
  )
}

export default AddCategoryForm