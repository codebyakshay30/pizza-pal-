import React from 'react';
import { motion } from 'framer-motion';
import { Topping } from '../types';

interface Props {
  toppings: Topping[];
  size?: 'S' | 'M' | 'L';
  crust?: string;
}

export const PizzaVisualizer: React.FC<Props> = ({ toppings, size = 'M' }) => {
  const scale = size === 'S' ? 0.8 : size === 'M' ? 1.0 : 1.1;

  return (
    <div className="relative w-72 h-72 md:w-96 md:h-96 mx-auto flex items-center justify-center my-4">
      <motion.div 
        className="relative w-full h-full"
        animate={{ scale, rotate: 360 }}
        transition={{ 
            scale: { type: 'spring', damping: 12 },
            rotate: { duration: 100, ease: "linear", repeat: Infinity }
        }}
      >
        {/* Shadow */}
        <div className="absolute inset-0 rounded-full shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] transform translate-y-4 opacity-50"></div>

        {/* Crust */}
        <div className="absolute inset-0 rounded-full bg-[#E6A868] border-[8px] border-[#C88B50] overflow-hidden">
             {/* Texture */}
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/baked-cracker.png')] opacity-30"></div>
        </div>
        
        {/* Sauce */}
        <div className="absolute inset-3 rounded-full bg-[#D32F2F] shadow-inner"></div>
        
        {/* Cheese */}
        <div className="absolute inset-5 rounded-full bg-[#FFF9C4] opacity-95 shadow-inner flex items-center justify-center">
            {/* Cheese Texture blobs */}
            <div className="w-full h-full opacity-30 bg-[radial-gradient(circle_at_30%_30%,#FFEB3B,transparent_20%),radial-gradient(circle_at_70%_60%,#FFEB3B,transparent_20%)]"></div>
        </div>

        {/* Toppings Layer */}
        {toppings.map((topping, idx) => (
            <div key={topping.id} className="absolute inset-6 rounded-full">
                {/* Distribute toppings nicely */}
                {Array.from({ length: 12 }).map((_, i) => {
                     // Golden angle distribution for natural look
                     const r = 15 + Math.sqrt(i + 0.5) * 20; // radius
                     const theta = i * 2.4; // angle in radians
                     
                     // Add some randomness
                     const left = 50 + (r * Math.cos(theta)) * 0.9;
                     const top = 50 + (r * Math.sin(theta)) * 0.9;
                     
                     return (
                         <motion.div
                            key={i}
                            initial={{ scale: 0, opacity: 0, y: -20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 + i * 0.02, type: "spring" }}
                            style={{
                                position: 'absolute',
                                left: `${left}%`,
                                top: `${top}%`,
                                width: topping.name === 'Basil' ? '18px' : '24px',
                                height: topping.name === 'Basil' ? '18px' : '24px',
                                backgroundColor: topping.color,
                                borderRadius: topping.name === 'Pepperoni' ? '50%' : '30%',
                                transform: `translate(-50%, -50%) rotate(${Math.random() * 360}deg)`,
                                boxShadow: '2px 2px 4px rgba(0,0,0,0.2)',
                                zIndex: 10 + idx
                            }}
                         >
                            {/* Inner detail for specific toppings */}
                            {topping.name === 'Pepperoni' && (
                                <div className="w-full h-full rounded-full border border-white/20 opacity-50 bg-red-900/10"></div>
                            )}
                         </motion.div>
                     )
                })}
            </div>
        ))}
      </motion.div>
    </div>
  );
};