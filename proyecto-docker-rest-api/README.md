# API REST Express + PostgreSQL (Proyecto DevOps)

Proyecto completo preparado con buenas prácticas DevOps, Docker, CI/CD, Monitoreo y Plan de Backups.

## Estructura del Proyecto:
- `index.js`: API con endpoints funcionales, operaciones CRUD y endpoint `/health`.
- `prisma/schema.prisma`: Configuración y modelos de la base de datos PostgreSQL.
- `.env.example`: Plantilla de variables de entorno requeridas.
- `.github/workflows/deploy.yml`: Pipeline de CI/CD para GitHub Actions.
- `PLAN_DE_BACKUPS.md`: Documentación del plan de respaldos y recuperación.
- `Dockerfile` & `docker-compose.yml`: Entorno dockerizado local o para la nube.

## Rutas Disponibles:
- `GET /` : Endpoint principal.
- `GET /health` : Estado del servicio y de la base de datos (Monitoreo).
- `GET /api/recurso` : Listar recursos de la base de datos.
- `POST /api/recurso` : Crear un nuevo recurso.
