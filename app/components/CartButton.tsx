"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/src/store/useCartStore";
import { useEffect, useState } from "react";

export default function CartButton() {
  const totalItems = useCartStore((state) => state.getTotalItems());
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [prevItems, setPrevItems] = useState(totalItems);

  useEffect(() => {
    if (totalItems > prevItems && totalItems > 0) {
      setShouldAnimate(true);
      const timer = setTimeout(() => setShouldAnimate(false), 300);
      return () => clearTimeout(timer);
    }
    setPrevItems(totalItems);
  }, [totalItems, prevItems]);

  return (
    <Link
      href="/checkout"
      className="relative flex items-center gap-2 rounded-lg bg-orange-600 px-4 py-2 text-white transition-colors hover:bg-orange-700"
    >
      <ShoppingCart className="h-5 w-5" />
      <AnimatePresence mode="wait">
        {totalItems > 0 && (
          <motion.span
            key={totalItems}
            initial={{ scale: 0 }}
            animate={shouldAnimate ? { 
              scale: [1, 1.2, 1],
            } : { scale: 1 }}
            exit={{ scale: 0 }}
            transition={{
              duration: 0.3,
              times: [0, 0.5, 1],
            }}
            className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white"
          >
            {totalItems}
          </motion.span>
        )}
      </AnimatePresence>
    </Link>
  );
}
