# SPEC — Portfolio Jesús Hernández

> **Documento de especificación técnica para implementación por agente IA.**
> Lee este documento entero antes de empezar. Ejecuta los pasos en orden.
> No improvises decisiones de arquitectura ni añadas dependencias no especificadas.

---

## 0. Contexto del proyecto

Portfolio personal para Jesús Hernández, Desarrollador de Aplicaciones Multiplataforma con base en Madrid. Buscando primera oportunidad profesional como desarrollador.

**Objetivo del sitio**: presentar perfil profesional, 6 proyectos reales y vías de contacto a reclutadores técnicos en España. El sitio debe transmitir madurez profesional sin mencionar nivel de seniority (junior/senior), funcionar como referencia compartible en LinkedIn, CV y comunicaciones, y ser fácilmente extensible para añadir más proyectos en el futuro.

**Tono visual**: serio, limpio, minimalista. No juvenil. Inspirado en portfolios de desarrolladores senior.

---

## 1. Stack y restricciones técnicas

### 1.1. Stack obligatorio
- **HTML5** semántico
- **CSS3** vanilla con variables CSS personalizadas
- **JavaScript vanilla** mínimo (sin frameworks)
- **Sin npm, sin build step, sin bundlers, sin dependencias**

### 1.2. Restricciones
- Ningún framework JS (no React, no Vue, no Svelte, no Astro).
- Ninguna librería CSS (no Tailwind, no Bootstrap).
- Sin librerías JS externas excepto:
  - Google Fonts (CDN) para tipografías
  - Lucide Icons o icons SVG inline (preferir inline)
- Compatibilidad: Chrome, Firefox, Safari, Edge (últimas 2 versiones).
- Mobile-first responsive: breakpoints 480px, 768px, 1024px, 1280px.
- Accesibilidad: contraste AA mínimo, navegación por teclado, etiquetas ARIA donde corresponda.
- Performance: peso total de página inferior a 500KB sin contar imágenes.

### 1.3. Hosting destino
- **Vercel** conectado al repo GitHub
- Dominio final: **`jesus-hernandez.es`**
- El sitio se sirve como archivos estáticos. No requiere configuración de servidor especial.

---

## 2. Estructura de archivos

Crear exactamente esta estructura:

```
portfolio/
├── index.html
├── 404.html
├── proyectos/
│   ├── puntogo.html
│   ├── fitness-ai-coach.html
│   ├── asha-kiran.html
│   ├── protocolo-estudio.html
│   ├── gamehub-backend.html
│   └── zenith-workspace.html
├── css/
│   ├── styles.css         (estilos globales, layout, componentes)
│   ├── theme.css          (variables CSS modo claro/oscuro)
│   └── project.css        (estilos específicos páginas de proyecto)
├── js/
│   ├── theme-toggle.js    (switch modo claro/oscuro con localStorage)
│   └── main.js            (smooth scroll, año dinámico footer, etc.)
├── assets/
│   ├── og/                (imágenes Open Graph, 1200x630)
│   │   ├── default.svg
│   │   ├── puntogo.svg
│   │   ├── fitness-ai-coach.svg
│   │   ├── asha-kiran.svg
│   │   ├── protocolo-estudio.svg
│   │   ├── gamehub-backend.svg
│   │   └── zenith-workspace.svg
│   ├── projects/          (hero images de cada proyecto, 1600x900)
│   │   ├── puntogo-hero.svg
│   │   ├── fitness-ai-coach-hero.svg
│   │   ├── asha-kiran-hero.svg
│   │   ├── protocolo-estudio-hero.svg
│   │   ├── gamehub-backend-hero.svg
│   │   └── zenith-workspace-hero.svg
│   ├── icons/             (SVGs de stack y redes sociales, inline preferido)
│   └── favicon.svg
├── cv/
│   └── Jesus_Hernandez_CV.pdf    (placeholder, el usuario lo sustituirá)
└── README.md
```

---

## 3. Sistema de diseño

### 3.1. Tipografía
Cargar desde Google Fonts en el `<head>` de cada HTML:

- **Inter** (400, 500, 600, 700) — texto general y headings
- **JetBrains Mono** (400, 500) — código, stack tags, marco README

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

### 3.2. Paleta de colores (en `theme.css`)

```css
:root {
  /* Modo claro (por defecto) */
  --bg-primary: #FAFAFA;
  --bg-secondary: #FFFFFF;
  --bg-elevated: #FFFFFF;
  --bg-code: #F6F8FA;

  --text-primary: #1A1A1A;
  --text-secondary: #4A4A4A;
  --text-muted: #6E6E6E;
  --text-link: #0969DA;

  --border-primary: #D0D7DE;
  --border-secondary: #E5E7EB;

  --accent: #0969DA;
  --accent-hover: #0860C9;

  --shadow-sm: 0 1px 2px rgba(0,0,0,0.04);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.06);
  --shadow-lg: 0 12px 32px rgba(0,0,0,0.08);
}

[data-theme="dark"] {
  --bg-primary: #0D1117;
  --bg-secondary: #161B22;
  --bg-elevated: #1C2128;
  --bg-code: #161B22;

  --text-primary: #E6EDF3;
  --text-secondary: #B1BAC4;
  --text-muted: #7D8590;
  --text-link: #2F81F7;

  --border-primary: #30363D;
  --border-secondary: #21262D;

  --accent: #2F81F7;
  --accent-hover: #4A95F8;

  --shadow-sm: 0 1px 2px rgba(0,0,0,0.3);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.4);
  --shadow-lg: 0 12px 32px rgba(0,0,0,0.5);
}
```

### 3.3. Tipografía escalas (en `styles.css`)

```css
/* Mobile first */
:root {
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 2rem;
  --font-size-4xl: 2.5rem;
  --font-size-5xl: 3rem;

  --line-height-tight: 1.2;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.7;

  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-20: 5rem;
  --space-24: 6rem;

  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;

  --container-max: 1100px;
}

@media (min-width: 768px) {
  :root {
    --font-size-4xl: 3rem;
    --font-size-5xl: 4rem;
  }
}
```

---

## 4. Index.html — Landing principal

### 4.1. Meta tags (head)

```html
<title>Jesús Hernández — Desarrollador de Aplicaciones Multiplataforma</title>
<meta name="description" content="Desarrollador de Aplicaciones Multiplataforma con experiencia en Java, Spring Boot, Next.js, Kotlin/Android e integración de LLMs. Madrid, España.">
<meta name="author" content="Jesús Hernández">

<!-- Open Graph -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://jesus-hernandez.es/">
<meta property="og:title" content="Jesús Hernández — Desarrollador de Aplicaciones Multiplataforma">
<meta property="og:description" content="Backend con Java/Spring · Frontend con Next.js · Móvil con Kotlin/Android · Integración de LLMs">
<meta property="og:image" content="https://jesus-hernandez.es/assets/og/default.svg">

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Jesús Hernández — Desarrollador de Aplicaciones Multiplataforma">
<meta name="twitter:description" content="Backend Java/Spring · Frontend Next.js · Móvil Kotlin · LLMs">
<meta name="twitter:image" content="https://jesus-hernandez.es/assets/og/default.svg">

<link rel="icon" type="image/svg+xml" href="/assets/favicon.svg">
<link rel="stylesheet" href="/css/theme.css">
<link rel="stylesheet" href="/css/styles.css">
```

### 4.2. Estructura de secciones

#### 4.2.1. NAV (sticky top)
- Logo izquierda: texto **"JH"** en JetBrains Mono, bold
- Centro/derecha: enlaces anchor a `#sobre-mi`, `#stack`, `#proyectos`, `#contacto`
- Extremo derecho: botón toggle modo claro/oscuro (ícono sol/luna SVG)
- En mobile: menú hamburguesa que despliega los enlaces verticalmente

#### 4.2.2. HERO
- Texto principal: **"Jesús Hernández"** (font-size-5xl, bold)
- Subtítulo: **"Desarrollador de Aplicaciones Multiplataforma"** (font-size-2xl, weight 500, color text-secondary)
- Frase descriptiva: *"Construyo productos reales de extremo a extremo. Backend con Java/Spring, frontend con Next.js, móvil con Kotlin/Android e integración de LLMs."*
- CTAs (botones):
  - Primario: **"Ver proyectos"** → ancla a `#proyectos`
  - Secundario: **"Descargar CV"** → link a `/cv/Jesus_Hernandez_CV.pdf` con atributo `download`
- Sin foto de perfil. Diseño tipográfico puro.

#### 4.2.3. SOBRE MÍ (id="sobre-mi")
Título: **"Sobre mí"**

Contenido (3 párrafos, en este orden):

> Desarrollador de Aplicaciones Multiplataforma. Construyo productos reales de extremo a extremo: backend con Java y Spring Boot, frontend con Next.js y TypeScript, y aplicaciones móviles nativas con Kotlin y Android.
>
> Diseño la arquitectura, tomo las decisiones técnicas y uso herramientas de IA como acelerador de implementación. Cada proyecto que despliego puedo defenderlo: por qué este stack, por qué esta estructura, qué haría diferente.
>
> Antes del desarrollo dediqué 10 años a la hostelería internacional liderando cocinas en entornos exigentes. De ahí traigo lo que no se aprende en clase: gestión de presión real, atención al detalle, trabajo en equipos diversos y entrega bajo deadlines imposibles.

#### 4.2.4. STACK (id="stack")
Título: **"Stack técnico"**

Layout: grid de categorías. Cada categoría es una tarjeta con:
- Título de categoría
- Lista de tecnologías como badges (texto en JetBrains Mono, padding, border-radius)

**Categorías y contenido**:

```
LENGUAJES
Java · Kotlin · TypeScript · JavaScript · SQL

BACKEND
Spring Boot · Spring Security · Spring Data JPA · Hibernate
REST APIs · Maven · Gradle · JUnit · Mockito

FRONTEND
Next.js · React · Angular · TypeScript
Tailwind CSS · HTML5 · CSS3 · Jest · Vitest

MÓVIL
Android nativo · Kotlin · Jetpack Compose · Retrofit

BASES DE DATOS
PostgreSQL · MySQL · Supabase · Firebase

DEVOPS
Docker · Docker Compose · GitHub Actions
Vercel · Netlify · AWS · Linux

HERRAMIENTAS
Git · GitHub · Postman · Swagger · Sentry · Cloudflare

IA APLICADA
Groq API (Llama, Mixtral) · Gemini API · Claude API · Prompt Engineering

ARQUITECTURA
Clean Architecture · Arquitectura por capas
Principios SOLID · Scrum · Kanban
```

#### 4.2.5. PROYECTOS (id="proyectos")
Título: **"Proyectos"**

Layout: grid responsive de 6 cards.
- Desktop (≥1024px): 3 columnas
- Tablet (768-1023px): 2 columnas
- Mobile (<768px): 1 columna

**Anatomía de cada card**:
- Image cover (OG image del proyecto, ratio 16:9, border-radius top, object-fit cover)
- Padding interior:
  - **Título** del proyecto (font-size-xl, bold)
  - **Tipo/Contexto** debajo del título (font-size-sm, color text-muted) — ej: "E-commerce en producción"
  - **Descripción** corta (2 líneas máx, font-size-sm)
  - **Stack tags** (3-4 badges principales en JetBrains Mono)
- Toda la card es clickable → lleva a `/proyectos/[slug].html`
- Hover: ligero `transform: translateY(-4px)`, sombra más pronunciada, transición 200ms

**Datos de cada card**:

```
1. puntoGO
   Tipo: E-commerce en producción
   Descripción: Producto propio con catálogo, checkout, panel administrativo y monitorización en producción.
   Tags: Next.js · TypeScript · Supabase · Vercel
   URL: /proyectos/puntogo.html

2. Fitness AI Coach
   Tipo: Proyecto intermodular DAM
   Descripción: Backend Spring Boot consumido por web Angular y app Android nativa, con integración de IA.
   Tags: Java · Spring Boot · Kotlin · Groq API
   URL: /proyectos/fitness-ai-coach.html

3. Asha Kiran
   Tipo: Plataforma educativa (FCT)
   Descripción: Herramienta de aprendizaje de español desarrollada durante prácticas profesionales.
   Tags: Next.js · TypeScript · Tailwind · Netlify
   URL: /proyectos/asha-kiran.html

4. Protocolo de Estudio
   Tipo: Plataforma con LLM integrado
   Descripción: Preparación de exámenes con tutoría conversacional por pregunta vía LLM.
   Tags: TypeScript · Next.js · Groq API · Prompt Engineering
   URL: /proyectos/protocolo-estudio.html

5. GameHub Backend
   Tipo: API REST con Spring Security
   Descripción: API REST con autenticación por roles y arquitectura por capas.
   Tags: Java · Spring Boot · Spring Security · PostgreSQL
   URL: /proyectos/gamehub-backend.html

6. Zenith Workspace
   Tipo: Frontend moderno
   Descripción: Aplicación frontend con Next.js y TypeScript explorando UI moderna.
   Tags: Next.js · TypeScript · Tailwind
   URL: /proyectos/zenith-workspace.html
```

#### 4.2.6. CONTACTO (id="contacto")
Título: **"Contacto"**

Contenido:
- Frase: *"¿Buscas un desarrollador para tu equipo? Hablemos."*
- 3 iconos grandes en fila (centrados, gap generoso entre ellos):
  - **LinkedIn** → `https://linkedin.com/in/jesushernandezp` (target="_blank")
  - **GitHub** → `https://github.com/JesusHernandezP` (target="_blank")
  - **Email** → `mailto:hola@jesus-hernandez.es`
- Cada icono: SVG inline, 32px, color text-secondary, hover color accent
- Etiqueta debajo de cada icono (font-size-sm)

#### 4.2.7. FOOTER
- Texto izquierda: **"© 2026 Jesús Hernández"** (año dinámico vía JS)
- Texto derecha: **"Construido con HTML, CSS y JavaScript"**
- Border-top sutil
- Padding generoso

---

## 5. Páginas de proyecto (`/proyectos/[slug].html`)

### 5.1. Estructura común a todas

```html
<!DOCTYPE html>
<html lang="es" data-theme="light">
<head>
  <!-- meta tags específicos del proyecto -->
  <link rel="stylesheet" href="/css/theme.css">
  <link rel="stylesheet" href="/css/styles.css">
  <link rel="stylesheet" href="/css/project.css">
</head>
<body>

  <!-- NAV idéntico al index pero con link logo a "/" -->
  <nav>...</nav>

  <!-- Botón volver -->
  <div class="back-link">
    <a href="/#proyectos">← Volver a proyectos</a>
  </div>

  <!-- Contenedor README -->
  <main class="readme-container">

    <!-- Header GitHub-style -->
    <header class="readme-header">
      <div class="readme-header-top">
        <span class="readme-filename">
          <svg><!-- icono de documento --></svg>
          README.md
        </span>
        <div class="readme-actions">
          <button disabled aria-hidden="true">Raw</button>
          <button disabled aria-hidden="true">Copy</button>
          <button disabled aria-hidden="true">Download</button>
        </div>
      </div>
      <div class="readme-tabs">
        <button class="tab active">Preview</button>
        <button class="tab" disabled>Code</button>
        <button class="tab" disabled>Blame</button>
      </div>
    </header>

    <!-- Contenido renderizado tipo markdown -->
    <article class="readme-content">
      <h1># [NOMBRE PROYECTO]</h1>
      <img src="/assets/projects/[slug]-hero.svg" alt="..." class="project-hero">
      <p class="project-tagline">[descripción 1-2 líneas]</p>

      <h2>## ✨ Características</h2>
      <ul>...</ul>

      <h2>## 🛠️ Stack técnico</h2>
      <div class="stack-tags">...</div>

      <h2>## 🚀 Links</h2>
      <div class="project-links">
        <a href="..." target="_blank" class="link-button primary">🌐 Demo en producción</a>
        <a href="..." target="_blank" class="link-button secondary">💻 Ver código</a>
      </div>

      <h2>## 🧠 Decisiones técnicas</h2>
      <p>...</p>

    </article>
  </main>

  <!-- Footer idéntico al index -->
  <footer>...</footer>

  <script src="/js/theme-toggle.js"></script>
  <script src="/js/main.js"></script>
</body>
</html>
```

### 5.2. Estilo del marco README

El marco debe imitar visualmente el preview de un README en GitHub:

- **`.readme-container`**: max-width 900px, margen auto, border-radius 12px, border 1px solid var(--border-primary), overflow hidden, background var(--bg-secondary)
- **`.readme-header`**: padding 16px 24px, border-bottom 1px solid var(--border-secondary), background ligeramente diferente
- **`.readme-header-top`**: flex justify-between align-center
- **`.readme-filename`**: JetBrains Mono, font-weight 500, display flex align-center gap 8px
- **`.readme-actions`**: botones decorativos sutiles, no funcionales (cursor: default)
- **`.readme-tabs`**: flex, gap 0, border-bottom 1px solid var(--border-secondary)
- **`.tab`**: padding 8px 16px, font JetBrains Mono, color text-muted. `.tab.active`: color text-primary, border-bottom 2px solid var(--accent)
- **`.readme-content`**: padding 32px 40px (desktop), 24px 20px (mobile)
- **Headings dentro de `.readme-content`**: con border-bottom sutil tipo GitHub
- **`.project-hero`**: width 100%, border-radius 8px, margin-block 24px
- **`.stack-tags`**: flex wrap gap 8px, cada badge: padding 4px 12px, border-radius 6px, background var(--bg-code), font JetBrains Mono, font-size-sm, border 1px solid var(--border-secondary)
- **`.link-button`**: padding 10px 20px, border-radius 8px, font-weight 500, transition all 200ms
  - `.primary`: background var(--accent), color white, hover background var(--accent-hover)
  - `.secondary`: background transparent, border 1px solid var(--border-primary), color text-primary, hover background var(--bg-code)

### 5.3. Contenido específico de cada proyecto

#### 5.3.1. `puntogo.html`

```
Título: # 🛒 puntoGO

Meta tags OG image: /assets/og/puntogo.svg
Meta title: puntoGO — E-commerce en producción | Jesús Hernández
Meta description: E-commerce en producción con Next.js, TypeScript, Supabase, monitorización con Sentry y despliegue continuo en Vercel.

Tagline:
E-commerce en producción con dominio propio, monitorización de errores en tiempo real y despliegue continuo. Producto que mantengo y evoluciono yo mismo.

## ✨ Características
- Catálogo de productos con búsqueda y filtros
- Sistema de checkout funcional con gestión de pedidos
- Panel administrativo multi-rol (admin, aliados, delivery)
- Sistema multi-divisa configurable
- Monitorización de errores en producción con Sentry
- CI/CD continuo con Vercel y GitHub Actions
- Gestión de dominio propio y DNS

## 🛠️ Stack técnico
Next.js · TypeScript · React · Tailwind CSS · Supabase · PostgreSQL · Vercel · Sentry · Cloudflare

## 🚀 Links
[🌐 Demo en producción] https://puntogo.app
(Sin link de código — repositorio privado por ser producto comercial)

## 🧠 Decisiones técnicas
Elegí Next.js por su sistema de rutas, server components y la integración nativa con Vercel para despliegue continuo. Supabase me dio PostgreSQL gestionada, autenticación y storage en un solo servicio, reduciendo complejidad de infraestructura para un proyecto que mantengo en solitario. Sentry resultó clave: detectar errores de usuarios reales en producción cambia completamente la forma de iterar el producto.
```

#### 5.3.2. `fitness-ai-coach.html`

```
Título: # 💪 Fitness AI Coach

Meta tags OG image: /assets/og/fitness-ai-coach.svg
Meta title: Fitness AI Coach — Proyecto intermodular DAM | Jesús Hernández
Meta description: Aplicación multiplataforma con backend Spring Boot, web Angular, app Android nativa Kotlin e integración de IA para coaching personalizado.

Tagline:
Aplicación multiplataforma desarrollada como proyecto intermodular de DAM. Backend Spring Boot consumido por una web Angular y una app Android nativa, con integración de IA para planes personalizados.

## ✨ Características
- Backend REST con autenticación y autorización por roles
- Arquitectura por capas (controller, service, repository, model)
- Persistencia con JPA/Hibernate sobre PostgreSQL
- Cliente web SPA en Angular consumiendo la API
- Cliente móvil Android nativo en Kotlin con Jetpack Compose
- Integración de IA (Groq con modelos Llama/Mixtral) para generación de planes de entrenamiento
- Validaciones end-to-end y manejo de errores consistente

## 🛠️ Stack técnico
Java · Spring Boot · Spring Security · Spring Data JPA · Hibernate · PostgreSQL · Angular · TypeScript · Kotlin · Android · Jetpack Compose · Retrofit · Groq API · Docker

## 🚀 Links
[💻 Ver código] https://github.com/JesusHernandezP/coach-fitness-ia

## 🧠 Decisiones técnicas
Elegí Spring Boot por ser el ecosistema más demandado en backend Java y por su robustez para arquitecturas por capas. Diseñé la API REST como punto único de entrada, lo que me permitió desarrollar dos clientes completamente independientes (web Angular y móvil Android nativo) sin duplicar lógica de negocio. Para la IA usé Groq por su latencia muy baja (clave en UX conversacional) y por permitir modelos open-source como Llama y Mixtral, manteniendo independencia de proveedor.
```

#### 5.3.3. `asha-kiran.html`

```
Título: # 📚 Asha Kiran

Meta tags OG image: /assets/og/asha-kiran.svg
Meta title: Asha Kiran — Plataforma educativa | Jesús Hernández
Meta description: Plataforma de aprendizaje de español desarrollada con Next.js y TypeScript durante prácticas profesionales en entorno educativo.

Tagline:
Herramienta de aprendizaje de español desarrollada durante prácticas profesionales (FCT) en un entorno educativo real. Mobile-first y optimizada para uso continuo por parte de los usuarios finales.

## ✨ Características
- Diseño mobile-first responsive
- Optimización de rendimiento para conexiones lentas
- Estructura de contenidos didácticos por niveles
- Componentes reutilizables para distintos tipos de ejercicios
- Despliegue continuo en Netlify
- Desarrollada con requisitos reales de un cliente educativo

## 🛠️ Stack técnico
Next.js · TypeScript · React · Tailwind CSS · Netlify

## 🚀 Links
[🌐 Demo en producción] https://aprende-con-vinculos.netlify.app
[💻 Ver código] https://github.com/JesusHernandezP/Asha-Kiran-Herramienta-Espa-ol

## 🧠 Decisiones técnicas
Elegí Next.js por su renderizado eficiente y la facilidad para crear una experiencia móvil rápida, requisito clave del cliente. Tailwind me permitió iterar diseño con feedback constante del equipo educativo sin perder consistencia visual. El proyecto fue una primera experiencia desarrollando para un cliente con requisitos reales y revisiones periódicas, no para un enunciado académico.
```

#### 5.3.4. `protocolo-estudio.html`

```
Título: # 🎓 Protocolo de Estudio

Meta tags OG image: /assets/og/protocolo-estudio.svg
Meta title: Protocolo de Estudio — Plataforma con LLM integrado | Jesús Hernández
Meta description: Plataforma de preparación de exámenes con LLM integrado por pregunta para tutoría conversacional. Prompt engineering aplicado.

Tagline:
Plataforma de preparación de exámenes con tutoría conversacional. Cada pregunta del temario tiene un LLM integrado al que el estudiante puede preguntar para profundizar o aclarar conceptos.

## ✨ Características
- Banco de preguntas estructurado por temas
- LLM integrado contextualmente en cada pregunta
- Prompt engineering para mantener al modelo en dominio educativo
- Interfaz conversacional inline (no modal)
- Sistema extensible para añadir más temarios
- Despliegue continuo en Vercel

## 🛠️ Stack técnico
TypeScript · Next.js · React · Groq API · Prompt Engineering · Vercel

## 🚀 Links
[🌐 Demo en producción] https://bateria-de-examenes.vercel.app
[💻 Ver código] https://github.com/JesusHernandezP/Protocolo-de-estudio

## 🧠 Decisiones técnicas
Diseñé el sistema pensando en mantener al LLM dentro del dominio educativo. Usé prompt engineering para establecer rol de tutor, restringir el alcance de las respuestas al temario y forzar formato pedagógico. Elegí Groq por su latencia muy baja, esencial para que la conversación se sienta natural en un contexto de estudio. El proyecto empezó como regalo para mis compañeros de DAM y varios construyeron sus propias versiones sobre la base que les compartí.
```

#### 5.3.5. `gamehub-backend.html`

```
Título: # 🎮 GameHub Backend

Meta tags OG image: /assets/og/gamehub-backend.svg
Meta title: GameHub Backend — API REST con Spring Security | Jesús Hernández
Meta description: API REST con autenticación por roles, arquitectura por capas y buenas prácticas de seguridad usando Spring Boot y Spring Security.

Tagline:
API REST construida con Spring Boot y Spring Security. Demostración de arquitectura por capas, autenticación JWT, autorización por roles y endpoints protegidos.

## ✨ Características
- Autenticación basada en JWT
- Autorización por roles (admin, usuario)
- Arquitectura por capas: controller, service, repository
- Endpoints REST documentados con Swagger/OpenAPI
- Validación de entrada y manejo centralizado de errores
- Persistencia con Spring Data JPA
- Tests unitarios con JUnit y Mockito

## 🛠️ Stack técnico
Java · Spring Boot · Spring Security · Spring Data JPA · Hibernate · PostgreSQL · JWT · Swagger · JUnit · Mockito · Maven

## 🚀 Links
[💻 Ver código] https://github.com/JesusHernandezP/GameHub-backend

## 🧠 Decisiones técnicas
GameHub es mi proyecto de referencia para mostrar dominio puro de Spring Security. Implementé autenticación JWT en lugar de sesiones para mantener el backend stateless y escalable. La arquitectura por capas con separación clara de responsabilidades facilita los tests unitarios y permite cambiar la persistencia sin tocar la lógica de negocio. Swagger documenta automáticamente la API, lo que en un entorno real reduce fricción con el equipo frontend.
```

#### 5.3.6. `zenith-workspace.html`

```
Título: # 🚀 Zenith Workspace

Meta tags OG image: /assets/og/zenith-workspace.svg
Meta title: Zenith Workspace — Frontend moderno | Jesús Hernández
Meta description: Aplicación frontend explorando UI moderna con Next.js, TypeScript y Tailwind CSS.

Tagline:
Aplicación frontend explorando patrones de UI moderna, componentización avanzada y experiencia de usuario fluida con Next.js y TypeScript.

## ✨ Características
- Arquitectura de componentes reutilizables
- Diseño responsive completo
- Animaciones e interacciones cuidadas
- Estructura escalable con TypeScript estricto
- Despliegue continuo

## 🛠️ Stack técnico
Next.js · TypeScript · React · Tailwind CSS · Vercel

## 🚀 Links
[💻 Ver código] https://github.com/JesusHernandezP/Zenith-Workspace

## 🧠 Decisiones técnicas
Zenith fue mi proyecto para profundizar en patrones avanzados de React y TypeScript: componentización con composición, tipado estricto, hooks personalizados. El objetivo no fue el dominio funcional sino la calidad técnica del frontend en sí mismo.
```

---

## 6. JavaScript

### 6.1. `js/theme-toggle.js`

Funcionalidad:
1. Al cargar la página, leer `localStorage.getItem('theme')`.
2. Si existe, aplicar `data-theme="dark"` o `data-theme="light"` en `<html>`.
3. Si no existe, usar `prefers-color-scheme` del sistema.
4. Al hacer click en el botón toggle:
   - Alternar entre light/dark
   - Guardar en localStorage
   - Actualizar el ícono del botón (sol/luna)

Implementar sin frameworks, en ~30 líneas. Ejecutar lo antes posible para evitar flash de tema incorrecto (inline script en `<head>` para la lectura inicial, luego script externo para el listener).

### 6.2. `js/main.js`

Funcionalidad:
1. Año dinámico en el footer: `document.getElementById('year').textContent = new Date().getFullYear()`.
2. Menú hamburguesa en mobile: toggle de clase `.open` en el menú.
3. Smooth scroll para anchors internos (CSS `scroll-behavior: smooth` ya lo cubre, no duplicar en JS).
4. Cerrar menú mobile al clickar un enlace.

---

## 7. Imágenes placeholder (SVG con gradientes y texto)

Generar todas las imágenes como SVG en lugar de PNG/JPG. Más livianas, escalables y editables.

### 7.1. OG images (1200x630px, en `/assets/og/`)

Cada SVG OG tiene:
- Fondo gradiente diagonal con colores que evocan el proyecto
- Texto centrado: nombre del proyecto (font-size grande, blanco, JetBrains Mono o Inter bold)
- Subtítulo: tipo de proyecto (más pequeño, color crema o gris claro)
- Esquina inferior izquierda: "jesus-hernandez.es" en pequeño

**Paletas sugeridas por proyecto**:
- `default.svg`: gradiente azul oscuro a violeta `#0D1117` → `#1F2937` → `#3B82F6`
- `puntogo.svg`: gradiente verde `#065F46` → `#10B981` (e-commerce, fresh)
- `fitness-ai-coach.svg`: gradiente rojo/naranja `#7C2D12` → `#F97316` (energía, fitness)
- `asha-kiran.svg`: gradiente amarillo/dorado `#92400E` → `#F59E0B` (educación, luz)
- `protocolo-estudio.svg`: gradiente azul `#1E3A8A` → `#3B82F6` (estudio, calma)
- `gamehub-backend.svg`: gradiente púrpura `#581C87` → `#A855F7` (gaming, dev)
- `zenith-workspace.svg`: gradiente teal `#134E4A` → `#14B8A6` (workspace, moderno)

### 7.2. Hero images de proyecto (1600x900px, en `/assets/projects/`)

Similares a las OG pero versión más amplia (ratio 16:9), con más espacio visual.

### 7.3. Favicon (`/assets/favicon.svg`)

SVG simple 32x32 con las iniciales "JH" en fondo redondeado, colores que se vean bien en modo claro y oscuro.

---

## 8. README.md del repositorio

Crear un README.md sencillo en la raíz:

```markdown
# Portfolio — Jesús Hernández

Portfolio personal de Jesús Hernández, Desarrollador de Aplicaciones Multiplataforma.

🌐 **Sitio en producción:** [jesus-hernandez.es](https://jesus-hernandez.es)

## Stack
- HTML5, CSS3, JavaScript vanilla
- Sin frameworks, sin build step
- Desplegado en Vercel

## Estructura
- `index.html` — Landing principal
- `proyectos/` — Páginas de detalle de cada proyecto
- `css/` — Estilos (globales, tema, proyecto)
- `js/` — Theme toggle y utilidades
- `assets/` — Imágenes (OG, hero, favicon)

## Desarrollo local
Abrir `index.html` directamente en el navegador, o servir con un servidor estático:

\```bash
npx serve .
\```

## Licencia
Código abierto, contenido propiedad de Jesús Hernández.
```

---

## 9. Checklist de implementación (orden estricto)

Ejecutar en este orden. No saltar pasos.

1. [ ] Crear estructura completa de carpetas y archivos vacíos
2. [ ] `css/theme.css` con variables (modo claro y oscuro)
3. [ ] `css/styles.css` con reset, tipografía, contenedores y componentes base (nav, hero, secciones, cards, footer)
4. [ ] `js/theme-toggle.js` y script inline en head
5. [ ] `js/main.js` con utilidades
6. [ ] `index.html` completo con todas las secciones
7. [ ] Generar 7 SVGs en `assets/og/` (1 default + 6 proyectos)
8. [ ] Generar 6 SVGs en `assets/projects/` (hero images)
9. [ ] Generar favicon SVG
10. [ ] `css/project.css` con estilos del marco README
11. [ ] Crear las 6 páginas de proyecto a partir de la plantilla común
12. [ ] `404.html` simple con link a inicio
13. [ ] README.md del repositorio
14. [ ] Verificar responsive en mobile (DevTools)
15. [ ] Verificar modo claro y oscuro funciona en todas las páginas
16. [ ] Verificar accesibilidad básica (navegación por teclado, contrastes)

---

## 10. Criterios de aceptación

El portfolio se considera **terminado** cuando cumple TODOS estos puntos:

- [ ] Toda la estructura de archivos del punto 2 existe.
- [ ] El index.html carga sin errores en consola.
- [ ] Las 6 páginas de proyecto cargan sin errores.
- [ ] El toggle modo claro/oscuro funciona y persiste tras recargar.
- [ ] Todas las imágenes SVG existen y se muestran.
- [ ] Los links a producción (puntoGO, Asha Kiran, etc.) abren en nueva pestaña.
- [ ] El layout es responsive en 375px, 768px, 1024px y 1440px de ancho.
- [ ] Los meta tags OG están correctos en cada página.
- [ ] La página tiene contraste AA mínimo en ambos modos.
- [ ] No hay dependencias npm. No hay build step. Solo HTML/CSS/JS estáticos.
- [ ] El README.md del repo está creado.
- [ ] El año del footer es dinámico.

---

## 11. Lo que NO debe hacer el agente

- ❌ NO añadir tracking analytics (no Google Analytics, no Plausible, etc.).
- ❌ NO añadir cookies ni banners de consentimiento.
- ❌ NO usar frameworks ni librerías más allá de las indicadas.
- ❌ NO inventar contenido de proyectos no listado aquí.
- ❌ NO añadir secciones nuevas no especificadas (testimonios, blog, etc.).
- ❌ NO subir el CV PDF real (dejar archivo placeholder vacío en `/cv/`).
- ❌ NO modificar la paleta de colores sin permiso.
- ❌ NO usar imágenes externas (todo SVG generado localmente).

---

## 12. Notas finales para el agente

- Mantén el código **simple y legible**. Otro desarrollador (yo) leerá esto.
- Comenta solo lo no obvio. No comentes lo evidente.
- Usa nombres de clases CSS claros y consistentes (BEM ligero o utility classes propias).
- Indentación: 2 espacios.
- Encoding: UTF-8.
- Salto de línea: LF.

Cuando termines, deja un mensaje resumen indicando:
1. Archivos creados (count)
2. Cualquier desviación de la spec y por qué
3. Recomendaciones de mejora para iteraciones futuras

---

**Fin del documento.**
