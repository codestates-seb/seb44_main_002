export default function useCocktailFormValid(form) {
  const nameRegex = /^.{1,19}$/;
  const recipeRegex = form.recipe.filter((v) => {
    return v.process === '';
  });

  const nameIsValid = Boolean(form.name) && nameRegex.test(form.name);
  const imgIsValid = form.img !== '';
  const liquorIsValid = form.liquor !== '';
  const ingredientsIsValid = form.ingredients.length !== 0;
  const recipeIsValid = recipeRegex.length === 0;
  const degreeTagIsValid = form.degree.length !== 0;
  const flavorTagIsValid = form.flavor.length !== 0;

  return {
    name: nameIsValid,
    img: imgIsValid,
    liquor: liquorIsValid,
    ingredients: ingredientsIsValid,
    recipe: recipeIsValid,
    degree: degreeTagIsValid,
    flavor: flavorTagIsValid,
  };
}
