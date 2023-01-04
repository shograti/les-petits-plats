const filters = [];
let recipesToDisplay = [];

const filterConditions = {
  ingredients: [],
  devices: [],
  ustensils: [],
};

const chosenFilters = document.getElementById('chosen-filters');

const ingredientsFilterTitle = document.getElementById(
  'ingredients-filter-title'
);
const devicesFilterTitle = document.getElementById('devices-filter-title');
const ustensilsFilterTitle = document.getElementById('ustensils-filter-title');

const ingredientsFilterInput = document.getElementById(
  'ingredients-filter-input'
);
const devicesFilterInput = document.getElementById('devices-filter-input');
const ustensilsFilterInput = document.getElementById('ustensils-filter-input');

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

ingredientsFilterInput.addEventListener('keyup', (e) => {
  removeChildren(ingredientsFilterList);
  if (e.target.value.length === 0) {
    generateLists();
  }
  const ingredients = generateIngredientsList();

  const filteredIngredients = ingredients.filter((ingredient) =>
    ingredient.includes(e.target.value)
  );

  const ingredientsToDisplay = createFilterList(
    ingredientsFilterList,
    filteredIngredients
  );
  ingredientsFilter.appendChild(ingredientsToDisplay);
});

devicesFilterInput.addEventListener('keyup', (e) => {
  removeChildren(devicesFilterList);
  if (e.target.value.length === 0) {
    generateLists();
  }
  const devices = generateAppliancesList();
  console.log(devices);

  const filteredDevices = devices.filter((devices) =>
    devices.includes(e.target.value)
  );

  const devicessToDisplay = createFilterList(
    devicesFilterList,
    filteredDevices
  );
  devicesFilter.appendChild(devicessToDisplay);
});

ustensilsFilterInput.addEventListener('keyup', (e) => {
  removeChildren(ustensilsFilterList);
  if (e.target.value.length === 0) {
    generateLists();
  }

  const ustensils = generateUstensilsList();

  const filteredUstensils = [...ustensils].filter((ustensil) =>
    ustensil.includes(e.target.value)
  );

  const ustensilsToDisplay = createFilterList(
    ustensilsFilterList,
    filteredUstensils
  );
  ustensilsFilter.appendChild(ustensilsToDisplay);
});

const filtersToListen = [
  {
    dropDownArrow: ingredientsDropdownArrow,
    dropUpArrow: ingredientsDropupArrow,
    list: ingredientsFilterList,
    input: ingredientsFilterInput,
    title: ingredientsFilterTitle,
  },
  {
    dropDownArrow: devicesDropdownArrow,
    dropUpArrow: devicesDropupArrow,
    list: devicesFilterList,
    input: devicesFilterInput,
    title: devicesFilterTitle,
  },
  {
    dropDownArrow: ustensilsDropdownArrow,
    dropUpArrow: ustensilsDropupArrow,
    list: ustensilsFilterList,
    input: ustensilsFilterInput,
    title: ustensilsFilterTitle,
  },
];

filtersToListen.forEach((filterToListen) => {
  displayFiltersListener(
    filterToListen.dropDownArrow,
    filterToListen.dropUpArrow,
    filterToListen.list,
    filterToListen.input,
    filterToListen.title
  );

  hideFiltersListener(
    filterToListen.dropDownArrow,
    filterToListen.dropUpArrow,
    filterToListen.list,
    filterToListen.input,
    filterToListen.title
  );
});

function displayFiltersListener(arrowDown, arrowUp, list, input, title) {
  arrowDown.addEventListener('click', () => {
    list.style.display = 'grid';
    arrowDown.style.display = 'none';
    arrowUp.style.display = 'block';
    title.style.display = 'none';
    input.style.display = 'block';
  });
}

function hideFiltersListener(arrowDown, arrowUp, list, input, title) {
  arrowUp.addEventListener('click', () => {
    list.style.display = 'none';
    arrowDown.style.display = 'block';
    arrowUp.style.display = 'none';
    title.style.display = 'block';
    input.style.display = 'none';
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
  if (filterConditions.ingredients) {
    const ingredientsArray = [...ingredients];
    const filteredIngredients = [];
    ingredientsArray.forEach((ingredient) => {
      if (!filterConditions.ingredients.includes(ingredient)) {
        filteredIngredients.push(ingredient);
      }
    });
    return filteredIngredients;
  }
  return ingredients;
}

function generateAppliancesList() {
  const appliances = new Set();
  recipes.map((recipe) => appliances.add(recipe.appliance));
  if (filterConditions.devices) {
    const devicesArray = [...appliances];
    const filteredDevices = [];
    devicesArray.forEach((device) => {
      if (!filterConditions.devices.includes(device)) {
        filteredDevices.push(device);
      }
    });
    return filteredDevices;
  }
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

  array.slice(0, 30).forEach((item) => {
    const itemName = document.createElement('p');
    itemName.textContent = capitalizeFirstLetter(item);
    target.appendChild(itemName);

    itemName.addEventListener('click', () => {
      recipesToDisplay = [];
      if (target.className === 'ingredients_filter_list') {
        filters.push({
          name: itemName.textContent,
          color: 'blue',
          type: 'ingredient',
        });
        filterConditions.ingredients.push(itemName.textContent);
      }
      if (target.className === 'devices_filter_list') {
        filters.push({
          name: itemName.textContent,
          color: 'green',
          type: 'device',
        });
        filterConditions.devices.push(itemName.textContent.toLowerCase());
      }
      if (target.className === 'ustensils_filter_list') {
        filters.push({
          name: itemName.textContent,
          color: 'red',
          type: 'ustensil',
        });
        filterConditions.ustensils.push(itemName.textContent.toLowerCase());
      }

      showFilteredRecipes();

      itemName.remove();
      displayFilters(filters);
      displayRecipes(recipesToDisplay, recipesList);
    });
  });
  return target;
}

function showFilteredRecipes() {
  recipes.map((recipe) => {
    let recipeIngredients = [];
    let recipeUstensils = [];
    let recipeDevices = [];

    recipe.ingredients.forEach((ingredient) => {
      recipeIngredients.push(ingredient.ingredient);
    });

    recipeDevices.push(recipe.appliance.toLowerCase());

    recipe.ustensils.forEach((ustensil) => {
      recipeUstensils.push(ustensil.toLowerCase());
    });

    if (
      includesAll(filterConditions.ingredients, recipeIngredients) &&
      includesAll(filterConditions.ustensils, recipeUstensils) &&
      includesAll(filterConditions.devices, recipeDevices)
    ) {
      recipesToDisplay.push(recipe);
    }
  });
}

function displayFilters(filters) {
  removeChildren(chosenFilters);
  filters.forEach((filter) => {
    const chosenFilter = document.createElement('div');
    const chosenFilterTextContainer = document.createElement('p');
    const removeIcon = document.createElement('img');
    removeIcon.addEventListener('click', () => {
      if (filter.type === 'ingredient') {
        const index = filterConditions.ingredients.indexOf(
          chosenFilter.textContent
        );
        if (index > -1) {
          filterConditions.ingredients.splice(index, 1);
        }
      }

      if (filter.type === 'ustensil') {
        const index = filterConditions.ustensils.indexOf(
          chosenFilter.textContent
        );
        if (index > -1) {
          filterConditions.ustensils.splice(index, 1);
        }
      }

      if (filter.type === 'device') {
        const index = filterConditions.devices.indexOf(
          chosenFilter.textContent.toLowerCase()
        );
        if (index > -1) {
          filterConditions.devices.splice(index, 1);
        }
      }

      filters.forEach((filter, index) => {
        if (filter.name === chosenFilter.textContent) {
          filters.splice(index, 1);
        }
      });
      chosenFilter.remove();
      showFilteredRecipes();
      displayRecipes(recipesToDisplay, recipesList);
      generateLists();
    });
    removeIcon.setAttribute('src', './assets/remove.png');
    chosenFilter.classList.add(`filter_${filter.color}`);
    chosenFilterTextContainer.textContent = filter.name;
    chosenFilter.appendChild(chosenFilterTextContainer);
    chosenFilter.appendChild(removeIcon);
    chosenFilters.appendChild(chosenFilter);
  });
}

function generateLists() {
  removeChildren(ingredientsFilterList);
  removeChildren(devicesFilterList);
  removeChildren(ustensilsFilterList);
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
