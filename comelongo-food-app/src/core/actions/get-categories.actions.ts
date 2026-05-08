import { mealApiFetcher } from '@config/adapters/mealApi.adapter';
import type { Category } from '@domain/entities';
import * as UseCases from '@core/use-cases';

export const getCategories = async (): Promise<Category[]> =>
    UseCases.getCategoriesUseCase(mealApiFetcher());
