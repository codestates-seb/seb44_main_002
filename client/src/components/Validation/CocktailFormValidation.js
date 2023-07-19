export default function useCocktailFormValid(form) {
  const nameRegex = /^.{1,19}$/;
  const recipeRegex = form.recipe.filter((v) => {
    return v.process === '';
  });

  const nameIsValid = Boolean(form.name) && nameRegex.test(form.name);
  const imageIsValid = form.imageUrl !== '';
  const liquorIsValid = form.liquor !== '';
  const baseIngredientsIsValid = form.baseIngredients.length !== 0;
  const recipeIsValid = recipeRegex.length === 0;
  const degreeTagIsValid = form.degree.length !== 0;
  const flavorTagIsValid = form.flavor.length !== 0;

  return {
    name: nameIsValid,
    imageUrl: imageIsValid,
    liquor: liquorIsValid,
    baseIngredients: baseIngredientsIsValid,
    recipe: recipeIsValid,
    degree: degreeTagIsValid,
    flavor: flavorTagIsValid,
  };
}
