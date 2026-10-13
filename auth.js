/* =========================================================
   NextCodeBarber · acceso al panel de administración
   Si el login recibe las credenciales de administrador, se
   abre el dashboard (carpeta /admin). La sesión dura 8 horas
   o hasta que se cierre sesión desde el panel / el menú.

   OJO: es una validación del lado del cliente (cualquiera que
   abra el código puede verla). Sirve para la demo; para
   producción hay que validar en el servidor (Django, etc.).
   ========================================================= */
(function () {
    'use strict';

    var SESSION_KEY = 'nc_admin_session';
    var SESSION_MS = 8 * 60 * 60 * 1000;
    var ADMIN_USER = 'admin123';
    var ADMIN_PASS = '12345*';
    var PANEL_URL = 'admin/index.html';

    function adminActivo() {
        try {
            return parseInt(localStorage.getItem(SESSION_KEY), 10) > Date.now();
        } catch (e) {
            return false;
        }
    }

    function cerrarSesion() {
        try { localStorage.removeItem(SESSION_KEY); } catch (e) { /* sin acceso a storage */ }
    }

    document.addEventListener('DOMContentLoaded', function () {
        var form = document.getElementById('formLogin');
        var contenedorLogin = document.getElementById('loginDropdownWrap');
        if (!form || !contenedorLogin) { return; }

        var inputUsuario = document.getElementById('loginUser');
        var inputClave = document.getElementById('loginPassword');
        var aviso = document.getElementById('loginError');

        // Si ya hay sesión de administrador: accesos directos en lugar del login
        if (adminActivo()) {
            contenedorLogin.innerHTML =
                '<a class="btn btn-primary" href="' + PANEL_URL + '">Panel admin</a>' +
                '<button type="button" class="btn btn-outline-light ms-2" id="ncSalir">Salir</button>';
            document.getElementById('ncSalir').addEventListener('click', function () {
                cerrarSesion();
                window.location.reload();
            });
            return;
        }

        function mostrarError(texto) {
            aviso.textContent = texto;
            aviso.classList.remove('d-none');
        }

        [inputUsuario, inputClave].forEach(function (campo) {
            campo.addEventListener('input', function () { aviso.classList.add('d-none'); });
        });

        form.addEventListener('submit', function (e) {
            e.preventDefault();

            var usuario = inputUsuario.value.trim();
            var clave = inputClave.value;

            if (!usuario || !clave) {
                mostrarError('Escribe tu usuario y tu contraseña.');
                return;
            }

            if (usuario === ADMIN_USER && clave === ADMIN_PASS) {
                try {
                    localStorage.setItem(SESSION_KEY, String(Date.now() + SESSION_MS));
                } catch (err) {
                    mostrarError('El navegador está bloqueando el almacenamiento local. Habilítalo e inténtalo de nuevo.');
                    return;
                }
                window.location.href = PANEL_URL;
                return;
            }

            mostrarError('Usuario o contraseña incorrectos.');
            inputClave.value = '';
            inputClave.focus();
        });
    });
})();
