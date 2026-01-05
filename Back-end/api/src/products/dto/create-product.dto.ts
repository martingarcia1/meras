import { IsString, IsNotEmpty, IsNumber, IsEnum, IsOptional, IsArray, IsInt } from 'class-validator';
import { TipoPrenda } from '../entities/product.entity';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsInt()
  @IsNotEmpty()
  categoriaId: number;

  @IsEnum(TipoPrenda)
  tipoPrenda: TipoPrenda;

  @IsString()
  @IsNotEmpty()
  imagenPrincipalUrl: string;

  @IsArray()
  @IsOptional()
  imagenesSecundarias?: string[];

  @IsNumber()
  @IsNotEmpty()
  precioBase: number;
}
