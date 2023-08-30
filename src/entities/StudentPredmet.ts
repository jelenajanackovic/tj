import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Predmet } from "./Predmet";
import { Student } from "./Student";

@Index("fk_student_predmet_predmet_id", ["predmetId"], {})
@Index("fk_student_predmet_student_id", ["studentId"], {})
@Entity("student_predmet", { schema: "jelena" })
export class StudentPredmet {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "student_predmet-id",
    unsigned: true,
  })
  studentPredmetId: number;

  @Column("int", { name: "student_id", unsigned: true, default: () => "'0'" })
  studentId: number;

  @Column("int", { name: "predmet_id", unsigned: true, default: () => "'0'" })
  predmetId: number;

  @ManyToOne(() => Predmet, (predmet) => predmet.studentPredmets, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "predmet_id", referencedColumnName: "predmetId" }])
  predmet: Predmet;

  @ManyToOne(() => Student, (student) => student.studentPredmets, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "student_id", referencedColumnName: "studentId" }])
  student: Student;
}
