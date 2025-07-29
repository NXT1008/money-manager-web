import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Income from './pages/Income'
import Expense from './pages/Expense'
import Category from './pages/Category'
import Filter from './pages/Filter'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import {Toaster} from "react-hot-toast";

const App = () => {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Root />} />

          {/* Define your routes here */}
          <Route path='/dashboard' element={<Home />} />
          <Route path='/income' element={<Income />} />
          <Route path='/expense' element={<Expense />} />
          <Route path='/category' element={<Category />} />
          <Route path='/filter' element={<Filter />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

const Root = () => {
  const isAuthenticated = localStorage.getItem('token')
  return isAuthenticated ? (
    <Navigate to={'/dashboard'}/>
  ) : (
    <Navigate to={'/login'}/>
  );
}

export default App