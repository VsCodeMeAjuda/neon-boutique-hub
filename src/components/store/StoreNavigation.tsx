import React from 'react';
import { User, Shirt, Coins, Zap, Smile } from 'lucide-react';
import { StoreTab } from '../../types/store';

interface StoreNavigationProps {
  activeTab: StoreTab;
  onTabChange: (tab: StoreTab) => void;
}

const StoreNavigation: React.FC<StoreNavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'characters' as StoreTab, label: 'Personagens', icon: User, emoji: '🧒' },
    { id: 'skins' as StoreTab, label: 'Roupas', icon: Shirt, emoji: '👕' },
    { id: 'currency' as StoreTab, label: 'Moedas', icon: Coins, emoji: '💰' },
    { id: 'perks' as StoreTab, label: 'Vantagens', icon: Zap, emoji: '⚡' },
    { id: 'emotes' as StoreTab, label: 'Emotes', icon: Smile, emoji: '🎭' },
  ];

  return (
    <div className="flex items-center justify-center h-full p-4 overflow-x-auto">
      <div className="flex gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`tab-button ${
              activeTab === tab.id ? 'tab-button-active' : 'tab-button-inactive'
            }`}
          >
            <span className="text-lg">{tab.emoji}</span>
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default StoreNavigation;