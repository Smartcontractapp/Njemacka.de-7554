// Kategorije za nove funkcionalnosti
export const categories = [
  {
    id: 'besplatno',
    name: 'Besplatno',
    slug: 'besplatno',
    description: 'Besplatne usluge, aplikacije i mogućnosti u Njemačkoj',
    color: 'green',
    icon: 'FiGift'
  },
  {
    id: 'kredit',
    name: 'Kredit u Njemačkoj',
    slug: 'kredit-u-njemackoj',
    description: 'Sve o kreditima, zajmovima i finansiranju u Njemačkoj',
    color: 'blue',
    icon: 'FiCreditCard'
  },
  {
    id: 'bankovni-racun',
    name: 'Bankovni račun',
    slug: 'bankovni-racun',
    description: 'Vodič za otvaranje i korišćenje bankovnih računa u Njemačkoj',
    color: 'purple',
    icon: 'FiDollarSign'
  },
  {
    id: 'zdravstveno-osiguranje',
    name: 'Zdravstveno osiguranje',
    slug: 'zdravstveno-osiguranje',
    description: 'Informacije o zdravstvenom osiguranju i zdravstvenoj zaštiti',
    color: 'red',
    icon: 'FiHeart'
  },
  {
    id: 'mobilni-telefoni',
    name: 'Mobilni Telefoni',
    slug: 'mobilni-telefoni',
    description: 'Mobilni operatori, tarife i usluge u Njemačkoj',
    color: 'indigo',
    icon: 'FiSmartphone'
  },
  {
    id: 'internet-prikljucak',
    name: 'Internet priključak',
    slug: 'internet-prikljucak',
    description: 'Internet provajderi, tarife i instalacija u Njemačkoj',
    color: 'teal',
    icon: 'FiWifi'
  },
  // Nove podkategorije
  {
    id: 'gradovi',
    name: 'Gradovi',
    slug: 'gradovi',
    description: 'Otkrijte najljepše njemačke gradove i njihove atrakcije',
    color: 'gray',
    icon: 'FiBuilding'
  },
  {
    id: 'priroda',
    name: 'Priroda',
    slug: 'priroda',
    description: 'Planine, jezera i nacionalni parkovi Njemačke',
    color: 'green',
    icon: 'FiSun'
  },
  {
    id: 'transport',
    name: 'Transport',
    slug: 'transport',
    description: 'Savjeti za javni prevoz i putovanje po Njemačkoj',
    color: 'blue',
    icon: 'FiTrain'
  },
  {
    id: 'smjestaj',
    name: 'Smještaj',
    slug: 'smjestaj',
    description: 'Hoteli, hosteli, apartmani i druge opcije smještaja',
    color: 'orange',
    icon: 'FiUmbrella'
  },
  {
    id: 'festivali',
    name: 'Festivali',
    slug: 'festivali',
    description: 'Oktoberfest, božićni sajmovi i drugi festivali',
    color: 'pink',
    icon: 'FiCalendar'
  },
  {
    id: 'muzika',
    name: 'Muzika',
    slug: 'muzika',
    description: 'Klasična muzika, opera i savremeni njemački zvukovi',
    color: 'purple',
    icon: 'FiMusic'
  },
  {
    id: 'umetnost',
    name: 'Umetnost',
    slug: 'umetnost',
    description: 'Muzeji, galerije i umetničke kolonije',
    color: 'indigo',
    icon: 'FiCamera'
  },
  {
    id: 'film',
    name: 'Film i TV',
    slug: 'film',
    description: 'Njemačka kinematografija i televizija',
    color: 'red',
    icon: 'FiFilm'
  },
  {
    id: 'rad',
    name: 'Rad i Karijera',
    slug: 'rad',
    description: 'Zapošljavanje, karijera i poslovne prilike',
    color: 'blue',
    icon: 'FiTrendingUp'
  },
  {
    id: 'obrazovanje',
    name: 'Obrazovanje',
    slug: 'obrazovanje',
    description: 'Škole, univerziteti i obrazovni sistem',
    color: 'green',
    icon: 'FiBook'
  },
  {
    id: 'zdravlje',
    name: 'Zdravlje',
    slug: 'zdravlje',
    description: 'Zdravstveni sistem, wellness i fitness',
    color: 'red',
    icon: 'FiHeart'
  },
  {
    id: 'hrana',
    name: 'Hrana i Piće',
    slug: 'hrana',
    description: 'Njemačka kuhinja i lokalni specijaliteti',
    color: 'orange',
    icon: 'FiCoffee'
  },
  {
    id: 'porezi',
    name: 'Porezi',
    slug: 'porezi',
    description: 'Poreska obaveza i povraćaji u Njemačkoj',
    color: 'yellow',
    icon: 'FiFileText'
  },
  {
    id: 'investiranje',
    name: 'Investiranje',
    slug: 'investiranje',
    description: 'Štednja, investicije i finansijsko planiranje',
    color: 'green',
    icon: 'FiTrendingUp'
  },
  {
    id: 'digitalne-usluge',
    name: 'Digitalne Usluge',
    slug: 'digitalne-usluge',
    description: 'Online servisi, aplikacije i digitalizacija',
    color: 'blue',
    icon: 'FiMonitor'
  },
  {
    id: 'tech-news',
    name: 'Tech News',
    slug: 'tech-news',
    description: 'Najnovije iz sveta tehnologije u Njemačkoj',
    color: 'purple',
    icon: 'FiCpu'
  },
  {
    id: 'besplatni-dogadjaji',
    name: 'Besplatni Događaji',
    slug: 'besplatni-dogadjaji',
    description: 'Besplatni koncerti, festivali i izložbe',
    color: 'green',
    icon: 'FiCalendar'
  },
  {
    id: 'besplatni-resursi',
    name: 'Besplatni Resursi',
    slug: 'besplatni-resursi',
    description: 'Besplatni kursevi, materijali i alati',
    color: 'blue',
    icon: 'FiBookOpen'
  }
];

// Podaci za nove kategorije
export const categoryPosts = {
  besplatno: [
    {
      id: 1,
      title: "Besplatne aplikacije koje morate imati u Njemačkoj",
      slug: "besplatne-aplikacije-njemacka",
      excerpt: "Otkrijte najkorisnije besplatne aplikacije za život u Njemačkoj - od javnog saobraćaja do učenja jezika.",
      content: [
        "Život u Njemačkoj može biti lakši uz odgovarajuće aplikacije. Evo liste najkorisnijih besplatnih aplikacija koje će vam pomoći u svakodnevnom životu.",
        "DB Navigator - aplikacija Deutsche Bahn-a za planiranje putovanja javnim saobraćajem.",
        "Duolingo - besplatno učenje njemačkog jezika sa interaktivnim lekcijama.",
        "MyGermanCity - aplikacija za pronalaženje lokalnih usluga i događaja u vašem gradu."
      ],
      category: "Besplatno",
      date: "20. decembar 2024",
      readTime: "5 min čitanja",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    }
  ],
  'kredit-u-njemackoj': [
    {
      id: 1,
      title: "Kako dobiti kredit u Njemačkoj kao stranac",
      slug: "kredit-u-njemackoj-stranac",
      excerpt: "Vodič kroz postupak dobijanja kredita u Njemačkoj, potrebnu dokumentaciju i savjete za uspješnu prijavu.",
      content: [
        "Dobijanje kredita u Njemačkoj kao stranac može biti izazovno, ali nije nemoguće. Evo korak po korak vodiča.",
        "Potrebna je SCHUFA provjera, dokaz o prihodima i stabilnom zaposlenju.",
        "Različite banke imaju različite uslove za strance. Poredite ponude prije odluke."
      ],
      category: "Kredit u Njemačkoj",
      date: "18. decembar 2024",
      readTime: "8 min čitanja",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    }
  ],
  'bankovni-racun': [
    {
      id: 1,
      title: "Otvaranje bankovnog računa u Njemačkoj - kompletni vodič",
      slug: "otvaranje-bankovnog-racuna-njemacka",
      excerpt: "Sve što trebate znati o otvaranju bankovnog računa u Njemačkoj, potrebni dokumenti i najbolje banke.",
      content: [
        "Bankovni račun je osnova za funkcionisanje u Njemačkoj. Ovo je kompletni vodič za otvaranje računa.",
        "Potrebni dokumenti uključuju pasoš, Anmeldung i dokaz o prihodima.",
        "Poredite različite banke i njihove uslove prije donošenja odluke."
      ],
      category: "Bankovni račun",
      date: "15. decembar 2024",
      readTime: "7 min čitanja",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    }
  ],
  'zdravstveno-osiguranje': [
    {
      id: 1,
      title: "Zdravstveno osiguranje u Njemačkoj - vodič za početnike",
      slug: "zdravstveno-osiguranje-njemacka-vodic",
      excerpt: "Razumijevanje njemačkog sistema zdravstvenog osiguranja, izbor između javnog i privatnog osiguranja.",
      content: [
        "Zdravstveno osiguranje je obavezno u Njemačkoj. Ovo je vodič kroz različite opcije.",
        "Javno osiguranje (GKV) vs privatno osiguranje (PKV) - prednosti i nedostaci.",
        "Kako se prijaviti i što pokriva vaše osiguranje."
      ],
      category: "Zdravstveno osiguranje",
      date: "12. decembar 2024",
      readTime: "9 min čitanja",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    }
  ],
  'mobilni-telefoni': [
    {
      id: 1,
      title: "Najbolji mobilni operatori u Njemačkoj 2024",
      slug: "najbolji-mobilni-operatori-njemacka",
      excerpt: "Poređenje mobilnih operatora u Njemačkoj, tarife, pokrivenost i savjeti za izbor najboljeg plana.",
      content: [
        "Odabir mobilnog operatora u Njemačkoj može biti zbunjujuć. Evo vodiča kroz najbolje opcije.",
        "Telekom, Vodafone i O2 su glavni operatori sa različitim prednostima.",
        "Prepaid vs postpaid planovi - što je bolje za vas."
      ],
      category: "Mobilni Telefoni",
      date: "10. decembar 2024",
      readTime: "6 min čitanja",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    }
  ],
  'internet-prikljucak': [
    {
      id: 1,
      title: "Internet u Njemačkoj - provajderi, brzine i instalacija",
      slug: "internet-njemacka-provajderi-instalacija",
      excerpt: "Vodič kroz internet provajdere u Njemačkoj, brzine interneta, cijene i proces instalacije.",
      content: [
        "Dobar internet je ključan za život u Njemačkoj. Evo vodiča kroz različite opcije.",
        "DSL, kabel i fiber internet - prednosti i nedostaci svake tehnologije.",
        "Proces instalacije i što očekivati od tehničara."
      ],
      category: "Internet priključak",
      date: "8. decembar 2024",
      readTime: "7 min čitanja",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    }
  ],
  // Dodajte sample podatke za nove kategorije
  gradovi: [],
  priroda: [],
  transport: [],
  smjestaj: [],
  festivali: [],
  muzika: [],
  umetnost: [],
  film: [],
  rad: [],
  obrazovanje: [],
  zdravlje: [],
  hrana: [],
  porezi: [],
  investiranje: [],
  'digitalne-usluge': [],
  'tech-news': [],
  'besplatni-dogadjaji': [],
  'besplatni-resursi': []
};