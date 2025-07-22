import React, { useState } from 'react';
import { Play, Lock, Crown, Star, Gem } from 'lucide-react';
import { Emote } from '../../../types/store';

const mockEmotes: Emote[] = [
  {
    id: 'victory-dance',
    name: 'Dança da Vitória',
    owned: true,
    equipped: false,
    price: 0,
    currency: 'coins',
    preview: '🕺',
    rarity: 'common',
    description: 'Uma dança animada para comemorar suas vitórias!',
    category: 'emote',
    animationPreview: 'Personagem dança com movimentos vibrantes'
  },
  {
    id: 'thumbs-up',
    name: 'Joinha',
    owned: true,
    equipped: true,
    price: 0,
    currency: 'coins',
    preview: '👍',
    rarity: 'common',
    description: 'Mostre aprovação com um joinha clássico.',
    category: 'emote',
    animationPreview: 'Personagem faz joinha com sorriso'
  },
  {
    id: 'magic-blast',
    name: 'Explosão Mágica',
    owned: false,
    equipped: false,
    price: 250,
    currency: 'diamonds',
    preview: '✨',
    rarity: 'epic',
    description: 'Finalização espetacular com efeitos mágicos deslumbrantes.',
    category: 'finisher',
    animationPreview: 'Explosão colorida com partículas mágicas'
  },
  {
    id: 'rock-guitar',
    name: 'Solo de Guitarra',
    owned: false,
    equipped: false,
    price: 150,
    currency: 'coins',
    preview: '🎸',
    rarity: 'rare',
    description: 'Toque um solo épico de guitarra!',
    category: 'emote',
    animationPreview: 'Personagem toca guitarra com efeitos sonoros'
  },
  {
    id: 'dragon-roar',
    name: 'Rugido do Dragão',
    owned: false,
    equipped: false,
    price: 500,
    currency: 'diamonds',
    preview: '🐉',
    rarity: 'legendary',
    description: 'Finalização lendária que invoca um dragão espetacular.',
    category: 'finisher',
    animationPreview: 'Dragão emerge com fogo e trovões'
  },
  {
    id: 'heart-eyes',
    name: 'Apaixonado',
    owned: false,
    equipped: false,
    price: 80,
    currency: 'coins',
    preview: '😍',
    rarity: 'common',
    description: 'Demonstre seu amor pelo jogo!',
    category: 'emote',
    animationPreview: 'Olhos viram corações com brilhos'
  }
];

const EmotesTab: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'emotes' | 'finishers' | 'owned' | 'locked'>('all');
  const [selectedEmote, setSelectedEmote] = useState<Emote>(mockEmotes[0]);
  const [isPlaying, setIsPlaying] = useState(false);

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

  const filteredEmotes = mockEmotes.filter(emote => {
    if (filter === 'emotes') return emote.category === 'emote';
    if (filter === 'finishers') return emote.category === 'finisher';
    if (filter === 'owned') return emote.owned;
    if (filter === 'locked') return !emote.owned;
    return true;
  });

  const playAnimation = () => {
    setIsPlaying(true);
    setTimeout(() => setIsPlaying(false), 3000);
  };

  return (
    <div className="flex h-full">
      {/* Emote Preview - Left Side (60%) */}
      <div className="w-[60%] p-6 flex flex-col items-center justify-center bg-gradient-to-br from-card/50 to-background">
        <div className="relative">
          {/* Animation Preview */}
          <div className={`w-64 h-64 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl flex items-center justify-center text-8xl mb-6 border border-primary/20 transition-all duration-300 ${
            isPlaying ? 'animate-pulse scale-110' : ''
          }`}>
            {selectedEmote.preview}
            {isPlaying && (
              <div className="absolute inset-0 border-4 border-primary rounded-3xl animate-ping"></div>
            )}
          </div>
          
          {/* Rarity Badge */}
          <div className={`absolute -top-2 -right-2 px-3 py-1 rounded-full flex items-center gap-1 ${getRarityColor(selectedEmote.rarity)}`}>
            {getRarityIcon(selectedEmote.rarity)}
            <span className="text-xs font-bold uppercase">{selectedEmote.rarity}</span>
          </div>

          {/* Category Badge */}
          <div className={`absolute -top-2 -left-2 px-3 py-1 rounded-full text-xs font-bold ${
            selectedEmote.category === 'finisher' 
              ? 'bg-danger/20 border border-danger/50 text-danger' 
              : 'bg-primary/20 border border-primary/50 text-primary'
          }`}>
            {selectedEmote.category === 'finisher' ? 'FINALIZAÇÃO' : 'EMOTE'}
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-2 text-center">{selectedEmote.name}</h2>
        
        {/* Animation Description */}
        <div className="bg-gradient-to-r from-accent/20 to-secondary/20 rounded-2xl p-4 mb-4 max-w-md text-center">
          <p className="text-sm text-muted-foreground mb-3">{selectedEmote.animationPreview}</p>
          <p className="text-sm leading-relaxed">{selectedEmote.description}</p>
        </div>

        {/* Test Animation Button */}
        <button
          onClick={playAnimation}
          className="mb-4 flex items-center gap-2 px-6 py-3 bg-accent rounded-xl hover:bg-accent/80 transition-colors font-semibold"
          disabled={isPlaying}
        >
          <Play size={16} />
          <span>{isPlaying ? 'Reproduzindo...' : 'Testar Animação'}</span>
        </button>

        {/* Status */}
        <div className="text-center">
          {selectedEmote.owned ? (
            <div className="px-4 py-2 bg-success/20 border border-success/30 rounded-lg">
              <span className="text-success font-semibold">
                {selectedEmote.equipped ? '✨ Equipado' : '✅ Possuído'}
              </span>
            </div>
          ) : (
            <div className="price-badge">
              <span>{selectedEmote.currency === 'coins' ? '💰' : '💎'}</span>
              <span className="font-bold">{selectedEmote.price.toLocaleString()}</span>
            </div>
          )}
        </div>
      </div>

      {/* Emotes List - Right Side (40%) */}
      <div className="w-[40%] p-6 border-l border-border/30">
        {/* Filters */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <button
            onClick={() => setFilter('all')}
            className={`filter-button ${filter === 'all' ? 'filter-button-active' : ''}`}
          >
            Todos
          </button>
          <button
            onClick={() => setFilter('emotes')}
            className={`filter-button ${filter === 'emotes' ? 'filter-button-active' : ''}`}
          >
            Emotes
          </button>
          <button
            onClick={() => setFilter('finishers')}
            className={`filter-button ${filter === 'finishers' ? 'filter-button-active' : ''}`}
          >
            Finalizações
          </button>
          <button
            onClick={() => setFilter('owned')}
            className={`filter-button ${filter === 'owned' ? 'filter-button-active' : ''}`}
          >
            Possuídos
          </button>
        </div>

        {/* Emotes Grid */}
        <div className="grid grid-cols-1 gap-3 max-h-[450px] overflow-y-auto">
          {filteredEmotes.map((emote) => (
            <div
              key={emote.id}
              onClick={() => setSelectedEmote(emote)}
              className={`character-card cursor-pointer transition-all duration-300 relative ${
                emote.owned ? 'character-card-owned' : 'character-card-locked'
              } ${
                selectedEmote.id === emote.id ? 'ring-2 ring-primary scale-105' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="text-3xl">{emote.preview}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-sm">{emote.name}</h3>
                    <span className={`text-xs px-2 py-1 rounded ${
                      emote.category === 'finisher' 
                        ? 'bg-danger/20 text-danger' 
                        : 'bg-primary/20 text-primary'
                    }`}>
                      {emote.category === 'finisher' ? 'FIN' : 'EMT'}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-1 mb-2">
                    {getRarityIcon(emote.rarity)}
                    <span className="text-xs uppercase text-muted-foreground">{emote.rarity}</span>
                  </div>

                  {emote.owned ? (
                    <span className="text-success text-xs font-semibold">
                      {emote.equipped ? 'Equipado' : 'Possuído'}
                    </span>
                  ) : (
                    <div className="flex items-center gap-1">
                      <Lock size={10} className="text-muted-foreground" />
                      <span className="text-xs">
                        {emote.currency === 'coins' ? '💰' : '💎'} {emote.price}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmotesTab;