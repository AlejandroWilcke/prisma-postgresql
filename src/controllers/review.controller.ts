import { Review } from '@prisma/client';
import { ReviewService, UpdateReviewDTO } from '../services/review.service';

export default class ReviewController {

	reviewService: ReviewService;

	constructor() {
		this.reviewService = new ReviewService();
	}

	getReviewsByUserId(userId: number): Promise<Review[]> {
		return this.reviewService.getReviewsByUserId(userId);
	}

  createReview(createReviewDTO: Review): Promise<Review> {
    return this.reviewService.createReview(createReviewDTO);
  }

	updateReview(updateReviewDTO: UpdateReviewDTO): Promise<Review> {
    return this.reviewService.updateReview(updateReviewDTO);
  }

	deleteReviewById(userId: number, movieId: number): Promise<Review> {
    return this.reviewService.deleteReviewById(userId, movieId);
  }

}