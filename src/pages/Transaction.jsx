import EmptyState from '@/components/EmptyState';
import NewTransactionDialog from '@/components/NewTransactionDialog';
import TransactionTable from '@/components/TransactionTable';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { deleteTransaction } from '@/store/financesSlice';
import { Plus, Trash2, Download, Search, FileText } from 'lucide-react';
import React, { useState, useMemo } from 'react'
import { CSVLink } from 'react-csv';
import { useDispatch, useSelector } from 'react-redux';

const Transaction = () => {
  const { transactions, role } = useSelector(state => state.finance)
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const filteredTransactions = useMemo(() => {
    const query = search.toLowerCase().trim();
    if (!query) return transactions;

    return transactions.filter((tx) =>
      tx.category.toLowerCase().includes(query) ||
      tx.type.toLowerCase().includes(query) ||
      tx.date.toLowerCase().includes(query) ||
      tx.amount.toString().includes(query)
    );
  }, [search, transactions]);
  return (
    <div className="p-4 md:p-8 min-h-screen bg-white dark:bg-[#090F0C] ">

      <div className="flex flex-col gap-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-zinc-900 dark:text-white">
            Transactions History
          </h2>


          <div className="flex items-center gap-2">
            {role === "admin" && (
              <>
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <Button className="flex-1 md:flex-none bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 rounded-xl gap-2 text-xs font-bold h-10 px-4 transition-transform active:scale-95 cursor-pointer">
                      <Plus size={16} /> <span>Add New</span>
                    </Button>
                  </DialogTrigger>
                  <NewTransactionDialog setOpen={setOpen} />
                </Dialog>

                {role === "admin" && (
                  <CSVLink
                    data={transactions}
                    filename={"transactions.csv"}
                    onClick={(event) => {
                      if (transactions.length === 0) {
                        event.preventDefault();
                        return false;
                      }
                    }}
                  >
                    <Button
                      variant="outline"
                      disabled={transactions.length === 0}
                      className={`rounded-xl gap-2 text-xs font-bold h-10 px-4 transition-all
        ${transactions.length === 0
                          ? 'opacity-50 cursor-not-allowed border-zinc-200 dark:border-zinc-800'
                          : 'border-zinc-200 dark:border-zinc-800 dark:bg-[#0E1511] hover:bg-zinc-50 dark:hover:bg-zinc-900 shadow-md shadow-black/5 cursor-pointer active:scale-95'
                        }`}
                    >
                      <Download size={16} />
                      <span>Export CSV</span>
                    </Button>
                  </CSVLink>
                )}
              </>
            )}
          </div>
        </div>


        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
          <Input
            type="text"
            placeholder="Search category, date or amount..."
            className="pl-10 h-11 w-full shadow-inner border-zinc-200 dark:border-zinc-800 dark:bg-[#060908] rounded-xl focus:ring-2 ring-emerald-500/20 transition-all outline-none"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>


      <div className="bg-white dark:bg-[#0E1511] border border-zinc-200 dark:border-[#142929] rounded-2xl overflow-hidden shadow-xl shadow-black/5 ">

       {filteredTransactions.length > 0 ? (
    /* Agar transactions hain, toh table dikhao */
    <TransactionTable filteredTransactions={filteredTransactions} />
  ) : (
    /* Agar zero hain, toh sirf EmptyState dikhao (Headers bhi gayab ho jayenge) */
    <EmptyState 
      transactions={transactions} 
      setSearch={setSearch} 
      search={search} 
      role={role} 
      setOpen={setOpen} 
    />
  )}
      </div>
    </div>
  )
}

export default Transaction;