import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, Loader2, ArrowLeft, Wand2, ChefHat } from 'lucide-react';
import { getPizzaRecommendations } from '../services/geminiService';
import { Pizza } from '../types';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';

export const AIRecommender: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<Pizza[]>([]);
  const navigate = useNavigate();
  const addToCart = useStore(state => state.addToCart);

  const handleSearch = async () => {
    if (!prompt.trim()) return;
    setIsLoading(true);
    setRecommendations([]); 
    const results = await getPizzaRecommendations(prompt);
    setRecommendations(results);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen pt-4 pb-24 bg-brand-white">
      
      {/* Header */}
      <div className="flex items-center gap-4 mb-6 px-4 max-w-4xl mx-auto">
        <button 
            onClick={() => navigate('/home')} 
            className="p-3 bg-brand-gray rounded-full hover:bg-brand-black hover:text-white transition-all text-brand-black"
        >
            <ArrowLeft size={20} />
        </button>
        <span className="font-bold text-sm uppercase tracking-widest text-gray-400">Back</span>
      </div>

      <div className="text-center mb-10 px-4">
        <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-black text-brand-neon mb-6 shadow-float transform rotate-3"
        >
            <Wand2 size={32} />
        </motion.div>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-brand-black mb-3">AI Pizza Architect</h2>
        <p className="text-gray-500 mt-2 max-w-md mx-auto">
            Describe your cravings, mood, or favorite toppings. <br/> We'll build the perfect pizza for you.
        </p>
      </div>

      <div className="max-w-2xl mx-auto px-4 mb-12">
        <div className="relative group">
             <div className="absolute inset-0 bg-brand-neon rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
             <div className="relative bg-white p-2 rounded-2xl shadow-float flex items-center gap-2 border-2 border-brand-black">
                <ChefHat className="text-gray-400 ml-3" />
                <input 
                    type="text" 
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g., 'A spicy pizza for a rainy day with lots of cheese'" 
                    className="flex-1 p-3 outline-none text-brand-black bg-transparent placeholder-gray-300 font-medium"
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <button 
                    onClick={handleSearch}
                    disabled={isLoading}
                    className="p-3 bg-brand-black rounded-xl text-brand-neon hover:bg-brand-neon hover:text-black transition-colors disabled:opacity-50"
                >
                    {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
                </button>
            </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 grid gap-6">
            <AnimatePresence>
                {recommendations.map((pizza, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white rounded-3xl p-6 shadow-soft flex flex-col md:flex-row gap-8 items-center border border-gray-100 hover:border-brand-black transition-colors group"
                    >
                        <div className="w-full md:w-48 h-48 rounded-2xl overflow-hidden shrink-0 shadow-md relative bg-brand-gray">
                            <img src={pizza.image} alt={pizza.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            <div className="absolute top-2 right-2 bg-brand-black text-brand-neon text-xs font-bold px-2 py-1 rounded">
                                AI Pick
                            </div>
                        </div>
                        
                        <div className="flex-1 text-center md:text-left w-full">
                            <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-2">
                                <h3 className="font-display text-2xl font-bold text-brand-black">{pizza.name}</h3>
                                <span className="text-brand-black font-bold text-xl bg-brand-neon/20 px-3 py-1 rounded-lg mt-2 md:mt-0">₹{pizza.price}</span>
                            </div>
                            
                            <p className="text-gray-500 mb-4 leading-relaxed">{pizza.description}</p>
                            
                            <div className="flex flex-wrap gap-2 mb-6 justify-center md:justify-start">
                                {pizza.ingredients.map(i => (
                                    <span key={i} className="text-xs bg-brand-gray border border-gray-200 px-3 py-1 rounded-full text-gray-600 font-bold uppercase tracking-wide">
                                        {i}
                                    </span>
                                ))}
                            </div>
                            
                            <button 
                                onClick={() => {
                                    addToCart({ ...pizza, cartId: Date.now().toString(), quantity: 1, size: 'M', crust: 'Regular', selectedToppings: [], totalPrice: pizza.price });
                                    navigate('/cart');
                                }}
                                className="w-full md:w-auto bg-brand-black text-white font-bold px-8 py-3 rounded-xl hover:bg-brand-neon hover:text-black transition-colors shadow-lg flex items-center justify-center gap-2"
                            >
                                <Sparkles size={16} /> Add to Order
                            </button>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
            
            {!isLoading && recommendations.length === 0 && (
                <div className="text-center mt-8 opacity-40">
                    <div className="font-display text-xl text-gray-300">Ready to create...</div>
                </div>
            )}
        </div>
    </div>
  );
};