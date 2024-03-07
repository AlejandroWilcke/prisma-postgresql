import express, { Request, Response, NextFunction } from 'express'
import MovieController from '../../controllers/movie.controller'

const movieRouter = express.Router();
const movieController = new MovieController();

movieRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try{
    const movies = await movieController.getMovies();
    return res.json(movies);
  }catch(error){
    return next(error);
  }
})

export default movieRouter;