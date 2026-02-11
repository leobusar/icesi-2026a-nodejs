import bcrypt from "bcrypt";
import { UserInput } from "./user.interface";
import { UserDocument, UserModel } from "./user.model";

class UserService {
    public async create (userInput: UserInput): Promise<UserDocument>{
        const userExists: UserDocument  | null = await this.findByEmail(userInput.email);
        if (userExists !== null){
            throw new ReferenceError("user already exists");
        }
        if(userInput.password){
            userInput.password =  await bcrypt.hash(userInput.password, 10);
        }
        return UserModel.create(userInput);
    }

    public findByEmail (email:string): Promise<UserDocument | null>{
        return UserModel.findOne({email});
    }

}

export const userService = new UserService();