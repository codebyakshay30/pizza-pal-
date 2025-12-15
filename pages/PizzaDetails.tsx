import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Flame, Star, ChevronRight, ArrowLeft, Heart } from 'lucide-react';
import { MOCK_PIZZAS, useStore } from '../store';

export const PizzaDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toggleFavorite, favorites } = useStore();
  const pizza = MOCK_PIZZAS.find(p => p.id === id);

  if (!pizza) return <div>Pizza not found</div>;

  const isFav = favorites.includes(pizza.id);

  return (
    <div className="min-h-screen pt-4 pb-12 relative overflow-hidden bg-brand-white">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-brand-neon/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <button 
            onClick={() => navigate('/home')} 
            className="mb-6 p-3 rounded-full bg-white hover:bg-gray-50 shadow-soft text-brand-black transition-all hover:scale-105 border border-gray-100"
        >
            <ArrowLeft size={24} />
        </button>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            {/* Left Column: Visual */}
            <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative"
            >
                <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                    className="relative z-10 p-4 border border-gray-100 rounded-full bg-white shadow-soft"
                >
                    <div className="relative aspect-square rounded-full overflow-hidden">
                        <img 
                            src={pizza.image} 
                            alt={pizza.name} 
                            className="w-full h-full object-cover rounded-full" 
                        />
                    </div>
                </motion.div>
                
                {/* Floating Info Cards */}
                <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="absolute -bottom-6 -right-6 md:right-10 bg-white p-5 rounded-2xl shadow-float z-20 border-l-4 border-brand-neon max-w-[200px]"
                >
                    <div className="flex items-center gap-2 mb-2">
                        <Flame className="text-brand-black" size={20} />
                        <span className="font-bold text-brand-black">Energy</span>
                    </div>
                    <p className="text-sm text-gray-500">Contains approx <span className="text-brand-black font-bold">{pizza.calories || 250} kcal</span> per slice.</p>
                </motion.div>
            </motion.div>

            {/* Right Column: Content */}
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-8"
            >
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest ${pizza.category === 'Veg' ? 'bg-green-100 text-green-800' : pizza.category === 'Non-Veg' ? 'bg-red-100 text-red-800' : 'bg-brand-black text-brand-neon'}`}>
                            {pizza.category}
                        </span>
                        <button onClick={() => toggleFavorite(pizza.id)} className="p-3 rounded-full bg-white shadow-soft hover:bg-gray-50 transition-colors border border-gray-100">
                            <Heart size={20} className={isFav ? "fill-brand-black text-brand-black" : "text-gray-400"} />
                        </button>
                    </div>
                    
                    <h1 className="font-display text-5xl md:text-7xl text-brand-black leading-none mb-4 tracking-tight">{pizza.name}</h1>
                    <div className="flex items-center gap-4">
                         <h2 className="text-4xl font-bold text-brand-black border-b-4 border-brand-neon inline-block leading-[0.8]">₹{pizza.price}</h2>
                         <div className="h-8 w-[1px] bg-gray-200"></div>
                         <div className="flex items-center gap-1.5">
                            <Star className="fill-brand-black text-brand-black" size={18} />
                            <span className="font-bold text-lg text-brand-black">{pizza.rating}</span>
                         </div>
                    </div>
                </div>

                <p className="text-gray-500 text-lg leading-relaxed font-light">
                    {pizza.description}
                </p>

                <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Ingredients</h3>
                    <div className="flex flex-wrap gap-3">
                        {pizza.ingredients.map(ing => (
                            <div key={ing} className="bg-brand-gray px-4 py-2 rounded-lg text-brand-black font-medium text-sm">
                                {ing}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="pt-6 flex flex-col sm:flex-row gap-4">
                    <button 
                        onClick={() => navigate(`/customize/${pizza.id}`)}
                        className="flex-1 bg-brand-black text-white py-5 px-8 rounded-xl font-bold text-lg shadow-lg hover:bg-brand-neon hover:text-black transition-all flex items-center justify-center gap-3 group"
                    >
                        Customize Pizza
                        <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button className="sm:w-auto px-8 py-5 rounded-xl border-2 border-brand-black text-brand-black font-bold hover:bg-brand-black hover:text-white transition-colors">
                        Quick Add
                    </button>
                </div>
            </motion.div>
        </div>
      </div>
    </div>
  );
};