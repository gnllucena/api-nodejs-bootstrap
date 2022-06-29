import { IsPositive } from 'class-validator';

export class FileModel {
  @IsPositive()
  Id: number;
}
