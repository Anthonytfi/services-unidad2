# Servicio de Citas

Microservicio para la gestión de citas médicas en el sistema.

## Instalación

```bash
bun install
```

## Configuración

Crear un archivo `.env` con las siguientes variables:

```
DB_NAME=<nombre_base_datos>
USERNAME=<usuario_postgres>
DB_PASSWORD=<contraseña>
DB_HOST=localhost
PORT=3003
```

## Desarrollo

```bash
bun run index.ts
```

## API Endpoints

- `GET /api/citas` - Obtener todas las citas
- `GET /api/cita/:id` - Obtener cita por ID
- `POST /api/cita` - Crear nueva cita
- `PUT /api/cita/:id` - Actualizar cita
- `DELETE /api/cita/:id` - Eliminar cita
