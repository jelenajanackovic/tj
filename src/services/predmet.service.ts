import { IsNull } from "typeorm";
import { AppDataSource } from "../database";
import { Predmet } from "../entities/Predmet";

const repo = AppDataSource.getRepository(Predmet)

export class PredmetService{
    public static async getAllPredmets(){
        const data = await repo.find({
            where: {
                deletedAt: IsNull()
            }
        });
        data.forEach(predmet=> delete predmet.deletedAt)
        return data;
    }

    public static async getPredmetById(id: number) {
        const data = await repo.findOne({
            where: {
                predmetId: id,
                deletedAt: IsNull()
            }
            
        });
        delete data.deletedAt;
        
        return data;
    }

    public static async getPredmetWhereESPB(espb: number) {
        const data = await repo.find({
            where: {
                espb: espb,
                deletedAt: IsNull()
            }
        });
        data.forEach(predmet=> delete predmet.deletedAt)
        return data;
       
    }

    public static async createPredmet(predmet: Predmet) {
        delete predmet.predmetId;
        return await repo.save(predmet);
    }

    public static async updatePredmet(id: number, predmet: Predmet) {
        predmet.predmetId = id;
        predmet.updatedAt = new Date();
        const data =  await repo.save(predmet)
        delete data.deletedAt
        return data
    }

    public static async deletePredmet(id: number) {
        const data = await repo.findOne({
            where: {
                predmetId: id,
                deletedAt: IsNull()
            }
        });

        data.deletedAt = new Date()
        await repo.save(data);

    }





}