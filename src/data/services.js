export const serviceCategories = [
  { id: 'doktori', name: 'Doktori', icon: 'FiHeart', color: 'red' },
  { id: 'zubari', name: 'Zubari', icon: 'FiSmile', color: 'blue' },
  { id: 'zdravstvene-usluge', name: 'Zdravstvene usluge', icon: 'FiActivity', color: 'green' },
  { id: 'pravna-podrska', name: 'Pravna podrška', icon: 'FiScale', color: 'purple' },
  { id: 'ugostiteljstvo', name: 'Ugostiteljstvo', icon: 'FiCoffee', color: 'orange' },
  { id: 'beauty-saloni', name: 'Beauty Saloni', icon: 'FiScissors', color: 'pink' },
  { id: 'auto', name: 'Auto servisi', icon: 'FiTruck', color: 'gray' },
  { id: 'financije', name: 'Financije', icon: 'FiDollarSign', color: 'green' },
  { id: 'racunovode', name: 'Računovođe', icon: 'FiCalculator', color: 'blue' },
  { id: 'ambasade', name: 'Ambasade i konzulati', icon: 'FiFlag', color: 'red' },
  { id: 'gradjevinski-radovi', name: 'Građevinski radovi', icon: 'FiTool', color: 'yellow' },
  { id: 'frizerski-saloni', name: 'Frizerski saloni', icon: 'FiScissors', color: 'purple' },
  { id: 'prevodilacke-usluge', name: 'Prevodioci', icon: 'FiGlobe', color: 'indigo' },
  { id: 'it-usluge', name: 'IT usluge', icon: 'FiMonitor', color: 'blue' },
  { id: 'osiguranje', name: 'Osiguranje', icon: 'FiShield', color: 'green' }
];

export const germanCities = [
  'Berlin', 'Hamburg', 'München', 'Köln', 'Frankfurt am Main',
  'Stuttgart', 'Düsseldorf', 'Leipzig', 'Dortmund', 'Essen',
  'Bremen', 'Dresden', 'Hannover', 'Nürnberg', 'Duisburg',
  'Bochum', 'Wuppertal', 'Bielefeld', 'Bonn', 'Münster',
  'Karlsruhe', 'Mannheim', 'Augsburg', 'Wiesbaden', 'Gelsenkirchen',
  'Mönchengladbach', 'Braunschweig', 'Chemnitz', 'Kiel', 'Aachen'
];

// Sample service data
export const services = [
  {
    id: 1,
    name: "Dr. Marko Petrović",
    category: "doktori",
    subcategory: "Opća medicina",
    city: "Berlin",
    address: "Kantstraße 45, 10625 Berlin",
    phone: "+49 30 1234567",
    whatsapp: "+49 1577 1234567",
    email: "dr.petrovic@example.com",
    website: "https://dr-petrovic.de",
    openingHours: {
      monday: "09:00 - 18:00",
      tuesday: "09:00 - 18:00", 
      wednesday: "09:00 - 18:00",
      thursday: "09:00 - 18:00",
      friday: "09:00 - 16:00",
      saturday: "Zatvoreno",
      sunday: "Zatvoreno"
    },
    description: "Dr. Marko Petrović je specijalista opće medicine s preko 15 godina iskustva. Govori bosanski, hrvatski, srpski, engleski i njemački jezik.",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=500&auto=format&fit=crop&q=60",
    rating: 4.8,
    reviewCount: 124,
    languages: ["Bosanski", "Hrvatski", "Srpski", "Engleski", "Njemački"],
    verified: true,
    featured: true
  },
  {
    id: 2,
    name: "Zubarska ordinacija Dr. Ana Marić",
    category: "zubari",
    subcategory: "Opća stomatologija",
    city: "München",
    address: "Maximilianstraße 12, 80539 München",
    phone: "+49 89 9876543",
    whatsapp: "+49 1577 9876543",
    email: "info@dr-maric.de",
    website: "https://dr-maric-dental.de",
    openingHours: {
      monday: "08:00 - 17:00",
      tuesday: "08:00 - 17:00",
      wednesday: "08:00 - 17:00", 
      thursday: "08:00 - 17:00",
      friday: "08:00 - 15:00",
      saturday: "Zatvoreno",
      sunday: "Zatvoreno"
    },
    description: "Moderna zubarska ordinacija s najnovijom opremom. Dr. Ana Marić specijalizovana je za estetsku stomatologiju i implante.",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500&auto=format&fit=crop&q=60",
    rating: 4.9,
    reviewCount: 89,
    languages: ["Bosanski", "Hrvatski", "Srpski", "Njemački"],
    verified: true,
    featured: false
  },
  {
    id: 3,
    name: "Advokat Miloš Nikolić",
    category: "pravna-podrska",
    subcategory: "Imigracijsko pravo",
    city: "Frankfurt am Main",
    address: "Taunusanlage 8, 60329 Frankfurt am Main",
    phone: "+49 69 5551234",
    whatsapp: "+49 1577 5551234",
    email: "kanzlei@nikolic-law.de",
    website: "https://nikolic-law.de",
    openingHours: {
      monday: "09:00 - 18:00",
      tuesday: "09:00 - 18:00",
      wednesday: "09:00 - 18:00",
      thursday: "09:00 - 18:00", 
      friday: "09:00 - 17:00",
      saturday: "Zatvoreno",
      sunday: "Zatvoreno"
    },
    description: "Specijalizovana advokatska kancelarija za imigracijsko pravo, radne dozvole i naturalizaciju.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60",
    rating: 4.7,
    reviewCount: 156,
    languages: ["Bosanski", "Hrvatski", "Srpski", "Engleski", "Njemački"],
    verified: true,
    featured: true
  },
  {
    id: 4,
    name: "Restoran 'Sarajevo'",
    category: "ugostiteljstvo",
    subcategory: "Balkanska kuhinja",
    city: "Hamburg",
    address: "Steindamm 55, 20099 Hamburg",
    phone: "+49 40 7778888",
    whatsapp: "+49 1577 7778888",
    email: "info@restoran-sarajevo.de",
    website: "https://restoran-sarajevo.de",
    openingHours: {
      monday: "11:00 - 23:00",
      tuesday: "11:00 - 23:00",
      wednesday: "11:00 - 23:00",
      thursday: "11:00 - 23:00",
      friday: "11:00 - 24:00",
      saturday: "11:00 - 24:00",
      sunday: "11:00 - 22:00"
    },
    description: "Autentična balkanska kuhinja u srcu Hamburga. Specijalizovani za ćevape, pljeskavice i tradicionalna jela.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&auto=format&fit=crop&q=60",
    rating: 4.6,
    reviewCount: 234,
    languages: ["Bosanski", "Hrvatski", "Srpski", "Njemački"],
    verified: true,
    featured: false
  },
  {
    id: 5,
    name: "Beauty salon 'Elegance'",
    category: "beauty-saloni",
    subcategory: "Kozmetika i njega",
    city: "Stuttgart",
    address: "Königstraße 28, 70173 Stuttgart",
    phone: "+49 711 3334444",
    whatsapp: "+49 1577 3334444",
    email: "info@elegance-beauty.de",
    website: "https://elegance-beauty.de",
    openingHours: {
      monday: "Zatvoreno",
      tuesday: "09:00 - 19:00",
      wednesday: "09:00 - 19:00",
      thursday: "09:00 - 20:00",
      friday: "09:00 - 19:00",
      saturday: "08:00 - 16:00",
      sunday: "Zatvoreno"
    },
    description: "Profesionalni beauty salon sa širokim spektrom usluga: manikir, pedikir, masaže, tretmani lica.",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=500&auto=format&fit=crop&q=60",
    rating: 4.8,
    reviewCount: 167,
    languages: ["Bosanski", "Njemački"],
    verified: true,
    featured: true
  },
  {
    id: 6,
    name: "Auto servis 'Miletić'",
    category: "auto",
    subcategory: "Opći auto servis",
    city: "Düsseldorf",
    address: "Ackerstraße 15, 40233 Düsseldorf",
    phone: "+49 211 5556666",
    whatsapp: "+49 1577 5556666",
    email: "info@miletic-auto.de",
    website: "https://miletic-auto.de",
    openingHours: {
      monday: "07:30 - 17:00",
      tuesday: "07:30 - 17:00",
      wednesday: "07:30 - 17:00",
      thursday: "07:30 - 17:00",
      friday: "07:30 - 17:00",
      saturday: "08:00 - 13:00",
      sunday: "Zatvoreno"
    },
    description: "Pouzdani auto servis za sve marke vozila. Specijalizovani za BMW, Mercedes i Audi.",
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=500&auto=format&fit=crop&q=60",
    rating: 4.5,
    reviewCount: 98,
    languages: ["Bosanski", "Hrvatski", "Srpski", "Njemački"],
    verified: true,
    featured: false
  }
];

// Function to filter services
export const filterServices = (filters) => {
  let filtered = [...services];
  
  if (filters.category && filters.category !== 'sve') {
    filtered = filtered.filter(service => service.category === filters.category);
  }
  
  if (filters.city && filters.city !== 'sve') {
    filtered = filtered.filter(service => service.city === filters.city);
  }
  
  if (filters.search) {
    const searchTerm = filters.search.toLowerCase();
    filtered = filtered.filter(service => 
      service.name.toLowerCase().includes(searchTerm) ||
      service.description.toLowerCase().includes(searchTerm) ||
      service.subcategory.toLowerCase().includes(searchTerm)
    );
  }
  
  if (filters.verified) {
    filtered = filtered.filter(service => service.verified);
  }
  
  return filtered;
};

// Function to get services by category
export const getServicesByCategory = (categoryId) => {
  return services.filter(service => service.category === categoryId);
};

// Function to get services by city
export const getServicesByCity = (city) => {
  return services.filter(service => service.city === city);
};

// Function to get featured services
export const getFeaturedServices = () => {
  return services.filter(service => service.featured);
};