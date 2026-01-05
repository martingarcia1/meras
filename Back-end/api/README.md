# API E-commerce Indumentaria

Backend desarrollado con NestJS + TypeORM + MySQL para el e-commerce de indumentaria con personalizador de prendas 2D.

## 🚀 Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Configurar variables de entorno:
   - Copiar `.env.example` a `.env`
   - Ajustar las credenciales de MySQL según tu configuración

3. Crear la base de datos en MySQL:
```sql
CREATE DATABASE ecommerce_indumentaria;
```

4. Iniciar el servidor en modo desarrollo:
```bash
npm run start:dev
```

El servidor estará disponible en `http://localhost:3000`

## 📁 Estructura del Proyecto

```
src/
  ├── auth/              # Autenticación y autorización
  ├── users/             # Usuarios y direcciones
  ├── products/          # Productos, categorías y variantes
  ├── custom-designs/    # Diseños personalizados (creador 2D)
  ├── orders/            # Pedidos e items de pedido
  ├── payments/          # Pagos (MercadoPago, PayPal)
  └── shipping/          # Envíos y tracking
```

## 🗄️ Modelo de Datos

### Entidades Principales

- **User**: Usuarios del sistema (clientes y admin)
- **Address**: Direcciones de envío de usuarios
- **Category**: Categorías de productos
- **Product**: Productos base (prendas estándar)
- **ProductVariant**: Variantes de productos (color, talle, stock)
- **CustomDesign**: Diseños personalizados creados por usuarios
- **Order**: Pedidos realizados
- **OrderItem**: Items individuales de cada pedido
- **Payment**: Pagos procesados
- **Shipment**: Envíos y tracking

## 🔧 Tecnologías

- **NestJS**: Framework backend
- **TypeORM**: ORM para MySQL
- **MySQL**: Base de datos
- **class-validator**: Validación de DTOs
- **class-transformer**: Transformación de datos

## 📝 Próximos Pasos

1. Implementar autenticación JWT
2. Crear endpoints para productos
3. Implementar creador de diseños personalizados
4. Integrar MercadoPago y PayPal
5. Implementar cálculo de envíos
