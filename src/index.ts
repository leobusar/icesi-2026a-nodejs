import express, {Express, Request, Response} from 'express';

import {userRouter} from './users/user.route';
import {db} from './config/connectionDB';

const app: Express = express();

process.loadEnvFile();

const port: number = parseInt(process.env.PORT || "3000");

app.use(express.json()); 
app.use(express.urlencoded({extended: true})); 

app.use("/user", userRouter);

app.get("/", (req:Request, res: Response) => {
    res.send("Hola mundo"); 
});

db.then( () =>
    app.listen(port, ()=> {
        console.log(`Server is running on port ${port}`);
    })
)