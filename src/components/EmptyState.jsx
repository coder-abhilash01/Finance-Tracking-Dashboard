import { FileText } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'

const EmptyState = ({transactions,setSearch, search, role , setOpen}) => {
  return (
     <div className="flex flex-col items-center justify-center p-16 text-center animate-in fade-in zoom-in duration-500">
            <div className="bg-zinc-50 dark:bg-zinc-900/50 p-4 rounded-full mb-4 border border-zinc-100 dark:border-zinc-800">
              <FileText size={40} className="text-zinc-300 dark:text-zinc-700" />
            </div>

            {transactions.length > 0 ? (
              <>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
                  No matches found
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-500 mt-1 max-w-[250px] mx-auto leading-relaxed">
                  We couldn't find anything for "{search}". Try a different keyword.
                </p>
                <button
                  onClick={() => setSearch("")}
                  className="mt-4 text-xs font-bold text-emerald-600 hover:text-emerald-500 "
                >
                  Clear search
                </button>
              </>
            ) : (

              <>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
                  No Transactions Yet
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-500 mt-1 max-w-[250px] mx-auto leading-relaxed">
                  Your financial history is empty. Start by adding your first transaction.
                </p>
                {role === "admin" && (
                  <Button
                    onClick={() => setOpen(true)}
                    className="mt-4 bg-emerald-600 text-white text-xs font-bold px-6 rounded-xl h-9"
                  >
                    Add Now
                  </Button>
                )}
              </>
            )}
          </div>
  )
}

export default EmptyState
