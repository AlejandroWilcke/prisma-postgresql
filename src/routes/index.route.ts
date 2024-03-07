import express from 'express'
import authRouter from './auth/auth.route'
import userRouter from './user/user.route'
import movieRouter from './movies/movie.route'
import reviewsRouter from './reviews/review.route'

const router = express.Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/movies', movieRouter);
router.use('/reviews', reviewsRouter);


export default router;