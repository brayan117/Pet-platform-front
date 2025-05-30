# Pet Platform Frontend

Aplicación web para la gestión de mascotas, desarrollada con React y Vite.

## 🚀 Cómo ejecutar el proyecto

### Requisitos previos
- Node.js (versión 16 o superior)
- npm o yarn

### Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/brayan117/Pet-platform-front.git
   cd Pet-platform-front
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Configura las variables de entorno:
   - Copia el archivo `.env.example` a `.env`
   - Configura las variables necesarias en el archivo `.env`

4. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

5. Abre tu navegador en [http://localhost:5173](http://localhost:5173)

## 📦 Scripts disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la versión de producción
- `npm run lint` - Ejecuta ESLint

## 🌐 Variables de entorno

Asegúrate de configurar las siguientes variables en tu archivo `.env`:

```
VITE_API_BASE_URL=url_de_tu_api
VITE_USER_API_KEY=tu_clave_api
VITE_CAT_API_KEY=tu_clave_api_gatos
VITE_DOG_API_KEY=tu_clave_api_perros
```

## 🛠️ Tecnologías utilizadas

- React 18
- Vite
- Tailwind CSS
- React Router
- Axios (para peticiones HTTP)

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.
