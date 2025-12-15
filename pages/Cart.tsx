import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, Trash2, ArrowRight, ArrowLeft, ShoppingBag } from 'lucide-react';
import { useStore } from '../store';
import { useNavigate } from 'react-router-dom';

export const Cart: React.FC = () => {
  const { cart, updateQuantity, removeFromCart } = useStore();
  const navigate = useNavigate();

  const subtotal = cart.reduce((sum, item) => sum + item.totalPrice * item.quantity, 0);
  const deliveryFee = 49;
  const total = subtotal + deliveryFee;

  if (cart.length === 0) {
      return (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 relative">
              <button 
                onClick={() => navigate('/home')} 
                className="absolute top-4 left-4 p-3 rounded-full bg-white shadow-soft text-brand-black border border-gray-100"
              >
                  <ArrowLeft size={20} />
              </button>
              
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring" }}
                className="w-40 h-40 bg-brand-gray rounded-full flex items-center justify-center mb-6"
              >
                 <ShoppingBag size={64} className="text-gray-300" />
              </motion.div>
              <h2 className="text-3xl font-display font-bold text-brand-black mb-2">Cart is Empty</h2>
              <button 
                onClick={() => navigate('/home')} 
                className="mt-6 px-10 py-4 bg-brand-black text-white rounded-full font-bold shadow-lg hover:bg-brand-neon hover:text-black transition-all"
              >
                Browse Menu
              </button>
          </div>
      )
  }

  return (
    <div className="pb-40 max-w-3xl mx-auto pt-6 px-4">
      <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => navigate('/home')} 
            className="p-3 bg-white rounded-full shadow-soft hover:shadow-md transition-all text-brand-black border border-gray-100"
          >
              <ArrowLeft size={20} />
          </button>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-black">Your Order</h2>
      </div>
      
      <div className="space-y-6">
        <AnimatePresence mode="popLayout">
            {cart.map((item, index) => (
                <motion.div
                    key={item.cartId}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, x: -100 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-3xl p-4 shadow-soft flex gap-5 items-center group hover:shadow-float transition-all border border-gray-100 hover:border-black"
                >
                    <div className="w-24 h-24 rounded-2xl overflow-hidden bg-brand-gray shrink-0">
                        <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1">
                            <h3 className="font-display font-bold text-xl text-brand-black truncate pr-2">{item.name}</h3>
                            <button 
                                onClick={() => removeFromCart(item.cartId)} 
                                className="text-gray-300 hover:text-red-500 transition-colors p-1"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wide mb-3">{item.size} — {item.crust}</p>
                        
                        <div className="flex justify-between items-center">
                             <span className="font-bold text-lg text-brand-black">₹{Math.round(item.totalPrice * item.quantity)}</span>
                             
                             <div className="flex items-center gap-4 bg-brand-gray rounded-lg p-1">
                                <button onClick={() => updateQuantity(item.cartId, -1)} className="w-8 h-8 rounded-md bg-white shadow-sm flex items-center justify-center text-brand-black hover:bg-gray-200 transition-colors">
                                    <Minus size={14} />
                                </button>
                                <span className="font-bold w-4 text-center text-brand-black text-sm">{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.cartId, 1)} className="w-8 h-8 rounded-md bg-brand-black text-white shadow-sm flex items-center justify-center hover:bg-brand-neon hover:text-black transition-colors">
                                    <Plus size={14} />
                                </button>
                             </div>
                        </div>
                    </div>
                </motion.div>
            ))}
        </AnimatePresence>
      </div>

      {/* Floating Summary */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 z-40"
      >
         <div className="max-w-3xl mx-auto px-4 pb-6">
            <div className="bg-brand-black rounded-[2rem] p-6 shadow-2xl relative overflow-hidden text-white">
                <div className="flex justify-between items-center mb-6 px-2">
                    <div className="text-gray-400 text-sm">
                        <span className="block mb-1 font-medium">Total (incl. taxes)</span>
                        <span className="font-display text-3xl text-brand-neon font-bold">₹{Math.round(total)}</span>
                    </div>
                </div>

                <button 
                    onClick={() => navigate('/checkout')}
                    className="w-full bg-white text-brand-black py-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-3 hover:bg-brand-neon transition-colors group"
                >
                    Proceed to Checkout <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
         </div>
      </motion.div>
    </div>
  );
};