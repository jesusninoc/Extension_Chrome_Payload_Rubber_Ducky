# Payload Studio Lite

![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-orange?logo=googlechrome)
![Manifest V3](https://img.shields.io/badge/Manifest-V3-green)
![Security](https://img.shields.io/badge/Security-Educational-red)
![Layout](https://img.shields.io/badge/Keyboard-ES%20Map-blue)
![Status](https://img.shields.io/badge/Estado-Functional-brightgreen)

> Extensión de Chrome diseñada para la **validación y generación de payloads** tipo DuckyScript. Permite transformar texto plano en archivos binarios (`.bin`) compatibles con dispositivos de automatización de teclado, utilizando un mapeo de teclado específico para **español (ES)**.

---

## Vista general

**Payload Studio Lite** es una herramienta educativa y técnica que simplifica el proceso de creación de scripts de automatización. A diferencia de otros editores pesados, esta extensión vive en tu navegador, permitiéndote prototipar, validar sintaxis y exportar binarios en segundos con una interfaz minimalista inspirada en terminales clásicas.

Está enfocada en la **simplicidad y la precisión**, asegurando que los caracteres especiales (como la `ñ`, `/` o `\`) se mapeen correctamente según el estándar de teclado español.

---

## Qué hace

### Validación y Compilación
- Convierte comandos de texto humano en **códigos de operación (opcodes)**.
- Genera un archivo `inject.bin` listo para ser transferido a hardware compatible.
- Soporta comentarios mediante el comando `REM` para documentar tus scripts.

### Soporte de Comandos
- **STRING**: Procesa cadenas de texto completas.
- **DELAY**: Gestiona pausas precisas (automáticamente fragmentadas en bloques de 255ms).
- **GUI / WINDOWS**: Atajos de teclado del sistema (ej. `GUI r`).
- **ENTER**: Comando directo para ejecuciones.
- **Teclas Especiales**: Mapeo directo de caracteres individuales.

### Enfoque en el Layout Español
- El motor interno utiliza una constante `ES_MAP` optimizada.
- Resuelve problemas comunes de "teclas cambiadas" al usar layouts americanos en teclados españoles.
- Incluye soporte para caracteres complejos como `_`, `:`, `.`, `/` y `\`.

---

## Por qué es útil para educación y auditoría

Esta extensión es el ejemplo perfecto para enseñar:
- **Codificación de datos**: Cómo un carácter se convierte en un hexadecimal (HID code).
- **Interacción Hardware-Software**: Entender cómo los dispositivos HID interpretan pulsaciones.
- **Desarrollo de Extensiones**: Uso de `chrome.downloads` y manipulación de `Uint8Array` en JavaScript.
- **Seguridad Defensiva**: Validar qué hace un script antes de ejecutarlo en hardware real.

---

## Funcionalidades destacadas

### UI "Hacker Style"
Una interfaz oscura con tipografía monospaciada que reduce la fatiga visual y se alinea con la estética de las herramientas de ciberseguridad.

### Generación Instantánea
Al pulsar **COMPILAR A .BIN**, la extensión procesa el texto, crea un `Blob` de datos binarios y dispara una descarga automática. Sin servidores externos, todo el procesamiento es **local y privado**.

### Manejo de Delays Inteligente
Si programas un `DELAY 1000`, el validador lo desglosa automáticamente en múltiples instrucciones de espera para asegurar la compatibilidad con el buffer del dispositivo de destino.

---

## Instalación

### Modo Desarrollador (Recomendado)

1. Descarga los archivos del repositorio.
2. Abre Google Chrome y navega a `chrome://extensions/`.
3. Activa el **Modo desarrollador** (esquina superior derecha).
4. Haz clic en **Cargar descomprimida**.
5. Selecciona la carpeta que contiene el proyecto.

---

## Uso

1. Haz clic en el icono de la extensión (el rayo naranja).
2. Escribe tu script en el área de texto. Ejemplo:
   ```duckyscript
   REM Abrir ejecutar en Windows
   GUI r
   DELAY 500
   STRING notepad.exe
   ENTER
   DELAY 200
   STRING Hola desde Payload Studio Lite
   ```
3. Pulsa **COMPILAR A .BIN**.
4. Obtendrás un archivo llamado `inject.bin` listo para usar.

---

## Estructura del proyecto

```text
payload_validator_extension/
├── manifest.json    # Configuración y permisos (V3)
├── popup.html       # Interfaz visual (CSS incrustado)
└── validator.js     # Lógica de compilación y mapeo ES
```

---

## Especificaciones Técnicas

### Permisos utilizados
- `storage`: Para futuras implementaciones de guardado de borradores.
- `downloads`: Necesario para exportar el archivo binario al sistema de archivos del usuario.

### Mapeo HID
La extensión utiliza una tabla de consulta para convertir caracteres ASCII en pares de `[Keycode, Modifier]`.
- **Modifier 0x02**: Shift (para mayúsculas y símbolos superiores).
- **Modifier 0x40**: AltGr (para símbolos como el backslash `\`).

---

## Autor

- **Desarrollado por:** Jesusninoc
- **Web:** [https://www.jesusninoc.com](https://www.jesusninoc.com)
