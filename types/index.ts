export interface Meal {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  categoryId: string;
  images?: string[]; 
  providerId: string;
}