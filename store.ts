import { create } from 'zustand';
import { CartItem, Pizza, Topping } from './types';

interface AppState {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (cartId: string) => void;
  updateQuantity: (cartId: string, delta: number) => void;
  clearCart: () => void;
  favorites: string[];
  toggleFavorite: (pizzaId: string) => void;
}

export const useStore = create<AppState>((set) => ({
  cart: [],
  favorites: [],
  addToCart: (item) => set((state) => ({ cart: [...state.cart, item] })),
  removeFromCart: (id) => set((state) => ({ cart: state.cart.filter((i) => i.cartId !== id) })),
  updateQuantity: (id, delta) =>
    set((state) => ({
      cart: state.cart.map((item) => {
        if (item.cartId === id) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      }),
    })),
  clearCart: () => set({ cart: [] }),
  toggleFavorite: (id) =>
    set((state) => ({
      favorites: state.favorites.includes(id)
        ? state.favorites.filter((fid) => fid !== id)
        : [...state.favorites, id],
    })),
}));

export const TOPPINGS_LIST: Topping[] = [
  { id: '1', name: 'Pepperoni', price: 60, color: '#D9534F', type: 'non-veg' },
  { id: '2', name: 'Mushrooms', price: 45, color: '#8D6E63', type: 'veg' },
  { id: '3', name: 'Onions', price: 30, color: '#F48FB1', type: 'veg' },
  { id: '4', name: 'Olives', price: 45, color: '#3E2723', type: 'veg' },
  { id: '5', name: 'Basil', price: 30, color: '#4CAF50', type: 'veg' },
  { id: '6', name: 'Ex. Cheese', price: 75, color: '#FFF59D', type: 'veg' },
  { id: '7', name: 'Chicken', price: 80, color: '#E0E0E0', type: 'non-veg' },
  { id: '8', name: 'Peppers', price: 40, color: '#FF9800', type: 'veg' },
  { id: '9', name: 'Bacon', price: 70, color: '#A1887F', type: 'non-veg' },
  { id: '10', name: 'Spinach', price: 30, color: '#2E7D32', type: 'veg' },
];

export const MOCK_PIZZAS: Pizza[] = [
  {
    id: 'p1',
    name: 'Margherita Bliss',
    description: 'Classic delight with 100% real mozzarella cheese.',
    price: 299,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80',
    category: 'Veg',
    rating: 4.8,
    ingredients: ['Mozzarella', 'Basil', 'Tomato Sauce'],
    calories: 250,
  },
  {
    id: 'p2',
    name: 'Farmhouse Feast',
    description: 'Delightful combination of onion, capsicum, tomato & grilled mushroom.',
    price: 399,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
    category: 'Veg',
    rating: 4.6,
    ingredients: ['Onion', 'Capsicum', 'Mushroom', 'Corn'],
    calories: 280,
  },
  {
    id: 'p3',
    name: 'Pepperoni Passion',
    description: 'American classic! Spicy pepperoni, extra cheese.',
    price: 499,
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80',
    category: 'Non-Veg',
    rating: 4.9,
    ingredients: ['Pepperoni', 'Mozzarella', 'Spicy Sauce'],
    calories: 320,
  },
  {
    id: 'p4',
    name: 'Truffle Mushroom',
    description: 'Premium truffle oil with sautéed wild mushrooms.',
    price: 699,
    image: 'https://images.unsplash.com/photo-1506354453686-faa599790f12?auto=format&fit=crop&w=800&q=80',
    category: 'Premium',
    rating: 5.0,
    ingredients: ['Truffle Oil', 'Wild Mushrooms', 'Parmesan'],
    calories: 300,
  },
  {
    id: 'p5',
    name: 'Veggie Paradise',
    description: 'Gold corn, black olives, capsicum & red paprika.',
    price: 379,
    image: 'https://images.unsplash.com/photo-1593560708920-63219413ca75?auto=format&fit=crop&w=800&q=80',
    category: 'Veg',
    rating: 4.5,
    ingredients: ['Corn', 'Olives', 'Paprika'],
    calories: 260,
  },
  {
    id: 'p6',
    name: 'BBQ Chicken',
    description: 'Smokey BBQ sauce with grilled chicken and onions.',
    price: 549,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80',
    category: 'Non-Veg',
    rating: 4.7,
    ingredients: ['Chicken', 'BBQ Sauce', 'Onion'],
    calories: 310,
  },
  {
    id: 'p7',
    name: 'Pesto Primavera',
    description: 'Fresh basil pesto with cherry tomatoes and arugula.',
    price: 599,
    image: 'https://images.unsplash.com/photo-1571407970349-bc487d77399f?auto=format&fit=crop&w=800&q=80',
    category: 'Premium',
    rating: 4.9,
    ingredients: ['Pesto', 'Cherry Tomatoes', 'Arugula'],
    calories: 290,
  },
  {
    id: 'p8',
    name: 'Spicy Hawaiian',
    description: 'Pineapple, jalapenos, and roast ham.',
    price: 449,
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80',
    category: 'Non-Veg',
    rating: 4.2,
    ingredients: ['Pineapple', 'Ham', 'Jalapeno'],
    calories: 275,
  }
];