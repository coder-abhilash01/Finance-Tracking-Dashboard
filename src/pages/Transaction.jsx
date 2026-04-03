import React, { useState } from 'react'

const Transaction = ({ role = "admin" }) => { // Change to "viewer" to test
  const [transactions, setTransactions] = useState([
    { id: 1, date: '2026-04-03', category: 'Food', type: 'expense', amount: 800 },
    { id: 2, date: '2026-04-01', category: 'Salary', type: 'income', amount: 5000 },
  ]);

  const addTransaction = () => {
    const newTx = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      category: 'Freelance',
      type: 'income',
      amount: 1500
    };
    setTransactions([newTx, ...transactions]);
  };

  return (
    <div className="p-8 bg-white dark:bg-zinc-950 min-h-screen text-black dark:text-white">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Transactions History</h2>
        
        {/* ROLE BASED BUTTON */}
        {role === "admin" ? (
          <button 
            onClick={addTransaction}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition-all"
          >
            + Add New
          </button>
        ) : (
          <span className="text-zinc-500 text-sm italic">Read-only access</span>
        )}
      </div>

      {/* TABLE */}
      <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-zinc-50 dark:bg-zinc-900">
            <tr>
              <th className="p-4 border-b border-zinc-200 dark:border-zinc-800">Date</th>
              <th className="p-4 border-b border-zinc-200 dark:border-zinc-800">Category</th>
              <th className="p-4 border-b border-zinc-200 dark:border-zinc-800">Type</th>
              <th className="p-4 border-b border-zinc-200 dark:border-zinc-800 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                <td className="p-4 border-b border-zinc-100 dark:border-zinc-900">{tx.date}</td>
                <td className="p-4 border-b border-zinc-100 dark:border-zinc-900">{tx.category}</td>
                <td className={`p-4 border-b border-zinc-100 dark:border-zinc-900 font-medium ${tx.type === 'expense' ? 'text-red-500' : 'text-emerald-500'}`}>
                  {tx.type}
                </td>
                <td className="p-4 border-b border-zinc-100 dark:border-zinc-900 text-right font-bold">₹ {tx.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Transaction