import express, {Request, Response} from 'express';

export const userRouter = express.Router();

userRouter.get("/", (req:Request, res: Response) => {
    res.send("Get users"); 
});

userRouter.get("/:id", (req:Request, res: Response) => {
    res.send(`Get user with id ${req.params.id}`); 
});

userRouter.post("/", (req:Request, res: Response) => {
    let user = `email: ${req.body.email}, password: ${req.body.password}, name: ${req.body.name}`;
    res.send(`user=> ${user}`); 
});

userRouter.put("/:id", (req:Request, res: Response) => {
    res.send("Get users"); 
});

userRouter.delete("/:id", (req:Request, res: Response) => {
    res.send("Get users"); 
});
