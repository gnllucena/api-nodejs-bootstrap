import bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { BeforeInsert, Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { File } from './File';

@Entity({ name: 'user', schema: 'public' })
export class User {
  @PrimaryColumn('uuid', { name: 'id' })
  Id: string;

  @IsNotEmpty()
  @Column({ name: 'name', length: 80, type: 'varchar' })
  name: string;

  @IsNotEmpty()
  @Column({ name: 'email', length: 80, type: 'varchar' })
  email: string;

  @IsNotEmpty()
  @Column({ name: 'password', length: 100, type: 'varchar' })
  @Exclude()
  password: string;

  @OneToMany(() => File, (file: File) => file.user)
  files: File[];

  @BeforeInsert()
  public async hashPassword(): Promise<void> {
    this.password = await bcrypt.hash(this.password, process.env.SALT);
  }
}
