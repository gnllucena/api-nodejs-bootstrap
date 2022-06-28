import { IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { FileStatus } from './FileStatus';
import { User } from './User';

@Entity({ name: 'file', schema: 'public' })
export class File {
  @PrimaryColumn('uuid', { name: 'id' })
  id: string;

  @IsNotEmpty()
  @Column({ name: 'name', length: 80, type: 'varchar' })
  name: string;

  @IsNotEmpty()
  @Column({ name: 'path', length: 200, type: 'varchar' })
  path: string;

  @IsNotEmpty()
  @Column({ name: 'status', type: 'varchar', enum: FileStatus, default: FileStatus.Pending })
  status: FileStatus;

  @ManyToOne(() => User, (user: User) => user.files)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
