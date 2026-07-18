# Almi Mis XV

Invitación digital estática construida con React, Vite y TypeScript.

## Stack

- React
- Vite
- TypeScript
- Zustand
- Framer Motion

## Desarrollo local

```bash
npm install
npm run dev
```

Frontend: `http://localhost:8080`

Para generar una build de producción:

```bash
npm run build
```

## Variables de entorno

No se requiere backend local. El formulario RSVP envía mediante FormSubmit al correo configurado en `frontend/src/event.json`.

## Scripts

```bash
npm run lint
npm run build
```

## Arquitectura

La invitación se renderiza desde `frontend/src/event.json`. Las imágenes locales viven en `frontend/src/assets/events/almi/` y los assets usados por el carousel se importan desde `frontend/src/pages/EventPage/EventPage.tsx` para que Vite los incluya correctamente en el bundle.

El botón de Google Calendar genera la URL en el navegador, usando la fecha y horario configurados en `event.json`.
# invitation-file
