import React, { useState } from 'react';
import { X } from 'lucide-react';
import StoreHeader from './store/StoreHeader';
import StoreNavigation from './store/StoreNavigation';
import StoreContent from './store/StoreContent';
import StoreFooter from './store/StoreFooter';
import { StoreTab, Character, Skin, StoreItem } from '../types/store';

// Mock data for demonstration
const mockCharacters: Character[] = [
  {
    id: 'nyx',
    name: 'Nyx',
    owned: true,
    equipped: true,
    price: 0,
    currency: 'coins',
    preview: '🥷',
    rarity: 'legendary',
    description: 'Uma caçadora sombria com habilidades místicas incríveis.'
  },
  {
    id: 'luna',
    name: 'Luna',
    owned: true,
    equipped: false,
    price: 0,
    currency: 'coins',
    preview: '🌙',
    rarity: 'epic',
    description: 'Guerreira lunar com poderes celestiais únicos.'
  },
  {
    id: 'blaze',
    name: 'Blaze',
    owned: false,
    equipped: false,
    price: 500,
    currency: 'diamonds',
    preview: '🔥',
    rarity: 'legendary',
    description: 'Mestre do fogo com chamas que nunca se apagam.'
  },
  {
    id: 'frost',
    name: 'Frost',
    owned: false,
    equipped: false,
    price: 1200,
    currency: 'coins',
    preview: '❄️',
    rarity: 'rare',
    description: 'Guardião do gelo com poderes congelantes.'
  }
];

const mockSkins: Skin[] = [
  {
    id: 'nyx-cyber',
    characterId: 'nyx',
    name: 'Nyx Cyberpunk',
    owned: false,
    equipped: false,
    price: 300,
    currency: 'diamonds',
    preview: '🤖',
    rarity: 'epic',
    onSale: true,
    originalPrice: 400,
    description: 'Look futurístico com tecnologia de ponta.'
  },
  {
    id: 'luna-royal',
    characterId: 'luna',
    name: 'Luna Real',
    owned: true,
    equipped: false,
    price: 0,
    currency: 'coins',
    preview: '👑',
    rarity: 'legendary',
    description: 'Trajes reais dignos de uma rainha lunar.'
  }
];

interface GameStoreProps {
  isOpen: boolean;
  onClose: () => void;
  coins: number;
  diamonds: number;
}

const GameStore: React.FC<GameStoreProps> = ({ isOpen, onClose, coins, diamonds }) => {
  const [activeTab, setActiveTab] = useState<StoreTab>('characters');
  const [selectedCharacter, setSelectedCharacter] = useState<Character>(mockCharacters[0]);
  const [selectedSkin, setSelectedSkin] = useState<Skin | null>(null);
  const [selectedItem, setSelectedItem] = useState<StoreItem | null>(null);

  if (!isOpen) return null;

  const handleTabChange = (tab: StoreTab) => {
    setActiveTab(tab);
    setSelectedItem(null);
    if (tab === 'characters') {
      setSelectedCharacter(mockCharacters[0]);
    }
  };

  const handleCharacterSelect = (character: Character) => {
    setSelectedCharacter(character);
    setSelectedItem(character);
  };

  const handleSkinSelect = (skin: Skin) => {
    setSelectedSkin(skin);
    setSelectedItem(skin);
    // Find and select the character for this skin
    const character = mockCharacters.find(c => c.id === skin.characterId);
    if (character) {
      setSelectedCharacter(character);
    }
  };

  const handlePurchase = (item: StoreItem) => {
    // Handle purchase logic here
    console.log('Purchasing:', item);
  };

  const handleEquip = (item: StoreItem) => {
    // Handle equip logic here
    console.log('Equipping:', item);
  };

  return (
    <>
      {/* Backdrop */}
      <div className="popup-backdrop" onClick={onClose} />
      
      {/* Store Popup */}
      <div className="popup-container">
        {/* Header */}
        <div className="h-[10%] relative animate-slide-in-top">
          <StoreHeader 
            coins={coins} 
            diamonds={diamonds} 
            onClose={onClose}
          />
        </div>

        {/* Navigation Tabs */}
        <div className="h-[10%] border-b border-border/30">
          <StoreNavigation 
            activeTab={activeTab} 
            onTabChange={handleTabChange} 
          />
        </div>

        {/* Content Area */}
        <div className="h-[70%] overflow-hidden">
          <StoreContent
            activeTab={activeTab}
            characters={mockCharacters}
            skins={mockSkins}
            selectedCharacter={selectedCharacter}
            selectedSkin={selectedSkin}
            selectedItem={selectedItem}
            onCharacterSelect={handleCharacterSelect}
            onSkinSelect={handleSkinSelect}
          />
        </div>

        {/* Footer */}
        <div className="h-[10%] border-t border-border/30">
          <StoreFooter
            selectedItem={selectedItem}
            coins={coins}
            diamonds={diamonds}
            onPurchase={handlePurchase}
            onEquip={handleEquip}
          />
        </div>
      </div>
    </>
  );
};

export default GameStore;