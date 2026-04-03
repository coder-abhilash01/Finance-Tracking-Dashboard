import React from 'react'
import { useSelector } from 'react-redux'
import SummaryCard from '../components/SummaryCard'
import RecentTransactions from '../components/RecentTransactions'

const DashBoard = () => {

    const {transactions, filter, role} = useSelector(state => state.finance)

const income = transactions
.filter(transaction => transaction.type === "income")
.reduce((acc, transaction) => acc + transaction.amount, 0)

const expenses = transactions
.filter(transaction => transaction.type === "expense")
.reduce((acc, transaction) => acc + transaction.amount, 0)

const balance = income - expenses

  return (
    <div  className='p-5'>
    

<div className="grid grid-cols-3 gap-6">

<SummaryCard title="Balance" value={balance} />
<SummaryCard title="Income" value={income} />
<SummaryCard title="Expense" value={expenses} />

</div>

<RecentTransactions/>

    </div>
  )
}

export default DashBoard
