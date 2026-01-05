import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Order } from '../../orders/entities/order.entity';

export enum ShipmentEstado {
  PENDING = 'pending',
  IN_TRANSIT = 'in_transit',
  DELIVERED = 'delivered',
  RETURNED = 'returned',
}

@Entity('shipments')
export class Shipment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orderId: number;

  @ManyToOne(() => Order, (order) => order.envios)
  @JoinColumn({ name: 'orderId' })
  order: Order;

  @Column()
  servicio: string; // Correo Argentino, OCA, etc.

  @Column()
  tipoServicio: string; // estándar, exprés, etc.

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  costo: number;

  @Column({ nullable: true })
  trackingNumber: string;

  @Column({
    type: 'enum',
    enum: ShipmentEstado,
    default: ShipmentEstado.PENDING,
  })
  estado: ShipmentEstado;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

