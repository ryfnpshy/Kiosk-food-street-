# 🍜 TelEatz - Platform Kiosk Food Street Modern

<div align="center">

**Revolusi Cara Memesan Makanan di Food Court!** 🚀

*Aplikasi kiosk self-service yang menghadirkan pengalaman pemesanan makanan yang cepat, mudah, dan menyenangkan*

[![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.3-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

</div>

---

## ✨ Kenapa TelEatz?

Bayangkan sebuah food court di mana pelanggan tidak perlu lagi mengantri panjang atau bingung memilih menu. **TelEatz** hadir sebagai solusi kiosk digital yang membuat pengalaman memesan makanan menjadi:

- ⚡ **Super Cepat** - Pesan dalam hitungan detik, tanpa antrian kasir
- 🎯 **Mudah Digunakan** - Interface intuitif yang bisa digunakan siapa saja
- 🔍 **Smart Search** - Cari pedagang atau menu favorit dengan instant search
- 🛒 **Keranjang Pintar** - Kelola pesanan dari berbagai pedagang sekaligus
- 💳 **Checkout Seamless** - Proses pembayaran yang smooth dan efisien
- ✅ **Konfirmasi Real-time** - Notifikasi pesanan berhasil dengan animasi menarik

## 🎯 Fitur Unggulan

### 🏪 Multi-Tenant System
Satu platform untuk banyak pedagang! Setiap tenant memiliki menu dan identitas uniknya sendiri.

### 🔎 Pencarian Cerdas
Sistem pencarian yang powerful - temukan pedagang berdasarkan nama atau cari langsung menu favoritmu!

### 🎨 UI/UX Premium
- **Animasi Smooth** dengan Framer Motion
- **Responsive Design** - Perfect di semua ukuran layar
- **Modern & Clean** - Interface yang eye-catching dan mudah dipahami
- **Micro-interactions** - Setiap klik terasa hidup dan responsif

### 🛍️ Shopping Experience
- Keranjang belanja dengan state management Zustand
- Real-time update jumlah item
- Checkout flow yang intuitif
- Success notification yang engaging

## 🚀 Tech Stack

Dibangun dengan teknologi modern terbaik untuk performa maksimal:

| Technology | Purpose | Version |
|-----------|---------|---------|
| **Next.js** | React Framework dengan App Router | 16.1.6 |
| **React** | UI Library | 19.2.3 |
| **TypeScript** | Type Safety | 5.0 |
| **Tailwind CSS** | Utility-First Styling | 4.0 |
| **Framer Motion** | Smooth Animations | 12.34.0 |
| **Zustand** | State Management | 5.0.11 |
| **Lucide React** | Beautiful Icons | 0.563.0 |

## 📦 Quick Start

### Prerequisites
Pastikan kamu sudah install:
- Node.js 20+ 
- pnpm (recommended) / npm / yarn

### Installation

```bash
# Clone repository
git clone <repository-url>
cd "Kiosk(food street)"

# Install dependencies
pnpm install
# atau
npm install

# Run development server
pnpm dev
# atau
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) dan lihat magic-nya! ✨

### Build untuk Production

```bash
# Build optimized production bundle
pnpm build

# Start production server
pnpm start
```

## 📁 Struktur Project

```
Kiosk(food street)/
├── app/                      # Next.js App Router
│   ├── components/          # Reusable components
│   │   ├── CartButton.tsx   # Shopping cart button
│   │   ├── SuccessPopup.tsx # Order success modal
│   │   └── ...
│   ├── tenant/[id]/         # Dynamic tenant pages
│   ├── checkout/            # Checkout flow
│   ├── success/             # Success page
│   └── page.tsx             # Homepage - Tenant selection
├── src/
│   └── lib/
│       └── data.ts          # Mock data (tenants & menus)
└── public/                  # Static assets
```

## 🎨 Highlights

### 🏠 Homepage
- Grid layout pedagang dengan gambar menarik
- Real-time search dengan filtering cerdas
- Smooth animations saat load dan hover
- Responsive dari mobile hingga desktop

### 🍽️ Halaman Menu Tenant
- Katalog menu lengkap dengan deskripsi
- Add to cart dengan feedback visual
- Floating cart button dengan badge counter
- Smooth page transitions

### 🛒 Checkout Flow
- Review pesanan sebelum konfirmasi
- Clear pricing breakdown
- Easy-to-use interface
- Instant feedback

### ✅ Success Page
- Celebratory animations
- Order summary yang jelas
- Quick action untuk order lagi

## 🎯 Use Cases

TelEatz cocok untuk:
- 🏢 **Food Court** di mall atau perkantoran
- 🎓 **Kantin Kampus** dengan banyak tenant
- 🏪 **Food Street** atau pasar kuliner
- 🎪 **Event & Festival** makanan
- 🏨 **Hotel** dengan multiple F&B outlets

## 🔮 Roadmap

Fitur yang akan datang:
- [ ] 💳 Integrasi payment gateway
- [ ] 📱 QR Code untuk pickup order
- [ ] 📊 Dashboard admin untuk tenant
- [ ] 🔔 Real-time order notifications
- [ ] ⭐ Rating & review system
- [ ] 🎁 Loyalty program & vouchers
- [ ] 📈 Analytics & reporting

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork repository ini
2. Buat feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 💬 Contact & Support

Ada pertanyaan atau saran? Jangan ragu untuk reach out!

---

<div align="center">

**Dibuat dengan ❤️ untuk pengalaman food court yang lebih baik**

⭐ Jangan lupa kasih star kalau project ini bermanfaat! ⭐

</div>
