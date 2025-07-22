import React from 'react';
import { Star, TrendingUp } from 'lucide-react';
import { CurrencyPack } from '../../../types/store';

const mockCurrencyPacks: CurrencyPack[] = [
  {
    id: 'coins-small',
    type: 'coins',
    amount: 500,
    bonus: 0,
    price: 4.99,
  },
  {
    id: 'coins-medium',
    type: 'coins',
    amount: 1200,
    bonus: 200,
    price: 9.99,
  },
  {
    id: 'coins-large',
    type: 'coins',
    amount: 2500,
    bonus: 500,
    price: 19.99,
    popular: true,
  },
  {
    id: 'diamonds-small',
    type: 'diamonds',
    amount: 100,
    bonus: 0,
    price: 4.99,
  },
  {
    id: 'diamonds-medium',
    type: 'diamonds',
    amount: 250,
    bonus: 50,
    price: 9.99,
  },
  {
    id: 'diamonds-large',
    type: 'diamonds',
    amount: 600,
    bonus: 150,
    price: 19.99,
    popular: true,
  },
];

const CurrencyTab: React.FC = () => {
  const coinPacks = mockCurrencyPacks.filter(pack => pack.type === 'coins');
  const diamondPacks = mockCurrencyPacks.filter(pack => pack.type === 'diamonds');

  const renderPack = (pack: CurrencyPack) => {
    const totalAmount = pack.amount + pack.bonus;
    const currencyIcon = pack.type === 'coins' ? '💰' : '💎';
    
    return (
      <div
        key={pack.id}
        className={`game-card relative cursor-pointer group hover:scale-105 transition-all duration-300 ${
          pack.popular ? 'ring-2 ring-warning animate-pulse-glow' : ''
        }`}
      >
        {pack.popular && (
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-warning to-accent text-black px-4 py-1 rounded-full text-sm font-bold">
            <Star size={12} className="inline mr-1" />
            MELHOR OFERTA!
          </div>
        )}
        
        <div className="text-center p-4">
          <div className="text-6xl mb-3">{currencyIcon}</div>
          <div className="mb-2">
            <span className="text-3xl font-bold">{totalAmount.toLocaleString()}</span>
            {pack.bonus > 0 && (
              <div className="text-accent font-semibold text-sm flex items-center justify-center gap-1 mt-1">
                <TrendingUp size={12} />
                +{pack.bonus.toLocaleString()} BÔNUS!
              </div>
            )}
          </div>
          
          <div className="text-2xl font-bold text-success mb-4">
            R$ {pack.price.toFixed(2)}
          </div>
          
          <button className="game-button-success w-full group-hover:animate-pulse">
            Comprar
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 h-full overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        {/* Coins Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">💰</span>
            <h2 className="text-2xl font-bold">Pacotes de Moedas</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {coinPacks.map(renderPack)}
          </div>
        </div>

        {/* Diamonds Section */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">💎</span>
            <h2 className="text-2xl font-bold" style={{ color: 'hsl(var(--diamond-color))' }}>
              Pacotes de Diamantes
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {diamondPacks.map(renderPack)}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mt-8 p-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl border border-primary/20">
          <h3 className="text-xl font-bold mb-4 text-center">Por que comprar?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-3xl mb-2">🎮</div>
              <div className="font-semibold">Desbloqueie personagens</div>
              <div className="text-sm text-muted-foreground">Acesse novos heróis incríveis</div>
            </div>
            <div>
              <div className="text-3xl mb-2">👕</div>
              <div className="font-semibold">Roupas exclusivas</div>
              <div className="text-sm text-muted-foreground">Personalize seus personagens</div>
            </div>
            <div>
              <div className="text-3xl mb-2">⚡</div>
              <div className="font-semibold">Vantagens especiais</div>
              <div className="text-sm text-muted-foreground">Acelere seu progresso</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyTab;