/* =========================================================
   Next Code Barbería · protección del panel de administración
   Se carga en el <head> de cada página del dashboard: si no hay
   sesión de administrador vigente (la crea el login del sitio),
   vuelve a la página principal. Los enlaces con la clase
   .nc-logout cierran la sesión.

   Validación solo del lado del cliente: sirve para la demo, pero
   en producción hay que proteger las vistas en el servidor.
   ========================================================= */
(function () {
    'use strict';

    var SESSION_KEY = 'nc_admin_session';
    var HOME_URL = '../index.html';

    function sesionActiva() {
        try {
            return parseInt(localStorage.getItem(SESSION_KEY), 10) > Date.now();
        } catch (e) {
            return false;
        }
    }

    if (!sesionActiva()) {
        document.documentElement.style.visibility = 'hidden';
        window.location.replace(HOME_URL);
        return;
    }

    document.addEventListener('click', function (e) {
        var salir = e.target.closest && e.target.closest('.nc-logout');
        if (salir) {
            try { localStorage.removeItem(SESSION_KEY); } catch (err) { /* sin storage */ }
        }
    });
})();
