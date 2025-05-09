export interface RecipeSummary {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export interface RecipeDetail extends RecipeSummary {
  strCategory: string;
  strArea: string;
  strInstructions: string;
  [key: string]: any;
}
