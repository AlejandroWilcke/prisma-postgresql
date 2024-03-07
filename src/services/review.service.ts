import prisma from '../db';
import { Review } from '@prisma/client';

export interface UpdateReviewDTO {
  userId: number;
  movieId: number;
  comment: string;
  rating: number;
}

export class ReviewService {

  async getReviewsByUserId(userId: number): Promise<Review[]> {
    return prisma.review.findMany({ where: { userId }});
  }

  async createReview(review: Review): Promise<Review> {
    try{
      const { userId, movieId, comment, rating } = review;
      await this.validateFields(review)
      return await prisma.review.create({ data: {
        userId: Number(userId),
        movieId: Number(movieId),
        rating: Number(rating),
        comment
      } })
    }catch(error: any){
      if(error.code === 'P2002'){
        throw "You already made a review about this movie"
      }
      throw error;
    }
  }

  async updateReview(updateReviewDTO: UpdateReviewDTO): Promise<Review> {
    try{
      const { userId, movieId, comment, rating } = updateReviewDTO;
      await this.validateFields(updateReviewDTO)
      return await prisma.review.update({
        where: {
          userId_movieId: {
            userId: Number(userId),
            movieId: Number(movieId)
          }
        },
        data: {
          comment,
          rating: Number(rating)
        }
      })
    }catch(error: any){
      if(error.code === 'P2025'){
        throw "Review not found"
      }
      throw error;
    }
  }

  async deleteReviewById(userId: number, movieId: number): Promise<Review> {
    try{
      return await prisma.review.delete({
        where: {
          userId_movieId: {
            userId: Number(userId),
            movieId: Number(movieId)
          }
        }
      })
    }catch(error: any){
      if(error.code === 'P2025'){
        throw "The review does not exist"
      }
      throw error;
    }
  }

  async validateFields(fields: Review){
    const { rating } = fields;
    try{
      if(Number(rating) < 1 || Number(rating) > 5){
        throw "Rating should be a number between 1 and 5";
      }
    }catch(error){
      throw error;
    }
  }
}