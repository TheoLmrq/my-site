export const dishes = [
  {
    id: 'boeuf-poivrons-riz',
    slug: 'boeuf-poivrons-riz-basmati',
    name: 'Bœuf aux poivrons & riz basmati',
    subtitle: 'Plat riche en protéines pour maintenir votre masse musculaire',
    description: 'Ce plat combine la tendreté du bœuf avec la douceur des poivrons colorés et la légèreté du riz basmati. Parfait pour soutenir vos performances sportives tout en profitant de saveurs authentiques et équilibrées.',
    image: '/src/assets/image/plat1.jpg',
    weight: 350,
    prix: 9.90,
    nutrition: {
      calories: 485,
      protein: 42,
      carbs: 48,
      fat: 12
    },
    badges: ['High Protein', 'Équilibré'],
    spiceLevel: 'Doux',
    category: 'Viande'
  },
  {
    id: 'poulet-curry-vert',
    slug: 'poulet-curry-vert-petits-pois',
    name: 'Poulet curry vert & petits pois',
    subtitle: 'Saveurs exotiques et protéines pour booster vos performances',
    description: 'Ce plat combine la douceur du curry vert avec la richesse en protéines du poulet pour soutenir tes performances sportives, tout en gardant une texture fondante et des saveurs équilibrées.',
    image: '/src/assets/image/plat2.jpg',
    weight: 340,
    prix: 8.90,
    nutrition: {
      calories: 420,
      protein: 38,
      carbs: 35,
      fat: 14
    },
    badges: ['High Protein', 'Sans sucre ajouté'],
    spiceLevel: 'Moyen',
    category: 'Viande'
  },
  {
    id: 'saumon-quinoa',
    slug: 'saumon-grille-quinoa-legumes',
    name: 'Saumon grillé, quinoa & légumes',
    subtitle: 'Oméga-3 et protéines de qualité pour votre récupération',
    description: 'Un saumon parfaitement grillé accompagné de quinoa bio et de légumes de saison. Riche en acides gras essentiels et en protéines complètes pour une récupération optimale.',
    image: '/src/assets/image/plat3.jpg',
    weight: 360,
    prix: 11.90,
    nutrition: {
      calories: 510,
      protein: 35,
      carbs: 42,
      fat: 20
    },
    badges: ['Oméga-3', 'Sans gluten'],
    spiceLevel: 'Doux',
    category: 'Poisson'
  },
  {
    id: 'dinde-patate-douce',
    slug: 'dinde-rotie-patate-douce',
    name: 'Dinde rôtie & patate douce',
    subtitle: 'Plat complet pour vos objectifs de prise de masse',
    description: 'Dinde tendre et juteuse accompagnée de patates douces rôties au four. Un plat gourmand et nutritif qui combine protéines maigres et glucides complexes pour vos entraînements intenses.',
    image: '/src/assets/image/plat4.jpg',
    weight: 380,
    prix: 9.50,
    nutrition: {
      calories: 465,
      protein: 40,
      carbs: 52,
      fat: 10
    },
    badges: ['High Protein', 'Low Fat'],
    spiceLevel: 'Doux',
    category: 'Viande'
  },
  {
    id: 'boeuf-brocoli',
    slug: 'boeuf-sauce-soja-brocoli',
    name: 'Bœuf sauce soja & brocoli',
    subtitle: 'Classique asiatique riche en protéines et légumes verts',
    description: 'Un grand classique de la cuisine asiatique revisité pour vos besoins sportifs. Bœuf tendre mariné à la sauce soja avec des brocolis croquants, pour un plat savoureux et nutritif.',
    image: '/src/assets/image/plat5.jpg',
    weight: 345,
    prix: 9.90,
    nutrition: {
      calories: 445,
      protein: 39,
      carbs: 38,
      fat: 13
    },
    badges: ['High Protein', 'Légumes verts'],
    spiceLevel: 'Doux',
    category: 'Viande'
  },
  {
    id: 'poulet-teriyaki',
    slug: 'poulet-teriyaki-riz-complet',
    name: 'Poulet teriyaki & riz complet',
    subtitle: 'Saveurs japonaises et nutrition optimale',
    description: 'Poulet mariné dans une sauce teriyaki maison, accompagné de riz complet et de légumes sautés. Un équilibre parfait entre goût et performance pour vos objectifs sportifs.',
    image: '/src/assets/image/plat6.jpg',
    weight: 370,
    prix: 8.90,
    nutrition: {
      calories: 495,
      protein: 41,
      carbs: 55,
      fat: 11
    },
    badges: ['High Protein', 'Fibres'],
    spiceLevel: 'Doux',
    category: 'Viande'
  }
];

export const getDishBySlug = (slug) => {
  return dishes.find(dish => dish.slug === slug);
};

export const getDishById = (id) => {
  return dishes.find(dish => dish.id === id);
};
