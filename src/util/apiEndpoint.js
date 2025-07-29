export const BASE_URL = 'https://money-manager-api-ijz7.onrender.com/api/v1.0'

// export const BASE_URL = 'http://localhost:8080/api/v1.0'

export const API_ENDPOINTS = {
  LOGIN: '/login',
  REGISTER: '/register',

  GET_USER_INFO: '/profile',

  GET_ALL_CATEGORIES: '/categories',
  ADD_CATEGORY: '/categories',
  UPDATE_CATEGORY: (categoryId) => `/categories/${categoryId}`,
  CATEGORY_BY_TYPE: (type) => `/categories/${type}`,

  GET_ALL_INCOMES: '/incomes',
  ADD_INCOME: '/incomes',
  UPDATE_INCOME: (incomeId) => `/incomes/${incomeId}`,
  DELETE_INCOME: (incomeId) => `/incomes/${incomeId}`,
  INCOME_EXCEL_DOWNLOAD: '/excel/download/income',
  EMAIL_INCOME: '/email/income-excel',

  GET_ALL_EXPENSES: '/expenses',
  ADD_EXPENSE: '/expenses',
  UPDATE_EXPENSE: (expenseId) => `/expenses/${expenseId}`,
  DELETE_EXPENSE: (expenseId) => `/expenses/${expenseId}`,
  EXPENSE_EXCEL_DOWNLOAD: '/excel/download/expense',
  EMAIL_EXPENSE: '/email/expense-excel',

  APPLY_FILTER: '/filter',

  DASHBOARD_DATA: '/dashboard',
}