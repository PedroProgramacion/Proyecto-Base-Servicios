/**
 * Inicio de sesión - Script principal
 * Ahora compatible con los datos de registro
 */

document.addEventListener('DOMContentLoaded', function () {
    const formularioLogin = document.getElementById('formulario-login');
    const usuarioInput = document.getElementById('usuario');
    const contrasenaInput = document.getElementById('contrasena');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    formularioLogin.appendChild(errorDiv);

    // Obtener datos de registro (ahora coinciden con los nombres usados en registro)
    const usuarioRegistrado = localStorage.getItem('usuario');
    const contrasenaRegistrada = localStorage.getItem('contrasena');

    // Autocompletar usuario si existe
    if (usuarioRegistrado) {
        usuarioInput.value = usuarioRegistrado;
        contrasenaInput.focus();
    }

    formularioLogin.addEventListener('submit', function (event) {
        event.preventDefault();
        errorDiv.textContent = '';
        errorDiv.style.display = 'none';
        
        const usuario = usuarioInput.value.trim();
        const contrasena = contrasenaInput.value.trim();

        // Validaciones
        if (!usuario || !contrasena) {
            mostrarError('Por favor, complete todos los campos.');
            return;
        }

        if (!usuarioRegistrado || !contrasenaRegistrada) {
            mostrarError('No hay usuarios registrados. Por favor regístrese primero.');
            return;
        }

        // Verificación de credenciales (comparando con los datos de registro)
        if (usuario === usuarioRegistrado && contrasena === contrasenaRegistrada) {
            sessionStorage.setItem('loggedIn', 'true');
            mostrarError('Inicio de sesión exitoso. Redirigiendo...', 'success');
            
            setTimeout(() => {
                window.location.href = '../HTML/servicios.html';
            }, 1500);
        } else {
            mostrarError('Usuario o contraseña incorrectos. Por favor, inténtelo de nuevo.');
            contrasenaInput.value = '';
            contrasenaInput.focus();
        }
    });

    function mostrarError(mensaje, tipo = 'error') {
        errorDiv.textContent = mensaje;
        errorDiv.style.display = 'block';
        errorDiv.style.color = tipo === 'error' ? '#ff0000' : '#008000';
        errorDiv.style.padding = '10px';
        errorDiv.style.margin = '10px 0';
        errorDiv.style.borderRadius = '5px';
        errorDiv.style.backgroundColor = tipo === 'error' ? '#ffebee' : '#e8f5e9';
    }
});