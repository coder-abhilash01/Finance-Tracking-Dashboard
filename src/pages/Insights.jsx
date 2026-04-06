import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart2, 
  ArrowUpRight, 
  Activity,
  Download
} from 'lucide-react';
import { CSVLink } from 'react-csv';
import SpendingChart from '@/components/SpendingChart';

const Insights = () => {
  const { transactions } = useSelector((state) => state.finance);

  // --- Professional Financial Logic ---
  const stats = useMemo(() => {
    const inc = transactions
      .filter(t => t.type.toLowerCase() === 'income')
      .reduce((acc, t) => acc + Number(t.amount), 0);
    
    const exp = transactions
      .filter(t => t.type.toLowerCase() === 'expense')
      .reduce((acc, t) => acc + Number(t.amount), 0);

    const savings = inc - exp;
    const burnRate = inc > 0 ? ((exp / inc) * 100).toFixed(1) : 0;

    return { inc, exp, savings, burnRate };
  }, [transactions]);


  const csvReport = useMemo(() => {
    const headers = ["Date", "Category", "Type", "Amount"];
    const data = transactions.map(t => [t.date, t.category, t.type, `INR ${t.amount}`]);
    
    return [
      ["FINANCIAL AUDIT REPORT", new Date().toLocaleString()],
      ["Total Inflow", `INR ${stats.inc}`],
      ["Total Outflow", `INR ${stats.exp}`],
      ["Net Liquidity", `INR ${stats.savings}`],
      ["Burn Rate", `${stats.burnRate}%`],
      [], // Spacer
      headers,
      ...data
    ];
  }, [transactions, stats]);

  return (
    <div className="p-4 md:p-8 lg:p-12 min-h-screen bg-white dark:bg-[#090F0C] text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
      

      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight flex items-center gap-3">
            <Activity className="text-emerald-500" size={28} /> Performance Insights
          </h1>
          <p className="text-zinc-500 text-sm mt-1 font-medium">Real-time capital allocation and burn rate analysis.</p>
        </div>
        <div className="text-[10px] font-mono bg-zinc-100 dark:bg-zinc-800/50 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-500">
          SYSTEM UPDATED: {new Date().toLocaleDateString()}
        </div>
      </div>

   
      <div className="grid grid-cols-1 md:grid-cols-4 gap-0 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden mb-12 shadow-sm bg-white dark:bg-[#0E1511]">
        <div className="p-6 border-b md:border-b-0 md:border-r border-zinc-200 dark:border-zinc-800">
          <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2">Net Liquidity</p>
          <h3 className="text-2xl font-black">₹{stats.savings.toLocaleString()}</h3>
        </div>
        
        <div className="p-6 border-b md:border-b-0 md:border-r border-zinc-200 dark:border-zinc-800">
          <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2">Total Inflow</p>
          <div className="flex items-center gap-2 text-emerald-600">
            <h3 className="text-2xl font-black">₹{stats.inc.toLocaleString()}</h3>
            <TrendingUp size={18} />
          </div>
        </div>

        <div className="p-6 border-b md:border-b-0 md:border-r border-zinc-200 dark:border-zinc-800">
          <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2">Total Outflow</p>
          <div className="flex items-center gap-2 text-rose-600">
            <h3 className="text-2xl font-black">₹{stats.exp.toLocaleString()}</h3>
            <TrendingDown size={18} />
          </div>
        </div>

        <div className="p-6">
          <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2">Burn Rate</p>
          <h3 className="text-2xl font-black text-zinc-400">{stats.burnRate}%</h3>
        </div>
      </div>

      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
   
        <div className="lg:col-span-2 p-8 border border-zinc-200 dark:border-zinc-800 rounded-3xl bg-white dark:bg-[#0E1511] shadow-sm">
          <div className="flex items-center justify-between mb-10">
            <h4 className="font-bold text-lg flex items-center gap-2">
              <BarChart2 size={20} className="text-emerald-500" /> Capital Allocation
            </h4>
            <div className="flex gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500"></span>
              <span className="w-3 h-3 rounded-full bg-rose-500/20 border border-rose-500"></span>
            </div>
          </div>
          <div className="h-[350px] w-full">
            <SpendingChart transactions={transactions} />
          </div>
        </div>


        <div className="flex flex-col gap-6">
          <div className="p-6 border border-zinc-200 dark:border-zinc-800 rounded-3xl bg-white dark:bg-[#0E1511]">
            <h4 className="text-xs font-bold mb-6 uppercase tracking-widest text-zinc-400">Recent Movement</h4>
            <div className="space-y-5">
              {transactions.slice(-4).reverse().map((t, i) => (
                <div key={i} className="flex justify-between items-center group">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold group-hover:text-emerald-500 transition-colors">{t.category}</span>
                    <span className="text-[10px] text-zinc-500 font-medium uppercase">{t.date}</span>
                  </div>
                  <span className={`text-xs font-black ${t.type === 'income' ? 'text-emerald-600' : 'text-zinc-400'}`}>
                    {t.type === 'income' ? '+' : '-'} ₹{Number(t.amount).toLocaleString()}
                  </span>
                </div>
              ))}
              {transactions.length === 0 && <p className="text-xs text-zinc-500 italic">No activity recorded</p>}
            </div>
          </div>

        
          <CSVLink 
            data={csvReport} 
            filename={`Audit_Report_${new Date().toISOString().split('T')[0]}.csv`}
            className="block"
          >
            <button className="w-full py-4 bg-zinc-900 dark:bg-emerald-600 hover:bg-zinc-800 dark:hover:bg-emerald-500 text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-3 transition-all active:scale-95 shadow-xl shadow-emerald-500/10">
              <Download size={18} /> Download Audit Report
            </button>
          </CSVLink>
          
          <p className="text-[10px] text-center text-zinc-500 font-medium px-4">
            *This report includes all calculated liquidity and transaction history stored in local state.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Insights;