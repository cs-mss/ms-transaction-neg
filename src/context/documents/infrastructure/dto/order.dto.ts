import {
  IsString,
  IsDateString,
  IsNumber,
  IsPositive,
  IsNotEmpty,
} from 'class-validator';

export class CreateOrderDto {
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
  registerId: number;
}

export class DocumentOrderDto extends CreateOrderDto {
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
