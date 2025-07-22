import React, { useState } from 'react';
import { Clock, Zap, TrendingUp, Shield, Sparkles } from 'lucide-react';
import { Perk } from '../../../types/store';

const mockPerks: Perk[] = [
  {
    id: 'xp-boost',
    name: 'Bônus de XP 2x',
    owned: false,
    equipped: false,
    price: 150,
    currency: 'coins',
    preview: '⚡',
    rarity: 'common',
    description: 'Ganhe o dobro de experiência por 24 horas completas!',
    duration: '24 horas',
    effect: 'XP x2'
  },
  {
    id: 'speed-boost',
    name: 'Velocidade Turbo',
    owned: false,
    equipped: false,
    price: 200,
    currency: 'diamonds',
    preview: '💨',
    rarity: 'rare',
    description: 'Aumente sua velocidade de movimento em 50% por 3 partidas.',
    duration: '3 partidas',
    effect: 'Velocidade +50%'
  },
  {
    id: 'shield-buff',
    name: 'Escudo Protetor',
    owned: true,
    equipped: false,
    price: 0,
    currency: 'diamonds',
    preview: '🛡️',
    rarity: 'epic',
    description: 'Protege você de um ataque fatal por partida.',
    duration: '5 partidas',
    effect: 'Proteção fatal'
  },
  {
    id: 'coin-magnet',
    name: 'Ímã de Moedas',
    owned: false,
    equipped: false,
    price: 300,
    currency: 'diamonds',
    preview: '🧲',
    rarity: 'legendary',
    description: 'Atraia moedas automaticamente num raio maior.',
    duration: '1 hora',
    effect: 'Coleta automática'
  },
  {
    id: 'mega-jump',
    name: 'Super Pulo',
    owned: false,
    equipped: false,
    price: 100,
    currency: 'coins',
    preview: '🦘',
    rarity: 'common',
    description: 'Pule 2x mais alto por algumas partidas.',
    duration: '5 partidas',
    effect: 'Altura de pulo x2'
  },
  {
    id: 'lucky-charm',
    name: 'Amuleto da Sorte',
    owned: false,
    equipped: false,
    price: 400,
    currency: 'diamonds',
    preview: '🍀',
    rarity: 'legendary',
    description: 'Aumenta a chance de encontrar itens raros.',
    duration: '2 horas',
    effect: 'Drop rate +50%'
  }
];

const PerksTab: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'owned' | 'locked'>('all');
  const [selectedPerk, setSelectedPerk] = useState<Perk>(mockPerks[0]);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'border-yellow-400/50 bg-yellow-400/10';
      case 'epic': return 'border-purple-400/50 bg-purple-400/10';
      case 'rare': return 'border-blue-400/50 bg-blue-400/10';
      default: return 'border-gray-400/50 bg-gray-400/10';
    }
  };

  const getEffectIcon = (effect: string) => {
    if (effect.includes('XP')) return <TrendingUp size={20} className="text-blue-400" />;
    if (effect.includes('Velocidade')) return <Zap size={20} className="text-yellow-400" />;
    if (effect.includes('Proteção')) return <Shield size={20} className="text-green-400" />;
    if (effect.includes('Coleta')) return <Sparkles size={20} className="text-purple-400" />;
    return <Zap size={20} className="text-blue-400" />;
  };

  const filteredPerks = mockPerks.filter(perk => {
    if (filter === 'owned') return perk.owned;
    if (filter === 'locked') return !perk.owned;
    return true;
  });

  return (
    <div className="flex h-full">
      {/* Perk Preview - Left Side (60%) */}
      <div className="w-[60%] p-6 flex flex-col items-center justify-center bg-gradient-to-br from-card/50 to-background">
        <div className="relative">
          {/* Perk Icon */}
          <div className="w-64 h-64 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl flex items-center justify-center text-8xl mb-6 border border-primary/20">
            {selectedPerk.preview}
          </div>
          
          {/* Rarity Badge */}
          <div className={`absolute -top-2 -right-2 px-3 py-1 rounded-full flex items-center gap-1 ${getRarityColor(selectedPerk.rarity)}`}>
            <span className="text-xs font-bold uppercase">{selectedPerk.rarity}</span>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-2 text-center">{selectedPerk.name}</h2>
        
        {/* Effect Details */}
        <div className="bg-gradient-to-r from-accent/20 to-secondary/20 rounded-2xl p-6 mb-4 max-w-md">
          <div className="flex items-center gap-3 mb-3">
            {getEffectIcon(selectedPerk.effect)}
            <span className="font-semibold text-lg">{selectedPerk.effect}</span>
          </div>
          
          <div className="flex items-center gap-2 mb-3">
            <Clock size={16} className="text-muted-foreground" />
            <span className="text-muted-foreground">Duração: {selectedPerk.duration}</span>
          </div>
          
          <p className="text-sm leading-relaxed">{selectedPerk.description}</p>
        </div>

        {/* Status */}
        <div className="text-center">
          {selectedPerk.owned ? (
            <div className="px-4 py-2 bg-success/20 border border-success/30 rounded-lg">
              <span className="text-success font-semibold">
                {selectedPerk.equipped ? '✨ Ativo' : '✅ Possuído'}
              </span>
            </div>
          ) : (
            <div className="price-badge">
              <span>{selectedPerk.currency === 'coins' ? '💰' : '💎'}</span>
              <span className="font-bold">{selectedPerk.price.toLocaleString()}</span>
            </div>
          )}
        </div>
      </div>

      {/* Perks List - Right Side (40%) */}
      <div className="w-[40%] p-6 border-l border-border/30">
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

        {/* Perks Grid */}
        <div className="grid grid-cols-1 gap-3 max-h-[500px] overflow-y-auto">
          {filteredPerks.map((perk) => (
            <div
              key={perk.id}
              onClick={() => setSelectedPerk(perk)}
              className={`character-card cursor-pointer transition-all duration-300 ${
                perk.owned ? 'character-card-owned' : 'character-card-locked'
              } ${
                selectedPerk.id === perk.id ? 'ring-2 ring-primary scale-105' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="text-3xl">{perk.preview}</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-sm mb-1">{perk.name}</h3>
                  
                  <div className="flex items-center gap-2 mb-2">
                    {getEffectIcon(perk.effect)}
                    <span className="text-xs text-muted-foreground">{perk.effect}</span>
                  </div>
                  
                  <div className="flex items-center gap-1 mb-2">
                    <Clock size={10} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{perk.duration}</span>
                  </div>

                  {perk.owned ? (
                    <span className="text-success text-xs font-semibold">
                      {perk.equipped ? 'Ativo' : 'Possuído'}
                    </span>
                  ) : (
                    <div className="flex items-center gap-1">
                      <span className="text-xs">
                        {perk.currency === 'coins' ? '💰' : '💎'} {perk.price}
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

export default PerksTab;