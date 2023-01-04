function removeChildren(target) {
  while (target.firstChild) {
    target.removeChild(target.lastChild);
  }
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function includesAll(filterList, itemList) {
  for (let i = 0; i < filterList.length; i++) {
    if (!itemList.includes(filterList[i])) {
      return false;
    }
  }
  return true;
}
