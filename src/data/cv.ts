export interface Experience {
  id: string
  company: string
  role: string
  period: string
  startYear: number
  endYear: number | 'present'
  vehicles: string[]
  category: 'logistik' | 'eksekutif' | 'pribadi' | 'cargo'
  description: string
  color: string
}

export interface Skill {
  id: string
  title: string
  description: string
  icon: string
}

export interface VehicleCategory {
  id: string
  name: string
  vehicles: string[]
  description: string
}

export interface Marker {
  name: string
  lat: number
  lng: number
  size?: number
  pulse?: boolean
}

export const profile = {
  name: 'Endang Saepudin',
  birth: 'Bandung, 12 September 1983',
  location: 'Tasikmalaya / Bandung / Jakarta, Indonesia',
  phone: '081111191209',
  whatsapp: '6281111191209',
  religion: 'Islam',
  title: 'Professional Driver & Fleet Specialist',
  tagline: 'Navigating Every Road with Precision & Trust',
}

export const visitedCityMarkers: Marker[] = [
  { name: 'Jakarta', lat: -6.2088, lng: 106.8456 },
  { name: 'Bandung', lat: -6.9175, lng: 107.6191 },
  { name: 'Tasikmalaya', lat: -7.3274, lng: 108.2207 },
]

export const education = [
  { school: 'SDN Pakar 1 Bandung', years: '1990–1996' },
  { school: 'SMP Pasundan 6 Bandung', years: '1996–1999' },
  { school: 'SMK ICB Bandung (Otomotif)', years: '1999–2002' },
]

export const skills: Skill[] = [
  {
    id: 'driving',
    title: 'Professional Driving & Navigation',
    description: 'Pengemudi profesional kendaraan matic & manual. Menguasai rute bebas hambatan/protokol dalam & luar kota dengan keahlian navigasi tinggi.',
    icon: 'compass',
  },
  {
    id: 'fleet',
    title: 'Fleet & Vehicle Knowledge',
    description: 'Pemahaman mendasar pemeliharaan & perbaikan mesin armada kendaraan ringan hingga berat.',
    icon: 'wrench',
  },
  {
    id: 'tech',
    title: 'Tech & Computer Skills',
    description: 'Pengoperasian komputer, gadget, dan sistem digital modern.',
    icon: 'laptop',
  },
]

export const experiences: Experience[] = [
  {
    id: 'jnt',
    company: 'J&T Cargo (JKT193A Matraman)',
    role: 'Driver PickUp Reg',
    period: 'Des 2025 – Sekarang',
    startYear: 2025,
    endYear: 'present',
    vehicles: ['Gran Max', 'Canter 110PS', 'Isuzu NHR-55'],
    category: 'cargo',
    description: 'Driver pickup reguler untuk pengiriman cargo dengan armada ringan hingga sedang.',
    color: '#00F0FF',
  },
  {
    id: 'bluebird',
    company: 'PT. BlueBird Bandung',
    role: 'Driver Eksekutif & Pariwisata',
    period: 'Mar 2018 – Feb 2025',
    startYear: 2018,
    endYear: 2025,
    vehicles: ['Toyota Alphard', 'Innova Reborn', 'Bus Pariwisata Hino RK8'],
    category: 'eksekutif',
    description: 'Driver eksekutif dan pariwisata untuk klien premium dan paket tour.',
    color: '#FFB800',
  },
  {
    id: 'bbs',
    company: 'PT. BBS Gede Bage',
    role: 'Driver Logistik',
    period: 'Feb 2017 – Jan 2018',
    startYear: 2017,
    endYear: 2018,
    vehicles: ['Isuzu Giga 210PS Flatbed'],
    category: 'logistik',
    description: 'Driver logistik dengan armada flatbed untuk pengangkutan barang berat.',
    color: '#00F0FF',
  },
  {
    id: 'harapindo',
    company: 'PT. HarapIndo Bandung',
    role: 'Driver Direksi & Logistik',
    period: 'Agu 2015 – Jan 2017',
    startYear: 2015,
    endYear: 2017,
    vehicles: ['Nissan X-Trail', 'CR-V', 'Innova', 'Canter 110PS'],
    category: 'eksekutif',
    description: 'Driver pribadi direksi sekaligus mendukung operasional logistik.',
    color: '#FFB800',
  },
  {
    id: 'thenine',
    company: 'Pabrik Coklat THE NINE',
    role: 'Driver Pengiriman',
    period: 'Apr 2009 – Jun 2015',
    startYear: 2009,
    endYear: 2015,
    vehicles: ['Mitsubishi Canter 125PS', 'Toyota DYNA 130XT'],
    category: 'logistik',
    description: 'Driver pengiriman produk coklat dengan armada medium truck.',
    color: '#00F0FF',
  },
  {
    id: 'djadjang',
    company: 'Keluarga Djadjang Nurjaman (Persib)',
    role: 'Driver Pribadi',
    period: 'Jan 2007 – Mei 2009',
    startYear: 2007,
    endYear: 2009,
    vehicles: ['Grand Cherokee', 'Mercedes Benz E200', 'Land Cruiser', 'Alphard'],
    category: 'pribadi',
    description: 'Driver pribadi untuk keluarga tokoh sepakbola Persib Bandung.',
    color: '#FFB800',
  },
  {
    id: 'zulkarnaen',
    company: 'Keluarga H. Zulkarnaen (Humas Pikiran Rakyat)',
    role: 'Driver Pribadi',
    period: 'Apr 2002 – Jun 2007',
    startYear: 2002,
    endYear: 2007,
    vehicles: ['Suzuki Escudo', 'Mazda E200', 'Nissan Terrano', 'Honda Odyssey'],
    category: 'pribadi',
    description: 'Driver pribadi untuk keluarga humas media Pikiran Rakyat.',
    color: '#00F0FF',
  },
]

export const vehicleCategories: VehicleCategory[] = [
  {
    id: 'city',
    name: 'City Car & SUV',
    vehicles: ['Toyota Innova', 'Nissan X-Trail', 'Honda CR-V', 'Suzuki Escudo', 'Nissan Terrano'],
    description: 'Kendaraan harian & keluarga yang nyaman untuk perjalanan dalam kota.',
  },
  {
    id: 'executive',
    name: 'Executive MPV & Luxury',
    vehicles: ['Toyota Alphard', 'Mercedes Benz E200', 'Honda Odyssey', 'Grand Cherokee', 'Land Cruiser'],
    description: 'Armada premium untuk klien eksekutif dan VIP.',
  },
  {
    id: 'commercial',
    name: 'Commercial Truck',
    vehicles: ['Mitsubishi Canter 110/125PS', 'Isuzu NHR-55', 'Toyota DYNA 130XT', 'Gran Max'],
    description: 'Truk ringan & medium untuk distribusi dan cargo.',
  },
  {
    id: 'heavy',
    name: 'Heavy Logistics & Bus',
    vehicles: ['Isuzu Giga 210PS Flatbed', 'Bus Pariwisata Hino RK8'],
    description: 'Armada berat untuk logistik skala besar dan pariwisata.',
  },
]

export const categories = [
  { id: 'all', label: 'Semua' },
  { id: 'logistik', label: 'Logistik' },
  { id: 'eksekutif', label: 'Eksekutif' },
  { id: 'pribadi', label: 'Pribadi' },
  { id: 'cargo', label: 'Cargo' },
]
