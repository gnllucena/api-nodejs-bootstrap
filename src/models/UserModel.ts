import { Type } from 'class-transformer';
import { IsNotEmpty, IsEmail, Length, IsPositive, ValidateNested, IsArray } from 'class-validator';
import { FileModel } from './FileModel';

export class UserModel {
  @IsPositive()
  id: number;

  @IsNotEmpty()
  @Length(1, 80)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @Length(5, 80)
  email: string;

  @IsNotEmpty()
  @Length(6, 20)
  password: string;

  @IsArray()
  @ValidateNested()
  @Type(() => FileModel)
  files: FileModel[];
}
