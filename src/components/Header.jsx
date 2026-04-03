import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Sun, Moon } from 'lucide-react'

const Header = () => {
  // Check initial state to sync icon with theme
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark")
  );

  const toggleTheme = () => {
    const isNowDark = document.documentElement.classList.toggle("dark");
    setIsDark(isNowDark);
    localStorage.setItem("theme", isNowDark ? "dark" : "light");
  };

  return (
    <nav className='w-full bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 p-4 md:p-6 shadow-sm dark:shadow-white/5 border-b border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row items-center justify-between transition-colors duration-300'>
      
      <h1 className="text-xl font-bold tracking-tight">Finance<span className="text-blue-600">App</span></h1>

      <ul className="flex space-x-8 mt-4 md:mt-0 font-medium text-sm">
        <Link to="/" className="hover:text-blue-600 transition-colors">Dashboard</Link>
        <Link to="/transactions" className="hover:text-blue-600 transition-colors">Transactions</Link>
        <Link to="/insights" className="hover:text-blue-600 transition-colors">Insights</Link>
      </ul>

      {/* PREMIUM TOGGLE BUTTON */}
      <button 
        onClick={toggleTheme} 
        className="mt-4 md:mt-0 relative inline-flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:ring-2 ring-blue-500/20 transition-all duration-300 group overflow-hidden"
      >
        {/* Sun Icon (Visible in Light Mode) */}
        <Sun className={`h-5 w-5 text-orange-500 transition-all duration-500 ${isDark ? 'translate-y-10 opacity-0' : 'translate-y-0 opacity-100'}`} />
        
        {/* Moon Icon (Visible in Dark Mode) */}
        <Moon className={`absolute h-5 w-5 text-blue-400 transition-all duration-500 ${isDark ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`} />
        
        <span className="sr-only">Toggle Theme</span>
      </button>

    </nav>
  )
}

export default Header