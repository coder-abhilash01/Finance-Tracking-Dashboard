import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const SummaryCard = ({ title, value, color, icon: Icon, trend }) => {
  return (
    <div className="relative overflow-hidden bg-white dark:bg-[#0E1511] border border-zinc-200 dark:border-[#142929] p-6 rounded-2xl shadow-sm hover:shadow-xl hover:border-emerald-500/30  group">
      
 

      <div className="flex justify-between items-start relative z-10">
        <div className="space-y-2">
        
          <h2 className=" text-[12px] font-black uppercase tracking-[0.1em] text-zinc-400 dark:text-zinc-500">
            Total {title}
          </h2>
          
          <div className="flex flex-col">
            <p className={`text-2xl xl:text-3xl font-black tracking-wide ${color}`}>
              ₹{value.toLocaleString('en-IN')}
            </p>
            
         
           
          </div>
        </div>

  
        {Icon && (
          <div className="p-3 rounded-xl bg-zinc-50 dark:bg-[#0a1818] border border-zinc-100 dark:border-[#1c3333] shadow-inner  group-hover:scale-110 group-hover:rotate-3 group-hover:bg-white dark:group-hover:bg-[#142929]">
            <Icon size={20} className={color} />
          </div>
        )}
      </div>

      
    </div>
  );
};

export default SummaryCard;