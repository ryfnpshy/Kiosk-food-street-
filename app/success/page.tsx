import Link from "next/link";
import { CheckCircle, Home } from "lucide-react";

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="mx-auto max-w-2xl px-4 py-12">
        <div className="rounded-xl bg-white p-8 text-center shadow-lg">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-green-100 p-4">
              <CheckCircle className="h-16 w-16 text-green-600" />
            </div>
          </div>
          
          <h1 className="mb-4 text-3xl font-bold text-gray-900">
            Pesanan Berhasil!
          </h1>
          
          <p className="mb-8 text-lg text-gray-600">
            Terima kasih atas pesanan Anda. Pesanan sedang diproses dan akan segera disiapkan.
          </p>
          
          <p className="mb-8 text-sm text-gray-500">
            Kami akan mengirimkan konfirmasi ke nomor WhatsApp yang Anda berikan.
          </p>
          
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg bg-orange-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-orange-700"
          >
            <Home className="h-5 w-5" />
            Kembali ke Beranda
          </Link>
        </div>
      </main>
    </div>
  );
}
