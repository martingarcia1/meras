@echo off
REM Script para exportar la base de datos local (Windows)
REM Uso: export-database.bat

set DB_NAME=ecommerce_indumentaria
set DB_USER=root
set OUTPUT_FILE=backup_%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%%time:~6,2%.sql
set OUTPUT_FILE=%OUTPUT_FILE: =0%

echo Exportando base de datos: %DB_NAME%
echo Archivo de salida: %OUTPUT_FILE%
echo.

REM Exportar la base de datos
mysqldump -u %DB_USER% -p %DB_NAME% > %OUTPUT_FILE%

if %errorlevel% equ 0 (
    echo Base de datos exportada exitosamente: %OUTPUT_FILE%
    echo.
    echo Para importar a produccion (PlanetScale ejemplo):
    echo mysql -h [TU_HOST] -u [TU_USERNAME] -p[TU_PASSWORD] [TU_DATABASE] ^< %OUTPUT_FILE%
    echo.
    echo Para importar a Railway:
    echo mysql -h [MYSQLHOST] -u [MYSQLUSER] -p[MYSQLPASSWORD] [MYSQLDATABASE] ^< %OUTPUT_FILE%
) else (
    echo Error al exportar la base de datos
    exit /b 1
)
