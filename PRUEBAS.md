# 🧪 GUÍA COMPLETA DE PRUEBAS - MICROSERVICIOS

## ✅ PASO 1: VERIFICAR QUE DOCKER COMPOSE ESTÉ CORRIENDO

```bash
# En la carpeta del proyecto
docker compose up --build
```

Espera a ver esto:
```
servicio_paciente       | {"msg":"Server listening at http://172.19.0.4:3001"}
servicio_medico         | {"msg":"Server listening at http://172.19.0.3:3002"}
servicio_cita           | {"msg":"Server listening at http://172.19.0.5:3003"}
```

---

## 📋 PRUEBAS SERVICIO PACIENTES (Puerto 3001)

### 1️⃣ CREAR PACIENTES

```bash
# Paciente 1
curl -X POST http://localhost:3001/api/pacientes \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Juan Pérez","email":"juan@example.com"}'

# Paciente 2
curl -X POST http://localhost:3001/api/pacientes \
  -H "Content-Type: application/json" \
  -d '{"nombre":"María García","email":"maria@example.com"}'

# Paciente 3
curl -X POST http://localhost:3001/api/pacientes \
  -H "Content-Type: application/json" \
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

### 2️⃣ LISTAR TODOS LOS PACIENTES

```bash
curl http://localhost:3001/api/pacientes
```

**Respuesta esperada:**
```json
[
  {
    "id": 1,
    "nombre": "Juan Pérez",
    "email": "juan@example.com"
  },
  {
    "id": 2,
    "nombre": "María García",
    "email": "maria@example.com"
  },
  {
    "id": 3,
    "nombre": "Carlos López",
    "email": "carlos@example.com"
  }
]
```

---

### 3️⃣ OBTENER PACIENTE POR ID

```bash
# Obtener paciente con ID 1
curl http://localhost:3001/api/pacientes/1
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

### 4️⃣ ACTUALIZAR PACIENTE

```bash
curl -X PUT http://localhost:3001/api/pacientes/1 \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Juan Carlos Pérez","email":"juancarlos@example.com"}'
```

**Respuesta esperada:** Status 201

---

### 5️⃣ ❌ ERROR: OBTENER PACIENTE INEXISTENTE

```bash
curl http://localhost:3001/api/pacientes/999
```

**Respuesta esperada:**
```json
{
  "error": "No se encontró el paciente con ese ID"
}
```

---

### 6️⃣ ELIMINAR PACIENTE

```bash
curl -X DELETE http://localhost:3001/api/pacientes/3
```

**Respuesta esperada:**
```json
{
  "mensaje": "Eliminado correctamente"
}
```

---

## 📋 PRUEBAS SERVICIO MÉDICOS (Puerto 3002)

### 1️⃣ CREAR MÉDICOS

```bash
# Médico 1
curl -X POST http://localhost:3002/api/medicos \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Dr. Carlos","email":"carlos@clinic.com","especialidad":"Cardiología"}'

# Médico 2
curl -X POST http://localhost:3002/api/medicos \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Dra. María","email":"maria@clinic.com","especialidad":"Pediatría"}'

# Médico 3
curl -X POST http://localhost:3002/api/medicos \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Dr. Luis","email":"luis@clinic.com","especialidad":"Cirugía"}'
```

---

### 2️⃣ LISTAR TODOS LOS MÉDICOS

```bash
curl http://localhost:3002/api/medicos
```

---

### 3️⃣ OBTENER MÉDICO POR ID

```bash
curl http://localhost:3002/api/medicos/1
```

---

### 4️⃣ ACTUALIZAR MÉDICO

```bash
curl -X PUT http://localhost:3002/api/medicos/1 \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Dr. Carlos López","especialidad":"Cardiología y Angiología"}'
```

---

### 5️⃣ ❌ ERROR: MÉDICO INEXISTENTE

```bash
curl http://localhost:3002/api/medicos/999
```

---

### 6️⃣ ELIMINAR MÉDICO

```bash
curl -X DELETE http://localhost:3002/api/medicos/3
```

---

## 📋 PRUEBAS SERVICIO CITAS (Puerto 3003)

### ✅ 1️⃣ CREAR CITA EXITOSA (con validación inter-servicios)

```bash
# Cita entre paciente 1 y médico 1
curl -X POST http://localhost:3003/api/citas \
  -H "Content-Type: application/json" \
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

✅ **NOTA:** Esta cita validará automáticamente que:
- El paciente con ID 1 existe en http://localhost:3001/api/pacientes/1
- El médico con ID 1 existe en http://localhost:3002/api/medicos/1

---

### ✅ 2️⃣ CREAR OTRA CITA EXITOSA

```bash
curl -X POST http://localhost:3003/api/citas \
  -H "Content-Type: application/json" \
  -d '{"pacienteId":2,"medicoId":2,"fecha":"2026-06-11","descripcion":"Revisión pediátrica"}'
```

---

### 3️⃣ LISTAR TODAS LAS CITAS

```bash
curl http://localhost:3003/api/citas
```

---

### 4️⃣ OBTENER CITA POR ID

```bash
curl http://localhost:3003/api/citas/1
```

---

### 5️⃣ ACTUALIZAR CITA

```bash
curl -X PUT http://localhost:3003/api/citas/1 \
  -H "Content-Type: application/json" \
  -d '{"fecha":"2026-06-15","descripcion":"Control cardíaco - segunda revisión"}'
```

---

## 🚨 ESCENARIOS DE ERROR PARA CITAS

### ❌ ERROR 1: PACIENTE INEXISTENTE

```bash
curl -X POST http://localhost:3003/api/citas \
  -H "Content-Type: application/json" \
  -d '{"pacienteId":999,"medicoId":1,"fecha":"2026-06-10","descripcion":"Prueba error"}'
```

**Respuesta esperada:**
```json
{
  "error": "Paciente no Existe"
}
```

---

### ❌ ERROR 2: MÉDICO INEXISTENTE

```bash
curl -X POST http://localhost:3003/api/citas \
  -H "Content-Type: application/json" \
  -d '{"pacienteId":1,"medicoId":999,"fecha":"2026-06-10","descripcion":"Prueba error"}'
```

**Respuesta esperada:**
```json
{
  "error": "Medico no Existe"
}
```

---

### ❌ ERROR 3: AMBOS INEXISTENTES

```bash
curl -X POST http://localhost:3003/api/citas \
  -H "Content-Type: application/json" \
  -d '{"pacienteId":999,"medicoId":999,"fecha":"2026-06-10","descripcion":"Prueba error"}'
```

---

### ❌ ERROR 4: ELIMINAR CITA INEXISTENTE

```bash
curl -X DELETE http://localhost:3003/api/citas/999
```

---

## 🎯 ORDEN RECOMENDADO DE PRUEBAS

1. **Crear 3 pacientes** (1, 2, 3)
2. **Crear 3 médicos** (1, 2, 3)
3. **Crear 2 citas exitosas** (validación OK)
4. **Intentar crear citas con paciente inexistente** (error esperado)
5. **Intentar crear citas con médico inexistente** (error esperado)
6. **Listar todos los registros**
7. **Actualizar algunos registros**
8. **Eliminar registros**

---

## 📊 RESUMEN DE ENDPOINTS

| Servicio | Método | Endpoint | Descripción |
|----------|--------|----------|-------------|
| Pacientes | GET | `/api/pacientes` | Listar todos |
| Pacientes | POST | `/api/pacientes` | Crear |
| Pacientes | GET | `/api/pacientes/{id}` | Obtener por ID |
| Pacientes | PUT | `/api/pacientes/{id}` | Actualizar |
| Pacientes | DELETE | `/api/pacientes/{id}` | Eliminar |
| Médicos | GET | `/api/medicos` | Listar todos |
| Médicos | POST | `/api/medicos` | Crear |
| Médicos | GET | `/api/medicos/{id}` | Obtener por ID |
| Médicos | PUT | `/api/medicos/{id}` | Actualizar |
| Médicos | DELETE | `/api/medicos/{id}` | Eliminar |
| Citas | GET | `/api/citas` | Listar todos |
| Citas | POST | `/api/citas` | Crear (con validación) |
| Citas | GET | `/api/citas/{id}` | Obtener por ID |
| Citas | PUT | `/api/citas/{id}` | Actualizar |
| Citas | DELETE | `/api/citas/{id}` | Eliminar |

---

## 💡 TIPS

- En Windows PowerShell, reemplaza el `\` con `` ` `` para multilinea
- En PowerShell, envuelve las comillas internas en `""`
- Usa Postman para una interfaz más amigable
- Los IDs se asignan automáticamente (empiezan en 1)
