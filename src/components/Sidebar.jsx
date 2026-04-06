import React, { useState } from 'react';
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

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const location = useLocation();
    const dispatch = useDispatch();
    const { isMobileMenuOpen } = useSelector((state) => state.finance);

    const menuItems = [
        { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/' },
        { icon: <ReceiptIndianRupee size={20} />, label: 'Transactions', path: '/transaction' },
        { icon: <PieChart size={20} />, label: 'Insights', path: '/insights' },
        { icon: <Settings size={20} />, label: 'Settings', path: '/settings' },
    ];

    return (
        <>
      
            {isMobileMenuOpen && (
                <div onClick={() => dispatch(closeMobileMenu())} className='fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] md:hidden'></div>
            )}

            <div className={`fixed md:relative flex flex-col h-screen transition-all duration-300 border-r z-[70] 
                ${isCollapsed ? 'md:w-20' : 'w-64'} 
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                bg-[#0E1511] border-[#142929] text-emerald-50`}
            >

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsCollapsed(!isCollapsed);
                    }}
                    className="hidden md:flex absolute -right-3 top-8 bg-emerald-500 text-white rounded-full p-1 shadow-[0_0_10px_rgba(16,185,129,0.4)] hover:bg-emerald-400 transition-all active:scale-90 z-[80]"
                >
                    {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
                </button>

              
                {isMobileMenuOpen && (
                    <button
                        onClick={() => dispatch(closeMobileMenu())}
                        className="md:hidden absolute right-4 top-5 text-white/70"
                    >
                        <X size={24} />
                    </button>
                )}

            
                <div className="flex p-6 mb-2 items-center gap-3 mt-2 overflow-hidden">
                    <div className="bg-emerald-500 p-2 rounded-xl text-white shadow-lg shadow-emerald-500/20 shrink-0">
                        <Wallet size={24} />
                    </div>
                    {!isCollapsed && <span className="font-bold text-xl tracking-tight animate-in fade-in slide-in-from-left-2">FinanceApp</span>}
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
                                onClick={() => dispatch(closeMobileMenu())}
                                className={`
                                    relative flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all duration-200 group
                                    ${isActive 
                                        ? 'bg-[#19211D] text-white border border-emerald-500/10 shadow-inner' 
                                        : 'hover:bg-white/5 text-emerald-100/60 hover:text-white border border-transparent'}
                                    ${isCollapsed ? 'justify-center' : ''}
                                `}
                            >
                                {isActive && (
                                    <div className="absolute left-0 w-1 h-5 bg-emerald-500 rounded-r-full shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                                )}
                                
                                <span className={`${isActive ? 'text-emerald-400' : 'group-hover:text-emerald-300'} transition-colors`}>
                                    {item.icon}
                                </span>

                                {!isCollapsed && (
                                    <span className="font-medium text-sm whitespace-nowrap line-clamp-1">{item.label}</span>
                                )}

                                {isCollapsed && (
                                    <div className="absolute left-20 bg-zinc-800 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 pointer-events-none transition-all translate-x-[-5px] group-hover:translate-x-0 whitespace-nowrap z-[100]">
                                        {item.label}
                                    </div>
                                )}
                            </NavLink>
                        );
                    })}
                </nav>

                {/* Sign Out */}
                <div className="p-4 border-t border-emerald-900/20">
                    <button className={`w-full flex items-center gap-3 p-3 rounded-xl text-white text-nowrap line-clamp-1 ${isCollapsed ? 'justify-center' : ''}`}>
                        <LogOut size={20} />
                        {!isCollapsed && <span className="font-medium text-sm">Sign Out</span>}
                    </button>
                </div>
            </div>
        </>
    );
};

export default Sidebar;