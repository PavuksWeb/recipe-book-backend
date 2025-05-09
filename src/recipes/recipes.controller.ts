import { Controller, Get, Query } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RecipeDetail, RecipeSummary } from './recipe';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Get()
  async getAvailableRecipes(
    @Query('ingredient') ingredient?: string,
    @Query('area') area?: string,
    @Query('category') category?: string,
  ): Promise<RecipeSummary[]> {
    return this.recipesService.getAvailableRecipes({
      ingredient,
      area,
      category,
    });
  }

  @Get('info')
  async getRecipeInfo(@Query('id') id: string): Promise<RecipeDetail> {
    return this.recipesService.getRecipeInfo(id);
  }
}
