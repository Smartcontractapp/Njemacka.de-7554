export const coupons = [
  {
    id: 1,
    title: "20% popust na Deutsche Bahn karte",
    description: "Putujte po Njemačkoj sa fantastičnim popustom na sve regionalne i međugradske vozove.",
    code: "TRAIN20DE",
    discount: "20%",
    validUntil: "31. decembar 2024",
    category: "Transport",
    company: "Deutsche Bahn",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    link: "https://www.bahn.de",
    featured: true,
    timeLimit: "7 dana", // Novo polje za vremensko ograničenje
    terms: [
      "Važi za sve regionalne i IC/EC vozove",
      "Ne važi za ICE vozove",
      "Maksimalno 2 karte po kuponu",
      "Ne može se kombinovati sa drugim popustima"
    ]
  },
  {
    id: 2,
    title: "15€ popust za Booking.com",
    description: "Rezervišite smještaj u Njemačkoj i uštedite na prvoj rezervaciji.",
    code: "GERMANY15",
    discount: "15€",
    validUntil: "28. februar 2025",
    category: "Smještaj",
    company: "Booking.com",
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    link: "https://www.booking.com",
    featured: true,
    timeLimit: "3 dana",
    terms: [
      "Minimalna vrijednost rezervacije 100€",
      "Važi samo za hotele u Njemačkoj",
      "Jedan kupon po korisniku",
      "Važi za nove korisnike"
    ]
  },
  {
    id: 3,
    title: "25% popust u Lidl trgovinama",
    description: "Kupujte njemačke specijalitete sa velikim popustom u Lidl trgovinama.",
    code: "LIDLDE25",
    discount: "25%",
    validUntil: "15. januar 2025",
    category: "Kupovina",
    company: "Lidl",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    link: "https://www.lidl.de",
    featured: false,
    timeLimit: "1 dan",
    terms: [
      "Važi na njemačke specijalitete",
      "Maksimalno 50€ popusta",
      "Važi u svim Lidl trgovinama",
      "Ne važi na alkoholna pića"
    ]
  },
  {
    id: 4,
    title: "30% popust na Flixbus karte",
    description: "Jeftino putovanje autobusom kroz cijelu Njemačku i Evropu.",
    code: "FLIX30",
    discount: "30%",
    validUntil: "10. mart 2025",
    category: "Transport",
    company: "FlixBus",
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    link: "https://www.flixbus.de",
    featured: true,
    timeLimit: "2 dana",
    terms: [
      "Važi za sve rute u Njemačkoj",
      "Rezervacija do 30 dana unaprijed",
      "Ne važi tokom praznika",
      "Maksimalno 2 karte po kuponu"
    ]
  },
  {
    id: 5,
    title: "10€ popust za Amazon.de",
    description: "Kupujte njemačke proizvode online sa popustom na Amazon.de platformi.",
    code: "AMAZON10DE",
    discount: "10€",
    validUntil: "20. februar 2025",
    category: "Online kupovina",
    company: "Amazon.de",
    image: "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    link: "https://www.amazon.de",
    featured: false,
    timeLimit: "10 dana",
    terms: [
      "Minimalna kupovina 50€",
      "Važi za sve proizvode",
      "Besplatna dostava u Njemačku",
      "Jedan kupon po računu"
    ]
  },
  {
    id: 6,
    title: "50% popust na Oktoberfest ulaznice",
    description: "Doživite autentični Oktoberfest u Münchenu sa velikim popustom na ulaznice.",
    code: "OKTO50",
    discount: "50%",
    validUntil: "1. septembar 2024",
    category: "Događaji",
    company: "Oktoberfest München",
    image: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    link: "https://www.oktoberfest.de",
    featured: true,
    timeLimit: "7 dana",
    terms: [
      "Važi za određene dane",
      "Rezervacija obavezna",
      "Uključuje jedan pivo",
      "Maksimalno 4 karte po kuponu"
    ]
  }
];