import {
  IsString,
  IsDateString,
  IsNumber,
  IsPositive,
  IsNotEmpty,
} from 'class-validator';

export class CreateRegisterDto {
  @IsString()
  number: string;

  @IsString()
  description: string;

  @IsDateString()
  date: Date;

  @IsNumber()
  @IsPositive()
  amount: number;

  @IsString()
  contractDescription: string;

  @IsString()
  thirdParty: string;

  @IsNumber()
  @IsPositive()
  certificateId: number;
}

export class DocumentRegisterDto extends CreateRegisterDto {
  @IsNumber()
  @IsPositive()
  id: number;

  @IsString()
  @IsNotEmpty()
  createdAt: string;

  @IsString()
  @IsNotEmpty()
  updatedAt: string;
}
