import express, { Router } from 'express';
import { AppRoutes } from './routes';

export class Server{
    private app = express();
    private routes:Router;

    constructor(routes:Router){
        this.routes = routes;
    }

    async start(){

        this.app.use(express.json());

        this.app.use(express.static('../../public'));

        this.app.use(this.routes);

        this.app.listen(9780);
    }
}