"use strict";

const RECIPES = {
  sweet: {
    flour: 62.5,
    eggs: 0.75,
    milk: 100,
    water: 25,
    portions: 3,
    name: "crêpes",
    flourName: "Farine de froment",
    flourHint: "La base de la douceur",
    waterHint: "Pour la légèreté",
    note: "Ajoutez une pincée de sel et prévoyez un peu de beurre pour la poêle. Le sucre ? À vous de choisir la garniture !",
    mix: "Versez la farine et le sel dans un saladier. Faites un puits, ajoutez les œufs, puis incorporez le lait et l’eau petit à petit en fouettant.",
    rest: "Couvrez et laissez reposer la pâte 1 heure au réfrigérateur. Mélangez à nouveau et ajoutez un trait d’eau si elle est trop épaisse.",
    restTime: "Repos : 1 heure",
    cook: "Chauffez et beurrez légèrement la poêle. Versez une petite louche, répartissez la pâte et cuisez environ 1 minute par face, jusqu’à ce qu’elle soit dorée.",
  },
  savory: {
    flour: 62.5,
    eggs: 0,
    milk: 0,
    water: 125,
    portions: 2,
    name: "galettes",
    flourName: "Farine de sarrasin",
    flourHint: "Le bon goût de la Bretagne",
    waterHint: "Tout simplement",
    note: "La traditionnelle : du sarrasin, de l’eau et du sel. Ni œuf, ni lait dans cette pâte. Prévoyez une pincée de sel et un peu de matière grasse pour la poêle.",
    mix: "Mélangez la farine de sarrasin et le sel. Versez l’eau petit à petit en fouettant énergiquement pour obtenir une pâte lisse, sans grumeaux.",
    rest: "Couvrez et laissez reposer la pâte au moins 2 heures au réfrigérateur. Mélangez avant la cuisson et ajoutez un peu d’eau si nécessaire : elle doit bien s’étaler.",
    restTime: "Repos : 2 heures minimum",
    cook: "Graissez une poêle bien chaude. Étalez une fine couche de pâte et cuisez environ 1 à 2 minutes par face. Ajoutez votre garniture et repliez les bords.",
  },
};

function calculateIngredients(type, people) {
  if (!Object.hasOwn(RECIPES, type)) throw new RangeError("Recette inconnue.");
  if (!Number.isInteger(people) || people < 1 || people > 100) {
    throw new RangeError("Choisissez un nombre entier entre 1 et 100.");
  }
  const recipe = RECIPES[type];
  return {
    flour: Math.round(recipe.flour * people),
    eggs: Math.round(recipe.eggs * people),
    milk: recipe.milk * people,
    water: recipe.water * people,
    portions: recipe.portions * people,
    eggsRounded: !Number.isInteger(recipe.eggs * people),
  };
}
