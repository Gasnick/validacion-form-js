# Formulario con Autenticación JWT (Frontend + Backend)

Este proyecto implementa un flujo de **registro e inicio de sesión con JWT** utilizando un **backend en Node.js + Express** y un **frontend simple en HTML, CSS y JavaScript Vanilla**.  

Actualmente, los usuarios se almacenan en memoria (no hay base de datos), lo que lo hace ideal como **demo de autenticación**.

---

## 🚀 Funcionalidades

- Registro de usuario con contraseña encriptada (bcrypt).
- Inicio de sesión con validación de credenciales.
- Generación y validación de **tokens JWT**.
- Ruta protegida `/profile` que requiere token.
- Almacenamiento del token en `localStorage` tras login.
- Validaciones en frontend (nombre, email, contraseña segura).
- Alternar entre **registro** y **login** en el mismo formulario.
- "Ojito" 👁️ para mostrar/ocultar la contraseña.
- Página de aterrizaje (`landing.html`) a la que se redirige tras login.

---

## 📂 Estructura del proyecto

