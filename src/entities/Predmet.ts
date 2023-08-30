import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { StudentPredmet } from "./StudentPredmet";

@Entity("predmet", { schema: "jelena" })
export class Predmet {
  @PrimaryGeneratedColumn({ type: "int", name: "predmet_id", unsigned: true })
  predmetId: number;

  @Column("varchar", { name: "name", length: 50, default: () => "'0'" })
  name: string;

  @Column("int", { name: "espb", unsigned: true, default: () => "'0'" })
  espb: number;

  @Column("datetime", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("datetime", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @Column("datetime", { name: "deleted_at", nullable: true })
  deletedAt: Date | null;

  @OneToMany(() => StudentPredmet, (studentPredmet) => studentPredmet.predmet)
  studentPredmets: StudentPredmet[];
}
