import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("user", { schema: "jelena" })
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "user_id", unsigned: true })
  userId: number;

  @Column("varchar", { name: "name", length: 255, default: () => "'0'" })
  name: string;

  @Column("varchar", { name: "password", length: 255, default: () => "'0'" })
  password: string;
}
