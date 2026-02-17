"use client";

import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Tenant, Menu } from "@/src/lib/data";
import TenantMenuClient from "./TenantMenuClient";
import TenantCartButton from "./TenantCartButton";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
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

interface TenantPageClientProps {
  tenant: Tenant;
  tenantMenus: Menu[];
}

export default function TenantPageClient({
  tenant,
  tenantMenus,
}: TenantPageClientProps) {
  return (
    <div className="min-h-screen bg-gray-50 pb-24">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-white shadow-sm">
          <div className="mx-auto max-w-4xl px-4 py-4">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="flex items-center justify-center rounded-lg p-2 text-gray-700 transition-colors hover:bg-gray-100"
              >
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div className="flex-1">
                <h1 className="text-xl font-bold text-gray-900">
                  {tenant.name}
                </h1>
              </div>
            </div>
          </div>
        </header>

        {/* Tenant Image */}
        <div className="relative h-64 w-full bg-gray-200">
          <Image
            src={tenant.image}
            alt={tenant.name}
            fill
            className="object-cover"
            sizes="100vw"
            priority
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//Z"
          />
        </div>

        {/* Menu List */}
        <main className="mx-auto max-w-4xl px-4 py-6">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">Menu</h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            {tenantMenus.map((menu, index) => (
              <motion.div
                key={menu.id}
                variants={itemVariants}
                layout
              >
                <TenantMenuClient menu={menu} />
              </motion.div>
            ))}
          </motion.div>
        </main>

        {/* Sticky Cart Button */}
        <TenantCartButton />
      </div>
  );
}
