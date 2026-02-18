import {Request, Response} from 'express'; 
import { userService } from './user.service';
import { UserInput, UserLogin, UserUpdate } from './user.interface';
import { UserDocument } from './user.model';

class UserController {
    public async getAll  (req:Request, res: Response) {
        try {
            const users: UserDocument[] = await userService.getAll();
            res.json({message: "OK", users});
        } catch (error) {
            res.status(500).json(error);
        } 
    }

    public async getOne  (req:Request, res: Response) {
         try {
            const id: string = req.params.id as string ||  '';
            const user: UserDocument | null = await userService.findById(id);
            if (user === null){
                res.status(404).json({message: `User with id ${id} not found`}); 
                return;
            }
            res.json(user);

         } catch (error) {
            res.status(500).json(error);            
         }
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

    public async delete(req:Request, res: Response) {
         try {
            const id: string = req.params.id as string ||  '';
            const user: UserDocument | null = await userService.delete(id);
            if (user === null){
                res.status(404).json({message: `User with id ${id} not found`})
                return;
            }
            res.json(user);

         } catch (error) {
            res.status(500).json(error);            
         }
    }

    public async update(req:Request, res: Response) {
         try {
            const id: string = req.params.id as string ||  '';
            const user: UserDocument | null = await userService.update(id, req.body  as UserUpdate);
            if (user === null){
                res.status(404).json({message: `User with id ${id} not found`})
                return;
            }
            res.json(user);

         } catch (error) {
            res.status(500).json(error);            
         }
    }    

    public async login  (req:Request, res: Response) {
 //        try {
            const user = await userService.login(req.body as UserLogin);
            res.json(user);
 /*        } catch (error) {
            if(error instanceof ReferenceError) {
              res.status(401).json({message: "Not Authorized"});
            }
            res.status(500).json(error);            
         }
  */  }

}

export const userController  = new UserController();