import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Clock, Package, Truck, Home, MapPin, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const STAGES = [
  { id: 1, label: 'Confirmed', icon: Check, description: 'Order received.' },
  { id: 2, label: 'Baking', icon: Clock, description: 'High heat, fresh dough.' },
  { id: 3, label: 'On Route', icon: Truck, description: 'Heading your way.' },
  { id: 4, label: 'Delivered', icon: Home, description: 'Enjoy your meal!' },
];

export const OrderTracking: React.FC = () => {
  const [currentStage, setCurrentStage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
        setCurrentStage(prev => (prev < 4 ? prev + 1 : prev));
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen pt-8 pb-20 max-w-3xl mx-auto px-4">
      <div className="bg-brand-black text-white rounded-[2rem] p-8 mb-10 shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 p-8 opacity-20">
                <Truck size={100} />
           </div>
           <span className="text-brand-neon font-bold uppercase tracking-widest text-xs">Status Update</span>
           <h2 className="font-display text-5xl md:text-6xl mt-2 mb-1">On The Way</h2>
           <p className="text-gray-400">Arriving in <span className="text-white font-bold">15 mins</span></p>

            {/* Progress Bar */}
           <div className="mt-8 h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                    initial={{ width: '0%' }}
                    animate={{ width: `${(currentStage / 4) * 100}%` }}
                    className="h-full bg-brand-neon"
                />
           </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
          {/* Map Section */}
          <div className="relative h-80 rounded-[2rem] overflow-hidden shadow-soft border border-gray-100 bg-gray-100">
            {/* Styled Map Placeholder */}
            <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=40.714728,-73.998672&zoom=14&size=800x600&style=feature:all|element:all|saturation:-100&sensor=false')] bg-cover bg-center grayscale opacity-50"></div>
            
            {/* Animated Rider Pin */}
            <motion.div 
                className="absolute top-1/2 left-1/4 bg-brand-black p-3 rounded-full shadow-lg z-10 text-brand-neon border-2 border-white"
                animate={{ 
                    x: [0, 60, 120],
                    y: [0, -10, 0]
                }}
                transition={{ duration: 10, ease: "linear" }}
            >
                <Truck size={20} fill="currentColor" />
            </motion.div>

            <div className="absolute top-1/4 right-1/4">
                <div className="w-4 h-4 bg-brand-black rounded-full animate-ping absolute"></div>
                <MapPin size={32} className="text-brand-black relative z-10" fill="white" />
            </div>
          </div>

          {/* Vertical Timeline */}
          <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-soft">
            <h3 className="font-display text-2xl font-bold mb-6">Timeline</h3>
            <div className="relative pl-4">
                <div className="absolute left-[19px] top-2 bottom-4 w-0.5 bg-gray-100"></div>
                
                {STAGES.map((stage) => {
                    const isCompleted = currentStage >= stage.id;
                    const isActive = currentStage === stage.id;
                    const Icon = stage.icon;

                    return (
                        <div key={stage.id} className="relative flex gap-4 mb-8 last:mb-0 group">
                            <motion.div 
                                animate={{ 
                                    backgroundColor: isCompleted ? '#050505' : '#FFFFFF',
                                    borderColor: isCompleted ? '#050505' : '#E5E7EB',
                                    color: isCompleted ? '#CCFF00' : '#D1D5DB'
                                }}
                                className="w-10 h-10 rounded-full border-2 flex items-center justify-center z-10 relative shrink-0 transition-colors duration-300"
                            >
                                <Icon size={16} />
                                {isActive && <span className="absolute inset-0 rounded-full border-2 border-brand-neon animate-ping"></span>}
                            </motion.div>
                            
                            <div className={`${isCompleted ? 'opacity-100' : 'opacity-40'} transition-opacity`}>
                                <h4 className="font-bold text-lg leading-none mb-1">{stage.label}</h4>
                                <p className="text-sm text-gray-500">{stage.description}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
          </div>
      </div>
      
      {currentStage === 4 && (
        <div className="mt-8 text-center">
             <button 
                onClick={() => navigate('/home')}
                className="inline-flex items-center gap-2 text-brand-black font-bold border-b-2 border-brand-black pb-1 hover:text-brand-neon hover:border-brand-neon transition-colors"
             >
                Order Again <ArrowRight size={16} />
             </button>
        </div>
      )}
    </div>
  );
};