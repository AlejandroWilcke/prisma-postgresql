import { User } from '@prisma/client';
import { UserService, UpdateUserDTO } from "../services/user.service";

export default class UserController {

  userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  getUserById(id: number): Promise<User | null> {
    return this.userService.getUserById(id);
  }

  getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  createUser(createUserDTO: User): Promise<User> {
    return this.userService.createUser(createUserDTO);
  }

  updateUserById(userId: number, updateUserDTO: UpdateUserDTO): Promise<User> {
    return this.userService.updateUserById(userId, updateUserDTO);
  }

  deleteUserById(userId: number): Promise<User> {
    return this.userService.deleteUserById(userId);
  }
}