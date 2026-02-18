import express, {Request, Response} from 'express';
import { userController } from './user.controller';
import { auth } from '../auth';
import { validateSchema } from '../global/validate.middleware';
import { userSchema } from './user.schema';

export const userRouter = express.Router();

userRouter.get("/", userController.getAll);

userRouter.get("/profile", auth, userController.getOne);

userRouter.get("/:id", userController.getOne);

userRouter.post("/", validateSchema(userSchema), userController.create);

userRouter.put("/:id", userController.update);

userRouter.delete("/:id", userController.delete);

userRouter.post("/login", userController.login);

