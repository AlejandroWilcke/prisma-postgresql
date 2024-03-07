import prisma from '../db';
import { Movie } from '@prisma/client';

export class MovieService {

  async getMovies(): Promise<Movie[]> {
    return await prisma.movie.findMany()
  }

}