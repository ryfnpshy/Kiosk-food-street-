"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Store, Search, X } from "lucide-react";
import { motion } from "framer-motion";
import { tenants, menus } from "@/src/lib/data";
import CartButton from "./components/CartButton";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter tenants and menus based on search query
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) {
      return { tenants, menus: [] };
    }

    const query = searchQuery.toLowerCase().trim();
    
    // Filter tenants by name
    const filteredTenants = tenants.filter((tenant) =>
      tenant.name.toLowerCase().includes(query)
    );

    // Filter menus by name and get their tenant IDs
    const filteredMenus = menus.filter((menu) =>
      menu.name.toLowerCase().includes(query) ||
      menu.description.toLowerCase().includes(query)
    );

    // Get unique tenant IDs from filtered menus
    const menuTenantIds = new Set(filteredMenus.map((menu) => menu.tenantId));

    // Combine tenant matches: direct name matches + tenants that have matching menus
    const allMatchingTenantIds = new Set([
      ...filteredTenants.map((t) => t.id),
      ...Array.from(menuTenantIds),
    ]);

    const finalTenants = tenants.filter((tenant) =>
      allMatchingTenantIds.has(tenant.id)
    );

    return {
      tenants: finalTenants,
      menus: filteredMenus,
    };
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-white shadow-sm">
          <div className="mx-auto max-w-4xl px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Store className="h-6 w-6 text-orange-600" />
                <h1 className="text-xl font-bold text-gray-900">
                  TelEatz
                </h1>
              </div>
              <CartButton />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="mx-auto max-w-4xl px-4 py-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Pilih Pedagang
            </h2>
            <p className="mt-1 text-gray-600">
              Pilih pedagang untuk melihat menu yang tersedia
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari pedagang atau menu..."
                className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-10 text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                  aria-label="Hapus pencarian"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Search Results Info */}
          {searchQuery && (
            <div className="mb-4 text-sm text-gray-600">
              Menampilkan {filteredData.tenants.length} pedagang
              {filteredData.menus.length > 0 &&
                ` dengan ${filteredData.menus.length} menu yang cocok`}
            </div>
          )}

          {/* Tenant Grid */}
          {filteredData.tenants.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filteredData.tenants.map((tenant, index) => {
                // Get matching menus for this tenant
                const tenantMenus = filteredData.menus.filter(
                  (menu) => menu.tenantId === tenant.id
                );

                return (
                  <motion.div
                    key={tenant.id}
                    variants={itemVariants}
                    layout
                  >
                    <Link
                      href={`/tenant/${tenant.id}`}
                      className="group block overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg"
                    >
                      <div className="relative h-48 w-full overflow-hidden bg-gray-200">
                        <Image
                          src={tenant.image}
                          alt={tenant.name}
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          placeholder="blur"
                          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//Z"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-900 transition-colors group-hover:text-orange-600">
                          {tenant.name}
                        </h3>
                        {searchQuery && tenantMenus.length > 0 && (
                          <p className="mt-1 text-sm text-gray-500">
                            {tenantMenus.length} menu ditemukan
                          </p>
                        )}
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <div className="rounded-lg bg-white p-12 text-center shadow-md">
              <Search className="mx-auto mb-4 h-12 w-12 text-gray-400" />
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                Tidak ada hasil ditemukan
              </h3>
              <p className="text-gray-600">
                Coba cari dengan kata kunci lain
              </p>
            </div>
          )}
        </main>
      </div>
  );
}
