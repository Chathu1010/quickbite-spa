// src/types/index.ts

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  stock: number;
  category: string;
  thumbnail: string;
  /** * The discount percentage (e.g., 20 for 20% off).
   * The '?' makes it optional so items without discounts don't cause errors.
   */
  discount?: number; 
}

export interface ProductResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

/** * CartItem extends the Product interface and adds a quantity.
 * This ensures your cart knows exactly which meal is being added
 * and how many of them are in the basket.
 */
export interface CartItem extends Product {
  quantity: number;
}