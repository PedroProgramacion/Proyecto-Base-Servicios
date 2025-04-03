/**
 * SCRIPT DE REGISTRO DE USUARIO
 * Maneja el registro de usuarios y redirección a productos
 * Versión compatible con el sistema de login
 */

document.addEventListener('DOMContentLoaded', function() {
    const formularioRegistro = document.getElementById('formulario-registro');
    const emailInput = document.getElementById('email');
    const contrasenaInput = document.getElementById('contrasena');
    
    formularioRegistro.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const email = emailInput.value.trim();
        const contrasena = contrasenaInput.value;
        
        // Validaciones básicas
        if (!email || !contrasena) {
            alert('Por favor, completa todos los campos.');
            return;
        }
        
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert('Por favor, introduce un email válido.');
            return;
        }
        
        try {
            // Almacenar usando las mismas claves que espera el login
            localStorage.setItem('usuario', email);  // Cambiado de 'userEmail' a 'usuario'
            localStorage.setItem('contrasena', contrasena);  // Cambiado de 'userPassword' a 'contrasena'
            
            alert('Registro exitoso. Redirigiendo a productos...');
            
            const rutaProductos = '../HTML/servicios.html';
            fetch(rutaProductos, { method: 'HEAD' })
                .then(() => {
                    window.location.href = rutaProductos;
                })
                .catch(() => {
                    alert('Error: La página de productos no está disponible');
                    console.error('Página no encontrada:', rutaProductos);
                });
            
        } catch (error) {
            console.error('Error en registro:', error);
            alert('Error al registrar. Intenta nuevamente.');
        }
    });
});