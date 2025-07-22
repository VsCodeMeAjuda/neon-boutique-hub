import React from 'react';
import { StoreTab, Character, Skin, StoreItem } from '../../types/store';
import CharactersTab from './tabs/CharactersTab';
import SkinsTab from './tabs/SkinsTab';
import CurrencyTab from './tabs/CurrencyTab';
import PerksTab from './tabs/PerksTab';
import EmotesTab from './tabs/EmotesTab';

interface StoreContentProps {
  activeTab: StoreTab;
  characters: Character[];
  skins: Skin[];
  selectedCharacter: Character;
  selectedSkin: Skin | null;
  selectedItem: StoreItem | null;
  onCharacterSelect: (character: Character) => void;
  onSkinSelect: (skin: Skin) => void;
}

const StoreContent: React.FC<StoreContentProps> = ({
  activeTab,
  characters,
  skins,
  selectedCharacter,
  selectedSkin,
  selectedItem,
  onCharacterSelect,
  onSkinSelect,
}) => {
  const renderTabContent = () => {
    switch (activeTab) {
      case 'characters':
        return (
          <CharactersTab
            characters={characters}
            selectedCharacter={selectedCharacter}
            onCharacterSelect={onCharacterSelect}
          />
        );
      case 'skins':
        return (
          <SkinsTab
            characters={characters}
            skins={skins}
            selectedCharacter={selectedCharacter}
            selectedSkin={selectedSkin}
            onCharacterSelect={onCharacterSelect}
            onSkinSelect={onSkinSelect}
          />
        );
      case 'currency':
        return <CurrencyTab />;
      case 'perks':
        return <PerksTab />;
      case 'emotes':
        return <EmotesTab />;
      default:
        return null;
    }
  };

  return (
    <div className="h-full">
      {renderTabContent()}
    </div>
  );
};

export default StoreContent;