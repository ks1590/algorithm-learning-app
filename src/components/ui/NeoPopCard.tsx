import React from 'react';
import { type LucideIcon, ArrowRight } from 'lucide-react';

interface NeoPopCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onClick?: () => void;
  color?: string; // Hex color for accents
  className?: string;
}

export const NeoPopCard: React.FC<NeoPopCardProps> = ({
  title,
  description,
  icon: Icon,
  onClick,
  color = '#FF66C4', // Default pink
  className = '',
}) => {
  return (
    <div
      onClick={onClick}
      className={`relative group cursor-pointer ${className}`}
    >
      {/* Background Shadow Layer - Offset */}
      <div 
        className="absolute inset-0 bg-black rounded-2xl transform translate-x-2 translate-y-2 transition-transform duration-300 group-hover:translate-x-3 group-hover:translate-y-3"
      ></div>
      
      {/* Main Card Layer */}
      <div className="relative h-full bg-white border-4 border-black rounded-2xl overflow-hidden flex flex-col transition-transform duration-300 group-hover:-translate-y-1 group-hover:-translate-x-1">
        
        {/* Header Section with Icon and Title */}
        <div className="p-6 border-b-4 border-black bg-white relative overflow-hidden flex flex-col items-center gap-4">
             {/* Decorative background pattern - Dots */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" 
                 style={{ 
                     backgroundImage: `radial-gradient(${color} 2px, transparent 2px)`,
                     backgroundSize: '16px 16px'
                 }} 
            />
            
            {/* Icon Circle */}
            <div 
                className="w-20 h-20 rounded-full border-4 border-black flex items-center justify-center bg-white shadow-[4px_4px_0_0_#000] z-10 transition-transform duration-300 group-hover:rotate-12"
                style={{ backgroundColor: color }}
            >
                 <Icon className="w-10 h-10 text-black" strokeWidth={2.5} />
            </div>
            
            {/* Title */}
            <h3 className="text-2xl font-black text-center tracking-tight z-10 bg-white px-4 py-1 border-2 border-black shadow-[2px_2px_0_0_#000] transform -rotate-2 group-hover:rotate-0 transition-all duration-300">
                {title}
            </h3>
        </div>
        
        {/* Content Section */}
        <div className="p-6 flex-1 flex flex-col items-center justify-between bg-white relative">
             <p className="text-base font-bold text-center text-foreground/80 leading-relaxed mb-6">
                {description}
             </p>

            {/* Action Buttonish thing */}
             <div className="mt-auto">
                 <span 
                    className="inline-flex items-center justify-center px-6 py-2 rounded-full border-2 border-black font-black text-sm text-white bg-black transition-all duration-300 group-hover:bg-white group-hover:text-black group-hover:shadow-[4px_4px_0_0_#000]"
                 >
                    Start Learning <ArrowRight className="ml-2 w-4 h-4" />
                 </span>
             </div>
        </div>
      </div>
    </div>
  );
};
