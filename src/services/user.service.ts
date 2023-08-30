
import { AppDataSource } from "../database";
import { User } from "../entities/User";
import crypto from "crypto";

const repo = AppDataSource.getRepository(User)

export class UserService {


    public static async getUserById(id: number) {
        const data = await repo.findOne({
            where: {
                userId: id

            }

        })


        return data;
    }
    public static async getUserByUsername(username: string) {
        const data = await repo.findOne({
            where: {
                name: username
                
            }
        });
        
        
        return data;
    }

    public static async createUser(username: string, password: string) {
        const hash = crypto.createHash('sha512').update(password).digest().toString('hex'); 
        return await repo.save({
            name: username,
            password: hash


        });
    }

    
    





}