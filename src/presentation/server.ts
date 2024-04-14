import express from 'express';

export class Server{
    private app = express();

    async start(){
        this.app.listen(9780, ()=> {
            console.log('Server running');
        });
    }
}