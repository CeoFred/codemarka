import errorHandler from "errorhandler";
import express from "express";
import app from "./app";
import dotenv from "dotenv";
import socket from "./socket/index";

const http = require("http").createServer(app);


socket(http);
dotenv.config();
class Server {
    public app: express.Application

    public  constructor(app: express.Application){
        this.app = app;
    }
    /**
     * start
     */
    public start(): void {
        http.listen(this.app.get("port"), () => {
            console.log(
                "  App is running at http://localhost:%d in %s mode",
                this.app.get("port"),
                this.app.get("env")
            );
            console.log("  Press CTRL-C to stop\n");
        });
    }
}
/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(errorHandler());

/**
 * Start Express server.
 */
const server = new Server(app);
server.start();
export default server;