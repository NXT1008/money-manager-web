import React, { useEffect, useState } from 'react'
import Dashboard from '../components/Dashboard'
import { useUser } from '../hook/useUser';
import { Plus } from 'lucide-react';
import CategoryList from '../components/CategoryList';
import axiosConfig from '../util/axiosConfig';
import { API_ENDPOINTS } from '../util/apiEndpoint';
import toast from 'react-hot-toast';
import Modal from '../components/Modal';
import AddCategoryForm from '../components/AddCategoryForm';

const Category = () => {
  useUser();

  const [loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [openAddCategoryModal, setOpenAddCategoryModal] = useState(false);
  const [openEditCategoryModal, setOpenEditCategoryModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchCategoryDetails = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_CATEGORIES);
      if (response.status === 200) {
        setCategoryData(response.data);
      }

    } catch (error) {
      console.error('Failed to fetch categories:', error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCategoryDetails();
  }, []);

  const handleAddCategory = async (category) => {
    const { name, type, icon } = category;

    if (!name.trim()) {
      toast.error('Category name is required');
      return;
    }

    // check if category with same name already exists
    const existingCategory = categoryData.find(cat => cat.name.toLowerCase() === name.trim().toLowerCase());

    if (existingCategory) {
      toast.error('Category with this name already exists');
      return;
    }

    try {
      
      const response = await axiosConfig.post(API_ENDPOINTS.ADD_CATEGORY, {
        name, type, icon
      });

      if (response.status === 201) {
        toast.success('Category added successfully');
        setOpenAddCategoryModal(false);
        fetchCategoryDetails();
      }

    } catch (error) {
      console.error('Failed to add category:', error);
      toast.error(error.response?.data?.message || 'Failed to add category');
    }

  }

  const handleEditCategory = (category) => {
    setSelectedCategory(category);
    setOpenEditCategoryModal(true);
  }

  const handleUpdateCategory = async (updateCategory) => {
    const { id, name, type, icon } = updateCategory;

    if (!name.trim()) {
      toast.error('Category name is required');
      return;
    }

    if (!id) {
      toast.error('Category ID is missing for update');
      return;
    }

    try {
      await axiosConfig.put(API_ENDPOINTS.UPDATE_CATEGORY(id), {
        name, type, icon
      });

      setOpenEditCategoryModal(false);
      setSelectedCategory(null);
      toast.success('Category updated successfully');
      fetchCategoryDetails();

    } catch (error) {
      console.error('Failed to update category:', error);
      toast.error(error.response?.data?.message || 'Failed to update category');
    }
  }

  return (
    <Dashboard activeMenu='Category'>
      <div className='my-5 mx-auto'>
        {/* Add button to add catogory */}
        <div className='flex justify-between text-center mb-5'>
          <h2 className='text-2xl font-semibold'>All Categories</h2>
          <button
            onClick={() => setOpenAddCategoryModal(true)}
            className="flex items-center gap-1 rounded-md bg-green-100 text-green-700 font-medium px-3 py-1 hover:bg-green-200 cursor-pointer">
            <Plus size={15} />
            Add Category
          </button>
        </div>

        {/* Category list */}
        <CategoryList categories={categoryData} onEditCategory={handleEditCategory}/>

        {/* Adding category modal */}
        <Modal
          isOpen={openAddCategoryModal}
          onClose={() => setOpenAddCategoryModal(false)}
          title={'Add Category'}
        >
          <AddCategoryForm onAddCategory={handleAddCategory}/>
        </Modal>

        {/* Updating category modal */}
        <Modal
          isOpen={openEditCategoryModal}
          onClose={() => {
            setOpenEditCategoryModal(false); setSelectedCategory(null);
          }}
          title={'Update Category'}
        >
          <AddCategoryForm
            onAddCategory={handleUpdateCategory}
            initialCategoryData={selectedCategory}
            isEditting={true}
          />
        </Modal>
      </div>
    </Dashboard>
  )
}

export default Category