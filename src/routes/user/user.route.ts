import express, { Request, Response, NextFunction } from 'express';
import UserController from '../../controllers/user.controller';
import { isAdmin } from '../../auth/role.auth';
import authMiddleware from '../../middlewares/auth.middleware';

const userRouter = express.Router();
const userController = new UserController();

userRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try{
    const createdUser = await userController.createUser(req.body);
    return res.json(createdUser);
  }catch(error){
    return next(error);
  }
})

userRouter.use(authMiddleware)

userRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try{
    const { user } = req.body;
    if(!isAdmin(user.role)){
      throw "Only admins can list all users";
    }
    const users = await userController.getAllUsers();
    return res.json(users);
  }catch(error: any){
    return next(error);
  }
})

userRouter.get('/:userId', async (req: Request, res: Response, next: NextFunction) => {
  try{
    const { userId } = req.params;
    const { user } = req.body;
    if(user.id != userId){
      throw "You can only see your own profile";
    }
    const dbUser = await userController.getUserById(Number(userId));
    return res.json(dbUser);
  }catch(error: any){
    return next(error);
  }
})

userRouter.patch('/:userId', async (req: Request, res: Response, next: NextFunction) => {
  try{
    const { userId } = req.params;
    const { user } = req.body;
    if(user.id != userId){
      throw "You can only edit your own profile";
    }
    const updatedUser = await userController.updateUserById(Number(userId), req.body);
    return res.json(updatedUser);
  }catch(error: any){
    return next(error);
  }
})

userRouter.delete('/:userId', async (req: Request, res: Response, next: NextFunction) => {
  try{
    const { userId } = req.params;
    const { user } = req.body;
    if(user.id != userId){
      throw "You can only delete your own profile";
    }
    const users = await userController.deleteUserById(Number(userId));
    return res.json(users);
  }catch(error: any){
    return next(error);
  }
})

export default userRouter;