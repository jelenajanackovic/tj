import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { StudentPredmet } from "./StudentPredmet";

@Index("uq_student_br_indeksa", ["brIndeksa"], { unique: true })
@Entity("student", { schema: "jelena" })
export class Student {
  @PrimaryGeneratedColumn({ type: "int", name: "student_id", unsigned: true })
  studentId: number;

  @Column("varchar", { name: "ime", length: 50 })
  ime: string;

  @Column("varchar", { name: "prezime", length: 50 })
  prezime: string;

  @Column("varchar", { name: "br_indeksa", unique: true, length: 50 })
  brIndeksa: string;

  @Column("datetime", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("datetime", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @Column("datetime", { name: "deleted_at", nullable: true })
  deletedAt: Date | null;

  @OneToMany(() => StudentPredmet, (studentPredmet) => studentPredmet.student)
  studentPredmets: StudentPredmet[];
}
