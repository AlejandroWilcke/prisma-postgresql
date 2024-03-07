import { User } from '@prisma/client';
import prisma from "../db";
import { hashPassword, isPasswordSafe } from '../bcrypt/bcrypt';

export interface UpdateUserDTO {
  firstName: string;
  lastName: string;
  email: string;
}


export class UserService {

  async getUserById(id: number): Promise<User | null> {
    return await prisma.user.findUnique({ where: { id } });
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({ where: { email } });
  }

  async getAllUsers(): Promise<User[]> {
    return await prisma.user.findMany();
  }

  async createUser(user: User): Promise<User> {
    if(!isPasswordSafe(user.password)){
      throw "Password should be at least 8 characters with 1 uppercase and 1 number"
    }
    user.password = hashPassword(user.password);
    return await prisma.user.create({ data: user });
  }

  async updateUserById(id: number, updateUserDTO: UpdateUserDTO): Promise<User> {
    const { firstName, lastName, email } = updateUserDTO;
    return await prisma.user.update({
      where: { id },
      data: { firstName, lastName, email }
    });
  }

  async deleteUserById(id: number): Promise<User> {
    return await prisma.user.delete({ where: { id }});
  }

}