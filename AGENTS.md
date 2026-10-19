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

## 4. Estrategia de Caché y Revalidación (Next.js 15/16 `cacheComponents`)
- **Datos Globales de Catálogo (Hero, Tendencias, EPG general):** DEBEN usar la directiva `'use cache'` junto con `cacheLife` y `cacheTag` de `'next/cache'`. No deben mostrar Skeletons en la primera carga, sino formar parte del Shell pre-renderizado (PPR).
- **Datos Personalizados por Usuario (Continuar viendo, Mi Lista, Recomendaciones por sesión):** NO usan `'use cache'`. Acceden a `cookies()` o `headers()` y SIEMPRE deben estar aislados dentro de un `<Suspense fallback={<Skeleton />}>`.
- **Invalidación:** Prohibido recargar toda la ruta si solo cambió un carril. Usar siempre `revalidateTag('nombre-del-tag')` desde Server Actions o Webhooks del CMS.

## 5. Enrutamiento Avanzado, Mutaciones y Proxy/Middleware
- **Parallel Routes (`@slot`):** Todo slot paralelo DEBE incluir un archivo `default.tsx` que retorne `null` en su raíz y dentro de rutas dinámicas para prevenir errores 404 en recargas duras (Hard Navigations).
- **Mutaciones Interactivas (`useOptimistic`):** Cualquier acción de feedback inmediato (ej. Favoritos / Mi Lista / Likes) debe usar `useOptimistic` + `useTransition` acoplado a una Server Action para garantizar feedback visual en <16ms (optimización de INP).
- **Middleware / Proxy:** Mantener `matcher` estricto excluyendo `/_next/static`, `/_next/image` y `favicon.ico`. Prohibido importar librerías pesadas en el middleware.

## 6. Validación de Datos (Zod) y Manejo de Estado (TanStack Query / Zustand)
- **Contratos de API Estrictos:** Toda llamada a servicios externos DEBE validarse con Zod (`schema.safeParse`). Prohibido usar `as Type` en respuestas de red.
- **Sincronización Cliente-Servidor:** Para datos que requieran polling o revalidación en cliente (ej. EPG en vivo), pre-cargar en el Server Component usando `prefetchQuery`, serializar con `dehydrate` y consumir con `useQuery` dentro de un `HydrationBoundary`.
- **Estado del Reproductor (Zustand):** El estado del reproductor multimedia SIEMPRE debe residir en un store de Zustand fuera de React Context. En los componentes consumidores, SIEMPRE usar selectores específicos (ej. `const isMuted = usePlayerStore(s => s.isMuted)`). Prohibido desestructurar el store completo (`const { isMuted, currentTime } = usePlayerStore()`) en componentes UI para evitar re-renders innecesarios.

<!-- END:nextjs-agent-rules -->
