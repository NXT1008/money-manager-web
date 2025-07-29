import { LoaderCircle } from 'lucide-react';
import React, { useState } from 'react'

const DeleteAlert = ({ content, onDelete }) => {
  
  const [loading, setLoading] = useState(false);
  const handleDelete = async () => {
    setLoading(true);
    try {
      await onDelete();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <p className='text-sm'>{content}</p>
      <div className='flex justify-end mt-6'>
        <button
          onClick={handleDelete}
          type='button'
          disabled={loading}
          className="flex items-center gap-1 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition cursor-pointer">
            {loading ? (
            <>
              <LoaderCircle className='w-4 h-4 animate-spin' />
              Deleting...
            </>
          ) : (
              <> Delete </>
          )}
        </button>
      </div>
    </div>
  )
}

export default DeleteAlert