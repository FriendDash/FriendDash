// recipeModifer is a reducer that will updates the redux store dependent on the case
const recipeModifier = (recipe = '', action) => {
  switch (action.type) {
    case 'ADD_RECIPE':
      const newState = [...recipe, action.payload];
      return newState;
    case 'REMOVE_RECIPE':
      return recipe.filter(entry => entry.title !== action.payload.title);
    default:
      return recipe;
  }
};

export default recipeModifier;
