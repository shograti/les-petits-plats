const recipesList = document.getElementById('recipes-list');
const filters = [];
const recipesToDisplay = [];
const chosenFilters = document.getElementById('chosen-filters');

const ingredientsDropdownArrow = document.getElementById(
  'ingredients-arrow-down'
);
const devicesDropdownArrow = document.getElementById('devices-arrow-down');
const ustensilsDropdownArrow = document.getElementById('ustensils-arrow-down');
const ingredientsDropupArrow = document.getElementById('ingredients-arrow-up');
const devicesDropupArrow = document.getElementById('devices-arrow-up');
const ustensilsDropupArrow = document.getElementById('ustensils-arrow-up');

const ingredientsFilter = document.getElementById('ingredients-filter');
const devicesFilter = document.getElementById('devices-filter');
const ustensilsFilter = document.getElementById('ustensils-filter');

const ingredientsFilterList = document.createElement('div');
const devicesFilterList = document.createElement('div');
const ustensilsFilterList = document.createElement('div');

ingredientsFilterList.classList.add('ingredients_filter_list');
devicesFilterList.classList.add('devices_filter_list');
ustensilsFilterList.classList.add('ustensils_filter_list');

function init() {
  const defaultRecipes = recipes.slice(0, 6);

  displayRecipes(defaultRecipes, recipesList);

  const searchBar = document.getElementById('search-bar');
  searchBar.value = '';

  searchBar.addEventListener('keyup', (e) => {
    if (e.target.value.length === 0) {
      displayRecipes(defaultRecipes, recipesList);
    }
    if (e.target.value.length > 2) {
      const recipesToShow = [];
      recipes.map(
        (recipe) =>
          recipe.name.toLowerCase().includes(e.target.value.toLowerCase()) &&
          recipesToShow.push(recipe)
      );
      displayRecipes(recipesToShow, recipesList);
    }
  });

  displayFiltersListener(
    ingredientsDropdownArrow,
    ingredientsDropupArrow,
    ingredientsFilterList
  );
  hideFiltersListener(
    ingredientsDropdownArrow,
    ingredientsDropupArrow,
    ingredientsFilterList
  );

  displayFiltersListener(
    devicesDropdownArrow,
    devicesDropupArrow,
    devicesFilterList
  );
  hideFiltersListener(
    devicesDropdownArrow,
    devicesDropupArrow,
    devicesFilterList
  );

  displayFiltersListener(
    ingredientsDropdownArrow,
    ingredientsDropupArrow,
    ingredientsFilterList
  );
  hideFiltersListener(
    ingredientsDropdownArrow,
    ingredientsDropupArrow,
    ingredientsFilterList
  );

  displayFiltersListener(
    ustensilsDropdownArrow,
    ustensilsDropupArrow,
    ustensilsFilterList
  );
  hideFiltersListener(
    ustensilsDropdownArrow,
    ustensilsDropupArrow,
    ustensilsFilterList
  );

  function displayFiltersListener(arrowDown, arrowUp, list) {
    arrowDown.addEventListener('click', () => {
      list.style.display = 'grid';
      arrowDown.style.display = 'none';
      arrowUp.style.display = 'block';
    });
  }

  function hideFiltersListener(arrowDown, arrowUp, list) {
    arrowUp.addEventListener('click', () => {
      list.style.display = 'none';
      arrowDown.style.display = 'block';
      arrowUp.style.display = 'none';
    });
  }
}

function displayRecipes(recipes, recipesList) {
  deleteRecipes();
  recipes.forEach((recipe) => {
    const recipeCard = createRecipeCard(recipe);
    recipesList.appendChild(recipeCard);
  });
}

function deleteRecipes() {
  while (recipesList.firstChild) {
    recipesList.removeChild(recipesList.lastChild);
  }
}

function createRecipeCard(recipe) {
  const listItem = document.createElement('div');
  const article = document.createElement('article');
  const imagePlaceholder = document.createElement('div');
  const articleHead = document.createElement('div');
  const title = document.createElement('h2');
  const timeContainer = document.createElement('div');
  const time = document.createElement('p');
  const articleBody = document.createElement('div');
  const articleIngredientsContainer = document.createElement('div');
  const articleDescriptionContainer = document.createElement('div');
  const articleDescription = document.createElement('p');
  const timeIcon = document.createElement('img');

  timeIcon.setAttribute('src', './assets/clock.png');
  title.textContent = recipe.name;
  time.textContent = `${recipe.time} min`;
  articleDescription.textContent = recipe.description;
  imagePlaceholder.classList.add('image_placeholder');
  articleHead.classList.add('article_head');
  timeContainer.classList.add('time_container');
  articleBody.classList.add('article_body');
  articleDescription.classList.add('article_description');
  timeContainer.appendChild(timeIcon);
  timeContainer.appendChild(time);
  articleHead.appendChild(title);
  articleHead.appendChild(timeContainer);

  articleDescriptionContainer.appendChild(articleDescription);
  recipe.ingredients.forEach((ingredient) => {
    const ingredientContainer = document.createElement('div');
    const ingredientTextContainer = document.createElement('p');
    const ingredientName = document.createElement('span');
    ingredientName.textContent = ingredient.ingredient;
    ingredientTextContainer.textContent = ` ${
      ingredient.quantity ? ' : ' + ingredient.quantity : ''
    } ${ingredient.unit ? ingredient.unit : ''}`;
    ingredientContainer.appendChild(ingredientName);
    ingredientContainer.appendChild(ingredientTextContainer);
    articleIngredientsContainer.appendChild(ingredientContainer);
    ingredientContainer.classList.add('ingredient_container');
  });

  articleBody.appendChild(articleIngredientsContainer);
  articleBody.appendChild(articleDescriptionContainer);
  article.appendChild(articleHead);
  article.appendChild(articleBody);
  listItem.appendChild(imagePlaceholder);
  listItem.appendChild(article);

  return listItem;
}

/* Ingredients, ustensils and devices list */

function generateLists() {
  const ingredients = generateIngredientsList();
  const ingredientsToDisplay = createFilterList(
    ingredientsFilterList,
    ingredients
  );
  ingredientsFilter.appendChild(ingredientsToDisplay);

  const appliances = generateAppliancesList();
  const appliancesToDisplay = createFilterList(devicesFilterList, appliances);
  devicesFilter.appendChild(appliancesToDisplay);

  const ustensils = generateUstensilsList();
  const ustensilsToDisplay = createFilterList(ustensilsFilterList, ustensils);
  ustensilsFilter.appendChild(ustensilsToDisplay);
}

function createFilterList(target, list) {
  let array = [...list];

  array.forEach((item) => {
    const itemName = document.createElement('p');
    itemName.textContent = capitalizeFirstLetter(item);
    target.appendChild(itemName);
    itemName.addEventListener('click', () => {
      filters.push(itemName.textContent);
      recipes.map((recipe) => {
        recipe.ingredients.forEach((ingredient) => {
          if (ingredient.ingredient === itemName.textContent) {
            recipesToDisplay.push(recipe);
          }
        });
        recipe.ustensils.forEach((ustensil) => {
          if (ustensil === itemName.textContent.toLowerCase()) {
            recipesToDisplay.push(recipe);
          }
        });
        if (recipe.appliance === itemName.textContent) {
          recipesToDisplay.push(recipe);
        }
      });

      itemName.remove();
      displayFilters(filters);
      displayRecipes(recipesToDisplay, recipesList);
    });
  });
  return target;
}

function displayFilters(filters) {
  removeFilters(chosenFilters);
  filters.forEach((filter) => {
    const chosenFilter = document.createElement('p');
    chosenFilter.textContent = filter;
    chosenFilters.appendChild(chosenFilter);
  });
}

function removeFilters(target) {
  while (target.firstChild) {
    target.removeChild(target.lastChild);
  }
}

function generateIngredientsList() {
  const ingredientsWithQuantities = [];
  const ingredientsNames = [];
  recipes.map((recipe) => ingredientsWithQuantities.push(recipe.ingredients));
  ingredientsWithQuantities
    .flat()
    .map((ingredient) => ingredientsNames.push(ingredient.ingredient));
  const ingredientsToLowerCase = ingredientsNames.map((ingredient) =>
    ingredient.toLowerCase()
  );
  const ingredients = new Set(ingredientsToLowerCase);
  return ingredients;
}

function generateAppliancesList() {
  const appliances = new Set();
  recipes.map((recipe) => appliances.add(recipe.appliance));
  return appliances;
}

function generateUstensilsList() {
  const ustensilsToFilter = [];
  const ustensilsToLowerCase = [];
  recipes.map((recipe) => ustensilsToFilter.push(recipe.ustensils));
  ustensilsToFilter
    .flat()
    .map((ustensil) => ustensilsToLowerCase.push(ustensil.toLowerCase()));
  const ustensils = new Set(ustensilsToLowerCase);
  return ustensils;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

init();
generateLists();
