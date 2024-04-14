import { Server } from "./presentation/server";

(async() => {
    main();
})();

function main(){
    const server = new Server();

    server.start();
}