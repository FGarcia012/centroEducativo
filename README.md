# API para la Gestión de un Centro Educativo

Esta API permite la administración del control de alumnos y cursos en un centro educativo. La aplicación está diseñada solo para backend y utiliza Node.js, Express y MongoDB.

## Tecnologías Utilizadas
- **Node.js**
- **Express**
- **MongoDB** con **Mongoose**
- **Bcrypt** (para el manejo de contraseñas)
- **JWT** (para autenticación de usuarios)

## Variables de Entorno
Cree un archivo `.env` en el directorio raíz y agregue las siguientes variables:

```
MONGO_URI=<tu_cadena_de_conexión_mongodb>
PORT=<puerto_del_servidor>
JWT_SECRET=<secreto_para_jwt>
```

## Roles de Usuario
La API maneja dos roles de usuario:
- **TEACHER_ROLE** (Maestro)
- **STUDENT_ROLE** (Alumno)

## Endpoints de la API

### Autenticación

- **Registro de Usuario**
  - **URL:** `/centroEducativo/v1/auth/register`
  - **Método:** `POST`
  - **Cuerpo:**
    ```json
    {
      "name": "string",
      "username": "string",
      "email": "string",
      "password": "string",
      "role": "string" // "STUDENT_ROLE" o "TEACHER_ROLE"
    }
    ```

- **Inicio de Sesión**
  - **URL:** `/centroEducativo/v1/auth/login`
  - **Método:** `POST`
  - **Cuerpo:**
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```

### Funciones del Alumno

- **Inscribirse en un Curso**
  - **URL:** `/centroEducativo/v1/course/enroll/:courseId`
  - **Método:** `POST`
  - **Cuerpo:**
    ```json
    {
      "studentId": "string"
    }
    ```
  - **Restricciones:** Un estudiante solo puede inscribirse en hasta 3 cursos y no puede inscribirse dos veces en el mismo curso.

- **Ver Cursos Inscritos**
  - **URL:** `/centroEducativo/v1/course/getStudentCourses/:studentId`
  - **Método:** `GET`

- **Editar Perfil**
  - **URL:** `/centroEducativo/v1/alumno/updateAlumno/:studentId`
  - **Método:** `PUT`
  - **Cuerpo:**
    ```json
    {
      "name": "string",
      "email": "string",
      "username": "string"
    }
    ```

- **Eliminar Perfil**
  - **URL:** `/centroEducativo/v1/alumno/deleteAlumno/:studentId`
  - **Método:** `DELETE`

### Funciones del Maestro

- **Crear Curso**
  - **URL:** `/centroEducativo/v1/course/createdCourse`
  - **Método:** `POST`
  - **Cuerpo:**
    ```json
    {
      "name": "string",
      "description": "string",
      "teacher": "string"
    }
    ```

- **Editar Curso**
  - **URL:** `/centroEducativo/v1/course/updateCourse/:courseId`
  - **Método:** `PUT`
  - **Cuerpo:**
    ```json
    {
      "name": "string",
      "description": "string"
    }
    ```

- **Eliminar Curso**
  - **URL:** `/centroEducativo/v1/course/deleteCourse/:courseId`
  - **Método:** `DELETE`
  - **Nota:** Al eliminar un curso, los estudiantes inscritos serán desasignados automáticamente.

- **Ver Cursos Asignados**
  - **URL:** `/centroEducativo/v1/course/getTeacherCourses`
  - **Método:** `GET`

## Instalación y Ejecución
1. Clonar el repositorio
   ```bash
   git clone <repositorio>
   cd centro-educativo-api
   ```
2. Instalar dependencias
   ```bash
   npm install
   ```
3. Configurar las variables de entorno en el archivo `.env`.
4. Ejecutar el servidor
   ```bash
   npm start
   ```

## Consideraciones Finales
- Asegurarse de que MongoDB esté en ejecución.
- Validaciones incluidas para evitar inscripciones duplicadas o eliminar datos incorrectos.
- Uso de JWT para la autenticación de usuarios.

---
Desarrollado por: Fredy Garcia