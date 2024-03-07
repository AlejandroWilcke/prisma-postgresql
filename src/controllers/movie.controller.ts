import { MovieService } from "../services/movie.service";
import { Movie } from "@prisma/client";

export default class MovieController {

  movieService: MovieService;

  constructor() {
    this.movieService = new MovieService();
  }

  getMovies(): Promise<Movie[]> {
    return this.movieService.getMovies();
  }

}