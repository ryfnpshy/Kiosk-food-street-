export interface Tenant {
  id: string;
  name: string;
  image: string;
}

export interface Menu {
  id: string;
  tenantId: string;
  name: string;
  price: number;
  description: string;
}

export const tenants: Tenant[] = [
  {
    id: "1",
    name: "Warung Nasi Padang",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop",
  },
  {
    id: "2",
    name: "Bakso Malang Cak Kar",
    image: "https://images.unsplash.com/photo-1612874742237-652622b8b378?w=400&h=300&fit=crop",
  },
  {
    id: "3",
    name: "Sate Madura Pak Joko",
    image: "https://images.unsplash.com/photo-1574781330858-7c07c894d0a5?w=400&h=300&fit=crop",
  },
  {
    id: "4",
    name: "Gudeg Jogja Bu Sari",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop",
  },
  {
    id: "5",
    name: "Mie Ayam Bakso Abang",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop",
  },
];

export const menus: Menu[] = [
  // Menu untuk Warung Nasi Padang (id: 1)
  {
    id: "m1",
    tenantId: "1",
    name: "Nasi Padang Komplit",
    price: 25000,
    description: "Nasi putih dengan rendang, gulai ayam, sayur nangka, dan sambal",
  },
  {
    id: "m2",
    tenantId: "1",
    name: "Rendang Sapi",
    price: 35000,
    description: "Rendang sapi khas Padang dengan bumbu rempah yang kaya",
  },
  {
    id: "m3",
    tenantId: "1",
    name: "Gulai Ayam",
    price: 20000,
    description: "Gulai ayam dengan kuah santan yang gurih",
  },
  {
    id: "m4",
    tenantId: "1",
    name: "Ayam Pop",
    price: 22000,
    description: "Ayam pop khas Padang dengan sambal hijau",
  },
  
  // Menu untuk Bakso Malang Cak Kar (id: 2)
  {
    id: "m5",
    tenantId: "2",
    name: "Bakso Urat",
    price: 15000,
    description: "Bakso urat dengan kuah kaldu sapi yang nikmat",
  },
  {
    id: "m6",
    tenantId: "2",
    name: "Bakso Malang Special",
    price: 20000,
    description: "Bakso malang dengan pangsit, tahu, dan mie",
  },
  {
    id: "m7",
    tenantId: "2",
    name: "Bakso Jumbo",
    price: 25000,
    description: "Bakso jumbo dengan isian lengkap",
  },
  {
    id: "m8",
    tenantId: "2",
    name: "Mie Ayam Bakso",
    price: 18000,
    description: "Mie ayam dengan bakso dan pangsit",
  },
  
  // Menu untuk Sate Madura Pak Joko (id: 3)
  {
    id: "m9",
    tenantId: "3",
    name: "Sate Ayam (10 tusuk)",
    price: 20000,
    description: "Sate ayam dengan bumbu kacang khas Madura",
  },
  {
    id: "m10",
    tenantId: "3",
    name: "Sate Kambing (10 tusuk)",
    price: 35000,
    description: "Sate kambing dengan bumbu kecap dan sambal",
  },
  {
    id: "m11",
    tenantId: "3",
    name: "Sate Campur (20 tusuk)",
    price: 50000,
    description: "Sate campur ayam dan kambing",
  },
  {
    id: "m12",
    tenantId: "3",
    name: "Lontong Sate",
    price: 25000,
    description: "Lontong dengan sate ayam dan bumbu kacang",
  },
  
  // Menu untuk Gudeg Jogja Bu Sari (id: 4)
  {
    id: "m13",
    tenantId: "4",
    name: "Gudeg Komplit",
    price: 20000,
    description: "Gudeg dengan nasi, ayam, tahu, tempe, dan sambal krecek",
  },
  {
    id: "m14",
    tenantId: "4",
    name: "Gudeg Special",
    price: 30000,
    description: "Gudeg dengan ayam, telur, tahu, tempe, dan sambal krecek",
  },
  {
    id: "m15",
    tenantId: "4",
    name: "Gudeg Kering",
    price: 18000,
    description: "Gudeg kering dengan ayam dan sambal",
  },
  
  // Menu untuk Mie Ayam Bakso Abang (id: 5)
  {
    id: "m16",
    tenantId: "5",
    name: "Mie Ayam",
    price: 15000,
    description: "Mie ayam dengan ayam suwir dan pangsit",
  },
  {
    id: "m17",
    tenantId: "5",
    name: "Mie Ayam Bakso",
    price: 18000,
    description: "Mie ayam dengan bakso dan pangsit",
  },
  {
    id: "m18",
    tenantId: "5",
    name: "Bakso Urat",
    price: 16000,
    description: "Bakso urat dengan kuah kaldu sapi",
  },
  {
    id: "m19",
    tenantId: "5",
    name: "Mie Ayam Komplit",
    price: 22000,
    description: "Mie ayam dengan bakso, pangsit, dan ceker",
  },
];
