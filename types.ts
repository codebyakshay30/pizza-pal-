export interface Topping {
  id: string;
  name: string;
  price: number;
  color: string; // For visualizer
  type: 'veg' | 'non-veg';
}

export interface Pizza {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'Veg' | 'Non-Veg' | 'Premium';
  rating: number;
  ingredients: string[];
  calories?: number;
}

export interface CartItem extends Pizza {
  cartId: string;
  size: 'S' | 'M' | 'L';
  crust: string;
  selectedToppings: Topping[];
  quantity: number;
  totalPrice: number;
}

export interface OrderStage {
  id: number;
  label: string;
  status: 'pending' | 'active' | 'completed';
  icon: string;
}
