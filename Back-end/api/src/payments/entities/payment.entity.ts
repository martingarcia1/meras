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

export enum PaymentProveedor {
  MERCADOPAGO = 'mercadopago',
  PAYPAL = 'paypal',
}

export enum PaymentEstado {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  REFUNDED = 'refunded',
}

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orderId: number;

  @ManyToOne(() => Order, (order) => order.pagos)
  @JoinColumn({ name: 'orderId' })
  order: Order;

  @Column({
    type: 'enum',
    enum: PaymentProveedor,
  })
  proveedor: PaymentProveedor;

  @Column()
  providerPaymentId: string; // ID del pago en MercadoPago o PayPal

  @Column({
    type: 'enum',
    enum: PaymentEstado,
    default: PaymentEstado.PENDING,
  })
  estado: PaymentEstado;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  monto: number;

  @Column({ default: 'ARS' })
  moneda: string;

  @Column({ type: 'json', nullable: true })
  rawResponseJson: any; // Respuesta completa del proveedor para debugging

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

