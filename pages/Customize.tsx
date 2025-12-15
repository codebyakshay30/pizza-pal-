import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MOCK_PIZZAS, TOPPINGS_LIST, useStore } from '../store';
import { PizzaVisualizer } from '../components/PizzaVisualizer';
import { Topping, CartItem } from '../types';
import { ArrowLeft, ShoppingBag } from 'lucide-react';

export const Customize: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const addToCart = useStore((state) => state.addToCart);
  
  const basePizza = MOCK_PIZZAS.find((p) => p.id === id);
  
  const [size, setSize] = useState<'S' | 'M' | 'L'>('M');
  const [crust, setCrust] = useState('Regular');
  const [selectedToppings, setSelectedToppings] = useState<Topping[]>([]);
  
  if (!basePizza) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center p-4 bg-brand-white">
            <h2 className="font-display text-2xl font-bold mb-4">Pizza Not Found</h2>
            <p className="text-gray-500 mb-6">We couldn't find the pizza you're looking for.</p>
            <button onClick={() => navigate('/home')} className="bg-brand-black text-white px-8 py-3 rounded-full font-bold hover:bg-brand-neon hover:text-black transition-colors">
                Back to Menu
            </button>
        </div>
    );
  }

  const sizeMultiplier = size === 'S' ? 0.8 : size === 'M' ? 1 : 1.2;
  const toppingsPrice = selectedToppings.reduce((acc, t) => acc + t.price, 0);
  const totalPrice = (basePizza.price * sizeMultiplier) + toppingsPrice;

  const handleToggleTopping = (topping: Topping) => {
    if (selectedToppings.find(t => t.id === topping.id)) {
        setSelectedToppings(prev => prev.filter(t => t.id !== topping.id));
    } else {
        setSelectedToppings(prev => [...prev, topping]);
    }
  };

  const handleAddToCart = () => {
    const item: CartItem = {
        ...basePizza,
        cartId: Math.random().toString(36).substr(2, 9),
        size,
        crust,
        selectedToppings,
        quantity: 1,
        totalPrice
    };
    addToCart(item);
    navigate('/cart');
  };

  return (
    <div className="min-h-screen pt-4 pb-12 bg-brand-white">
      <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-12 gap-12 h-full">
        
        {/* Left: Interactive Visualizer */}
        <div className="lg:col-span-7 bg-brand-gray rounded-[3rem] p-8 relative min-h-[500px] flex flex-col items-center justify-center overflow-hidden border border-gray-200">
             
             <div className="flex justify-between w-full absolute top-8 px-6 z-20">
                <button onClick={() => navigate('/home')} className="p-3 bg-white rounded-full shadow-sm hover:shadow-md transition-all">
                    <ArrowLeft size={20} className="text-brand-black" />
                </button>
                <div className="bg-white/80 backdrop-blur-md px-6 py-2 rounded-full shadow-sm border border-gray-100">
                    <span className="font-display text-lg font-bold text-brand-black">{basePizza.name}</span>
                </div>
             </div>

             {/* REMOVED 'layout' PROP HERE TO FIX VISIBILITY BUG */}
             <motion.div 
                className="relative z-10 scale-110 md:scale-125"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1.1 }}
                transition={{ duration: 0.5 }}
             >
                <PizzaVisualizer toppings={selectedToppings} size={size} crust={crust} />
             </motion.div>

             <motion.div 
                key={totalPrice}
                className="absolute bottom-10 z-10 bg-brand-black text-brand-neon px-8 py-3 rounded-full font-bold text-3xl shadow-float border-2 border-brand-neon"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
             >
                ₹{Math.round(totalPrice)}
             </motion.div>
        </div>

        {/* Right: Controls */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-10 pl-2">
            <div>
                <h2 className="font-display text-4xl text-brand-black mb-2">Build It</h2>
                <p className="text-gray-400">Customise to your taste.</p>
            </div>
            
            {/* Size Selector */}
            <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 block">Size</label>
                <div className="flex gap-4">
                    {['S', 'M', 'L'].map((s) => (
                        <button
                            key={s}
                            onClick={() => setSize(s as any)}
                            className={`flex-1 h-20 rounded-xl flex flex-col items-center justify-center transition-all duration-300 border-2 ${
                                size === s 
                                    ? 'border-brand-black bg-brand-black text-white shadow-md' 
                                    : 'border-gray-200 bg-white text-gray-400 hover:border-gray-400'
                            }`}
                        >
                            <span className="text-xl font-display mb-0.5">{s === 'S' ? '8"' : s === 'M' ? '12"' : '16"'}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Crust Selector */}
            <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 block">Crust</label>
                <div className="flex flex-wrap gap-2">
                    {['Thin', 'Regular', 'Cheese Burst'].map((c) => (
                        <button
                            key={c}
                            onClick={() => setCrust(c)}
                            className={`px-5 py-3 rounded-xl text-sm font-bold transition-all border-2 ${
                                crust === c 
                                    ? 'border-brand-neon bg-brand-neon text-brand-black shadow-neon' 
                                    : 'border-gray-100 bg-white text-gray-500 hover:border-gray-300'
                            }`}
                        >
                            {c}
                        </button>
                    ))}
                </div>
            </div>

            {/* Toppings Grid */}
            <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 block">Toppings</label>
                <div className="grid grid-cols-4 gap-3">
                    {TOPPINGS_LIST.map((t) => {
                        const isSelected = !!selectedToppings.find(st => st.id === t.id);
                        return (
                            <motion.button
                                key={t.id}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleToggleTopping(t)}
                                className={`aspect-square rounded-2xl flex flex-col items-center justify-center transition-all border ${
                                    isSelected 
                                        ? 'bg-brand-black text-white border-brand-black shadow-lg' 
                                        : 'bg-white text-gray-400 border-gray-100 hover:border-gray-300'
                                }`}
                            >
                                <div 
                                    className="w-3 h-3 rounded-full mb-2 shadow-sm border border-black/10" 
                                    style={{ backgroundColor: t.color }}
                                ></div>
                                <span className="text-[10px] font-bold leading-none text-center">{t.name}</span>
                                <span className="text-[9px] text-gray-300/80 mt-1">₹{t.price}</span>
                            </motion.button>
                        )
                    })}
                </div>
            </div>

            <button 
                onClick={handleAddToCart}
                className="w-full bg-brand-black text-white py-5 rounded-xl font-bold text-xl shadow-lg hover:bg-brand-neon hover:text-black transition-all flex items-center justify-center gap-3 group border border-transparent hover:border-black"
            >
                <ShoppingBag className="group-hover:-translate-y-1 transition-transform" />
                Add to Cart
            </button>
        </div>
      </div>
    </div>
  );
};