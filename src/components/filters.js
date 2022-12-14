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

const filtersToListen = [
  {
    dropDownArrow: ingredientsDropdownArrow,
    dropUpArrow: ingredientsDropupArrow,
    list: ingredientsFilterList,
  },
  {
    dropDownArrow: devicesDropdownArrow,
    dropUpArrow: devicesDropupArrow,
    list: devicesFilterList,
  },
  {
    dropDownArrow: ustensilsDropdownArrow,
    dropUpArrow: ustensilsDropupArrow,
    list: ustensilsFilterList,
  },
];

filtersToListen.forEach((filterToListen) => {
  displayFiltersListener(
    filterToListen.dropDownArrow,
    filterToListen.dropUpArrow,
    filterToListen.list
  );

  hideFiltersListener(
    filterToListen.dropDownArrow,
    filterToListen.dropUpArrow,
    filterToListen.list
  );
});

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
  removeChildren(chosenFilters);
  filters.forEach((filter) => {
    const chosenFilter = document.createElement('p');
    chosenFilter.textContent = filter;
    chosenFilters.appendChild(chosenFilter);
  });
}

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

generateLists();
