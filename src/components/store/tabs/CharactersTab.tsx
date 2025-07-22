import React, { useState } from 'react';
import { BookOpen, Lock, Crown, Star, Gem } from 'lucide-react';
import { Character } from '../../../types/store';

interface CharactersTabProps {
  characters: Character[];
  selectedCharacter: Character;
  onCharacterSelect: (character: Character) => void;
}

const CharactersTab: React.FC<CharactersTabProps> = ({
  characters,
  selectedCharacter,
  onCharacterSelect,
}) => {
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

  const filteredCharacters = characters.filter(character => {
    if (filter === 'owned') return character.owned;
    if (filter === 'locked') return !character.owned;
    return true;
  });

  return (
    <div className="flex h-full">
      {/* Character Preview - Left Side (60%) */}
      <div className="w-[60%] p-6 flex flex-col items-center justify-center bg-gradient-to-br from-card/50 to-background">
        <div className="relative">
          {/* 3D Character Preview */}
          <div className="w-64 h-64 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl flex items-center justify-center text-8xl mb-6 border border-primary/20">
            {selectedCharacter.preview}
          </div>
          
          {/* Rarity Badge */}
          <div className={`absolute -top-2 -right-2 px-3 py-1 rounded-full flex items-center gap-1 ${getRarityColor(selectedCharacter.rarity)}`}>
            {getRarityIcon(selectedCharacter.rarity)}
            <span className="text-xs font-bold uppercase">{selectedCharacter.rarity}</span>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-2">{selectedCharacter.name}</h2>
        
        {/* Character History Button */}
        <button
          onClick={() => setShowHistory(true)}
          className="mb-4 flex items-center gap-2 px-4 py-2 bg-accent/20 border border-accent/30 rounded-lg hover:bg-accent/30 transition-colors"
        >
          <BookOpen size={16} />
          <span>Ver História</span>
        </button>

        {/* Status */}
        <div className="text-center">
          {selectedCharacter.owned ? (
            <div className="px-4 py-2 bg-success/20 border border-success/30 rounded-lg">
              <span className="text-success font-semibold">
                {selectedCharacter.equipped ? '✨ Equipado' : '✅ Possuído'}
              </span>
            </div>
          ) : (
            <div className="price-badge">
              <span>{selectedCharacter.currency === 'coins' ? '💰' : '💎'}</span>
              <span className="font-bold">{selectedCharacter.price.toLocaleString()}</span>
            </div>
          )}
        </div>
      </div>

      {/* Character List - Right Side (40%) */}
      <div className="w-[40%] p-6 border-l border-border/30">
        {/* Filters */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setFilter('all')}
            className={`filter-button ${filter === 'all' ? 'filter-button-active' : ''}`}
          >
            Todos
          </button>
          <button
            onClick={() => setFilter('owned')}
            className={`filter-button ${filter === 'owned' ? 'filter-button-active' : ''}`}
          >
            Possuídos
          </button>
          <button
            onClick={() => setFilter('locked')}
            className={`filter-button ${filter === 'locked' ? 'filter-button-active' : ''}`}
          >
            Bloqueados
          </button>
        </div>

        {/* Character Grid */}
        <div className="grid grid-cols-2 gap-3 max-h-[500px] overflow-y-auto">
          {filteredCharacters.map((character) => (
            <div
              key={character.id}
              onClick={() => onCharacterSelect(character)}
              className={`character-card cursor-pointer transition-all duration-300 ${
                character.owned ? 'character-card-owned' : 'character-card-locked'
              } ${
                selectedCharacter.id === character.id ? 'ring-2 ring-primary scale-105' : ''
              }`}
            >
              <div className="text-4xl mb-2 text-center">{character.preview}</div>
              <h3 className="font-semibold text-center mb-1">{character.name}</h3>
              
              <div className="flex items-center justify-center gap-1 mb-2">
                {getRarityIcon(character.rarity)}
                <span className="text-xs uppercase">{character.rarity}</span>
              </div>

              {character.owned ? (
                <div className="text-center">
                  <span className="text-success text-sm font-semibold">
                    {character.equipped ? 'Equipado' : 'Possuído'}
                  </span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-1">
                  <Lock size={12} className="text-muted-foreground" />
                  <span className="text-sm">
                    {character.currency === 'coins' ? '💰' : '💎'} {character.price}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* History Modal */}
      {showHistory && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100]" onClick={() => setShowHistory(false)}>
          <div className="bg-gradient-to-br from-card to-card-hover p-8 rounded-3xl max-w-md mx-4 border border-border/50" onClick={(e) => e.stopPropagation()}>
            <div className="text-center mb-4">
              <div className="text-6xl mb-2">{selectedCharacter.preview}</div>
              <h3 className="text-2xl font-bold mb-2">{selectedCharacter.name}</h3>
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {selectedCharacter.description}
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

export default CharactersTab;