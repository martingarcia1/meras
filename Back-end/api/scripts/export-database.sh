#!/bin/bash

# Script para exportar la base de datos local
# Uso: ./export-database.sh

DB_NAME="ecommerce_indumentaria"
DB_USER="root"
OUTPUT_FILE="backup_$(date +%Y%m%d_%H%M%S).sql"

echo "🗄️  Exportando base de datos: $DB_NAME"
echo "📁 Archivo de salida: $OUTPUT_FILE"
echo ""

# Exportar la base de datos
mysqldump -u "$DB_USER" -p "$DB_NAME" > "$OUTPUT_FILE"

if [ $? -eq 0 ]; then
    echo "✅ Base de datos exportada exitosamente: $OUTPUT_FILE"
    echo ""
    echo "📋 Para importar a producción (PlanetScale ejemplo):"
    echo "mysql -h [TU_HOST] -u [TU_USERNAME] -p[TU_PASSWORD] [TU_DATABASE] < $OUTPUT_FILE"
    echo ""
    echo "📋 Para importar a Railway:"
    echo "mysql -h [MYSQLHOST] -u [MYSQLUSER] -p[MYSQLPASSWORD] [MYSQLDATABASE] < $OUTPUT_FILE"
else
    echo "❌ Error al exportar la base de datos"
    exit 1
fi
