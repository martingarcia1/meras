import { IsString, IsNotEmpty, IsInt, IsOptional, IsNumber } from 'class-validator';

export class CreateVariantDto {
  @IsInt()
  @IsNotEmpty()
  productId: number;

  @IsString()
  @IsNotEmpty()
  color: string;

  @IsString()
  @IsNotEmpty()
  talle: string;

  @IsString()
  @IsNotEmpty()
  sku: string;

  @IsInt()
  @IsOptional()
  stock?: number;

  @IsNumber()
  @IsOptional()
  precio?: number;
}

