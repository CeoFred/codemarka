import express from "express";
import compression from "compression";  // compresses requests
import bodyParser from "body-parser";
import lusca from "lusca";
import path from "path";
import methodOverride from "method-override";
import cors from "cors";
import "./config/db";

// Controllers (route handlers)

import auth from "./routes/auth";
import { NextFunction, Request, Response } from "express";

// Create Express server
const app = express();

// const whitelist = ["http://localhost:3000", "http://localhost:3001", "*"];
// const corsOptions = {
//     origin(origin: string, callback: Function) {
//         if (whitelist.indexOf(origin) !== -1) {
//             callback(null, true);
//         } else {
//             callback(new Error("Not allowed by CORS"));
//         }
//     }
// };


// Express configuration
app.set("port", process.env.PORT || 8000);
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(compression());
app.use(methodOverride());
app.use(cors());

app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));
app.use(express.static(path.join(__dirname, "public"), { maxAge: 31557600000 }));
// routes as middlewares
app.use("/auth", cors(), auth);


// middleware for errors
app.use((req: Request, res: Response, next: NextFunction) => {
    const error = new Error("Not found");
    next(error);
});

app.use((error: Error, req: Request, res: Response) => {
    res.status(404).json({
        error: {
            message: error.message
        }
    });
});

export default app;
