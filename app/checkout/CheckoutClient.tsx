"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Trash2, Minus, Plus, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useCartStore } from "@/src/store/useCartStore";
import Tooltip from "@/app/components/Tooltip";

export default function CheckoutClient() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [whatsappError, setWhatsappError] = useState("");
  
  const cartItems = useCartStore((state) => state.cartItems);
  const selectedTable = useCartStore((state) => state.selectedTable);
  const whatsappNumber = useCartStore((state) => state.whatsappNumber);
  const setTable = useCartStore((state) => state.setTable);
  const setWhatsappNumber = useCartStore((state) => state.setWhatsappNumber);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const clearCart = useCartStore((state) => state.clearCart);

  const totalPrice = getTotalPrice();
  
  // Validasi WhatsApp number
  const validateWhatsApp = (number: string) => {
    const cleaned = number.trim().replace(/\s+/g, "");
    if (!cleaned) {
      setWhatsappError("Nomor WhatsApp wajib diisi");
      return false;
    }
    // Validasi format: harus dimulai dengan 08 dan minimal 10 digit
    const phoneRegex = /^08\d{8,12}$/;
    if (!phoneRegex.test(cleaned)) {
      setWhatsappError("Format nomor WhatsApp tidak valid (contoh: 081234567890)");
      return false;
    }
    setWhatsappError("");
    return true;
  };

  const handleWhatsAppChange = (value: string) => {
    setWhatsappNumber(value);
    if (whatsappError) {
      validateWhatsApp(value);
    }
  };

  const canSubmit = 
    selectedTable !== null && 
    whatsappNumber.trim() !== "" && 
    cartItems.length > 0 &&
    !whatsappError;

  const handleSubmit = async () => {
    // Validasi sebelum submit
    if (!validateWhatsApp(whatsappNumber)) {
      return;
    }

    if (!canSubmit || isSubmitting) return;

    setIsSubmitting(true);

    try {
      const cleanedWhatsApp = whatsappNumber.trim().replace(/\s+/g, "");
      
      const orderData = {
        items: cartItems,
        table: selectedTable,
        whatsappNumber: cleanedWhatsApp,
        totalPrice: totalPrice,
        timestamp: new Date().toISOString(),
      };

      const response = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        clearCart();
        router.push("/success");
      } else {
        alert("Terjadi kesalahan saat memproses pesanan. Silakan coba lagi.");
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Terjadi kesalahan saat memproses pesanan";
      alert(`${errorMessage}. Silakan coba lagi.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="sticky top-0 z-10 bg-white shadow-sm">
          <div className="mx-auto max-w-4xl px-4 py-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-700 transition-colors hover:text-gray-900"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Kembali</span>
            </Link>
          </div>
        </header>
        <main className="mx-auto max-w-4xl px-4 py-12 text-center">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            Keranjang Kosong
          </h2>
          <p className="mb-8 text-gray-600">
            Silakan pilih menu terlebih dahulu
          </p>
          <Link
            href="/"
            className="inline-block rounded-lg bg-orange-600 px-6 py-3 text-white transition-colors hover:bg-orange-700"
          >
            Pilih Menu
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-32 md:pb-24">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="mx-auto max-w-4xl px-4 py-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-700 transition-colors hover:text-gray-900"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Kembali</span>
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 py-6">
        <h1 className="mb-6 text-2xl font-bold text-gray-900">Checkout</h1>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Form */}
          <div className="lg:col-span-2">
            {/* Cart Items */}
            <section className="mb-6">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">
                Pesanan Anda
              </h2>
              <div className="space-y-3">
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between gap-4 rounded-lg bg-white p-4 shadow-md"
                  >
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Rp {item.price.toLocaleString("id-ID")} x {item.quantity}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-orange-600">
                        Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-2">
                        <motion.button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          whileTap={{ scale: 0.9 }}
                          whileHover={{ scale: 1.05 }}
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition-colors hover:bg-gray-200"
                          aria-label="Kurangi jumlah"
                        >
                          <Minus className="h-4 w-4" />
                        </motion.button>
                        <motion.span
                          key={item.quantity}
                          initial={{ scale: 0.8 }}
                          animate={{ scale: 1 }}
                          className="min-w-[2rem] text-center font-semibold text-gray-900"
                        >
                          {item.quantity}
                        </motion.span>
                        <motion.button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          whileTap={{ scale: 0.9 }}
                          whileHover={{ scale: 1.05 }}
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-600 text-white transition-colors hover:bg-orange-700"
                          aria-label="Tambah jumlah"
                        >
                          <Plus className="h-4 w-4" />
                        </motion.button>
                      </div>
                      <motion.button
                        onClick={() => removeFromCart(item.id)}
                        whileTap={{ scale: 0.9 }}
                        whileHover={{ scale: 1.05 }}
                        className="ml-1 rounded-lg p-2 text-red-600 transition-colors hover:bg-red-50"
                        aria-label="Hapus item"
                      >
                        <Trash2 className="h-5 w-5" />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Table Selection */}
            <section className="mb-6">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">
                Pilih Nomor Meja <span className="text-red-500">*</span>
              </h2>
              {!selectedTable && (
                <p className="mb-3 text-sm text-gray-600">
                  Silakan pilih nomor meja Anda
                </p>
              )}
              <div className="grid grid-cols-4 gap-1.5 xs:grid-cols-5 sm:grid-cols-10 sm:gap-2">
                {Array.from({ length: 20 }, (_, i) => i + 1).map((tableNum) => (
                  <motion.button
                    key={tableNum}
                    onClick={() => setTable(tableNum)}
                    whileHover={{ scale: selectedTable === tableNum ? 1.05 : 1.05 }}
                    whileTap={{ scale: 0.9 }}
                    animate={{
                      backgroundColor: selectedTable === tableNum ? "#16a34a" : "#ffffff",
                      color: selectedTable === tableNum ? "#ffffff" : "#374151",
                      scale: selectedTable === tableNum ? 1.05 : 1,
                    }}
                    transition={{
                      duration: 0.2,
                      ease: "easeInOut",
                    }}
                    className={`rounded-lg py-2.5 text-xs font-medium shadow-md xs:py-3 xs:text-sm sm:py-3 ${
                      selectedTable === tableNum
                        ? "shadow-lg ring-2 ring-green-300"
                        : "hover:bg-gray-50 hover:shadow-lg"
                    }`}
                  >
                    {tableNum}
                  </motion.button>
                ))}
              </div>
            </section>

            {/* WhatsApp Number */}
            <section className="mb-6">
              <label
                htmlFor="whatsapp"
                className="mb-2 block text-lg font-semibold text-gray-900"
              >
                Nomor WhatsApp <span className="text-red-500">*</span>
              </label>
              <input
                id="whatsapp"
                type="tel"
                value={whatsappNumber}
                onChange={(e) => handleWhatsAppChange(e.target.value)}
                onBlur={() => validateWhatsApp(whatsappNumber)}
                placeholder="081234567890"
                className={`w-full rounded-lg border px-4 py-3 text-gray-900 placeholder-gray-400 transition-colors focus:outline-none focus:ring-2 ${
                  whatsappError
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                }`}
              />
              {whatsappError && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 flex items-center gap-2 text-sm text-red-600"
                >
                  <AlertCircle className="h-4 w-4" />
                  {whatsappError}
                </motion.p>
              )}
              {!whatsappError && whatsappNumber && (
                <p className="mt-2 text-xs text-gray-500">
                  Format: 08xxxxxxxxxx (10-13 digit)
                </p>
              )}
            </section>
          </div>

          {/* Right Column - Summary (Desktop) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-lg bg-white p-6 shadow-lg">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">
                Ringkasan Pesanan
              </h2>
              
              <div className="mb-4 space-y-2 border-b border-gray-200 pb-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between text-sm text-gray-600"
                  >
                    <span className="flex-1 truncate">{item.name} x{item.quantity}</span>
                    <span className="ml-2 font-medium">
                      Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mb-4 space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>Rp {totalPrice.toLocaleString("id-ID")}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Meja</span>
                  <span>{selectedTable ? `Meja ${selectedTable}` : "-"}</span>
                </div>
              </div>

              <div className="mb-6 border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-orange-600">
                    Rp {totalPrice.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>

              {/* Submit Button - Desktop */}
              <Tooltip
                disabled={!canSubmit && !isSubmitting}
                content={
                  !selectedTable
                    ? "Pilih nomor meja terlebih dahulu"
                    : !whatsappNumber.trim()
                    ? "Isi nomor WhatsApp terlebih dahulu"
                    : "Lengkapi semua data untuk melanjutkan"
                }
              >
                <motion.button
                  onClick={handleSubmit}
                  disabled={!canSubmit || isSubmitting}
                  whileTap={canSubmit && !isSubmitting ? { scale: 0.95 } : {}}
                  whileHover={canSubmit && !isSubmitting ? { scale: 1.02 } : {}}
                  className={`hidden w-full rounded-lg py-4 text-lg font-semibold text-white transition-all lg:block ${
                    canSubmit && !isSubmitting
                      ? "bg-orange-600 hover:bg-orange-700 hover:shadow-lg"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  {isSubmitting ? "Memproses..." : "Pesan Sekarang"}
                </motion.button>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Submit Button - Mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-gray-200 bg-white p-4 shadow-lg lg:hidden">
        <div className="mx-auto max-w-4xl">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-gray-600">Total</span>
            <span className="text-lg font-bold text-orange-600">
              Rp {totalPrice.toLocaleString("id-ID")}
            </span>
          </div>
          <Tooltip
            disabled={!canSubmit && !isSubmitting}
            content={
              !selectedTable
                ? "Pilih nomor meja terlebih dahulu"
                : !whatsappNumber.trim()
                ? "Isi nomor WhatsApp terlebih dahulu"
                : "Lengkapi semua data untuk melanjutkan"
            }
          >
            <motion.button
              onClick={handleSubmit}
              disabled={!canSubmit || isSubmitting}
              whileTap={canSubmit && !isSubmitting ? { scale: 0.95 } : {}}
              className={`w-full rounded-lg py-3 text-base font-semibold text-white transition-colors ${
                canSubmit && !isSubmitting
                  ? "bg-orange-600 hover:bg-orange-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              {isSubmitting ? "Memproses..." : "Pesan Sekarang"}
            </motion.button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
