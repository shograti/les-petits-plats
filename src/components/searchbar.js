function listenSearchBar() {
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

listenSearchBar();
