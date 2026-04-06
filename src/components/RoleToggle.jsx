import React from 'react';
import { User, ShieldCheck } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { closeMobileMenu, setRole } from '@/store/financesSlice';

const RoleToggle = ({ className = "" }) => {
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.finance);

  const handleRoleToggle = (newRole) => {
    if (role === newRole) return;
    
   
    dispatch(setRole(newRole));
  
 
    setTimeout(() => {
      dispatch(closeMobileMenu());
    }, 400); 
  };

  return (
    <div className={`flex items-center dark:bg-[#0E1511] p-1 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-inner ${className}`}>

      <button 
        onClick={() => handleRoleToggle("user")}
        className={`flex flex-1 items-center justify-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 cursor-pointer 
          ${role === "user" 
            ? 'bg-white dark:bg-zinc-800 shadow-md text-emerald-500 scale-[1.02]' 
            : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-400'}`}
      >
        <User size={14} /> 
        <span className="text-[11px] uppercase tracking-wider">User</span>
      </button>

 
      <button 
        onClick={() => handleRoleToggle("admin")}
        className={`flex flex-1 items-center justify-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 cursor-pointer
          ${role === "admin" 
            ? 'bg-white dark:bg-zinc-800 shadow-md text-emerald-500 scale-[1.02]' 
            : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-400'}`}
      >
        <ShieldCheck size={14} /> 
        <span className="text-[11px] uppercase tracking-wider">Admin</span>
      </button>
    </div>
  );
};

export default RoleToggle;