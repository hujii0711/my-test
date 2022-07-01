import * as dotenv from "dotenv";
import express,{Request, Response, NextFunction} from "express";
import cors from "cors";
import { sequelize } from "./models";
import Users from "./models/user";

dotenv.config();
/**
 * App Variables
 */
const app = express();

/**
 *  App Configuration   //middleware
 */
 sequelize
 .sync({ force: false })
 .then(() => {
   console.log('데이터베이스 연결 성공!');
 })
 .catch((err) => {
   console.error(err);
 });

app.use(cors());
app.use(express.json());
app.use((req:Request, res:Response, next:NextFunction) => {
    console.log(`Request Occur! ${req.method}, ${req.url}`);
    next();
})

/**
 * Server Activation
 */
app.listen(5000, "localhost", async () => {
    console.log(`Server Listening on localhost:5000################`);
})