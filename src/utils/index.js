function removeChildren(target) {
    while (target.firstChild) {
      target.removeChild(target.lastChild);
    }
  }
  
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  