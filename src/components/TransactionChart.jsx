import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const TransactionChart = ({ transactions }) => {
  const sortedData = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));

  const chartData = sortedData.map(tx => ({
    name: tx.date,
    income: tx.type === 'income' ? Number(tx.amount) : 0,
    expense: tx.type === 'expense' ? Number(tx.amount) : 0,
  }));

  return (
    <div className="w-full lg:col-span-2 p-4 md:p-6 bg-white dark:bg-[#050c0c] rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-md ">
      <div className="flex flex-row justify-between items-center mb-6 px-2 ">
        <h3 className="text-sm md:text-lg font-bold">Income vs Expense</h3>
        <div className="flex gap-3 md:gap-4 text-[10px] md:text-xs font-medium">
          <span className="flex items-center gap-1"><div className="w-2 h-2 md:w-3 md:h-3 bg-emerald-500 rounded-full" /> Inc</span>
          <span className="flex items-center gap-1"><div className="w-2 h-2 md:w-3 md:h-3 bg-rose-500 rounded-full" /> Exp</span>
        </div>
      </div>


      <div className="overflow-x-auto sm:overflow-hidden custom-scrollbar pb-2 dark:bg-[#010404] rounded-xl ">
        <div className="h-[250px] md:h-[350px] min-w-[600px] md:min-w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#27272a" opacity={0.1} />
              
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 10, fill: '#71717a' }}
                tickLine={false}
                axisLine={false}
                padding={{ left: 10, right: 10 }}
              /> 
              
              <YAxis hide domain={['auto', 'dataMax + 500']} />

              <Tooltip 
                contentStyle={{ backgroundColor: '#18181b', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                cursor={{ stroke: '#52525b', strokeWidth: 1 }}
              /> 

              <Area 
                type="monotone" 
                dataKey="income" 
                stroke="#10b981" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorIncome)"
              />

              <Area 
                type="monotone" 
                dataKey="expense" 
                stroke="#f43f5e" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorExpense)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
     
    </div>
  );
};

export default TransactionChart;