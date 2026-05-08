export interface MealResponse {
    idMeal: string;
    strMeal: string;
    strDrinkAlternate?: string | null;
    strCategory?: string;
    strArea?: string;
    strInstructions?: string;
    strMealThumb?: string;
    strTags?: string | null;
    strYoutube?: string;
    [key: string]: unknown;
}

export interface MealsListResponse {
    meals: MealResponse[] | null;
}

export interface CategoryResponse {
    idCategory: string;
    strCategory: string;
    strCategoryThumb: string;
    strCategoryDescription: string;
}

export interface CategoriesListResponse {
    categories: CategoryResponse[];
}
