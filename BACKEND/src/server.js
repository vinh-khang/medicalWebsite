import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import connectDB from "./config/connectDB";
import initWebRoutes from "./route/web";
import cors from "cors";

require('dotenv').config();

let app = express();
app.use(cors({ origin: true, credentials: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initWebRoutes(app);
connectDB();

let port = process.env.PORT;

app.listen(port, () => {
    console.log("Backend is running on: " + port)
});