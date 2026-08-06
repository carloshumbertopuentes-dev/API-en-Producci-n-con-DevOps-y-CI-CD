# REST API Dockerizada

Este proyecto sigue la estructura requerida en la guía de dockerización con Node.js, Express, Prisma y PostgreSQL.

## Archivos del proyecto:
- `Dockerfile`: Instrucciones para construir la imagen del contenedor de Node.js.
- `docker-compose.yml`: Configuración de servicios para levantar la API y la base de datos PostgreSQL juntas.
- `.dockerignore`: Archivos excluidos del contenedor.
- `prisma/schema.prisma`: Esquema de Prisma con el modelo `Recurso`.
- `index.js`: Servidor Express con las rutas `/` y `/api/recurso`.

## Comandos para ejecutar en la nube (GitHub Codespaces / Cloud Shell):

1. **Construir y levantar contenedores:**
   ```bash
   docker compose up --build
   ```

2. **Ejecutar migraciones de Prisma (en otra terminal):**
   ```bash
   docker compose exec api npx prisma migrate dev --name init
   ```

3. **Probar la API:**
   ```bash
   curl http://localhost:3000
   curl http://localhost:3000/api/recurso
   ```
