import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import connectDB from "./config/connectDB";
import initWebRoutes from "./route/web";
import cors from "cors";

// const cookieParser = require('cookie-parser')
// const session = require('express-session')
require('dotenv').config();

let app = express();
app.use(cors({ origin: true, credentials: true }));
// app.use(cookieParser());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// app.use(session({
//     key: "userId",
//     secret: "subscribe",
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         expires: 60 * 60 * 24,
//     }
// }))

viewEngine(app);
initWebRoutes(app);
connectDB();

let port = process.env.PORT;

app.listen(port, () => {
    console.log("Backend is running on: " + port)
});