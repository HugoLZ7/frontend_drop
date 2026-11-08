# Frontend Boxful - Gestión de órdenes

Aplicación web desarrollada como parte de la prueba técnica de Boxful. Permite registrarse, iniciar sesión, crear órdenes de envío con varios paquetes y consultar el historial de órdenes.

Incluye el punto extra de la prueba: las órdenes pueden marcarse con cobro contra entrega (COD) y el historial muestra el estado de cada orden, su liquidación y el monto a liquidar acumulado del comercio.

Consume la API del repositorio [backend_drop](https://github.com/HugoLZ7/backend_drop), que debe estar en ejecución.

## Tecnologías

- Next.js 16 (App Router)
- React 19 y TypeScript
- Tailwind CSS 4
- shadcn/ui (Base UI) y Lucide

## Requisitos

- Node.js 20 o superior
- npm
- La API del backend en ejecución (por defecto en `http://localhost:3000`)

## Instalación

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/HugoLZ7/frontend_drop.git
   cd frontend_drop
   ```

2. Instalar las dependencias:

   ```bash
   npm install
   ```

3. Crear el archivo `.env.local` a partir del ejemplo:

   ```bash
   cp .env.example .env.local
   ```

4. Iniciar el servidor en modo desarrollo:

   ```bash
   npm run dev
   ```

   La aplicación queda disponible en `http://localhost:3001`.

## Variables de entorno

| Variable | Descripción | Ejemplo |
|---|---|---|
| `API_URL` | URL de la API del backend | `http://localhost:3000` |

La variable solo se usa en el servidor de Next.js, por lo que no se expone al navegador.

## Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Inicia el servidor de desarrollo en el puerto 3001 |
| `npm run build` | Genera la versión de producción |
| `npm run start` | Ejecuta la versión de producción |
| `npm run lint` | Revisa el código con ESLint |

## Vistas

| Ruta | Acceso | Descripción |
|---|---|---|
| `/login` | Pública | Inicio de sesión |
| `/register` | Pública | Registro de usuario con confirmación del número de teléfono |
| `/orders/new` | Privada | Creación de una orden en dos pasos: datos de entrega (con cobro contra entrega opcional) y paquetes |
| `/orders` | Privada | Historial de órdenes con tipo, estado y liquidación de cada orden, filtro por fechas, paginación y descarga en CSV |

En todas las vistas privadas, el encabezado muestra el **monto a liquidar** del comercio: la suma de las liquidaciones de sus órdenes, calculada por el backend. Puede ser negativo cuando hay envíos pendientes de pago.

## Estructura del proyecto

```
src/
├── actions/       Server Actions (autenticación y órdenes)
├── app/
│   ├── (auth)/        Vistas de inicio de sesión y registro
│   ├── (dashboard)/   Vistas privadas con menú lateral
│   └── logout/        Cierre de sesión cuando el token deja de ser válido
├── components/    Componentes de la aplicación y componentes de shadcn/ui
├── lib/           Sesión, cliente de la API, catálogos y tipos
└── proxy.ts       Protección de rutas
```

## Decisiones de diseño

- **Token en cookie `httpOnly`.** El token JWT se guarda en una cookie que no es accesible desde JavaScript, lo que lo protege frente a scripts maliciosos. El servidor de Next.js lo lee para llamar a la API.
- **Server Actions y Server Components.** El inicio de sesión, el registro y la creación de órdenes se envían mediante Server Actions, y las páginas consultan la API desde el servidor. Solo los formularios y los elementos interactivos son Client Components.
- **Protección de rutas con `proxy.ts`.** Las rutas privadas redirigen al inicio de sesión si no hay sesión, y las vistas de inicio de sesión y registro redirigen al panel si ya existe una.
- **Catálogos desde APIs externas.** Los códigos de área de Centroamérica se obtienen de [CountriesNow](https://countriesnow.space), y los departamentos y municipios de El Salvador de [este conjunto de datos](https://github.com/juanmedina100/departamentos-distritos-municipios-el-salvador). Las respuestas se guardan en caché durante un día.
- **Filtros en la URL.** Las fechas y la página del historial viajan como parámetros de la URL, por lo que una búsqueda se puede recargar o compartir.
- **Cálculos en el backend.** El frontend no calcula costos, comisiones ni liquidaciones: muestra los valores que devuelve la API, para que las reglas de negocio existan en un solo lugar.

## Mejoras pendientes

- Validar en el backend los departamentos, municipios y códigos de área contra los catálogos.
- Permitir seleccionar órdenes específicas para la descarga en CSV. Actualmente se descargan las órdenes de la página visible.
- Agregar una vista de detalle de cada orden.
