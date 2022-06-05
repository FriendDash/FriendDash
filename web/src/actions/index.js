// ACTIONS
// Notify the Reducer / Calls the Reducer

// Template For now
export const recipeAddition = entry => {
  return {
    type: 'ADD_RECIPE',
    payload: entry,
  };
};

export const recipeRemoval = entry => {
  return {
    type: 'REMOVE_RECIPE',
    payload: entry,
  };
};
