"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Trash2, Minus, Plus } from "lucide-react";
import { useCartStore } from "@/src/store/useCartStore";
import CheckoutClient from "./CheckoutClient";

export default function CheckoutPage() {
  return <CheckoutClient />;
}
