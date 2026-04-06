import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

const SpendingChart = ({ transactions }) => {
  const data = useMemo(() => {
    const totals = transactions
      .filter(tx => tx.type === 'expense')
      .reduce((acc, tx) => {
        acc[tx.category] = (acc[tx.category] || 0) + Number(tx.amount);
        return acc;
      }, {});

    return Object.keys(totals).map(name => ({
      name,
      value: totals[name]
    }));
  }, [transactions]);

  const totalExpense = data.reduce((sum, item) => sum + item.value, 0);

  return (
    // 1. Parent div ko 'relative' aur 'flex' banaya taaki har cheez center ho sake
    <div className="h-[310px] w-full relative flex items-center justify-center ">
      
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%" // Horizontal Center
            cy="50%" // Vertical Center
            innerRadius={70}
            outerRadius={90}
            paddingAngle={5}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ backgroundColor: '#18181b', border: 'none', borderRadius: '8px' }}
          />
          
          <Legend verticalAlign="bottom" align="center" iconType="circle" />
        </PieChart>
      </ResponsiveContainer>
      

      <div className="absolute inset-0 mb-12  flex flex-col items-center justify-center pointer-events-none ">
         <span className="text-[14px] text-gray-500  font-bold tracking-tighter">Total Expanse</span>
         <span className="text-xl font-bold dark:text-white leading-none">
           ₹{totalExpense.toLocaleString()}
         </span>
      </div>
      
    </div>
  );
};

export default SpendingChart;