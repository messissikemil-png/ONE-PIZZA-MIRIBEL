export interface MenuItem {
  id: string;
  name: string;
  price: string;
  description: string;
  highlight?: string;
}

export interface FingerFoodItem {
  id: string;
  name: string;
  tiers: { label: string; price: string }[];
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: string;
  caption: string;
  src: string;
  alt: string;
  imgClassName?: string;
  fullPoster?: boolean;
}

export const RESTAURANT_INFO = {
  name: 'ONE PIZZA',
  slogan: "PLUS DE GOÛT C'EST PLUS DE PLAISIR",
  phoneDisplay: '09 80 95 98 07',
  phoneHref: 'tel:0980959807',
  addressTitle: 'ONE PIZZA — CC Carrefour Market',
  addressStreet: '50 Rue du Figuier, 01700 Miribel',
  fullAddress: 'ONE PIZZA, CC Carrefour Market, 50 Rue du Figuier, 01700 Miribel',
  mapsDirectionsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=50+Rue+du+Figuier,+01700+Miribel,+France',
  mapsEmbedUrl:
    'https://maps.google.com/maps?q=50+Rue+du+Figuier,+01700+Miribel,+France&t=&z=16&ie=UTF8&iwloc=&output=embed',
  hoursDisplay: '11:00 - 14:00 | 17:00 - 22:00',
  scheduleDays: 'Tous les jours (7j/7)',
} as const;

export const PIZZAS_TOMATE: MenuItem[] = [
  {
    id: 'margarita',
    name: 'MARGARITA',
    price: '7,00 €',
    description: 'Mozzarella, olives.',
  },
  {
    id: 'forestiere',
    name: 'FORESTIÈRE',
    price: '9,00 €',
    description: 'Mozzarella, champignons, olives.',
  },
  {
    id: 'pecheuse',
    name: 'PÊCHEUSE',
    price: '9,50 €',
    description: 'Mozzarella, thon, tomate cerise, boursin, olives.',
  },
  {
    id: '4-fromages',
    name: '4 FROMAGES',
    price: '9,50 €',
    description: 'Mozzarella, chèvre, gorgonzola, parmesan, olives.',
  },
  {
    id: 'italienne',
    name: 'ITALIENNE',
    price: '9,50 €',
    description: 'Mozzarella, anchois, olives.',
  },
  {
    id: 'campagnarde',
    name: 'COMPAGNARDE',
    price: '9,50 €',
    description: 'Mozzarella, lardons, œuf, oignons.',
  },
  {
    id: 'mexicaine',
    name: 'MEXICAINE',
    price: '9,50 €',
    description: 'Mozzarella, viande hachée, poivrons, oignons, olives.',
  },
  {
    id: 'gourmande',
    name: 'GOURMANDE',
    price: '9,50 €',
    description: 'Mozzarella, poulet haché, champignons, beurre persillé.',
  },
  {
    id: 'reine',
    name: 'REINE',
    price: '9,50 €',
    description: 'Mozzarella, jambon, champignons, œuf, olives.',
  },
  {
    id: 'kebab',
    name: 'KEBAB',
    price: '9,50 €',
    description: 'Mozzarella, viande kebab, oignons, sauce blanche ou gruyère.',
  },
  {
    id: 'americaine',
    name: 'AMÉRICAINE',
    price: '9,50 €',
    description: 'Mozzarella, merguez, chorizo, oignons, olives.',
  },
  {
    id: 'orientale',
    name: 'ORIENTALE',
    price: '9,50 €',
    description: 'Mozzarella, merguez, poivrons, olives.',
  },
  {
    id: 'burger-pizza',
    name: 'BURGER',
    price: '10,50 €',
    description:
      'Mozzarella, viande hachée, oignons, tomates cerises, cornichons, cheddar, sauce BBQ.',
    highlight: 'Signature',
  },
  {
    id: 'chicken-cheese',
    name: 'CHICKEN CHEESE',
    price: '10,50 €',
    description: 'Mozzarella, cordon bleu ou chicken pané, fromage raclette.',
    highlight: 'Signature',
  },
  {
    id: 'frenchy-pizza',
    name: 'FRENCHY',
    price: '10,50 €',
    description: 'Mozzarella, saucisson sec, camembert, crème fraîche, origan.',
    highlight: 'Signature',
  },
  {
    id: 'tradition',
    name: 'TRADITION',
    price: '9,50 €',
    description: 'Mozzarella, viande hachée, tomates cerises, beurre persillé.',
  },
  {
    id: 'veggie',
    name: 'VEGGIE',
    price: '9,50 €',
    description: 'Mozzarella, champignons, poivrons, tomates cerises.',
  },
];

export const PIZZAS_CREME: MenuItem[] = [
  {
    id: 'boise',
    name: 'BOISÉ',
    price: '9,50 €',
    description: 'Mozzarella, poulet, champignons ou poivrons, sauce gruyère, olives.',
  },
  {
    id: 'lyonnaise',
    name: 'LYONNAISE',
    price: '9,50 €',
    description: 'Mozzarella, poulet haché, olives.',
  },
  {
    id: 'chevre-miel',
    name: 'CHÈVRE MIEL',
    price: '10,50 €',
    description: 'Mozzarella, fromage de chèvre, miel.',
    highlight: 'Signature',
  },
  {
    id: 'indienne',
    name: 'INDIENNE',
    price: '9,50 €',
    description: 'Mozzarella, poulet tandoori, kiri, olives.',
  },
  {
    id: 'fromagere',
    name: 'FROMAGÈRE',
    price: '9,50 €',
    description: 'Mozzarella, chèvre, gorgonzola, parmesan, olives.',
  },
  {
    id: 'bacon',
    name: 'BACON',
    price: '10,50 €',
    description: 'Mozzarella, viande hachée, bacon, œuf, cheddar.',
    highlight: 'Signature',
  },
  {
    id: 'boursin',
    name: 'BOURSIN',
    price: '9,50 €',
    description: 'Mozzarella, viande hachée, jambon, boursin, olives.',
  },
  {
    id: 'carbo',
    name: 'CARBO',
    price: '10,50 €',
    description: 'Mozzarella, lardons, jambon, œuf, oignons.',
    highlight: 'Signature',
  },
  {
    id: 'savoyarde',
    name: 'SAVOYARDE',
    price: '9,50 €',
    description: 'Mozzarella, lardons, pommes de terre, oignons, reblochon.',
  },
  {
    id: 'raclette',
    name: 'RACLETTE',
    price: '9,50 €',
    description: 'Mozzarella, jambon, pommes de terre, oignons, fromage raclette.',
  },
  {
    id: 'norvegienne',
    name: 'NORVÉGIENNE',
    price: '10,50 €',
    description: 'Mozzarella, saumon, pommes de terre, beurre persillé.',
    highlight: 'Signature',
  },
];

export const BURGERS: MenuItem[] = [
  {
    id: 'le-classique',
    name: 'Le classique',
    price: '6,00 €',
    description: 'Steak, fromage, salade, tomate et oignon.',
  },
  {
    id: 'le-double',
    name: 'Le doublé',
    price: '7,50 €',
    description: 'Crudités, 2 steaks, 2 cheddars, sauce au choix.',
  },
  {
    id: 'le-mixte',
    name: 'Le mixte',
    price: '7,50 €',
    description: 'Crudités, 1 steak, 1 chicken, 2 cheddars, sauce au choix.',
  },
  {
    id: 'le-chicken',
    name: 'Le chicken',
    price: '6,00 €',
    description: 'Crudités, 1 chicken, 1 cheddar, sauce au choix.',
  },
  {
    id: 'le-baps',
    name: "Le bap's",
    price: '7,00 €',
    description: 'Crudités, 1 steak, 1 galette de pomme de terre, cheddar.',
  },
  {
    id: 'le-frenchy',
    name: 'Le frenchy',
    price: '6,50 €',
    description: 'Crudités, 1 steak, camembert, sans gruyère.',
  },
  {
    id: 'le-british',
    name: 'Le british',
    price: '7,50 €',
    description: 'Crudités, 1 steak, bacon, oignons frits, œuf, cheddar.',
  },
  {
    id: 'le-180',
    name: 'LE 180',
    price: '7,50 €',
    description:
      'Crudités, 1 steak 180g, 2 cheddars, cornichons, ketchup + sauce au choix.',
    highlight: '180g',
  },
  {
    id: 'le-fish',
    name: 'Le fish',
    price: '6,00 €',
    description: 'Crudités, 1 poisson pané, 1 cheddar, sauce fish.',
  },
];

export const TACOS: MenuItem[] = [
  {
    id: 'tacos-simple',
    name: 'Le simple',
    price: '7,00 €',
    description: 'Sauce au choix, viande au choix.',
  },
  {
    id: 'tacos-chevre',
    name: 'Le chèvre',
    price: '8,00 €',
    description: 'Gratiné mozza et chèvre, viande au choix.',
  },
  {
    id: 'tacos-mozza',
    name: 'Le mozza',
    price: '7,50 €',
    description: 'Gratiné mozza, viande au choix.',
  },
  {
    id: 'tacos-peperoni',
    name: 'Le peperoni',
    price: '8,00 €',
    description: 'Gratiné mozza et chorizo, viande au choix.',
  },
  {
    id: 'tacos-savoyard',
    name: 'Le savoyard',
    price: '8,50 €',
    description: 'Gratiné mozza + lardons + raclette, viande au choix.',
  },
  {
    id: 'tacos-bollywood',
    name: 'Le bollywood',
    price: '8,00 €',
    description: 'Gratiné mozza kiri, poulet tandoori.',
  },
  {
    id: 'tacos-bressan',
    name: 'Le bressan',
    price: '8,00 €',
    description: 'Gratiné mozza + gorgonzola, viande au choix.',
  },
  {
    id: 'tacos-campagnard',
    name: 'Le campagnard',
    price: '8,50 €',
    description: 'Gratiné mozza + lardons, viande au choix, œuf.',
  },
];

export const TACOS_MEATS = [
  'Escalope marinée',
  'Cordon bleu',
  'Chicken',
  'Viande hachée',
  'Tenders',
  'Kebab',
];

export const TACOS_SAUCES = [
  'Mayo',
  'Ketchup',
  'Algérienne',
  'Tartare',
  'Harissa',
  'Curry',
  'BBQ',
  'Burger',
  'Blanche',
];

export const TACOS_SUPPLEMENTS = [
  { name: 'Viande', price: '2,00 €' },
  { name: 'Œuf', price: '1,00 €' },
  { name: 'Fromage', price: '1,00 €' },
  { name: 'Chakchoka', price: '1,50 €' },
];

export const FINGER_FOOD: FingerFoodItem[] = [
  {
    id: 'wings',
    name: 'Wings',
    tiers: [
      { label: 'Les 3', price: '3,50 €' },
      { label: 'Les 6', price: '5,50 €' },
      { label: 'Les 9', price: '7,50 €' },
    ],
  },
  {
    id: 'tenders',
    name: 'Tenders',
    tiers: [
      { label: 'Les 3', price: '4,50 €' },
      { label: 'Les 6', price: '6,50 €' },
      { label: 'Les 9', price: '9,00 €' },
    ],
  },
  {
    id: 'nuggets',
    name: 'Nuggets',
    tiers: [
      { label: 'Les 6', price: '4,50 €' },
      { label: 'Les 9', price: '6,50 €' },
      { label: 'Les 12', price: '9,00 €' },
    ],
  },
];

export const DESSERTS: MenuItem[] = [
  {
    id: 'tarte-daim',
    name: 'Tarte au daim',
    price: '2,50 €',
    description: 'Croquant caramel et chocolat au lait.',
  },
  {
    id: 'donuts',
    name: 'Donuts',
    price: '2,50 €',
    description: 'Moelleux et gourmand au chocolat.',
  },
  {
    id: 'tiramisu',
    name: 'Tiramisus Maison',
    price: '3,50 €',
    description: 'Préparé chaque jour par notre équipe.',
  },
];

export const BOISSONS: MenuItem[] = [
  {
    id: 'canette-33',
    name: 'Canette 33cl',
    price: '1,50 €',
    description: 'Sodas et boissons fraîches au choix.',
  },
  {
    id: 'bouteille-50',
    name: 'Bouteille 50cl',
    price: '2,50 €',
    description: 'Format 50cl bien frais.',
  },
  {
    id: 'coca-125',
    name: 'Coca-Cola 1,25L',
    price: '3,00 €',
    description: 'Format familial à partager.',
  },
  {
    id: 'oasis-2l',
    name: 'Oasis 2L',
    price: '3,50 €',
    description: 'Grand format fruité à partager.',
  },
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'pizza-maison',
    title: 'Pizza Pâte Maison',
    category: 'Pizzas · Cuisson haute température',
    caption: 'Bordure alvéolée dorée au four, pâte pétrie sur place et garniture généreuse.',
    src: '/assets/aistudio/PIZZA_8badf670.webp',
    alt: 'Pizza artisanale généreuse de ONE PIZZA à Miribel servie sur planche en bois, pâte faite maison dorée et léopardée, garnie de jambon, pommes de terre et fromage fondant.',
    imgClassName: 'object-cover object-[50%_72%] scale-125',
  },
  {
    id: 'burger-double',
    title: 'Burger Double Cheddar',
    category: 'Burgers · Viande du boucher',
    caption: 'Pain brioché au sésame, double steak saisi à la plancha et cheddar ultra-fondant.',
    src: '/assets/aistudio/hamburger_d484c52b.webp',
    alt: 'Burger double au fromage cheddar fondant de ONE PIZZA avec deux steaks de boucher saisis et pain brioché doré au sésame.',
    imgClassName: 'object-cover object-[50%_46%] scale-115',
  },
  {
    id: 'tacos-gratine',
    title: 'Tacos Gratiné au Four',
    category: 'Tacos · Sauce gruyère maison',
    caption: 'Gratiné doré à la mozzarella et au bleu fondant, servi brûlant sur planche en bois.',
    src: '/assets/aistudio/tacos_ae012734.webp',
    alt: 'Tacos français généreusement gratiné à la mozzarella et au gorgonzola, doré au four et présenté sur une planche ronde en bois chez ONE PIZZA.',
    imgClassName: 'object-cover object-center',
  },
  {
    id: 'one-crousty',
    title: 'One Crousty',
    category: 'Nouveauté · Street Food',
    caption: 'Riz parfumé, tenders croustillants ou escalope marinée, oignons frits et sauces gourmandes.',
    src: '/assets/aistudio/carte_4_863ddd91.webp',
    alt: 'Plat One Crousty gourmand de ONE PIZZA composé de riz parfumé, morceaux de tenders croustillants ou escalope marinée, sauce crémeuse et oignons frits.',
    imgClassName: 'object-cover object-top scale-105',
    fullPoster: true,
  },
];
