const recipesList = document.getElementById('recipes-list');

function init() {
  const defaultRecipes = recipes.slice(0, 6);
  displayRecipes(defaultRecipes, recipesList);

}

init();
