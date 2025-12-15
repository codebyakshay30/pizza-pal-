import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Plus, ArrowRight, Star, Sparkles, TrendingUp } from 'lucide-react';
import { MOCK_PIZZAS } from '../store';
import { Pizza } from '../types';

export const Home: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'Veg' | 'Non-Veg' | 'Premium'>('All');
  const navigate = useNavigate();

  const filteredPizzas = (filter === 'All' 
    ? MOCK_PIZZAS 
    : MOCK_PIZZAS.filter(p => p.category === filter)) || [];

  return (
    <div className="pb-24 w-full min-h-screen">
      {/* Modern Hero Section */}
      <section className="px-4 pt-4 mb-12 max-w-7xl mx-auto">
        <div className="bg-brand-black rounded-[2.5rem] p-8 md:p-16 text-white relative overflow-hidden shadow-2xl">
            {/* Background pattern */}
            <div className="absolute top-0 right-0 w-full h-full opacity-10 bg-[radial-gradient(#CCFF00_1px,transparent_1px)] [background-size:20px_20px]"></div>
            
            <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-brand-neon text-xs font-bold uppercase tracking-widest mb-6 border border-white/5"
                    >
                        <Sparkles size={14} /> AI-Powered Recommender
                    </motion.div>
                    
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="font-display text-5xl md:text-7xl font-bold leading-[0.95] mb-6 tracking-tight"
                    >
                        Pizza so good, <br/>
                        <div className="relative inline-block mt-2 mr-2">
                            <span className="relative z-10 text-brand-neon italic pr-2">you’ll ghost</span>
                            {/* Highlighter animation */}
                            <motion.div 
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ delay: 1.0, duration: 0.8, ease: "circOut" }}
                                className="absolute bottom-2 left-[-5px] right-[-5px] h-1/2 bg-white/10 -skew-x-6 origin-left z-0 rounded-sm"
                            />
                        </div>
                        <br className="md:hidden" />
                        your diet. 
                        <motion.span 
                            initial={{ opacity: 0, scale: 0, rotate: -20 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            transition={{ delay: 1.2, type: "spring" }}
                            className="inline-block ml-2 md:ml-4"
                        >
                            👻
                        </motion.span>
                    </motion.h1>

                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-gray-400 text-lg mb-8 max-w-md"
                    >
                        Describe your mood, and let our AI Chef craft the perfect pizza for you instantly.
                    </motion.p>
                    <motion.button 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        onClick={() => navigate('/ai')}
                        className="bg-white text-brand-black px-8 py-4 rounded-full font-bold text-lg hover:bg-brand-neon transition-colors shadow-glow flex items-center gap-2"
                    >
                        Try AI Chef <ArrowRight size={18} />
                    </motion.button>
                </div>
                
                <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, type: 'spring' }}
                    className="relative hidden md:block"
                >
                    <div className="absolute inset-0 bg-brand-neon/20 blur-3xl rounded-full transform scale-75"></div>
                    <img 
                        src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80" 
                        alt="Hero Pizza" 
                        className="relative z-10 w-full object-contain drop-shadow-2xl hover:rotate-2 transition-transform duration-700"
                    />
                     {/* Floating Badge */}
                     <motion.div 
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 3 }}
                        className="absolute -bottom-6 -left-6 bg-white text-brand-black p-4 rounded-2xl shadow-float z-20 max-w-[150px]"
                    >
                        <div className="flex items-center gap-2 mb-1">
                            <TrendingUp size={16} className="text-brand-neon fill-current" />
                            <span className="font-bold text-xs uppercase">Trending</span>
                        </div>
                        <p className="text-sm font-bold leading-tight">Mushroom Truffle Delight</p>
                    </motion.div>
                </motion.div>
            </div>
        </div>
      </section>

      {/* Menu Filter */}
      <div className="max-w-7xl mx-auto px-6 mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <h2 className="font-display text-3xl font-bold">Menu</h2>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {['All', 'Veg', 'Non-Veg', 'Premium'].map(cat => (
                <button
                    key={cat}
                    onClick={() => setFilter(cat as any)}
                    className={`px-6 py-2 rounded-full text-sm font-bold border-2 transition-all whitespace-nowrap ${
                        filter === cat 
                        ? 'bg-brand-black border-brand-black text-white' 
                        : 'border-gray-200 text-gray-500 hover:border-brand-black hover:text-brand-black'
                    }`}
                >
                    {cat}
                </button>
            ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
            <AnimatePresence mode="sync">
                {filteredPizzas.map((pizza, index) => (
                    <PizzaCard 
                        key={pizza.id} 
                        pizza={pizza} 
                        index={index} 
                        onClick={() => navigate(`/pizza/${pizza.id}`)}
                        onCustomize={() => navigate(`/customize/${pizza.id}`)} 
                    />
                ))}
            </AnimatePresence>
            
            {filteredPizzas.length === 0 && (
                <div className="col-span-full text-center py-20 text-gray-400">
                    <p>No pizzas found in this category.</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

const PizzaCard: React.FC<{ pizza: Pizza; index: number; onClick: () => void; onCustomize: () => void }> = ({ pizza, index, onClick, onCustomize }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      onClick={onClick}
      className="group bg-white rounded-3xl overflow-hidden cursor-pointer shadow-soft hover:shadow-float transition-all duration-300 border border-transparent hover:border-gray-100 flex flex-col h-full"
    >
      <div className="relative aspect-square overflow-hidden bg-brand-gray/50">
        <img 
          src={pizza.image} 
          alt={pizza.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
          loading="lazy"
        />
        <div className="absolute top-4 left-4">
             <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                 pizza.category === 'Veg' ? 'bg-green-100 text-green-800' : 
                 pizza.category === 'Premium' ? 'bg-brand-black text-brand-neon' : 'bg-red-100 text-red-800'
             }`}>
                 {pizza.category}
             </span>
        </div>
        <button className="absolute bottom-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-brand-neon hover:text-black transition-colors transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 duration-300">
            <Plus size={20} />
        </button>
      </div>
      
      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
            <h3 className="font-display text-xl font-bold leading-tight group-hover:text-brand-dark-gray transition-colors">{pizza.name}</h3>
            <div className="flex items-center gap-1 text-xs font-bold bg-gray-100 px-2 py-1 rounded-md">
                <Star size={10} className="fill-brand-black" /> {pizza.rating}
            </div>
        </div>
        <p className="text-gray-400 text-sm line-clamp-2 mb-4 font-light flex-1">{pizza.description}</p>
        <div className="flex items-center justify-between mt-auto">
            <span className="text-lg font-bold text-brand-black">₹{pizza.price}</span>
            <span 
                onClick={(e) => {
                    e.stopPropagation();
                    onCustomize();
                }}
                className="text-xs text-gray-400 font-medium underline group-hover:text-brand-black transition-colors hover:font-bold cursor-pointer"
            >
                Customize
            </span>
        </div>
      </div>
    </motion.div>
  );
};
