# Crêpe World

Un calculateur de pâte à crêpes en français, en HTML, CSS et JavaScript natifs. Aucune installation, compilation, police distante ou dépendance réseau nécessaire.

## Utilisation

Ouvrir `index.html` dans un navigateur, ou publier le dossier sur un hébergement statique (GitHub Pages, Netlify, etc.).

- Choisir froment sucré ou sarrasin salé.
- Sélectionner de 1 à 100 personnes avec le champ, les boutons +/− ou les raccourcis.
- Les ingrédients et les conseils de préparation se mettent à jour automatiquement.
- Le bouton Imprimer permet aussi d’enregistrer la recette en PDF depuis le navigateur.

## Proportions

| Pour 4 personnes | Froment   | Sarrasin   |
| ---------------- | --------- | ---------- |
| Rendement estimé | 12 crêpes | 8 galettes |
| Farine           | 250 g     | 250 g      |
| Œufs moyens      | 3         | 0          |
| Lait             | 400 ml    | 0 ml       |
| Eau              | 100 ml    | 500 ml     |

Prévoir également du sel et de la matière grasse pour la cuisson. Le rendement dépend du diamètre de la poêle et de l’épaisseur des crêpes. Les garnitures ne sont pas comprises.

Les recettes sont définies dans `calculator.js`. La farine est arrondie au gramme et les œufs à l’unité la plus proche ; un message signale l’arrondi des œufs. La pâte au sarrasin suit la version traditionnelle sans œuf ni lait.

## Tests

Avec Node.js 22 ou plus récent :

```sh
node --test tests/calculator.test.cjs
```

## Fichiers

- `index.html` : structure accessible et recette par défaut sans JavaScript.
- `styles.css` : présentation responsive et mise en page d’impression.
- `calculator.js` : recettes et calculs indépendants du DOM.
- `app.js` : interactions et mises à jour de l’interface.
- `assets/crepe.svg` : illustration locale.

Inspiré du concept de [raclette.world](https://www.raclette.world/), avec une identité visuelle originale.
