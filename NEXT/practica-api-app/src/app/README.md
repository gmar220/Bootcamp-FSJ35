##Mejoras de Diseño y Optimización del botón guardar en favoritos

Se implementó un rediseño completo de la interfaz de usuario utilizando **Tailwind CSS** y optimizaciones nativas de **Next.js** para resolver problemas de calidad visual y mejorar la experiencia del usuario (UX):

* **Optimización de Imágenes con `next/image`:** Se reemplazó la etiqueta estándar `<img>` por el componente inteligente de Next.js. Esto eliminó por completo el pixelado en las fotos de los personajes mediante un escalado responsivo y el uso de `object-cover`.
* **Grid de Tarjetas Responsivo:** Se reestructuró la página de favoritos con una cuadrícula (`grid`) adaptativa. El sitio ahora distribuye automáticamente las tarjetas en 1 columna para móviles, 2 para tablets y hasta 4 columnas en pantallas de computadora.
* **Componentes de UI Dinámicos:** Se añadió un indicador visual de estado tipo "badge" (punto de color dinámico) que cambia según la vida del personaje (🟢 Vivo, 🔴 Muerto, ⚪ Desconocido), emulando la interfaz oficial de la API de Rick and Morty.
* **Microinteracciones y Efectos:** Se añadieron efectos de transición fluidos (`transition-all`) en las tarjetas, incluyendo un sutil desplazamiento hacia arriba y un ligero zoom en la imagen al pasar el cursor (*hover*).
* **Consistencia en Botones:** Se estilaron los botones de navegación y de acción ("Guardar en favoritos") con esquinas redondeadas modernas (`rounded-xl`), sombras dinámicas y efectos de pulsación táctil (`active:scale-95`).
