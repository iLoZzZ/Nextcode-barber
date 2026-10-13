# Next Code Barbería — Panel administrativo

El dashboard vive dentro del sitio, en la carpeta `admin/`, y **solo se abre desde el login de la página principal**.

## Cómo entrar
1. Abre `index.html` (con Live Server o cualquier servidor local).
2. Pulsa **Login** en la barra de navegación e ingresa las credenciales de administrador.
3. Si son correctas, se abre `admin/index.html`. La sesión dura 8 horas o hasta pulsar **Cerrar sesión**.

Si alguien abre una página de `admin/` sin sesión, vuelve automáticamente a `index.html`.

## Archivos de la integración
- `../auth.js`: lógica del login del sitio (credenciales y redirección al panel).
- `js/nc-guard.js`: protección de cada página del dashboard + cierre de sesión.
- `css/nextcode-barberia.css`: tema (plum `#321f2a` + ámbar `#ffd9a8`, los tonos de la nav bar del sitio).

## Navegación
- `index.html`: panel principal.
- `citas.html`, `servicios.html`, `barberos.html`, `clientes.html`, `horario.html`.

## Nota importante
La validación del login es solo del lado del cliente (sirve para la demo): las credenciales quedan visibles en `auth.js`.
Para producción, valida el acceso en el servidor (Django) y protege las vistas allí.
Las páginas del panel tienen datos de ejemplo que no persisten tras recargar y no están conectadas a Django/MongoDB.
