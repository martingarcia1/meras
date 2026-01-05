import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { CustomDesignsModule } from './custom-designs/custom-designs.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentsModule } from './payments/payments.module';
import { ShippingModule } from './shipping/shipping.module';

// Importar todas las entidades
import { User, Address } from './users/entities';
import { Category, Product, ProductVariant } from './products/entities';
import { CustomDesign } from './custom-designs/entities/custom-design.entity';
import { Order, OrderItem } from './orders/entities';
import { Payment } from './payments/entities/payment.entity';
import { Shipment } from './shipping/entities/shipment.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306'),
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_DATABASE || 'ecommerce_indumentaria',
      entities: [
        User,
        Address,
        Category,
        Product,
        ProductVariant,
        CustomDesign,
        Order,
        OrderItem,
        Payment,
        Shipment,
      ],
      synchronize: process.env.NODE_ENV !== 'production', // Solo en desarrollo
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false, // Desactivar SSL en desarrollo para evitar errores de certificado
      logging: process.env.NODE_ENV === 'development',
    }),
    AuthModule,
    UsersModule,
    ProductsModule,
    CustomDesignsModule,
    OrdersModule,
    PaymentsModule,
    ShippingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
