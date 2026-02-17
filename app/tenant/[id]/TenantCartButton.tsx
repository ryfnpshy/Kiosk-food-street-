"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/src/store/useCartStore";

export default function TenantCartButton() {
  const totalItems = useCartStore((state) => state.getTotalItems());
  const totalPrice = useCartStore((state) => state.getTotalPrice());

  return (
    <AnimatePresence>
      {totalItems > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{
            type: "spring",
            damping: 25,
            stiffness: 200,
            duration: 0.3,
          }}
          className="fixed bottom-0 left-0 right-0 z-20 border-t border-gray-200 bg-white p-4 shadow-lg"
        >
          <div className="mx-auto max-w-4xl">
            <motion.div
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="/checkout"
                className="flex w-full items-center justify-between rounded-lg bg-orange-600 px-6 py-4 text-white transition-colors hover:bg-orange-700"
              >
                <div className="flex items-center gap-3">
                  <ShoppingCart className="h-6 w-6" />
                  <div>
                    <div className="text-sm font-medium">
                      {totalItems} item{totalItems > 1 ? "s" : ""}
                    </div>
                    <div className="text-xs opacity-90">
                      Total: Rp {totalPrice.toLocaleString("id-ID")}
                    </div>
                  </div>
                </div>
                <span className="font-semibold">Lihat Keranjang</span>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
