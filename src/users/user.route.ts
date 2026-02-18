import express, {Request, Response} from 'express';
import { userController } from './user.controller';

export const userRouter = express.Router();

userRouter.get("/", userController.getAll);

userRouter.get("/:id", userController.getOne);

userRouter.post("/", userController.create);

userRouter.put("/:id", userController.update);

userRouter.delete("/:id", userController.delete);

userRouter.post("/login", userController.login);

