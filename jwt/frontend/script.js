const formulario = document.getElementById('formulario');
const formTitle = document.getElementById('formTitle');
const submitBtn = document.getElementById('submitBtn');
const toggleLink = document.getElementById('toggleLink');

let isLogin = false;

//Para el "ojito" de mostrar/ocultar contraseña
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');

togglePassword.addEventListener('click', () => {
    // Si el tipo es password, mostrarlo cambiando a text
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);

    // Cambiar icono opcionalmente
    togglePassword.textContent = type === 'password' ? '👁️' : '🙈';
});


// Alternar entre Registro / Login
toggleLink.addEventListener('click', () => {
    isLogin = !isLogin;
    formTitle.textContent = isLogin ? 'Login de Usuario' : 'Registro de Usuario';
    submitBtn.textContent = isLogin ? 'Ingresar' : 'Registrar';

    const nameField = document.getElementById('name');
    const nameContainer = nameField.parentElement;

    if (isLogin) {
        // Modo login: ocultamos el campo de nombre y quitamos required
        nameContainer.style.display = 'none';
        nameField.removeAttribute('required');
        // Cambiar el enlace para ir a registro
        toggleLink.textContent = '¿No tienes cuenta? Regístrate';
    } else {
        // Modo registro: mostramos el campo de nombre y lo hacemos obligatorio
        nameContainer.style.display = 'block';
        nameField.setAttribute('required', true);
        // Cambiar el enlace para ir a login
        toggleLink.textContent = '¿Ya tienes cuenta? Inicia sesión';
    }
});


// Validaciones
function validarCampos() {
    let valid = true;

    const entradaNombre = document.getElementById('name');
    const errorNombre = document.getElementById('nameError');
    if (!isLogin && entradaNombre.value.trim() === '') {
        errorNombre.textContent = 'Por favor, ingrese su nombre';
        valid = false;
    } else {
        errorNombre.textContent = '';
    }

    const emailEntrada = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(emailEntrada.value)) {
        emailError.textContent = 'Por favor, ingrese un correo válido';
        valid = false;
    } else {
        emailError.textContent = '';
    }

    const contrasEntrada = document.getElementById('password');
    const contrasError = document.getElementById('passwordError');
    const contrasPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,15}$/;
    if (!contrasPattern.test(contrasEntrada.value)) {
        contrasError.textContent = 'La contraseña debe tener: 8-15 caracteres, mayúscula, minúscula, número y símbolo';
        valid = false;
    } else {
        contrasError.textContent = '';
    }

    return valid;
}

// Envío de formulario
formulario.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validarCampos()) return;

    const data = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };

    const url = isLogin ? 'http://localhost:3000/login' : 'http://localhost:3000/register';

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
            
            if (isLogin) {
                localStorage.setItem('token', result.token);
                alert('Login exitoso');
                // Redirigir a landing
                window.location.href = 'landing.html';
            } else {
                alert('Registro exitoso, ahora ingresa tus credenciales');
                // Cambiar formulario a login automáticamente
                isLogin = true;
                formTitle.textContent = 'Login de Usuario';
                submitBtn.textContent = 'Ingresar';
                document.getElementById('name').parentElement.style.display = 'none';
            }
        } else {
            alert(result.message);
        }
    } catch (err) {
        alert('Error en la conexión con el servidor');
        console.error(err);
    }
});