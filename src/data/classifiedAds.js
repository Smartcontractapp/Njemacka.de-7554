// Sample data for classifieds - in a real application, this would come from a database

export const classifiedAds = [
  {
    id: 1,
    title: "Iznajmljujem stan u centru Berlina",
    description: "Moderan stan od 45m² u centru Berlina, blizu Alexanderplatza. Stan ima jednu spavaću sobu, dnevni boravak, kuhinju i kupatilo. Dostupan od 1. januara.",
    category: "Stanovanje",
    price: 850,
    location: "Berlin, Mitte",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["stan", "Berlin", "iznajmljivanje", "Mitte"],
    author: "Marko Petrović",
    email: "marko@example.com",
    phone: "+49 123 456 789",
    date: "15.12.2024",
    status: "approved"
  },
  {
    id: 2,
    title: "Prodajem bicikl u odličnom stanju",
    description: "Prodajem bicikl marke Cube, model Attention SL 29. Veličina rama je L. Bicikl je kupljen prije godinu dana i vožen je samo nekoliko puta. U odličnom je stanju, bez ogrebotina ili oštećenja.",
    category: "Prodaja",
    price: 650,
    location: "München",
    image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["bicikl", "Cube", "prodaja", "hobi"],
    author: "Ana Kovač",
    email: "ana@example.com",
    phone: "+49 987 654 321",
    date: "14.12.2024",
    status: "approved"
  },
  {
    id: 3,
    title: "Tražim posao kao dadilja u Hamburgu",
    description: "Studentica sam iz Bosne i Hercegovine, trenutno studiram u Hamburgu. Tražim posao kao dadilja za djecu svih uzrasta. Imam iskustva u radu s djecom i mogu pružiti reference. Dostupna sam poslijepodne i vikendom.",
    category: "Posao",
    price: null,
    location: "Hamburg",
    image: "https://images.unsplash.com/photo-1543342384-1f1350e27861?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["posao", "dadilja", "student", "Hamburg"],
    author: "Selma Hodžić",
    email: "selma@example.com",
    phone: "+49 111 222 333",
    date: "13.12.2024",
    status: "approved"
  },
  {
    id: 4,
    title: "Časovi njemačkog jezika online",
    description: "Nudim privatne časove njemačkog jezika online. Profesorica sam njemačkog jezika s višegodišnjim iskustvom. Časovi su prilagođeni individualnim potrebama učenika, bilo da se radi o početnicima ili naprednim polaznicima. Cijena je po satu.",
    category: "Usluge",
    price: 25,
    location: "Online",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["njemački jezik", "časovi", "online", "učenje"],
    author: "Jasmina Novak",
    email: "jasmina@example.com",
    phone: "+49 444 555 666",
    date: "12.12.2024",
    status: "approved"
  },
  {
    id: 5,
    title: "Tražim suputnike za putovanje u Beč",
    description: "Putujem autom iz Münchena u Beč 20. decembra i tražim suputnike koji bi dijelili troškove goriva. Polazak je u jutarnjim satima, a povratak je planiran 23. decembra. Imam mjesta za još 3 osobe.",
    category: "Putovanja",
    price: 30,
    location: "München-Beč",
    image: "https://images.unsplash.com/photo-1516550893885-7b7791648a25?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["putovanje", "Beč", "prijevoz", "suputnici"],
    author: "Emir Begić",
    email: "emir@example.com",
    phone: "+49 777 888 999",
    date: "11.12.2024",
    status: "approved"
  },
  {
    id: 6,
    title: "Prodajem laptop ASUS ROG Strix G15",
    description: "Prodajem gaming laptop ASUS ROG Strix G15, star godinu dana. Procesor: AMD Ryzen 7 5800H, Grafička kartica: NVIDIA GeForce RTX 3060, RAM: 16GB, SSD: 1TB. Dolazi u originalnoj kutiji sa svim dokumentima i punjačem.",
    category: "Prodaja",
    price: 1200,
    location: "Frankfurt",
    image: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["laptop", "gaming", "ASUS", "tehnologija"],
    author: "Denis Horvatić",
    email: "denis@example.com",
    phone: "+49 333 222 111",
    date: "10.12.2024",
    status: "approved"
  }
];

// Function to handle ad submission in a real app
export const submitAd = async (adData) => {
  // This would send the ad to the backend for approval
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      // Return success response
      resolve({
        success: true,
        message: "Oglas je uspješno poslan i čeka odobrenje administratora."
      });
    }, 1500);
  });
};