import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class FileModel {
  @IsPositive()
  @IsNumber()
  id: number;
}
