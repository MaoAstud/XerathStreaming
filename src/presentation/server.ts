import express, { Router } from 'express';
import cors from 'cors';

export class Server{
    private app = express();
    private routes:Router;

    port = 9780;
    constructor(routes:Router){
        this.routes = routes;
    }

    async start(){
        this.app.use(cors()); 

        this.app.use(express.json());

        this.app.use(express.static('../../public'));

        this.app.use(this.routes);

        this.app.listen(this.port);
        console.log("Running on "+this.port);
    }
}