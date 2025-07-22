export type StoreTab = 'characters' | 'skins' | 'currency' | 'perks' | 'emotes';

export type Currency = 'coins' | 'diamonds';

export type Rarity = 'common' | 'rare' | 'epic' | 'legendary';

export interface StoreItem {
  id: string;
  name: string;
  owned: boolean;
  equipped: boolean;
  price: number;
  currency: Currency;
  preview: string;
  rarity: Rarity;
  description: string;
  onSale?: boolean;
  originalPrice?: number;
}

export interface Character extends StoreItem {
  // Characters don't have additional properties beyond StoreItem
}

export interface Skin extends StoreItem {
  characterId: string;
}

export interface CurrencyPack {
  id: string;
  type: Currency;
  amount: number;
  bonus: number;
  price: number;
  popular?: boolean;
}

export interface Perk extends StoreItem {
  duration: string;
  effect: string;
}

export interface Emote extends StoreItem {
  category: 'emote' | 'finisher';
  animationPreview: string;
}