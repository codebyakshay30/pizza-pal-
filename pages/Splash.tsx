import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Pizza } from 'lucide-react';

export const Splash: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-brand-black text-white relative overflow-hidden flex flex-col items-center justify-center p-6">
        
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0 opacity-20">
            <img 
                src="https://images.unsplash.com/photo-1574126154517-d1e0d89e7344?auto=format&fit=crop&w=1600&q=80" 
                alt="Pizza Background" 
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/80 to-transparent"></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none z-0">
             <motion.div 
                animate={{ y: [-10, 10, -10], rotate: [0, 10, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[15%] left-[10%] text-6xl opacity-30 blur-sm"
             >
                🍅
             </motion.div>
             <motion.div 
                animate={{ y: [10, -10, 10], rotate: [0, -15, 15, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-[20%] right-[10%] text-7xl opacity-30 blur-sm"
             >
                🧀
             </motion.div>
             <motion.div 
                animate={{ y: [-20, 20, -20], rotate: [0, 20, -20, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[20%] right-[20%] text-5xl opacity-20"
             >
                🍄
             </motion.div>
        </div>

        {/* Abstract Rings */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                className="absolute -top-[20%] -right-[20%] w-[600px] h-[600px] border border-brand-neon/10 rounded-full"
            />
            <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="absolute top-[40%] -left-[20%] w-[500px] h-[500px] border border-white/5 rounded-full border-dashed"
            />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto backdrop-blur-sm bg-black/20 p-8 md:p-12 rounded-3xl border border-white/5 shadow-2xl">
            
            <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", damping: 12, delay: 0.2 }}
                className="mb-8 relative"
            >
                 <div className="w-32 h-32 bg-brand-neon rounded-full flex items-center justify-center text-brand-black shadow-glow relative z-10">
                    <Pizza size={64} strokeWidth={1.5} />
                 </div>
                 {/* Pulse Effect */}
                 <motion.div 
                    animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-brand-neon rounded-full z-0"
                 />
            </motion.div>

            <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, type: "spring" }}
                className="font-display text-7xl md:text-9xl font-bold tracking-tighter mb-6 text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400"
            >
                Pizza<span className="text-brand-neon">Pal</span>
            </motion.h1>

            {/* TAGLINE WITH ANIMATION */}
            <div className="mb-14 flex flex-col items-center relative z-20">
                <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-white text-xl md:text-3xl font-light mb-2 tracking-wide"
                >
                    Pizza so good,
                </motion.p>
                
                <div className="relative inline-block">
                    {/* Highlighter Effect */}
                    <motion.div 
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 1.4, duration: 0.8, ease: "circOut" }}
                        className="absolute bottom-2 left-[-10px] right-[-10px] h-1/2 bg-brand-neon/20 -skew-x-12 rounded-sm origin-left z-0"
                    />
                    
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.8, type: "spring", bounce: 0.5 }}
                        className="relative z-10 flex items-center justify-center gap-3 flex-wrap"
                    >
                        <span className="font-display text-3xl md:text-6xl font-bold italic text-brand-neon tracking-tighter drop-shadow-lg">
                            you’ll ghost your diet. 
                        </span>
                        <motion.span 
                            initial={{ opacity: 0, scale: 0, rotate: -20 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            transition={{ delay: 1.6, type: "spring" }}
                            className="text-4xl md:text-6xl filter drop-shadow-lg inline-block"
                        >
                            👻
                        </motion.span>
                    </motion.div>
                </div>
            </div>

            <motion.button
                onClick={() => navigate('/home')}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-brand-neon text-brand-black text-xl font-bold py-5 px-12 rounded-full shadow-[0_0_30px_rgba(204,255,0,0.4)] flex items-center gap-3 group relative overflow-hidden"
            >
                <span className="relative z-10">Start Ordering</span>
                <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform relative z-10" />
                <motion.div 
                    className="absolute inset-0 bg-white/20"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.5 }}
                />
            </motion.button>
        </div>
        
        {/* Footer Text */}
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="absolute bottom-8 text-gray-500 text-xs uppercase tracking-[0.2em]"
        >
            Premium Quality • 24/7 Delivery • INR Pricing
        </motion.div>
    </div>
  );
};