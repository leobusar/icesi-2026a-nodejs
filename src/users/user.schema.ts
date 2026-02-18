import {object, string, email} from 'zod'; 

export const userSchema: any =object({
    name: string({error: "Name is required"}),
    email: email({error: "Not a valid email address"}),
    password: string({error: "Password is required"})
                .min(8, "Password must be at least 8 characters long")
});