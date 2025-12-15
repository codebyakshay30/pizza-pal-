import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CreditCard, MapPin, CheckCircle, Smartphone, ArrowLeft, ShieldCheck } from 'lucide-react';
import { useStore } from '../store';

export const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { cart, clearCart } = useStore();
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.totalPrice * item.quantity, 0);
  const deliveryFee = 49;
  const total = subtotal + deliveryFee;

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
        setIsProcessing(false);
        clearCart();
        navigate('/order-tracking');
    }, 2000);
  };

  return (
    <div className="pb-12 max-w-2xl mx-auto pt-4 px-4 min-h-screen bg-brand-white">
      
      {/* Header with Back Button */}
      <div className="flex items-center gap-4 mb-8">
        <button 
            onClick={() => navigate('/cart')} 
            className="p-3 bg-white rounded-full shadow-soft hover:shadow-md transition-all text-brand-black border border-gray-100"
        >
            <ArrowLeft size={20} />
        </button>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-black">Checkout</h2>
      </div>

      <div className="space-y-6">
        {/* Delivery Address */}
        <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-[2rem] shadow-soft border border-gray-100 hover:border-black transition-colors"
        >
            <div className="flex items-center gap-3 mb-6 text-gray-400 text-xs font-bold uppercase tracking-widest">
                <MapPin size={16} /> Delivery Address
            </div>
            <div className="flex items-center justify-between group cursor-pointer">
                <div className="flex gap-4 items-center">
                    <div className="w-12 h-12 bg-brand-black rounded-full flex items-center justify-center text-white">
                        <MapPin size={24} />
                    </div>
                    <div>
                        <h4 className="font-bold text-brand-black text-lg">Home</h4>
                        <p className="text-gray-400 text-sm">123 Pizza Street, Indiranagar, Bangalore</p>
                    </div>
                </div>
                <button className="text-brand-black text-sm font-bold border-b border-brand-black hover:text-brand-neon hover:border-brand-neon transition-all">Change</button>
            </div>
        </motion.section>

        {/* Payment Method */}
        <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 rounded-[2rem] shadow-soft border border-gray-100"
        >
             <div className="flex items-center gap-3 mb-6 text-gray-400 text-xs font-bold uppercase tracking-widest">
                <CreditCard size={16} /> Payment Method
            </div>
            
            <div className="space-y-4">
                {/* Active Card */}
                <div className="relative overflow-hidden bg-brand-black rounded-2xl p-6 text-white shadow-lg cursor-pointer ring-2 ring-brand-neon ring-offset-2 ring-offset-white transition-all group">
                    <div className="relative z-10 flex justify-between items-start mb-8">
                        <div className="text-xs opacity-70 uppercase tracking-widest">HDFC Bank</div>
                        <CheckCircle className="text-brand-neon" fill="currentColor" size={24} />
                    </div>
                    <div className="relative z-10 font-mono text-xl tracking-widest mb-4">**** **** **** 4242</div>
                    <div className="relative z-10 flex justify-between items-end opacity-80 text-xs">
                        <span>Rahul Kumar</span>
                        <span>09/28</span>
                    </div>
                </div>

                {/* UPI Option */}
                 <div className="bg-gray-50 rounded-2xl p-4 flex items-center justify-between text-gray-400 border border-gray-100 hover:bg-white hover:shadow-md transition-all cursor-pointer">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-brand-black">
                            <Smartphone size={20} />
                        </div>
                        <span className="font-medium text-brand-black">UPI / GPay / PhonePe</span>
                    </div>
                </div>
            </div>
        </motion.section>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-8"
      >
        <button 
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full bg-brand-black text-white py-5 rounded-2xl font-bold text-xl shadow-glow flex items-center justify-center gap-3 overflow-hidden relative hover:bg-brand-neon hover:text-black transition-all disabled:opacity-70 disabled:cursor-not-allowed group"
        >
            {isProcessing ? (
                <motion.div 
                    animate={{ rotate: 360 }} 
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
                />
            ) : (
                <>Pay Now <span className="text-white/70 group-hover:text-black/70 text-base font-medium ml-1">(₹{Math.round(total)})</span></>
            )}
        </button>
      </motion.div>
    </div>
  );
};