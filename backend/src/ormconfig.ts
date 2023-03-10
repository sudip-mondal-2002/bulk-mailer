import "reflect-metadata"
import { DataSource } from "typeorm"
import { UserEntity } from "./entities"
import {EmailEntity} from "./entities/EmailEntity";

export const AppDataSource = new DataSource({
    url: process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5432/postgres",
    type: "postgres",
    synchronize: process.env.NODE_ENV !== "production",
    entities: [UserEntity, EmailEntity]
})
AppDataSource.initialize().then(() => {
    console.log("Database connection established")
}).catch((error) => {
    console.log("Database connection failed")
    console.log(error)
})