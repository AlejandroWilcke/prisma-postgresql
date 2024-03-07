import express, { Request, Response, NextFunction } from 'express';
import ReviewController from '../../controllers/review.controller';
import { isAbleToCreateReviews, isAbleToEditReviews, isAbleToDeleteReviews } from '../../auth/role.auth';
import authMiddleware from '../../middlewares/auth.middleware';

const reviewsRouter = express.Router();
const reviewController = new ReviewController();

reviewsRouter.use(authMiddleware);

reviewsRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try{
    const { user } = req.body;
    const userReviews = await reviewController.getReviewsByUserId(user.id);
    return res.json(userReviews);
  }catch(error){
    return next(error);
  }
})

reviewsRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try{
    const { user, ...review } = req.body;
    review.userId = user.id;
    if(!isAbleToCreateReviews(user.role)){
        throw "Only BASIC and EDITOR users are able to create reviews"
    }
    const createdReview = await reviewController.createReview(review);
    return res.json(createdReview);
  }catch(error){
    return next(error);
  }
})

reviewsRouter.patch('/', async (req: Request, res: Response, next: NextFunction) => {
  try{
    const { user, ...review } = req.body;
    review.userId = user.id;
    if(!isAbleToEditReviews(user.role)){
        throw "Only EDITOR users are able to modify reviews"
    }
    const updatedReview = await reviewController.updateReview(review);
    return res.json(updatedReview);
  }catch(error){
    return next(error);
  }
})

reviewsRouter.delete('/', async (req: Request, res: Response, next: NextFunction) => {
  try{
    const { user, ...payload } = req.body;
    const { userId, movieId } = payload;
    if(!isAbleToDeleteReviews(user.role)){
        throw "Only EDITOR users are able to delete reviews"
    }
    const deletedReview = await reviewController.deleteReviewById(userId, movieId);
    return res.json(deletedReview);
  }catch(error){
    return next(error);
  }
})

export default reviewsRouter;