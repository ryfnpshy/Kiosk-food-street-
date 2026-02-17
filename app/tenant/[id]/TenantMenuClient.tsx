"use client";

import { Plus, Minus } from "lucide-react";
import { motion } from "framer-motion";
import { Menu } from "@/src/lib/data";
import { useCartStore } from "@/src/store/useCartStore";

interface TenantMenuClientProps {
  menu: Menu;
}

export default function TenantMenuClient({ menu }: TenantMenuClientProps) {
  const cartItems = useCartStore((state) => state.cartItems);
  const addToCart = useCartStore((state) => state.addToCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  const cartItem = cartItems.find((item) => item.id === menu.id);
  const quantity = cartItem?.quantity || 0;

  const handleAdd = () => {
    addToCart(menu);
  };

  const handleIncrease = () => {
    updateQuantity(menu.id, quantity + 1);
  };

  const handleDecrease = () => {
    updateQuantity(menu.id, quantity - 1);
  };

  return (
    <motion.div
      layout
      className="rounded-lg bg-white p-4 shadow-md"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{menu.name}</h3>
          <p className="mt-1 text-sm text-gray-600">{menu.description}</p>
          <p className="mt-2 text-lg font-bold text-orange-600">
            Rp {menu.price.toLocaleString("id-ID")}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {quantity > 0 ? (
            <>
              <motion.button
                onClick={handleDecrease}
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-orange-600 transition-colors hover:bg-orange-200"
                aria-label="Kurangi jumlah"
              >
                <Minus className="h-4 w-4" />
              </motion.button>
              <motion.span
                key={quantity}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="min-w-[2rem] text-center font-semibold text-gray-900"
              >
                {quantity}
              </motion.span>
              <motion.button
                onClick={handleIncrease}
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-600 text-white transition-colors hover:bg-orange-700"
                aria-label="Tambah jumlah"
              >
                <Plus className="h-4 w-4" />
              </motion.button>
            </>
          ) : (
            <motion.button
              onClick={handleAdd}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-2 rounded-lg bg-orange-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-orange-700"
            >
              <Plus className="h-4 w-4" />
              Tambah
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
