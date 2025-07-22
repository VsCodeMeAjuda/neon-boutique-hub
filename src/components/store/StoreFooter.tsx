import React from 'react';
import { StoreItem } from '../../types/store';

interface StoreFooterProps {
  selectedItem: StoreItem | null;
  coins: number;
  diamonds: number;
  onPurchase: (item: StoreItem) => void;
  onEquip: (item: StoreItem) => void;
}

const StoreFooter: React.FC<StoreFooterProps> = ({
  selectedItem,
  coins,
  diamonds,
  onPurchase,
  onEquip,
}) => {
  if (!selectedItem) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">Selecione um item para ver as opções</p>
      </div>
    );
  }

  const canAfford = selectedItem.currency === 'coins' 
    ? coins >= selectedItem.price 
    : diamonds >= selectedItem.price;

  const currencyIcon = selectedItem.currency === 'coins' ? '💰' : '💎';

  return (
    <div className="flex items-center justify-between p-6 h-full">
      {/* Item Info */}
      <div className="flex items-center gap-4">
        <div className="text-2xl">{selectedItem.preview}</div>
        <div>
          <h3 className="font-semibold text-lg">{selectedItem.name}</h3>
          <div className="flex items-center gap-4">
            <div className="currency-display">
              <span>{currencyIcon}</span>
              <span className="font-bold">{coins.toLocaleString()}</span>
            </div>
            <div className="currency-display">
              <span>💎</span>
              <span className="font-bold" style={{ color: 'hsl(var(--diamond-color))' }}>
                {diamonds.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        {selectedItem.owned ? (
          <button
            onClick={() => onEquip(selectedItem)}
            className={`game-button-primary ${
              selectedItem.equipped ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={selectedItem.equipped}
          >
            {selectedItem.equipped ? 'Equipado' : 'Equipar'}
          </button>
        ) : (
          <button
            onClick={() => onPurchase(selectedItem)}
            className={`game-button-success ${
              !canAfford ? 'opacity-50 cursor-not-allowed' : 'animate-pulse-glow'
            }`}
            disabled={!canAfford}
          >
            <span>{currencyIcon}</span>
            <span>{selectedItem.price.toLocaleString()}</span>
            <span>Comprar</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default StoreFooter;