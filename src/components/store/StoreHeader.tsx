import React from 'react';
import { X, Plus } from 'lucide-react';

interface StoreHeaderProps {
  coins: number;
  diamonds: number;
  onClose: () => void;
}

const StoreHeader: React.FC<StoreHeaderProps> = ({ coins, diamonds, onClose }) => {
  return (
    <div className="flex items-center justify-between p-6 h-full">
      {/* Currency Display */}
      <div className="flex items-center gap-4">
        <div className="currency-display">
          <span className="text-2xl">💰</span>
          <span className="text-lg font-bold">{coins.toLocaleString()}</span>
          <button className="ml-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center hover:scale-110 transition-transform">
            <Plus size={14} className="text-white" />
          </button>
        </div>
        
        <div className="currency-display">
          <span className="text-2xl">💎</span>
          <span className="text-lg font-bold" style={{ color: 'hsl(var(--diamond-color))' }}>
            {diamonds.toLocaleString()}
          </span>
          <button className="ml-2 w-6 h-6 bg-secondary rounded-full flex items-center justify-center hover:scale-110 transition-transform">
            <Plus size={14} className="text-white" />
          </button>
        </div>
      </div>

      {/* Store Logo */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <h1 className="store-logo">LOJA</h1>
      </div>

      {/* Close Button */}
      <button
        onClick={onClose}
        className="w-12 h-12 bg-danger rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 group"
      >
        <X size={24} className="text-white group-hover:rotate-90 transition-transform duration-300" />
      </button>
    </div>
  );
};

export default StoreHeader;