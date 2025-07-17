// Sample reviews data for the application
export const productReviews = [
  {
    id: 1,
    productId: 101,
    title: "Odlična usluga!",
    comment: "Veoma brza dostava i vrhunski kvalitet proizvoda. Definitivno ću ponovo kupovati ovdje.",
    rating: 5,
    name: "Marko Perić",
    date: "15.11.2023",
    helpful: 24,
    notHelpful: 2,
    verified: true,
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 2,
    productId: 101,
    title: "Dobra ponuda",
    comment: "Proizvod je dobar, ali mogao bi biti jeftiniji. Ipak, zadovoljan sam kvalitetom i brzinom isporuke.",
    rating: 4,
    name: "Ana Kovač",
    date: "23.10.2023",
    helpful: 15,
    notHelpful: 3,
    verified: true
  },
  {
    id: 3,
    productId: 101,
    title: "Razočaravajuće",
    comment: "Nisam zadovoljan kvalitetom. Očekivao sam mnogo više za ovu cijenu.",
    rating: 2,
    name: "Emir Hodžić",
    date: "05.09.2023",
    helpful: 8,
    notHelpful: 12,
    verified: true
  },
  {
    id: 4,
    productId: 101,
    title: "Prosječno",
    comment: "Proizvod je u redu, ali ništa posebno. Dostava je bila brza, to je plus.",
    rating: 3,
    name: "Lejla Mehić",
    date: "17.08.2023",
    helpful: 10,
    notHelpful: 5,
    verified: false
  },
  {
    id: 5,
    productId: 101,
    title: "Vrhunski proizvod!",
    comment: "Ovo je jedan od najboljih proizvoda koje sam kupio. Kvalitet je izvanredan i cijena je opravdana.",
    rating: 5,
    name: "Damir Begić",
    date: "02.07.2023",
    helpful: 32,
    notHelpful: 1,
    verified: true,
    image: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  }
];

export const serviceReviews = [
  {
    id: 1,
    serviceId: 1, // Dr. Marko Petrović
    title: "Izvrstan liječnik",
    comment: "Dr. Petrović je izvrstan liječnik. Vrlo je pažljiv, strpljiv i detaljno objašnjava sve. Osjećala sam se ugodno i sigurno tijekom pregleda.",
    rating: 5,
    name: "Ana K.",
    date: "15.10.2023",
    helpful: 18,
    notHelpful: 1,
    verified: true
  },
  {
    id: 2,
    serviceId: 1,
    title: "Najbolji doktor u Berlinu",
    comment: "Najbolji doktor kojeg sam imao u Njemačkoj. Govori naš jezik što mi jako olakšava komunikaciju. Uvijek uzima dovoljno vremena za pregled i odgovara na sva pitanja.",
    rating: 5,
    name: "Miroslav J.",
    date: "03.09.2023",
    helpful: 22,
    notHelpful: 0,
    verified: true
  },
  {
    id: 3,
    serviceId: 1,
    title: "Vrlo profesionalno",
    comment: "Vrlo profesionalan pristup i ugodna atmosfera u ordinaciji. Čekanje zna biti malo duže, ali kvaliteta usluge to nadoknađuje.",
    rating: 4,
    name: "Selma H.",
    date: "22.07.2023",
    helpful: 9,
    notHelpful: 2,
    verified: true
  },
  {
    id: 4,
    serviceId: 2, // Zubarska ordinacija Dr. Ana Marić
    title: "Odlična stomatologinja",
    comment: "Dr. Marić je izuzetno stručna i nježna. Prvi put u životu odlazak kod zubara nije bio stresan. Sve preporuke!",
    rating: 5,
    name: "Jasmin P.",
    date: "28.11.2023",
    helpful: 14,
    notHelpful: 1,
    verified: true
  },
  {
    id: 5,
    serviceId: 2,
    title: "Zadovoljan uslugom",
    comment: "Ordinacija je moderna i čista, osoblje ljubazno. Cijene su malo više, ali kvaliteta opravdava cijenu.",
    rating: 4,
    name: "Adnan M.",
    date: "14.10.2023",
    helpful: 7,
    notHelpful: 3,
    verified: true
  }
];

// Function to get reviews by product ID
export const getReviewsByProduct = (productId) => {
  return productReviews.filter(review => review.productId === productId);
};

// Function to get reviews by service ID
export const getReviewsByService = (serviceId) => {
  return serviceReviews.filter(review => review.serviceId === serviceId);
};

// Function to add a new review
export const addReview = (type, id, reviewData) => {
  const newReview = {
    id: Date.now(),
    [type === 'product' ? 'productId' : 'serviceId']: id,
    ...reviewData,
    date: new Date().toLocaleDateString('sr-RS'),
    helpful: 0,
    notHelpful: 0,
    verified: true
  };

  if (type === 'product') {
    productReviews.push(newReview);
  } else if (type === 'service') {
    serviceReviews.push(newReview);
  }

  return newReview;
};