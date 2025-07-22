import React, { useState } from 'react';
import { BookOpen, Lock, Crown, Star, Gem, Tag } from 'lucide-react';
import { Character, Skin } from '../../../types/store';

interface SkinsTabProps {
  characters: Character[];
  skins: Skin[];
  selectedCharacter: Character;
  selectedSkin: Skin | null;
  onCharacterSelect: (character: Character) => void;
  onSkinSelect: (skin: Skin) => void;
}

const SkinsTab: React.FC<SkinsTabProps> = ({
  characters,
  skins,
  selectedCharacter,
  selectedSkin,
  onCharacterSelect,
  onSkinSelect,
}) => {
  const [selectedCharacterFilter, setSelectedCharacterFilter] = useState<string>('all');
  const [filter, setFilter] = useState<'all' | 'owned' | 'locked'>('all');
  const [showHistory, setShowHistory] = useState(false);

  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return <Crown className="text-yellow-400" size={16} />;
      case 'epic': return <Star className="text-purple-400" size={16} />;
      case 'rare': return <Gem className="text-blue-400" size={16} />;
      default: return null;
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'border-yellow-400/50 bg-yellow-400/10';
      case 'epic': return 'border-purple-400/50 bg-purple-400/10';
      case 'rare': return 'border-blue-400/50 bg-blue-400/10';
      default: return 'border-gray-400/50 bg-gray-400/10';
    }
  };

  const filteredSkins = skins.filter(skin => {
    if (selectedCharacterFilter !== 'all' && skin.characterId !== selectedCharacterFilter) return false;
    if (filter === 'owned') return skin.owned;
    if (filter === 'locked') return !skin.owned;
    return true;
  });

  const currentDisplaySkin = selectedSkin || 
    (selectedCharacterFilter === 'all' ? skins[0] : skins.find(s => s.characterId === selectedCharacterFilter));

  return (
    <div className="flex h-full">
      {/* Skin Preview - Left Side (60%) */}
      <div className="w-[60%] p-6 flex flex-col items-center justify-center bg-gradient-to-br from-card/50 to-background">
        <div className="relative">
          {/* 3D Character Preview with Skin */}
          <div className="w-64 h-64 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl flex items-center justify-center text-6xl mb-6 border border-primary/20">
            {selectedCharacter.preview}
            <div className="absolute inset-0 flex items-center justify-center text-4xl">
              {currentDisplaySkin?.preview}
            </div>
          </div>
          
          {/* Rarity Badge */}
          {currentDisplaySkin && (
            <div className={`absolute -top-2 -right-2 px-3 py-1 rounded-full flex items-center gap-1 ${getRarityColor(currentDisplaySkin.rarity)}`}>
              {getRarityIcon(currentDisplaySkin.rarity)}
              <span className="text-xs font-bold uppercase">{currentDisplaySkin.rarity}</span>
            </div>
          )}

          {/* Sale Badge */}
          {currentDisplaySkin?.onSale && (
            <div className="promotion-badge">
              <Tag size={12} />
              OFERTA!
            </div>
          )}
        </div>

        <h2 className="text-3xl font-bold mb-1">{selectedCharacter.name}</h2>
        {currentDisplaySkin && (
          <h3 className="text-xl text-secondary mb-4">{currentDisplaySkin.name}</h3>
        )}
        
        {/* Skin History Button */}
        {currentDisplaySkin && (
          <button
            onClick={() => setShowHistory(true)}
            className="mb-4 flex items-center gap-2 px-4 py-2 bg-accent/20 border border-accent/30 rounded-lg hover:bg-accent/30 transition-colors"
          >
            <BookOpen size={16} />
            <span>Ver História da Skin</span>
          </button>
        )}

        {/* Status */}
        <div className="text-center">
          {currentDisplaySkin?.owned ? (
            <div className="px-4 py-2 bg-success/20 border border-success/30 rounded-lg">
              <span className="text-success font-semibold">
                {currentDisplaySkin.equipped ? '✨ Equipada' : '✅ Possuída'}
              </span>
            </div>
          ) : currentDisplaySkin ? (
            <div className="flex flex-col items-center gap-2">
              {currentDisplaySkin.onSale && (
                <div className="text-sm text-muted-foreground line-through">
                  {currentDisplaySkin.currency === 'coins' ? '💰' : '💎'} {currentDisplaySkin.originalPrice}
                </div>
              )}
              <div className="price-badge">
                <span>{currentDisplaySkin.currency === 'coins' ? '💰' : '💎'}</span>
                <span className="font-bold">{currentDisplaySkin.price.toLocaleString()}</span>
                {currentDisplaySkin.onSale && (
                  <span className="text-accent font-bold">
                    (-{Math.round(((currentDisplaySkin.originalPrice! - currentDisplaySkin.price) / currentDisplaySkin.originalPrice!) * 100)}%)
                  </span>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {/* Skin List - Right Side (40%) */}
      <div className="w-[40%] p-6 border-l border-border/30">
        {/* Character Selection */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold mb-2 text-muted-foreground">PERSONAGEM</h4>
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedCharacterFilter('all')}
              className={`filter-button whitespace-nowrap ${selectedCharacterFilter === 'all' ? 'filter-button-active' : ''}`}
            >
              Todos
            </button>
            {characters.map((character) => (
              <button
                key={character.id}
                onClick={() => {
                  setSelectedCharacterFilter(character.id);
                  onCharacterSelect(character);
                }}
                className={`filter-button whitespace-nowrap flex items-center gap-1 ${
                  selectedCharacterFilter === character.id ? 'filter-button-active' : ''
                }`}
              >
                <span className="text-sm">{character.preview}</span>
                <span>{character.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setFilter('all')}
            className={`filter-button ${filter === 'all' ? 'filter-button-active' : ''}`}
          >
            Todas
          </button>
          <button
            onClick={() => setFilter('owned')}
            className={`filter-button ${filter === 'owned' ? 'filter-button-active' : ''}`}
          >
            Possuídas
          </button>
          <button
            onClick={() => setFilter('locked')}
            className={`filter-button ${filter === 'locked' ? 'filter-button-active' : ''}`}
          >
            Bloqueadas
          </button>
        </div>

        {/* Skins Grid */}
        <div className="grid grid-cols-1 gap-3 max-h-[400px] overflow-y-auto">
          {filteredSkins.map((skin) => (
            <div
              key={skin.id}
              onClick={() => onSkinSelect(skin)}
              className={`character-card cursor-pointer transition-all duration-300 relative ${
                skin.owned ? 'character-card-owned' : 'character-card-locked'
              } ${
                selectedSkin?.id === skin.id ? 'ring-2 ring-primary scale-105' : ''
              }`}
            >
              {skin.onSale && (
                <div className="absolute -top-1 -right-1 bg-gradient-to-r from-danger to-warning text-white px-2 py-1 rounded text-xs font-bold">
                  OFERTA!
                </div>
              )}
              
              <div className="flex items-center gap-3">
                <div className="text-3xl">{skin.preview}</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-sm">{skin.name}</h3>
                  <div className="flex items-center gap-1 mb-1">
                    {getRarityIcon(skin.rarity)}
                    <span className="text-xs uppercase text-muted-foreground">{skin.rarity}</span>
                  </div>
                  
                  {skin.owned ? (
                    <span className="text-success text-xs font-semibold">
                      {skin.equipped ? 'Equipada' : 'Possuída'}
                    </span>
                  ) : (
                    <div className="flex items-center gap-1">
                      <Lock size={10} className="text-muted-foreground" />
                      <span className="text-xs">
                        {skin.currency === 'coins' ? '💰' : '💎'} {skin.price}
                      </span>
                      {skin.onSale && (
                        <span className="text-xs text-muted-foreground line-through ml-1">
                          {skin.originalPrice}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* History Modal */}
      {showHistory && currentDisplaySkin && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100]" onClick={() => setShowHistory(false)}>
          <div className="bg-gradient-to-br from-card to-card-hover p-8 rounded-3xl max-w-md mx-4 border border-border/50" onClick={(e) => e.stopPropagation()}>
            <div className="text-center mb-4">
              <div className="text-6xl mb-2">{currentDisplaySkin.preview}</div>
              <h3 className="text-2xl font-bold mb-1">{currentDisplaySkin.name}</h3>
              <p className="text-secondary">{selectedCharacter.name}</p>
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {currentDisplaySkin.description}
            </p>
            <button
              onClick={() => setShowHistory(false)}
              className="game-button-primary w-full"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkinsTab;