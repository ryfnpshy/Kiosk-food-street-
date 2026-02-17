import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Menu } from "@/src/lib/data";

export interface CartItem extends Menu {
  quantity: number;
}

interface CartStore {
  cartItems: CartItem[];
  selectedTable: number | null;
  whatsappNumber: string;
  
  addToCart: (menu: Menu) => void;
  removeFromCart: (menuId: string) => void;
  updateQuantity: (menuId: string, quantity: number) => void;
  setTable: (tableNumber: number) => void;
  setWhatsappNumber: (number: string) => void;
  clearCart: () => void;
  
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cartItems: [],
      selectedTable: null,
      whatsappNumber: "",
      
      addToCart: (menu) => {
        const cartItems = get().cartItems;
        const existingItem = cartItems.find((item) => item.id === menu.id);
        
        if (existingItem) {
          set({
            cartItems: cartItems.map((item) =>
              item.id === menu.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({
            cartItems: [...cartItems, { ...menu, quantity: 1 }],
          });
        }
      },
      
      removeFromCart: (menuId) => {
        set({
          cartItems: get().cartItems.filter((item) => item.id !== menuId),
        });
      },
      
      updateQuantity: (menuId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(menuId);
          return;
        }
        
        set({
          cartItems: get().cartItems.map((item) =>
            item.id === menuId ? { ...item, quantity } : item
          ),
        });
      },
      
      setTable: (tableNumber) => {
        set({ selectedTable: tableNumber });
      },
      
      setWhatsappNumber: (number) => {
        set({ whatsappNumber: number });
      },
      
      clearCart: () => {
        set({
          cartItems: [],
          selectedTable: null,
          whatsappNumber: "",
        });
      },
      
      getTotalPrice: () => {
        const total = get().cartItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
        // Ensure no floating point errors
        return Math.round(total * 100) / 100;
      },
      
      getTotalItems: () => {
        return get().cartItems.reduce((total, item) => total + item.quantity, 0);
      },
    }),
    {
      name: "smartstreet-cart-storage",
      partialize: (state) => ({
        cartItems: state.cartItems,
        selectedTable: state.selectedTable,
        whatsappNumber: state.whatsappNumber,
      }),
    }
  )
);
