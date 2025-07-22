import React, { useState } from 'react';
import GameStore from '../components/GameStore';

const Index = () => {
  const [isStoreOpen, setIsStoreOpen] = useState(false);
  const [coins, setCoins] = useState(1250);
  const [diamonds, setDiamonds] = useState(300);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background">
      {/* Game Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.1),transparent_70%)]"></div>
      
      {/* Game UI */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          {/* Game Title */}
          <h1 className="text-6xl md:text-8xl font-black mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            ROBLOX
          </h1>
          <h2 className="text-2xl md:text-4xl font-bold mb-8 text-muted-foreground">
            Aventura Épica
          </h2>
          
          {/* Currency Display */}
          <div className="flex items-center justify-center gap-6 mb-8">
            <div className="currency-display">
              <span className="text-2xl">💰</span>
              <span className="text-xl font-bold">{coins.toLocaleString()}</span>
            </div>
            <div className="currency-display">
              <span className="text-2xl">💎</span>
              <span className="text-xl font-bold" style={{ color: 'hsl(var(--diamond-color))' }}>
                {diamonds.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Game Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-8">
            <button className="game-button-primary text-xl px-8 py-4">
              🎮 Jogar
            </button>
            <button 
              onClick={() => setIsStoreOpen(true)}
              className="game-button-success text-xl px-8 py-4 animate-pulse-glow"
            >
              🛍️ Abrir Loja
            </button>
          </div>

          {/* Game Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="game-card text-center">
              <div className="text-3xl mb-2">🏆</div>
              <div className="font-bold text-lg">Nível 25</div>
              <div className="text-sm text-muted-foreground">Herói Épico</div>
            </div>
            <div className="game-card text-center">
              <div className="text-3xl mb-2">⚔️</div>
              <div className="font-bold text-lg">15 Vitórias</div>
              <div className="text-sm text-muted-foreground">Esta semana</div>
            </div>
            <div className="game-card text-center">
              <div className="text-3xl mb-2">👥</div>
              <div className="font-bold text-lg">8 Amigos</div>
              <div className="text-sm text-muted-foreground">Online agora</div>
            </div>
          </div>
        </div>
      </div>

      {/* Game Store */}
      <GameStore
        isOpen={isStoreOpen}
        onClose={() => setIsStoreOpen(false)}
        coins={coins}
        diamonds={diamonds}
      />
    </div>
  );
};

export default Index;
