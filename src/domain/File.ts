import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { FileStatus } from './FileStatus';
import { User } from './User';

@Entity({ name: 'file', schema: 'public' })
export class File {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: Number;

  @Column({ name: 'name', length: 80, type: 'varchar' })
  name: string;

  @Column({ name: 'path', length: 200, type: 'varchar' })
  path: string;

  @Column({ name: 'status', type: 'varchar', enum: FileStatus, default: FileStatus.Pending })
  status: FileStatus;

  @ManyToOne(() => User, (user: User) => user.files)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
