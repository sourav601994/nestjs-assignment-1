import { IsEnum, IsNotEmpty } from 'class-validator';
import { IdType } from '../user.idtype.enum';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEnum(IdType)
  idType: IdType;
}
