const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Ruta principal de bienvenida
app.get('/', (req, res) => {
  res.json({
    mensaje: "¡API REST funcionando en Docker con éxito!",
    estado: "OK"
  });
});

// Ruta para obtener recursos de la base de datos
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

// Ruta para crear un recurso de prueba
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
