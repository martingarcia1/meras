import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Product } from '../../products/entities/product.entity';

@Entity('custom_designs')
export class CustomDesign {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  userId: number;

  @ManyToOne(() => User, (user) => user.diseñosPersonalizados, { nullable: true })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  baseProductId: number;

  @ManyToOne(() => Product, (product) => product.diseñosPersonalizados)
  @JoinColumn({ name: 'baseProductId' })
  baseProduct: Product;

  @Column()
  nombre: string;

  @Column({ type: 'json' })
  configJson: {
    // Configuración del diseño 2D
    colorBase?: string;
    capas?: Array<{
      tipo: 'texto' | 'imagen' | 'estampado';
      contenido: string;
      posicion: { x: number; y: number };
      tamaño?: { width: number; height: number };
      rotacion?: number;
      opacidad?: number;
      color?: string;
      fuente?: string;
      tamañoTexto?: number;
    }>;
    vista?: 'frente' | 'espalda' | 'ambas';
    [key: string]: any;
  };

  @Column()
  previewImageUrl: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precioFinal: number;

  @Column({ default: false })
  esPublico: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

