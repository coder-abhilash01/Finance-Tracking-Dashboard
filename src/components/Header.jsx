import React, { useState, useEffect } from 'react'
import { Sun, Moon, ShieldCheck, User, MenuIcon, Wallet } from 'lucide-react'
import { setRole, toggleMobileMenu } from '@/store/financesSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from './ui/button';
import RoleToggle from './RoleToggle';

const Header = () => {
  const [isDark, setIsDark] = useState(false);
  const dispatch = useDispatch();
  const { role } = useSelector(state => state.finance);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
    
  
    const savedRole = localStorage.getItem("role");
    if (savedRole && savedRole !== role) {
      dispatch(setRole(savedRole));
    }
  }, []);

  const toggleTheme = () => {
    const isNowDark = document.documentElement.classList.toggle("dark");
    setIsDark(isNowDark);
    localStorage.setItem("theme", isNowDark ? "dark" : "light");
  };

  const handleRoleToggle = (newRole) => {
    localStorage.setItem("role", newRole);
    dispatch(setRole(newRole));
  };

  return (
    <nav className='w-full bg-white dark:bg-[#090F0C] text-zinc-900 dark:text-zinc-100 p-4 md:px-8 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between sm:justify-end sticky top-0 z-30'>
      

  
        
                <div className=" sm:hidden flex items-center gap-3 ">
                    <div className="bg-emerald-500 p-2 rounded-xl text-white shadow-md shadow-emerald-500/20">
                        <Wallet size={24} />
                    </div>
                        <span className="font-bold text-xl tracking-tight whitespace-nowrap">FinanceApp</span>
                  
                </div>
     

      <div className="flex items-center gap-4  ">
        
     
      
        <RoleToggle className="hidden md:flex"/>

    
        <button 
          onClick={toggleTheme} 
          className="relative h-10 w-10 flex items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:ring-2 cursor-pointer ring-emerald-500/20 transition-all duration-300 group overflow-hidden"
          aria-label="Toggle Theme "
        >
          <Sun className={`h-5 w-5 text-orange-500 transition-all duration-500 ${isDark ? 'translate-y-10 opacity-0' : 'translate-y-0 opacity-100'}`} />
          <Moon className={`absolute h-5 w-5 text-blue-400 transition-all duration-500 ${isDark ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`} />
        </button>

     
        <Button 
          variant="outline" 
          size="icon" 
          className="md:hidden border-zinc-200 dark:border-zinc-800 bg-transparent"
          onClick={() => dispatch(toggleMobileMenu())}
        >
          <MenuIcon size={20} />
        </Button>

      </div>
    </nav>
  )
}

export default Header