import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    ReceiptIndianRupee,
    PieChart,
    Settings,
    LogOut,
    ChevronLeft,
    ChevronRight,
    Wallet,
    X
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { closeMobileMenu } from '@/store/financesSlice';
import RoleToggle from './RoleToggle';

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const location = useLocation();
    const dispatch = useDispatch();
    const { isMobileMenuOpen } = useSelector((state) => state.finance);

   
    useEffect(() => {
        dispatch(closeMobileMenu());
    }, [location.pathname, dispatch]);

    const menuItems = [
        { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/' },
        { icon: <ReceiptIndianRupee size={20} />, label: 'Transactions', path: '/transaction' },
        { icon: <PieChart size={20} />, label: 'Insights', path: '/insights' },
        { icon: <Settings size={20} />, label: 'Settings', path: '/settings' },
    ];

    return (
        <>
  
            {isMobileMenuOpen && (
                <div 
                    onClick={() => dispatch(closeMobileMenu())} 
                    className='fixed inset-0 bg-black/80 backdrop-blur-md z-[60] md:hidden transition-opacity duration-300'
                ></div>
            )}

          
            <div className={`fixed md:relative flex flex-col h-screen transition-all duration-300 border-r z-[70] 

                w-[280px] ${isCollapsed ? 'md:w-20' : 'md:w-64'} 
                

                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                
                bg-[#0E1511] border-[#142929] text-emerald-50`}
            >

        
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsCollapsed(!isCollapsed);
                    }}
                    className="hidden md:flex absolute -right-3 top-8 bg-emerald-500 text-white rounded-full p-1 shadow-[0_0_10px_rgba(16,185,129,0.4)] hover:bg-emerald-400 transition-all active:scale-90 z-[80] cursor-pointer"
                >
                    {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
                </button>

              
                {isMobileMenuOpen && (
                    <button
                        onClick={() => dispatch(closeMobileMenu())}
                        className="md:hidden absolute right-4 top-5 text-white/70 hover:text-white"
                    >
                        <X size={24} />
                    </button>
                )}

        
                <div className="flex p-6 mb-2 items-center gap-3 mt-10 md:mt-2">
                    <div className="bg-emerald-500 p-2 rounded-xl text-white shadow-lg shadow-emerald-500/20 shrink-0">
                        <Wallet size={24} />
                    </div>

                    <span className={`font-bold text-xl tracking-tight line-clamp-1 transition-opacity duration-200 
                        ${isCollapsed ? 'md:hidden' : 'block'}`}>
                        FinanceApp
                    </span>
                </div>

           
                <nav className="flex-1 px-4 space-y-1.5 mt-4">
                    {menuItems.map((item, index) => {
                        const isActive = item.path === '/' 
                            ? location.pathname === '/' 
                            : location.pathname.startsWith(item.path);

                        return (
                            <NavLink
                                key={index}
                                to={item.path}
                                className={`
                                    relative flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all duration-200 group
                                    ${isActive 
                                        ? 'bg-[#19211D] text-white border border-emerald-500/10 shadow-inner' 
                                        : 'hover:bg-white/5 text-emerald-100/60 hover:text-white border border-transparent'}
                                    ${isCollapsed ? 'md:justify-center' : 'justify-start'}
                                `}
                            >
                                {isActive && (
                                    <div className="absolute left-0 w-1 h-5 bg-emerald-500 rounded-r-full shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                                )}
                                
                                <span className={`${isActive ? 'text-emerald-400' : 'group-hover:text-emerald-300'} transition-colors shrink-0`}>
                                    {item.icon}
                                </span>

                            
                                <span className={`font-medium text-sm whitespace-nowrap line-clamp-1 transition-opacity duration-200
                                    ${isCollapsed ? 'md:hidden' : 'block'}`}>
                                    {item.label}
                                </span>

                             
                                {isCollapsed && (
                                    <div className="hidden md:group-hover:block absolute left-20 bg-zinc-800 text-white px-2 py-1 rounded text-xs pointer-events-none whitespace-nowrap z-[100]">
                                        {item.label}
                                    </div>
                                )}
                            </NavLink>
                        );
                    })}
                </nav>

 
                <div className=" flex p-4 border-t border-emerald-900/20">
                    <button className={`w-full hidden md:flex items-center gap-3 p-3 rounded-xl text-white/70 hover:text-white hover:bg-white/5 transition-all
                        ${isCollapsed ? 'md:justify-center' : 'justify-start'}`}>
                        <LogOut size={20} className="shrink-0" />
                        <span className={`font-medium text-sm whitespace-nowrap line-clamp-1 transition-opacity duration-200
                            ${isCollapsed ? 'md:hidden' : 'block'}`}>
                            Sign Out
                        </span>
                    </button>

                    <RoleToggle className="flex md:hidden bg-[#0E1511] border-zinc-200/8"/>
                </div>
            </div>
        </>
    );
};

export default Sidebar;