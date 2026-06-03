# Servicio de Médicos

Microservicio para la gestión de médicos en el sistema de citas médicas.

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
PORT=3002
```

## Desarrollo

```bash
bun run index.ts
```

## API Endpoints

- `GET /api/medicos` - Obtener todos los médicos
- `GET /api/medico/:id` - Obtener médico por ID
- `POST /api/medico` - Crear nuevo médico
- `PUT /api/medico/:id` - Actualizar médico
- `DELETE /api/medico/:id` - Eliminar médico
