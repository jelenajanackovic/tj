import dotenv from "dotenv";
import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { Student } from "./entities/Student";
import { Predmet } from "./entities/Predmet";
import { StudentPredmet } from "./entities/StudentPredmet";



dotenv.config();
export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number.parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
    entities:[Student, User, Predmet, StudentPredmet],
    logging : false,







})