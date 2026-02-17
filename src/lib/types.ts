import { CartItem } from "@/src/store/useCartStore";

export interface Order {
  items: CartItem[];
  table: number;
  whatsappNumber: string;
  totalPrice: number;
  timestamp: string;
}

export interface OrderResponse {
  success: boolean;
  message: string;
  orderId?: string;
}
