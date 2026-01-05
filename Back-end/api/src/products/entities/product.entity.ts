import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { ProductVariant } from './product-variant.entity';
import { CustomDesign } from '../../custom-designs/entities/custom-design.entity';

export enum TipoPrenda {
  REMERA = 'remera',
  BUZO = 'buzo',
  PANTALON = 'pantalon',
  SHORT = 'short',
  CAMPERA = 'campera',
  OTRO = 'otro',
}

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ unique: true })
  slug: string;

  @Column()
  categoriaId: number;

  @ManyToOne(() => Category, (category) => category.productos)
  @JoinColumn({ name: 'categoriaId' })
  categoria: Category;

  @Column({
    type: 'enum',
    enum: TipoPrenda,
  })
  tipoPrenda: TipoPrenda;

  @Column()
  imagenPrincipalUrl: string;

  @Column({ type: 'json', nullable: true })
  imagenesSecundarias: string[];

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precioBase: number;

  @Column({ default: true })
  activo: boolean;

  @OneToMany(() => ProductVariant, (variant) => variant.product)
  variantes: ProductVariant[];

  @OneToMany(() => CustomDesign, (design) => design.baseProduct)
  diseñosPersonalizados: CustomDesign[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
