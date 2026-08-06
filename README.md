# Guía Completa de Configuración y Despliegue del Proyecto

A continuación se presenta un archivo **`README.md`** redactado y estructurado con base en las guías y requerimientos de la actividad. Puedes copiar y pegar este contenido directamente dentro del archivo `README.md` de tu repositorio de GitHub.

---

```markdown
# 🚀 REST API con Node.js, Express, Prisma y PostgreSQL (DevOps & Docker)

Este proyecto corresponde a una **API REST** construida con Express y PostgreSQL, lista para ejecutarse de forma local mediante contenedores de **Docker** o desplegarse en la nube aplicando buenas prácticas de **DevOps** (monitoreo, CI/CD, gestión de variables de entorno y plan de respaldos)[cite: 1, 6, 9].

---

## 🛠️ Tecnologías Utilizadas

- **Entorno de ejecución:** Node.js (v20+ / v22-alpine)[cite: 1, 6]
- **Framework Web:** Express.js[cite: 1, 6]
- **ORM / Base de Datos:** Prisma ORM & PostgreSQL 16[cite: 1, 5, 6]
- **Contenedorización:** Docker & Docker Compose[cite: 1, 5, 6]
- **Integración Continua (CI/CD):** GitHub Actions[cite: 6]
- **Despliegue Cloud:** Render / Railway / Google Cloud Console[cite: 1, 6]

---

## 📁 Estructura del Proyecto

```text
├── .github/
│   └── workflows/
│       └── deploy.yml          # Pipeline de CI/CD para GitHub Actions
├── prisma/
│   └── schema.prisma           # Configuración del esquema y modelos de Prisma
├── index.js                    # Servidor Express con endpoints y monitoreo
├── Dockerfile                  # Instrucciones para la construcción de la imagen de la API
├── docker-compose.yml          # Definición del multicontenedor (API + PostgreSQL)
├── .dockerignore               # Archivos excluidos de la imagen de Docker
├── .env.example                # Plantilla de variables de entorno requeridas
├── .gitignore                  # Archivos ignorados por Git
├── package.json                # Dependencias y scripts del proyecto
├── PLAN_DE_BACKUPS.md          # Documentación del plan de respaldos y recuperación
└── README.md                   # Documentación general del proyecto

```

---

## 🚦 Endpoints de la API

| Método | Ruta | Descripción |
| --- | --- | --- |
| `GET` | `/` | Endpoint de bienvenida y verificación básica |
| `GET` | `/health` | **Monitoreo:** Verifica la salud del servidor y la conexión a la base de datos |
| `GET` | `/api/recurso` | Consulta y lista los registros de la entidad `Recurso` |
| `POST` | `/api/recurso` | Crea un nuevo registro en la base de datos |

---

## ⚙️ Configuración y Variables de Entorno

El proyecto requiere variables de entorno para gestionar credenciales sensibles sin exponerlas en el código fuente.

Crea un archivo `.env` en la raíz guiándote con el archivo `.env.example`:

```env
PORT=3000
API_KEY=dev-api-key
JWT_SECRET=dev-jwt-secret
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/api_db"

```

> **Nota para Docker Compose:** Cuando se ejecuta dentro de Docker Compose, el nombre del host en `DATABASE_URL` no debe ser `localhost`, sino el nombre del servicio definido en `docker-compose.yml` (`db`):
> `DATABASE_URL="postgresql://postgres:postgres@db:5432/api_db"`
> 
> 

---

## 🐳 Ejecución Local con Docker Compose

### 1. Iniciar los contenedores

Desde la raíz del proyecto, ejecuta el siguiente comando para construir la imagen e iniciar los servicios:

```bash
docker compose up --build
```[cite: 1]

Este comando levanta tanto el servicio de la API (`api`) como la base de datos PostgreSQL (`db`)[cite: 1, 5].

### 2. Ejecutar las migraciones de Prisma
Con los contenedores activos, abre una nueva pestaña de terminal y aplica el esquema de la base de datos[cite: 1]:

```bash
docker compose exec api npx prisma migrate dev --name init
```[cite: 1]

### 3. Probar la API
Puedes realizar pruebas locales con `curl`[cite: 1]:

```bash
# Probar estado principal
curl http://localhost:3000

# Probar endpoint de monitoreo
curl http://localhost:3000/health

# Crear un recurso
curl -X POST http://localhost:3000/api/recurso \
     -H "Content-Type: application/json" \
     -d "{\"nombre\": \"Recurso de prueba\", \"descripcion\": \"Dockerizado\"}"

# Consultar recursos
curl http://localhost:3000/api/recurso
```[cite: 1]

---

## 🔄 Pipeline CI/CD (GitHub Actions)

El proyecto cuenta con un flujo de **Integración Continua (CI/CD)** automatizado ubicado en `.github/workflows/deploy.yml`[cite: 6]. 

Cada vez que se realiza un `push` o un `pull request` hacia la rama principal `main`, GitHub Actions ejecuta automáticamente las siguientes validaciones[cite: 6]:
1. Descarga el código fuente del repositorio[cite: 6].
2. Configura el entorno con Node.js 20[cite: 6].
3. Instala todas las dependencias (`npm install`)[cite: 6].
4. Genera el cliente de Prisma (`npx prisma generate`) para asegurar que no existan errores de sintaxis o configuración[cite: 6].

---

## 💾 Plan de Respaldo y Recuperación (Backups)

Toda la documentación referente a la política de respaldos automáticos, retención de datos, almacenamiento seguro y procedimientos de recuperación ante desastres (*Disaster Recovery*) se encuentra detallada en el archivo [`PLAN_DE_BACKUPS.md`](./PLAN_DE_BACKUPS.md)[cite: 6].
