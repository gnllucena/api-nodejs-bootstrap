import bcrypt from 'bcrypt';
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { File } from './File';

@Entity({ name: 'user', schema: 'public' })
export class User {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  Id: number;

  @Column({ name: 'name', length: 80, type: 'varchar' })
  name: string;

  @Column({ name: 'email', length: 80, type: 'varchar' })
  email: string;

  @Column({ name: 'password', length: 100, type: 'varchar' })
  password: string;

  @OneToMany(() => File, (file: File) => file.user)
  files: File[];

  @BeforeInsert()
  public async hashPassword(): Promise<void> {
    this.password = await bcrypt.hash(this.password, process.env.SALT);
  }
}
