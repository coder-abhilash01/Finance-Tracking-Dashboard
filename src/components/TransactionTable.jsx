import { deleteTransaction } from '@/store/financesSlice'
import { Trash2 } from 'lucide-react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const TransactionTable = ({filteredTransactions}) => {
    const {transactions, role} = useSelector(state => state.finance)

    const dispatch = useDispatch();

  
  return (
      <div className="overflow-x-auto ">
          <table className="w-full text-left border-collapse min-w-[650px] md:min-w-full">
            <thead className="bg-zinc-50 dark:bg-[#0a1818] text-[10px] font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400 border-b border-zinc-200 dark:border-[#142929]">
              <tr>
                <th className="p-4 md:p-5">Date</th>
                <th className="p-4 md:p-5">Category</th>
                <th className="p-4 md:p-5">Type</th>
                <th className="p-4 md:p-5 text-right">Amount</th>
                {role === "admin" && (
                  <th className="p-4 md:p-5 text-center">Action</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-[#142929]">
              {filteredTransactions.map((tx) => (
                <tr key={tx.id} className="group hover:bg-zinc-50 dark:hover:bg-[#19211D] ">
                  <td className="p-4 md:p-5 text-sm text-zinc-600 dark:text-zinc-400 font-medium">
                    {tx.date}
                  </td>
                  <td className="p-4 md:p-5">
                    <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100 ">
                      {tx.category}
                    </span>
                  </td>
                  <td className="p-4 md:p-5">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${tx.type === 'expense'
                        ? 'bg-rose-500/10 text-rose-500'
                        : 'bg-emerald-500/10 text-emerald-500'
                      }`}>
                      {tx.type}
                    </span>
                  </td>
                  <td className="p-4 md:p-5 text-right font-black text-zinc-900 dark:text-white">
                    ₹{tx.amount.toLocaleString('en-IN')}
                  </td>
                  {role === "admin" && (
                    <td className="p-4 md:p-5 text-center">
                      <button
                        onClick={() => dispatch(deleteTransaction(tx.id))}
                        className="p-2 text-zinc-400 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-all active:scale-90"
                        title="Delete record"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  )
}

export default TransactionTable
