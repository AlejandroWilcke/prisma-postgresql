import { generateToken } from "../auth/jwt.auth";
import { comparePassword } from "../bcrypt/bcrypt";
import { UserService } from "./user.service";

export class AuthService {

  userService: UserService

  constructor() {
    this.userService = new UserService();
  }
  
  async getToken(email: string, password: string): Promise<any> {
    try{
      const user = await this.userService.getUserByEmail(email);
      if(!user){
        throw "User does not exist.";
      }
      if(!comparePassword(password, user.password)){
        throw "Password incorrect.";
      }
      const token = generateToken(user)
      return token;
    }catch(error){
      return error;
    }
  }
}