import { IsNull } from "typeorm";
import { AppDataSource } from "../database";
import { Student } from "../entities/Student";

const repo = AppDataSource.getRepository(Student)

export class StudentServise {
    public static async getAllStudents() {
        const data = await repo.find({
            where: {
                deletedAt: IsNull()
            },
            relations: {
                studentPredmets: {
                    predmet: true
                }
            }

        });

        data.forEach(student => {
            delete student.deletedAt;
            student.studentPredmets.forEach(sp => {
                if (sp.predmet.deletedAt) {
                    delete sp.predmet;
                    return
                }
                delete sp.predmet.deletedAt
            })
        })
        return data;
    }

    public static async getStudentById(id: number) {
        const data = await repo.findOne({
            where: {
                studentId: id,
                deletedAt: IsNull()
            },
            relations: {
                studentPredmets: {
                    predmet: true
                }
            }
        });
        if(data == null) {
            return null;
        }
        delete data.deletedAt;
        data.studentPredmets.forEach(sp => {
            delete sp.predmet.deletedAt
        })
        return data;
    }
    public static async getStudentByBrIndeksa(brIndeksa: string) {
        const data = await repo.findOne({
            where: {
                brIndeksa: brIndeksa,
                deletedAt: IsNull()
            },
            relations: {
                studentPredmets: {
                    predmet: true
                }
            }
        });
        delete data.deletedAt;
        data.studentPredmets.forEach(sp => {
            delete sp.predmet.deletedAt
        })
        return data;
    }

    public static async saveStudent(student: Student) {
        delete student.studentId;
        return await repo.save(student);
    }

    public static async updateStudent(id: number, student: Student) {
        student.studentId = id;
        student.updatedAt = new Date();
        return await repo.save(student);
    }
    public static async deleteStudent(id: number) {
        const data = await repo.findOne({
            where: {
                studentId: id,
                deletedAt: IsNull()
            }
        });

        data.deletedAt = new Date()
        await repo.save(data);

    }





}