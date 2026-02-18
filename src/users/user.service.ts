import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { UserInput, UserLogin, UserUpdate } from "./user.interface";
import { UserDocument, UserModel } from "./user.model";

class UserService {
    getAll(): Promise<UserDocument[]> {
        return UserModel.find();
    }

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

    public findByEmail (email:string, password: boolean = false): Promise<UserDocument | null>{
        return UserModel.findOne({email}, {password});
    }

    public findById (id:string): Promise<UserDocument | null>{
        return UserModel.findById(id);
    }

    public delete (id:string): Promise<UserDocument | null>{
        return UserModel.findByIdAndDelete(id);
    }

    public update (id: string, userInput: UserUpdate): Promise<UserDocument | null>{
        return UserModel.findByIdAndUpdate(id, userInput); 
    }
    
    public async login(userLogin: UserLogin): Promise<any>{
        const userExists: UserDocument  | null = await this.findByEmail(userLogin.email, true);
        if (userExists === null){
            throw new ReferenceError("Not Authorized");
        }

        const isMatch: boolean = await bcrypt.compare(userLogin.password,userExists.password);
        if (!isMatch){
            throw new ReferenceError("Not Authorized");
        }

        return {
            id: userExists._id, 
            roles: ['admin'],
            token: await this.generateToken(userExists._id.toString())
        }
    }

    public async generateToken(id: string): Promise<string> {
        const user = await  this.findById(id); 
        if (user == null){
            throw new Error();
        }
        return jwt.sign({
                            id: user._id.toString(),
                            name: user.name, 
                            email: user.email
                        },
                        "secret_key",
                        {expiresIn: "10m"});
    }
}

export const userService = new UserService();