import express, {Express, Request, Response} from 'express';

import {userRouter} from './users/user.route';

const app: Express = express();

process.loadEnvFile();

const port: number = parseInt(process.env.PORT || "3000");

app.use(express.json()); 
app.use(express.urlencoded({extended: true})); 

app.use("/user", userRouter);

app.get("/", (req:Request, res: Response) => {
    res.send("Hola mundo"); 
});

app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`);
});