# Plan de Respaldo y Recuperación (Backups)

## 1. Información a Respaldar
Se respaldará la base de datos PostgreSQL alojada en la nube, incluyendo:
- Esquemas de tablas (`Recurso`).
- Datos almacenados e índices.
- Historial de migraciones de Prisma.

## 2. Frecuencia y Automatización
- **Respaldos Automáticos Diarios:** Se ejecutan de manera programada cada 24 horas a las 02:00 UTC (horario de menor tráfico).
- **Politica de Retención:** Se mantendrán las copias de seguridad de los últimos 7 días y 4 respaldos semanales.

## 3. Almacenamiento Seguro
- Los volcados de la base de datos (`.sql` / `.dump`) se cifran automáticamente mediante la tecnología **AES-256**.
- Se almacenan de forma remota en un bucket de almacenamiento seguro (AWS S3 / Google Cloud Storage) en una región geográficamente aislada.

## 4. Procedimiento de Recuperación ante Fallos (Disaster Recovery)
1. Identificar la hora exacta de la falla o pérdida de información.
2. Seleccionar el archivo de respaldo válido más reciente.
3. Provisionar o limpiar la instancia de PostgreSQL de destino.
4. Ejecutar el comando de restauración mediante herramientas nativas:
   ```bash
   psql -h <HOST_DB> -U <USUARIO> -d <NOMBRE_DB> < backup_file.sql
   ```
5. Reiniciar la aplicación backend y verificar la conectividad mediante el endpoint de monitoreo `/health`.
