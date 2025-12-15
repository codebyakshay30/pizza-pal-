import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Home, ShoppingBag, Sparkles, User, Menu, Pizza } from 'lucide-react';
import { useStore } from '../store';
import { motion, AnimatePresence } from 'framer-motion';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { cart } = useStore();
  const location = useLocation();
  const navigate = useNavigate();

  const isSplash = location.pathname === '/';
  
  if (isSplash) return <>{children}</>;

  return (
    <div className="min-h-screen bg-brand-white text-brand-black font-sans selection:bg-brand-neon selection:text-black">
      {/* Desktop Header */}
      <header className="sticky top-0 z-50 bg-brand-white/90 backdrop-blur-xl border-b border-gray-100 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
                {/* Logo */}
                <div 
                    onClick={() => navigate('/home')}
                    className="flex items-center gap-2 cursor-pointer group"
                >
                    <div className="w-10 h-10 bg-brand-black text-brand-neon rounded-full flex items-center justify-center transform group-hover:rotate-180 transition-transform duration-500">
                         <Pizza size={24} fill="currentColor" />
                    </div>
                    <div className="flex flex-col">
                        <h1 className="font-display text-2xl font-bold tracking-tighter leading-none">Pizza Pal</h1>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Smart Pizza</span>
                    </div>
                </div>

                {/* Desktop Nav Links */}
                <nav className="hidden md:flex items-center gap-2 bg-brand-gray p-1.5 rounded-full">
                    <NavLink to="/home" className={({isActive}) => `px-6 py-2 rounded-full text-sm font-bold transition-all ${isActive ? 'bg-brand-black text-white shadow-md' : 'text-gray-500 hover:text-black hover:bg-white'}`}>Home</NavLink>
                    <NavLink to="/ai" className={({isActive}) => `px-6 py-2 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${isActive ? 'bg-brand-neon text-black shadow-glow' : 'text-gray-500 hover:text-black hover:bg-white'}`}>
                        <Sparkles size={14} /> AI Chef
                    </NavLink>
                    <NavLink to="/orders" className={({isActive}) => `px-6 py-2 rounded-full text-sm font-bold transition-all ${isActive ? 'bg-brand-black text-white shadow-md' : 'text-gray-500 hover:text-black hover:bg-white'}`}>Orders</NavLink>
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-4">
                     <button onClick={() => navigate('/cart')} className="relative p-3 bg-brand-black text-white rounded-full hover:bg-brand-neon hover:text-black transition-all group">
                        <ShoppingBag size={20} />
                        {cart.length > 0 && (
                            <motion.span 
                                initial={{ scale: 0 }} animate={{ scale: 1 }}
                                className="absolute -top-1 -right-1 bg-brand-neon text-black text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold border-2 border-white"
                            >
                                {cart.length}
                            </motion.span>
                        )}
                     </button>
                </div>
            </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="min-h-[calc(100vh-80px)] w-full">
        <AnimatePresence mode="wait">
            <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="w-full"
            >
                {children}
            </motion.div>
        </AnimatePresence>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-6 left-6 right-6 bg-brand-black text-white py-4 px-8 z-50 rounded-full shadow-2xl flex justify-between items-center backdrop-blur-lg border border-white/10">
        <MobileNavItem to="/home" icon={<Home size={20} />} label="Home" />
        <MobileNavItem to="/ai" icon={<Sparkles size={20} />} label="AI" activeColor="text-brand-neon" />
        <MobileNavItem to="/orders" icon={<User size={20} />} label="Orders" />
        <div onClick={() => navigate('/cart')} className="relative cursor-pointer">
            <ShoppingBag size={20} className={cart.length > 0 ? 'text-brand-neon' : 'text-gray-400'} />
            {cart.length > 0 && <div className="absolute top-0 right-0 w-2 h-2 bg-brand-neon rounded-full animate-pulse"></div>}
        </div>
      </nav>
    </div>
  );
};

const MobileNavItem: React.FC<{ to: string; icon: React.ReactNode; label: string; activeColor?: string }> = ({ to, icon, label, activeColor = 'text-white' }) => {
    return (
        <NavLink 
            to={to} 
            className={({ isActive }) => 
                `flex flex-col items-center gap-1 transition-all duration-300 ${isActive ? activeColor : 'text-gray-500'}`
            }
        >
            {icon}
        </NavLink>
    )
}