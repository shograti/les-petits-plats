const recipesList = document.getElementById('recipes-list');

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

init();
