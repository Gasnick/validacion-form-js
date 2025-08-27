// Configuración de Firebase con los datos de tu proyecto
/*
const firebaseConfig = {                                //Base de datos caducada
    apiKey: "AIzaSyCobEZpmTr_KZElC82RTv60l0wl7l_ONug", // Clave pública para autenticar peticiones
    authDomain: "valid-form-65885.firebaseapp.com",    // Dominio de autenticación del proyecto
    projectId: "valid-form-65885",                     // ID único de tu proyecto en Firebase
    storageBucket: "valid-form-65885.appspot.com",     // Ruta al bucket de almacenamiento
    messagingSenderId: "44251994531",                  // ID del remitente para servicios de mensajería
    appId: "1:44251994531:web:8923c476b9d01f188ca216", // ID de la app (proporcionado por Firebase)
    measurementId: "G-BCNW3DV7CW"                      // Usado para Google Analytics (opcional)
};
*/

const firebaseConfig = {
    apiKey: "AIzaSyD-G8AIZvD2mHz2h-lALZhz6u0Jt5qoxeo",
    authDomain: "validar-auth-prueba.firebaseapp.com",
    projectId: "validar-auth-prueba",
    storageBucket: "validar-auth-prueba.firebasestorage.app",
    messagingSenderId: "661006265595",
    appId: "1:661006265595:web:908a1f25eff6d6985cd45e"
}

// Inicializa Firebase con esa configuración
firebase.initializeApp(firebaseConfig);

// Crea una referencia a la base de datos Firestore, que es donde vamos a guardar los datos
const db = firebase.firestore();

// Escucha el evento de "submit" del formulario
document.getElementById('formulario').addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita que el formulario se envíe y recargue la página

    // Validación del campo nombre
    let entradaNombre = document.getElementById('name');           // Captura el input de nombre
    let errorNombre = document.getElementById('nameError');        // Captura el div donde mostrar errores

    // Si el campo está vacío (o solo con espacios)
    if (entradaNombre.value.trim() === '') {
        errorNombre.textContent = 'Por favor, ingrese su nombre'; // Muestra mensaje de error
        errorNombre.classList.add('error-message');               // Le agrega una clase para estilos CSS
    } else {
        errorNombre.textContent = '';                             // Limpia el mensaje si es válido
        errorNombre.classList.remove('error-message');            // Quita la clase de error
    }

    // Validación del campo email
    let emailEntrada = document.getElementById('email');          // Captura el input de email
    let emailError = document.getElementById('emailError');       // Captura el div donde mostrar errores
    let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Expresión regular para validar emails

    if (!emailPattern.test(emailEntrada.value)) {                 // Si el email NO coincide con el patrón
        emailError.textContent = 'Por favor, ingrese un correo válido';
        emailError.classList.add('error-message');
    } else {
        emailError.textContent = '';
        emailError.classList.remove('error-message');
    }

    // Validación del campo contraseña
    let contrasEntrada = document.getElementById('password');     // Captura el input de contraseña
    let contrasError = document.getElementById('passwordError');  // Captura el div donde mostrar errores

    // Expresión regular para validar: 8-15 caracteres, al menos una mayúscula, minúscula, número y símbolo
    // 8-15 caracteres, al menos una mayúscula, una minúscula, un número y un símbolo (cualquiera que no sea letra ni número)
    let contrasPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,15}$/;


    if (!contrasPattern.test(contrasEntrada.value)) {
        contrasError.textContent = 'La contraseña debe tener: min 8 caracteres, ser alfanumérico y caracteres especiales';
        contrasError.classList.add('error-message');
    } else {
        contrasError.textContent = '';
        contrasError.classList.remove('error-message');
    }

    // Si no hay ningún mensaje de error visible, significa que los campos están correctos
    if (!errorNombre.textContent && !emailError.textContent && !contrasError.textContent) {
        // Intenta guardar los datos en la colección "usuarios" de Firestore
        try {
            await db.collection("usuarios").add({
                nombre: entradaNombre.value,   // Guarda el nombre
                email: emailEntrada.value,     // Guarda el email
                password: contrasEntrada.value, // ⚠️ Esto es solo para práctica. ¡Nunca guardar contraseñas así en apps reales!
                fecha: new Date()              // Guarda la fecha/hora del envío
            });

            alert("Formulario enviado y guardado en Firestore"); // Muestra mensaje de éxito
            document.getElementById('formulario').reset();       // Limpia el formulario

        } catch (error) {
            // Si hubo un error al guardar en Firebase
            console.error("Error al guardar en Firestore: ", error);
            alert("Error al enviar el formulario.");
        }
    }
});

/* 🔧 Recomendaciones de Mejora al Código

1. Evitar guardar contraseñas en texto plano
Aunque ya lo mencionamos, vale la pena insistir:
En aplicaciones reales, jamás deberías guardar contraseñas directamente en Firestore. Firebase ya te ofrece Firebase Authentication, 
un sistema de autenticación seguro que maneja todo esto por vos (hash, almacenamiento, verificación de correos, login con Google, etc.).

🔐 ¿Cómo mejorar esto?

Reemplazar tu parte del formulario por un registro con Firebase Auth.

Usar firebase.auth().createUserWithEmailAndPassword(email, password).

Puedo ayudarte con eso cuando quieras 😉

2. Separar validaciones en funciones
Actualmente todas las validaciones están dentro del mismo submit. Podrías moverlas a funciones individuales para que el código sea más
 limpio y fácil de mantener.

Por ejemplo:

js
Copiar
Editar
function validarNombre(nombre) { ... }
function validarEmail(email) { ... }
function validarPassword(password) { ... }
Y luego usarlas dentro del submit.

3. Mostrar mensajes más amigables o personalizados
En vez de solo usar alert() o texto rojo, podés hacer que el feedback sea más visual:

Mostrar iconitos ✅❌

Agregar clases que cambien el borde del input

O mostrar un mensaje de "Formulario enviado correctamente" dentro de la misma página.

4. Guardar más datos útiles
Podés registrar cosas como:

Desde qué dispositivo se conectó (con navigator.userAgent)

Desde qué país/IP (usando servicios externos)

O agregar otros campos como edad, preferencias, etc.

5. Controlar mejor los errores
Ahora solo hacés console.error(). Podés guardar los errores también en Firestore (por ejemplo, en una colección llamada errores)
 para analizarlos después.

*/