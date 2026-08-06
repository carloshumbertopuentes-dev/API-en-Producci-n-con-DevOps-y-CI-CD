const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// 1. Endpoint principal de bienvenida
app.get('/', (req, res) => {
  res.json({
    mensaje: "¡API REST funcionando en producción con éxito!",
    estado: "OK",
    version: "1.0.0"
  });
});

// 2. Endpoint de Monitoreo (Salud del servicio y Base de Datos)
app.get('/health', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({
      status: 'UP',
      database: 'CONNECTED',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      status: 'DOWN',
      database: 'DISCONNECTED',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// 3. Operaciones de lectura y creación de datos
app.get('/api/recurso', async (req, res) => {
  try {
    const recursos = await prisma.recurso.findMany();
    res.json({
      exito: true,
      data: recursos
    });
  } catch (error) {
    res.status(500).json({
      exito: false,
      error: "Error al consultar la base de datos",
      detalle: error.message
    });
  }
});

app.post('/api/recurso', async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;
    const nuevoRecurso = await prisma.recurso.create({
      data: { nombre, descripcion }
    });
    res.status(201).json({
      exito: true,
      data: nuevoRecurso
    });
  } catch (error) {
    res.status(500).json({
      exito: false,
      error: "Error al crear el recurso",
      detalle: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
