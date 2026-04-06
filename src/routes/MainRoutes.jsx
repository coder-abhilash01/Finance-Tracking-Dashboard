import React from 'react'
import { Route, Routes } from 'react-router-dom'
import DashBoard from '../pages/DashBoard'
import Insights from '../pages/Insights'
import Transaction from '../pages/Transaction'
import Settings from '@/pages/Settings'
import PageNotFound from '@/components/PageNotFound'

const MainRoutes = () => {
  return (
  <Routes>
    <Route path='/' element={<DashBoard/>}/>
   <Route path='/transaction' element={<Transaction/>}/>
      <Route path='/insights' element={<Insights/>}/>
      <Route path='/settings' element={<Settings/>}/>

      <Route path="*" element={<PageNotFound />}/>
  </Routes>
  )
}

export default MainRoutes
