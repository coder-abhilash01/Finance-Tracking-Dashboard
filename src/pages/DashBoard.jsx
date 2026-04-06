import React from 'react'
import { useSelector } from 'react-redux'
import SummaryCard from '../components/SummaryCard'
import RecentTransactions from '../components/RecentTransactions'
import TransactionChart from '@/components/TransactionChart'
import SpendingChart from '@/components/SpendingChart'
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react'

const content = {
  admin: {
    title: "Welcome back, Admin",
    desc: "Monitor activity and manage transactions.",
  },
  user: {
    title: "Welcome back!",
    desc: "Track your income and expenses.",
  }
};

const DashBoard = () => {
  const { transactions, role } = useSelector(state => state.finance)

  const income = transactions
    .filter(tx => tx.type === "income")
    .reduce((acc, tx) => acc + tx.amount, 0)

  const expenses = transactions
    .filter(tx => tx.type === "expense")
    .reduce((acc, tx) => acc + tx.amount, 0)

  const balance = income - expenses

  return (
    <div className='p-6 flex-1 bg-gray-50 dark:bg-black'>
    
      <div className="mb-8">
        <h1 className="text-2xl font-black tracking-wide">
          {content[role].title}
        </h1>
        <p className="text-gray-500 mt-1 text-sm tracking-wide">
          {content[role].desc}
        </p>
      </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <SummaryCard 
          title="Balance" 
          value={balance} 
          color="text-blue-600" 
          icon={Wallet} 
          trend={5.2} 
        />
        <SummaryCard 
          title="Income" 
          value={income} 
          color="text-emerald-600" 
          icon={TrendingUp} 
          trend={12.5} 
        />
        <SummaryCard 
          title="Expense" 
          value={expenses} 
          color="text-rose-600" 
          icon={TrendingDown} 
          trend={-2.4} 
        />
      </div>


      <div className=" grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8 ">
        

         
  <TransactionChart transactions={transactions} />
        


        <div className="lg:col-span-1  bg-white dark:bg-[#050c0c] p-6 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-md">
          <h3 className="text-lg font-semibold mb-6">Spending Breakdown</h3>
          <SpendingChart transactions={transactions} />
        </div>

      </div>

   
      <div className="mt-8 shadow-md">
        <RecentTransactions />
      </div>
    </div>
  )
}

export default DashBoard