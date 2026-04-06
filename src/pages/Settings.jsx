import React from 'react';
import { User } from 'lucide-react';

const Settings = () => {
  return (

    <div className="flex  justify-center min-h-screen bg-white dark:bg-[#090F0C] p-6 ">
      
      <div className="w-full max-w-sm">
     
        <div className="text-center mb-8">
          <h1 className="text-4xl font-semibold text-zinc-900 dark:text-zinc-100">Settings</h1>
          <p className="text-zinc-500 text-xs mt-1">Local app preferences</p>
        </div>

     
        <div className="p-6 border border-zinc-100 dark:border-zinc-800 rounded-3xl bg-zinc-50/50 dark:bg-white/5 flex flex-col items-center text-center gap-3">
          <div className="h-12 w-12 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold text-sm">
            G
          </div>
          <div>
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Guest User</h3>
            <p className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase">ID: 0x4B2F9A</p>
          </div>
          
          <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800 w-full">
             <p className="text-[10px] text-zinc-400 ">No login required for local sessions.</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Settings;