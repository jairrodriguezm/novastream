<!-- BEGIN:nextjs-agent-rules -->

# AGENTS.md - Reglas de Arquitectura y Rendimiento para NovaStream

## 1. Principios de Renderizado (Next.js App Router)
- **Server-First por defecto:** Todo componente es un React Server Component (RSC) a menos que requiera hooks de estado/ciclo de vida (`useState`, `useEffect`), APIs del navegador (`window`, `MediaSource`) o listeners de eventos (`onClick`).
- **Aislamiento de `'use client'`:** La directiva `'use client'` solo se permite en las "hojas" (leaf nodes) del árbol de componentes. NUNCA pongas `'use client'` en un Layout o en un contenedor de página completo.
- **Patrón de Composición:** Si un componente interactivo (ej. un contenedor con scroll horizontal o un modal) envuelve contenido estático o datos del servidor, pásale el Server Component como `children`.

## 2. Estándares de Core Web Vitals (Performance)
- **LCP (Largest Contentful Paint):** La imagen principal del Hero Banner SIEMPRE debe usar `next/image` con `priority` (o `fetchPriority="high"`) y un atributo `sizes` explícito. Prohibido cargar el motor de video (Shaka Player) en el hilo principal durante el render inicial.
- **CLS (Cumulative Layout Shift):** Todo contenedor multimedia o carrusel asíncrono debe tener un `aspect-ratio` fijo (`aspect-video` o `aspect-[2/3]`) y un `<Suspense>` con un Skeleton de dimensiones idénticas.
- **INP (Interaction to Next Paint):** Evitar bloqueos del Main Thread (>50ms). No ejecutar transformaciones de arreglos masivos dentro del cuerpo de un Client Component.

## 3. Estructura de Directorios (Feature-Sliced)
- `src/app/`: Exclusivamente enrutamiento, layouts, `loading.tsx`, `error.tsx` y composición de alto nivel.
- `src/features/<feature-name>/`: Lógica de dominio encapsulada (`components/`, `hooks/`, `services/`, `types.ts`).
- `src/shared/`: Componentes UI atómicos, utilidades y configuración transversal.

<!-- END:nextjs-agent-rules -->
