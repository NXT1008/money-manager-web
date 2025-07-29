import React, { useEffect, useState } from 'react'
import Dashboard from '../components/Dashboard'
import { useUser } from '../hook/useUser';
import axiosConfig from '../util/axiosConfig';
import { API_ENDPOINTS } from '../util/apiEndpoint';
import toast from 'react-hot-toast';
import IncomeList from '../components/IncomeList';
import Modal from '../components/Modal';
import AddIncomeForm from '../components/AddIncomeForm';
import DeleteAlert from '../components/DeleteAlert';
import IncomeOverview from '../components/IncomeOverview';
import ExpenseList from '../components/ExpenseList';
import ExpenseOverview from '../components/ExpenseOverview';
import AddExpenseForm from '../components/AddExpenseForm';

const Expense = () => {
  
  useUser();

  const [expenseData, setExpenseData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null
  });

  // Function to fetch expense details
  const fetchExpenseDetails = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_EXPENSES);

      if (response.status === 200) {
        setExpenseData(response.data);
      }

    } catch (error) {
      console.error('Error fetching expense details:', error);
      toast.error(error.response?.data?.message || 'Failed to fetch expense details');
    } finally {
      setLoading(false);
    }
  }

  // Fetch categories for expense
  const fetchExpenseCategories = async () => { 
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.CATEGORY_BY_TYPE('expense'));
      if (response.status === 200) {
        setCategories(response.data);
      }
    } catch (error) {
      console.error('Error fetching expense categories:', error);
      toast.error(error.response?.data?.message || 'Failed to fetch expense categories');
    }
  }

  // Save expense data
  const handleAddExpense = async (expense) => {

    const { name, amount, date, icon, categoryId } = expense;

    // Validate input
    if (!name.trim()) {
      toast.error('Expense source name is required');
      return;
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error('Amount should be a valid number greater than 0');
      return;
    }

    if (!date) {
      toast.error('Date is required');
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    if (date > today) {
      toast.error('Date cannot be in the future');
      return;
    }

    if (!categoryId) {
      toast.error('Please select a category');
      return;
    }

    try {
      const response = await axiosConfig.post(API_ENDPOINTS.ADD_EXPENSE, {
        name,
        amount: Number(amount),
        date,
        icon,
        categoryId
      });

      if (response.status === 201) {
        toast.success('Expense added successfully');
        setOpenAddExpenseModal(false);
        fetchExpenseDetails(); // Refresh expense list
      } else {
        toast.error('Failed to add expense');
      }

    } catch (error) {
      console.error('Error adding expense:', error);
      toast.error(error.response?.data?.message || 'Failed to add expense');
      return;
    }
  }

  // Delete expense
  const deleteExpense = async (id) => {
    if (!id) return;

    try {
      await axiosConfig.delete(API_ENDPOINTS.DELETE_EXPENSE(id));

      toast.success('Expense deleted successfully');
      setOpenDeleteAlert({ show: false, data: null });
      fetchExpenseDetails(); // Refresh expense list


    } catch (error) {
      console.error('Error deleting expense:', error);
      toast.error(error.response?.data?.message || 'Failed to delete expense');
    }
  }

  const handleDownloadExpenseDetails = async () => {
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.EXPENSE_EXCEL_DOWNLOAD, {
        responseType: 'blob' // Set response type to blob for file download
      });
      let fileName = 'expense_details.xlsx';
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link); // Clean up the link element
      window.URL.revokeObjectURL(url); // Release the object URL
      toast.success('Expense details downloaded successfully');
    } catch (error) {
      console.error('Error downloading expense details:', error);
      toast.error(error.response?.data?.message || 'Failed to download expense details');
    }
  }

  const handleEmailExpenseDetails = async () => {
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.EMAIL_EXPENSE);
      if (response.status === 200) {
        toast.success('Expense details emailed successfully');
      }
    } catch (error) {
      console.error('Error emailing expense details:', error);
      toast.error(error.response?.data?.message || 'Failed to email expense details');
    }
  }

  useEffect(() => {
    fetchExpenseDetails();
    fetchExpenseCategories();
  }, []);

  return (
    <Dashboard activeMenu='Expense'>
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 gap-6'>
          <div>
            {/* Overview for expense with line chart */}
            <ExpenseOverview transactions={expenseData} onAddExpense={() => setOpenAddExpenseModal(true)} />
          </div>

          <ExpenseList
            transactions={expenseData}
            onDelete={(id) => {
              setOpenDeleteAlert({ show: true, data: id })
            }}
            onDownload={handleDownloadExpenseDetails}
            onEmail={handleEmailExpenseDetails}
          />

          {/* Add Expense Modal */}
          <Modal
            isOpen={openAddExpenseModal}
            onClose={() => setOpenAddExpenseModal(false)}
            title="Add Expense"
          >
            <AddExpenseForm
              onAddExpense={(expense) => handleAddExpense(expense)}
              categories={categories}
            />
          </Modal>

          {/* Delete Expense Modal */}
          <Modal
            isOpen={openDeleteAlert.show}
            onClose={() => setOpenDeleteAlert({ show: false, data: null })}
            title="Delete Expense"
          >
            <DeleteAlert
              content="Are you sure you want to delete this expense details?"
              onDelete={() => {
                deleteExpense(openDeleteAlert.data)
              }}
            />
          </Modal>
        </div>
      </div>
    </Dashboard>
  )
}

export default Expense;