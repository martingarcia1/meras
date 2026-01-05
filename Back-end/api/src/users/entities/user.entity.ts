import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Address } from './address.entity';
import { Order } from '../../orders/entities/order.entity';
import { CustomDesign } from '../../custom-designs/entities/custom-design.entity';

export enum UserRole {
  CUSTOMER = 'customer',
  ADMIN = 'admin',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.CUSTOMER,
  })
  rol: UserRole;

  @Column({ default: true })
  activo: boolean;

  @OneToMany(() => Address, (address) => address.user)
  direcciones: Address[];

  @OneToMany(() => Order, (order) => order.user)
  pedidos: Order[];

  @OneToMany(() => CustomDesign, (design) => design.user)
  diseñosPersonalizados: CustomDesign[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
