/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, NotFoundException } from '@nestjs/common';
import { RecipeDetail, RecipeSummary } from './recipe';

@Injectable()
export class RecipesService {
  private baseUrl =
    process.env.BASE_URL || 'https://www.themealdb.com/api/json/v1/1';

  private async fetchFromAPI(endpoint: string): Promise<any> {
    const res = await fetch(`${this.baseUrl}${endpoint}`);
    if (!res.ok) throw new Error('External API failed');
    return res.json();
  }

  async getAvailableRecipes(filter?: {
    ingredient?: string;
    area?: string;
    category?: string;
  }): Promise<RecipeSummary[]> {
    let endpoint = '/search.php?s=';
    if (filter?.ingredient) {
      endpoint = `/filter.php?i=${filter.ingredient}`;
    } else if (filter?.area) {
      endpoint = `/filter.php?a=${filter.area}`;
    } else if (filter?.category) {
      endpoint = `/filter.php?c=${filter.category}`;
    }

    const data = await this.fetchFromAPI(endpoint);

    if (!data.meals) {
      throw new NotFoundException('No recipes found');
    }

    return data.meals;
  }

  async getRecipeInfo(id: string): Promise<RecipeDetail> {
    const data = await this.fetchFromAPI(`/lookup.php?i=${id}`);

    if (!data.meals || data.meals.length === 0) {
      throw new NotFoundException(`Recipe with id ${id} not found`);
    }

    return data.meals[0];
  }
}
