import {Request, Response} from 'express'; 
import { userService } from './user.service';
import { UserInput } from './user.interface';

class UserController {
    public getAll  (req:Request, res: Response) {
        res.send("Get users"); 
    }

    public getOne  (req:Request, res: Response) {
        res.send(`Get user with id ${req.params.id}`); 
    }

    public update  (req:Request, res: Response) {
        res.send(`Update user with id ${req.params.id}`); 
    }

    public async create  (req:Request, res: Response) {
        try {
           const newUser = await userService.create(req.body as UserInput);
           res.status(201).json(newUser);
        } catch (error) {
           if(error instanceof ReferenceError) {
            res.status(422).json({message: "User already exists"});
           } 
           res.status(500).json(error);
        }
    }

    public delete  (req:Request, res: Response) {
        res.send(`Delete user with id ${req.params.id}`); 
    }

}

export const userController  = new UserController();