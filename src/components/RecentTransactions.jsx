import React from "react";
import { MoveRight, Trash2, Receipt } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteTransaction } from "@/store/financesSlice";

const RecentTransactions = () => {
  const dispatch = useDispatch();
  const { transactions, role } = useSelector((state) => state.finance);

  // Sirf last 5 transactions dikhane ke liye
  const recentTransactions = [...transactions].slice(-5).reverse();

  return (
    <div className="mt-8 bg-white dark:bg-[#0E1511] border border-zinc-200 dark:border-[#142929] text-black dark:text-white shadow-sm rounded-2xl p-6 transition-all">
      

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold tracking-tight">Recent Transactions</h2>
        {transactions.length > 0 && (
          <Link 
            to="/transaction" 
            className="text-xs font-bold flex items-center gap-1.5 bg-zinc-50 dark:bg-[#131d18] hover:bg-zinc-100 dark:hover:bg-[#1a2721] border border-zinc-200 dark:border-zinc-800 shadow-sm px-4 py-2 rounded-xl transition-all active:scale-95"
          >
            View All <MoveRight size={14}/>
          </Link>
        )}
      </div>

   
      <div className="overflow-x-auto">
        {recentTransactions.length > 0 ? (
          <table className="w-full text-left min-w-[500px]">
            <thead>
              <tr className="text-zinc-500 dark:text-zinc-400 text-xs uppercase tracking-wider border-b border-zinc-100 dark:border-zinc-800">
                <th className="pb-3 font-semibold">Date</th>
                <th className="pb-3 font-semibold">Category</th>
                <th className="pb-3 font-semibold">Type</th>
                <th className="pb-3 font-semibold text-right">Amount</th>
                {role === "admin" && <th className="pb-3 text-right">Action</th>}
              </tr>
            </thead>

            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {recentTransactions.map((t) => (
                <tr key={t.id} className="group hover:bg-zinc-50/50 dark:hover:bg-white/5 transition-colors">
                  <td className="py-4 text-sm font-medium">{t.date}</td>
                  <td className="py-4 text-sm text-zinc-600 dark:text-zinc-300">
                    <span className="bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded-lg text-[11px]">
                      {t.category}
                    </span>
                  </td>
                  <td className={`py-4 text-sm font-bold capitalize ${
                    t.type === "income" ? "text-emerald-500" : "text-rose-500"
                  }`}>
                    {t.type}
                  </td>
                  <td className="py-4 text-right font-black text-sm">
                    ₹{Number(t.amount).toLocaleString()}
                  </td>
                  
                
                  {role === "admin" && (
                    <td className="py-4 text-right">
                      <button 
                        onClick={() => dispatch(deleteTransaction(t.id))}
                        className="p-2 text-zinc-400 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-all active:scale-90"
                        title="Delete Transaction"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          
          <div className="py-12 flex flex-col items-center justify-center text-center bg-zinc-50/50 dark:bg-zinc-900/20 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800">
            <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-full mb-4 text-zinc-400">
              <Receipt size={32} />
            </div>
            <h3 className="text-lg font-bold mb-1">No transactions yet</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4 max-w-[200px]">
              Start tracking your finances by adding your first transaction.
            </p>
            {role === "admin" && (
              <Link 
                to="/transaction" 
                className="text-xs font-bold bg-emerald-600 text-white px-6 py-2.5 rounded-xl hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
              >
                Add Transaction
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentTransactions;