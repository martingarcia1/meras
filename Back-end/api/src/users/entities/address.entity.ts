import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('addresses')
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.direcciones)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  calle: string;

  @Column()
  numero: string;

  @Column({ nullable: true })
  piso: string;

  @Column({ nullable: true })
  departamento: string;

  @Column()
  ciudad: string;

  @Column()
  provincia: string;

  @Column()
  codigoPostal: string;

  @Column({ default: 'Argentina' })
  pais: string;

  @Column({ default: false })
  esPrincipal: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

