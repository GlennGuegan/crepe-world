"use strict";

const peopleInput = document.getElementById("people");
const recipeInputs = document.querySelectorAll('input[name="recipe"]');
const presets = document.querySelectorAll("[data-people]");
const numberFormat = new Intl.NumberFormat("fr-FR");
let people = 4;
let type = "sweet";

function setText(id, text) {
  document.getElementById(id).textContent = text;
}

function render(announce = true) {
  const recipe = RECIPES[type];
  const amounts = calculateIngredients(type, people);
  const savory = type === "savory";

  peopleInput.value = people;
  peopleInput.setCustomValidity("");
  setText("people-label", people === 1 ? "personne" : "personnes");
  document.getElementById("decrease").disabled = people === 1;
  document.getElementById("increase").disabled = people === 100;
  presets.forEach((button) =>
    button.setAttribute(
      "aria-pressed",
      String(Number(button.dataset.people) === people),
    ),
  );
  recipeInputs.forEach((input) => {
    input.checked = input.value === type;
  });

  for (const ingredient of ["flour", "milk", "water"]) {
    setText(`${ingredient}-amount`, numberFormat.format(amounts[ingredient]));
  }
  setText("egg-amount", amounts.eggs);
  setText("egg-name", amounts.eggs === 1 ? "Œuf" : "Œufs");
  setText("flour-name", recipe.flourName);
  setText("flour-hint", recipe.flourHint);
  setText("water-hint", recipe.waterHint);
  setText(
    "egg-hint",
    savory ? "Pas dans cette recette" : "De préférence moyens",
  );
  setText("milk-hint", savory ? "Pas dans cette recette" : "Pour le moelleux");
  document.getElementById("egg-card").classList.toggle("is-unused", savory);
  document.getElementById("milk-card").classList.toggle("is-unused", savory);
  setText("portion-note", `${recipe.portions} ${recipe.name} par personne`);
  setText("yield", `≈ ${amounts.portions} ${recipe.name}`);
  setText("recipe-note", recipe.note);
  setText(
    "rounding-note",
    `${amounts.eggsRounded ? "Œufs arrondis à l’unité la plus proche ; ajustez avec un trait d’eau si besoin. " : ""}Les quantités sont indicatives, selon la taille de votre poêle.`,
  );
  setText("step-mix", recipe.mix);
  setText("step-rest", recipe.rest);
  setText("rest-time", recipe.restTime);
  setText("step-cook", recipe.cook);

  if (announce) {
    setText(
      "live-result",
      `Pour ${people} ${people === 1 ? "personne" : "personnes"}, environ ${amounts.portions} ${recipe.name} : ${amounts.flour} grammes de ${recipe.flourName.toLowerCase()}, ${amounts.eggs} ${amounts.eggs === 1 ? "œuf" : "œufs"}, ${amounts.milk} millilitres de lait et ${amounts.water} millilitres d’eau.`,
    );
  }
}

peopleInput.addEventListener("input", () => {
  const value = peopleInput.valueAsNumber;
  if (Number.isInteger(value) && value >= 1 && value <= 100) {
    people = value;
    render();
  } else {
    peopleInput.setCustomValidity(
      "Choisissez un nombre entier entre 1 et 100.",
    );
  }
});

// An empty or invalid field returns to the last valid count on blur.
peopleInput.addEventListener("blur", () => render(false));
document.getElementById("decrease").addEventListener("click", () => {
  people = Math.max(1, people - 1);
  render();
});
document.getElementById("increase").addEventListener("click", () => {
  people = Math.min(100, people + 1);
  render();
});
presets.forEach((button) =>
  button.addEventListener("click", () => {
    people = Number(button.dataset.people);
    render();
  }),
);
recipeInputs.forEach((input) =>
  input.addEventListener("change", () => {
    type = input.value;
    render();
  }),
);
document
  .getElementById("print")
  .addEventListener("click", () => window.print());
render(false);
