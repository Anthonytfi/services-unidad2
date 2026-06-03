# 🚀 GUÍA - EJECUTAR SERVICIOS INDEPENDIENTEMENTE

Esta es la forma de ejecutar cada servicio en una terminal separada para desarrollo y pruebas.

---

## 📋 REQUISITOS PREVIOS

✅ PostgreSQL debe estar corriendo localmente en `localhost:5432`
- Usuario: `postgres`
- Contraseña: `espe`

Si tienes PostgreSQL instalado localmente, inicia el servicio:

**Windows:**
```bash
# PostgreSQL normalmente arranca automáticamente
# Si no, abre Services (services.msc) y busca "PostgreSQL" y presiona Start
```

**Linux/Mac:**
```bash
sudo systemctl start postgresql
# o
brew services start postgresql
```

---

## 📊 ESTRUCTURA DE TERMINALES

Abre **4 terminales PowerShell**:

| Terminal | Descripción |
|----------|------------|
| **Terminal 1** | Servicio Pacientes (Puerto 3001) |
| **Terminal 2** | Servicio Médicos (Puerto 3002) |
| **Terminal 3** | Servicio Citas (Puerto 3003) |
| **Terminal 4** | Pruebas (curl o PowerShell) |

---

## 🔴 TERMINAL 1: SERVICIO PACIENTES

```powershell
cd D:\USUARIO\Anthony\Desktop\services-unidad2\servicio-paciente
bun run index.ts
```

**Respuesta esperada:**
```
{"level":30,"msg":"Conexión a la Base de datos Exitosa"}
{"level":30,"msg":"Tablas creadas en la base de datos"}
{"level":30,"msg":"Server listening at http://127.0.0.1:3001"}
```

---

## 🟠 TERMINAL 2: SERVICIO MÉDICOS

```powershell
cd D:\USUARIO\Anthony\Desktop\services-unidad2\servicio-medico
bun run index.ts
```

**Respuesta esperada:**
```
{"level":30,"msg":"Conexión a la Base de datos Exitosa"}
{"level":30,"msg":"Tablas creadas en la base de datos"}
{"level":30,"msg":"Server listening at http://127.0.0.1:3002"}
```

---

## 🟡 TERMINAL 3: SERVICIO CITAS

```powershell
cd D:\USUARIO\Anthony\Desktop\services-unidad2\servicio-cita
bun run index.ts
```

**Respuesta esperada:**
```
{"level":30,"msg":"Conexión a la Base de datos Exitosa"}
{"level":30,"msg":"Tablas creadas en la base de datos"}
{"level":30,"msg":"Server listening at http://127.0.0.1:3003"}
```

---

## 🟢 TERMINAL 4: PRUEBAS

Una vez que los 3 servicios estén corriendo, usa esta terminal para hacer pruebas:

### 1️⃣ CREAR PACIENTES

```powershell
curl -X POST http://localhost:3001/api/pacientes `
  -H "Content-Type: application/json" `
  -d '{"nombre":"Juan Pérez","email":"juan@example.com"}'

curl -X POST http://localhost:3001/api/pacientes `
  -H "Content-Type: application/json" `
  -d '{"nombre":"María García","email":"maria@example.com"}'

curl -X POST http://localhost:3001/api/pacientes `
  -H "Content-Type: application/json" `
  -d '{"nombre":"Carlos López","email":"carlos@example.com"}'
```

**Respuesta esperada:**
```json
{
  "id": 1,
  "nombre": "Juan Pérez",
  "email": "juan@example.com"
}
```

---

### 2️⃣ LISTAR PACIENTES

```powershell
curl http://localhost:3001/api/pacientes
```

---

### 3️⃣ CREAR MÉDICOS

```powershell
curl -X POST http://localhost:3002/api/medicos `
  -H "Content-Type: application/json" `
  -d '{"nombre":"Dr. Carlos","email":"carlos@clinic.com","especialidad":"Cardiología"}'

curl -X POST http://localhost:3002/api/medicos `
  -H "Content-Type: application/json" `
  -d '{"nombre":"Dra. María","email":"maria@clinic.com","especialidad":"Pediatría"}'

curl -X POST http://localhost:3002/api/medicos `
  -H "Content-Type: application/json" `
  -d '{"nombre":"Dr. Luis","email":"luis@clinic.com","especialidad":"Cirugía"}'
```

---

### 4️⃣ LISTAR MÉDICOS

```powershell
curl http://localhost:3002/api/medicos
```

---

### 5️⃣ CREAR CITA (Con validación inter-servicios) ⭐

```powershell
curl -X POST http://localhost:3003/api/citas `
  -H "Content-Type: application/json" `
  -d '{"pacienteId":1,"medicoId":1,"fecha":"2026-06-10","descripcion":"Control cardíaco"}'
```

**Respuesta esperada:**
```json
{
  "id": 1,
  "pacienteId": 1,
  "medicoId": 1,
  "fecha": "2026-06-10",
  "descripcion": "Control cardíaco"
}
```

✅ **NOTA:** El servicio de citas valida automáticamente:
- Hace HTTP GET a `http://localhost:3001/api/pacientes/1`
- Hace HTTP GET a `http://localhost:3002/api/medicos/1`
- Si ambos existen, crea la cita

---

### 6️⃣ ❌ PRUEBA DE ERROR: PACIENTE INEXISTENTE

```powershell
curl -X POST http://localhost:3003/api/citas `
  -H "Content-Type: application/json" `
  -d '{"pacienteId":999,"medicoId":1,"fecha":"2026-06-10","descripcion":"Prueba error"}'
```

**Respuesta esperada:**
```json
{
  "error": "No se ha podido guardar cita"
}
```

En **Terminal 3** verás el error:
```
Error: Paciente no existe
```

---

### 7️⃣ ❌ PRUEBA DE ERROR: MÉDICO INEXISTENTE

```powershell
curl -X POST http://localhost:3003/api/citas `
  -H "Content-Type: application/json" `
  -d '{"pacienteId":1,"medicoId":999,"fecha":"2026-06-10","descripcion":"Prueba error"}'
```

**Respuesta esperada:**
```json
{
  "error": "No se ha podido guardar cita"
}
```

---

## 🎯 VENTAJAS DE EJECUTAR POR SEPARADO

✅ **Debugging más fácil** - Ves los logs de cada servicio en tiempo real
✅ **Desarrollo rápido** - Puedes cambiar código sin detener otros servicios
✅ **Pruebas específicas** - Pruebas cada servicio de forma aislada
✅ **Control total** - Detiene solo el servicio que necesites modificar

---

## ⚠️ TROUBLESHOOTING

### Error: "ECONNREFUSED" en Citas

Significa que los servicios Pacientes o Médicos no están corriendo.
**Solución:** Asegúrate de que Terminal 1 y Terminal 2 estén activos.

---

### Error: "No se pudo conectar a PostgreSQL"

**Solución:** 
1. Verifica que PostgreSQL esté corriendo: `psql -U postgres -c "SELECT 1"`
2. Las credenciales coincidan con el `.env`:
   - Usuario: `postgres`
   - Contraseña: `espe`
   - Host: `localhost`

---

### Error: "Puerto ya en uso"

Si ves "EADDRINUSE" significa que el puerto ya está ocupado.

**Solución:**
```powershell
# Encuentra el proceso usando el puerto
netstat -ano | findstr :3001

# Mata el proceso (reemplaza PID)
taskkill /PID <PID> /F
```

---

## 📝 RESUMEN RÁPIDO

```powershell
# Terminal 1 - Pacientes
cd D:\USUARIO\Anthony\Desktop\services-unidad2\servicio-paciente
bun run index.ts

# Terminal 2 - Médicos
cd D:\USUARIO\Anthony\Desktop\services-unidad2\servicio-medico
bun run index.ts

# Terminal 3 - Citas
cd D:\USUARIO\Anthony\Desktop\services-unidad2\servicio-cita
bun run index.ts

# Terminal 4 - Pruebas
curl http://localhost:3001/api/pacientes
curl http://localhost:3002/api/medicos
curl http://localhost:3003/api/citas
```
