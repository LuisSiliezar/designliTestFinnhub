import { mealApiFetcher } from '@config/adapters/mealApi.adapter';
import { MockDataService } from '@infrastructure/services';
import type { Review } from '@domain/entities';
import * as UseCases from '@core/use-cases';

export const getFeedReviews = async (): Promise<Review[]> => {
    const dishes = await UseCases.getTrendingDishesUseCase(mealApiFetcher());
    return dishes.map(d =>
        MockDataService.buildReviewForDish(d.id, d.name, d.image),
    );
};
