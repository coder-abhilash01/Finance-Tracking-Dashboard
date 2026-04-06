import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const PageNotFound = () => {
    return (
        <div className="h-screen w-full bg-white dark:bg-[#090F0C] flex flex-col items-center justify-center text-zinc-900 dark:text-emerald-50 px-6 overflow-hidden select-none transition-colors duration-300">
            

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/5 dark:bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="relative z-10 text-center">
               
                <h1 className="text-[10rem] md:text-[16rem] font-black leading-none tracking-tighter text-zinc-100 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-b dark:from-emerald-400/20 dark:to-transparent">
                    404
                </h1>
                
                <div className="mt-[-2rem] md:mt-[-4rem]">
                  
                    <h2 className="text-zinc-900 dark:text-white text-3xl md:text-5xl font-bold tracking-tight mb-4">
                        Page Not Found
                    </h2>
                    <p className="text-zinc-500 dark:text-emerald-100/40 max-w-md mx-auto mb-10 text-lg leading-relaxed">
                        The resource you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                        <Link 
                            to="/" 
                            className="group flex items-center gap-2 bg-emerald-600 dark:bg-emerald-500 hover:bg-emerald-700 dark:hover:bg-emerald-400 text-white dark:text-[#090F0C] px-8 py-4 rounded-2xl font-semibold transition-all active:scale-95 shadow-lg shadow-emerald-500/20"
                        >
                            <Home size={18} />
                            Return to Dashboard
                        </Link>
                        
                        <button 
                            onClick={() => window.history.back()}
                            className="flex items-center gap-2 border border-zinc-200 dark:border-emerald-500/20 hover:bg-zinc-50 dark:hover:bg-emerald-500/5 px-8 py-4 rounded-2xl font-medium transition-all text-zinc-600 dark:text-emerald-100/60 hover:text-zinc-900 dark:hover:text-emerald-50"
                        >
                            <ArrowLeft size={18} />
                            Go Back
                        </button>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-10 text-zinc-400 dark:text-emerald-500/20 font-mono text-xs tracking-[0.2em] uppercase">
                System Status: 404 // Resource Unavailable
            </div>
        </div>
    );
};

export default PageNotFound;