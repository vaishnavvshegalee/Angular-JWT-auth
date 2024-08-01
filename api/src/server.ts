import express from "express";
import config from "./config/config";
import UserRoute from "./users/UserRoute";
import morgan from "morgan";
import cors from 'cors'
import db from "./config/db";
const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app
db();
app.use('/api/v1/users', UserRoute)
app.listen(config.port, () => {
    console.log(`sever is listening on port ${config.port}`);
})