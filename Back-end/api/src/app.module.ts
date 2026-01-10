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
      // Soporta variables estándar (DB_*) y variables de Railway (MYSQL*)
      host: process.env.DB_HOST || process.env.MYSQLHOST || 'localhost',
      port: parseInt(process.env.DB_PORT || process.env.MYSQLPORT || '3306'),
      username: process.env.DB_USERNAME || process.env.MYSQLUSER || 'root',
      password: process.env.DB_PASSWORD || process.env.MYSQLPASSWORD || '',
      database: process.env.DB_DATABASE || process.env.MYSQLDATABASE || 'ecommerce_indumentaria',
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
      // Configuración de SSL: Railway TCP proxy NO requiere SSL
      ssl: false, // Railway TCP proxy no usa SSL
      // Configuraciones adicionales para Railway - Pool de conexiones optimizado
      extra: {
        connectionLimit: 5,
        connectTimeout: 30000,
        idleTimeout: 300000,
        reconnect: true,
        enableKeepAlive: true,
        keepAliveInitialDelay: 10000,
        // Opciones específicas para Railway TCP proxy
        waitForConnections: true,
        queueLimit: 0,
      },
      logging: process.env.NODE_ENV === 'development',
      // Retry de conexión
      retryAttempts: 5,
      retryDelay: 3000,
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
