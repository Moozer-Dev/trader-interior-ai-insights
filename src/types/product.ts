
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
