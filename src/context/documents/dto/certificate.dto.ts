import {
  IsString,
  IsDateString,
  IsNumber,
  IsPositive,
  IsNotEmpty,
} from 'class-validator';

export class CreateCertificateDto {
  @IsString()
  number: string;

  @IsString()
  description: string;

  @IsDateString()
  date: Date;

  @IsNumber()
  amount: number;

  @IsString()
  dependency: string;
}

export class DocumentCertificateDto extends CreateCertificateDto {
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
