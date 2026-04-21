# 🏋️‍♂️ Proyecto Gimnasio - FrontEnd

Aplicación web para la gestión de un gimnasio. Este proyecto incluye un sistema de autenticación, rutas protegidas para administradores y una interfaz dinámica para mejorar la experiencia de los usuarios.

## 🛠️ Tecnologías Utilizadas

Este proyecto está construido con las siguientes herramientas principales:
* **Core:** React 19 (entorno configurado con Vite)
* **Enrutamiento:** React Router 7
* **Estilos y Componentes:** Bootstrap 5 y React Bootstrap
* **Iconografía:** React Icons y Bootstrap Icons
* **Peticiones HTTP:** Axios
* **Alertas y Notificaciones:** SweetAlert2
* **Manejo de Emails:** EmailJS

## 🚀 Instalación y Configuración Local

Si querés levantar este proyecto en tu computadora, seguí estos pasos:

1. **Clonar el repositorio:**
   ```bash
   git clone [https://github.com/PCruzado/ProyectoGimnasio-FrontEnd.git](https://github.com/PCruzado/ProyectoGimnasio-FrontEnd.git)

2. **Ingresar a la carpeta del proyecto:**
       ```bash
   cd ProyectoGimnasio-FrontEnd
       ```
2. ## Ingresar a la carpeta del proyecto:
```bash
cd ProyectoGimnasio-FrontEnd
```
3. ## Instalar las dependencias:
```bash
npm install
```
4. ## Variables de Entorno: 
Crea un archivo llamado .env en la raíz del proyecto basándote en la siguiente estructura. Deberás completar los valores con los datos correspondientes:

### URL base para conectar con el backend
```bash
VITE_API_URL=http://localhost:4000/api
```
### Credenciales de EmailJS (si aplica)
```bash
# VITE_EMAILJS_SERVICE_ID=tu_service_id
# VITE_EMAILJS_TEMPLATE_ID=tu_template_id
# VITE_EMAILJS_PUBLIC_KEY=tu_public_key
```
(Nota: si usan Cloudinary u otras APIs en el front, agregá el nombre de esas variables a la lista de arriba, siempre dejándolas vacías o con un ejemplo genérico).

5. ## Levantar el servidor de desarrollo:

```bash
npm run dev
```

👥 Equipo de Desarrollo
- Marcos Lautaro Molina
- Facundo Javier Vera
- Pablo Cruzado
- Nicolas Bulacio
