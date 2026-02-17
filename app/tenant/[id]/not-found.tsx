import Link from "next/link";
import { ArrowLeft, Store } from "lucide-react";

export default function NotFound() {
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

      <main className="mx-auto max-w-2xl px-4 py-12 text-center">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-orange-100 p-4">
            <Store className="h-16 w-16 text-orange-600" />
          </div>
        </div>
        
        <h1 className="mb-4 text-4xl font-bold text-gray-900">
          Tenant Tidak Ditemukan
        </h1>
        
        <p className="mb-8 text-lg text-gray-600">
          Maaf, pedagang yang Anda cari tidak ditemukan atau mungkin sudah tidak tersedia.
        </p>
        
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg bg-orange-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-orange-700"
        >
          <ArrowLeft className="h-5 w-5" />
          Kembali ke Beranda
        </Link>
      </main>
    </div>
  );
}
