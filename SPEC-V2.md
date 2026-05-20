# SPEC-V2 — Iteración 2 del Portfolio

> **Documento de modificaciones sobre la implementación V1.**
> Asume que la V1 ya está implementada según `SPEC.md` original.
> Este documento es **acumulativo**: solo modifica/añade, no reemplaza la spec entera.
> Lee este documento entero antes de empezar. Ejecuta los cambios en el orden indicado.

---

## 0. Contexto de esta iteración

La V1 del portfolio está implementada y funcionando, pero tras revisión visual hay **8 cambios** que aplicar para alcanzar la calidad final esperada. La spec V1 sigue siendo la base — solo se modifican los puntos listados aquí.

**Filosofía de los cambios**:
- Identidad visual propia con paleta personalizada (no la genérica tipo GitHub)
- Experiencia de scroll guiada por secciones en desktop
- Renderizado tipo GitHub real de las páginas de proyecto
- Pulido de detalles visuales y micro-interacciones

---

## 1. Cambios prioritarios (orden estricto)

### CAMBIO 1 — Paleta de colores personalizada (en `css/theme.css`)

**Reemplazar completamente** el contenido de variables de color en `theme.css`. El resto del archivo (escalas tipográficas, spacing, radios) se mantiene igual.

#### Modo claro (`:root`)

```css
:root {
  /* Brand colors */
  --primary-dark: #2C3E50;
  --secondary-dark: #34495E;
  --accent-warm: #8B7355;
  --light-grey: #BDC3C7;
  --off-white: #ECF0F1;
  --text-dark: #2C2C2C;
  --white: #FFFFFF;
  --shadow-light: rgba(44, 62, 80, 0.1);
  --shadow-medium: rgba(44, 62, 80, 0.15);

  /* Mapeo a variables semánticas usadas en components */
  --bg-primary: var(--off-white);
  --bg-secondary: var(--white);
  --bg-elevated: var(--white);
  --bg-code: #F4F6F7;

  --text-primary: var(--text-dark);
  --text-secondary: var(--secondary-dark);
  --text-muted: #6E7B85;
  --text-link: var(--primary-dark);
  --text-on-accent: var(--white);

  --border-primary: var(--light-grey);
  --border-secondary: #D5DBDF;

  --accent: var(--primary-dark);
  --accent-hover: var(--secondary-dark);
  --accent-warm: var(--accent-warm);

  --shadow-sm: 0 1px 2px var(--shadow-light);
  --shadow-md: 0 4px 12px var(--shadow-light);
  --shadow-lg: 0 12px 32px var(--shadow-medium);
}
```

#### Modo oscuro (`[data-theme="dark"]`)

```css
[data-theme="dark"] {
  /* Brand colors */
  --color-background: #151515;
  --color-middleground: #202020;
  --color-borderhover: #333;
  --color-foreground: #383838;
  --color-buttonhover: #444;
  --color-text: #FFFFFF;
  --color-subtext: #BBBBBB;
  --rgb-color-text: 255, 255, 255;
  --rgb-color-shadow-header: 21, 21, 21;
  --rgb-color-background: 21, 21, 21;
  --rgb-color-shadow: 15, 15, 15;
  --color-selection-text: #E2E9F7E6;
  --color-selection-bg: #7E80FF66;
  --rgb-glow-1: 98, 114, 255;
  --rgb-glow-2: 140, 168, 255;
  --rgb-glow-3: 247, 248, 255;

  /* Mapeo a variables semánticas usadas en components */
  --bg-primary: var(--color-background);
  --bg-secondary: var(--color-middleground);
  --bg-elevated: var(--color-foreground);
  --bg-code: var(--color-middleground);

  --text-primary: var(--color-text);
  --text-secondary: var(--color-subtext);
  --text-muted: #8A8A8A;
  --text-link: rgb(var(--rgb-glow-2));
  --text-on-accent: var(--color-text);

  --border-primary: var(--color-borderhover);
  --border-secondary: var(--color-foreground);

  --accent: rgb(var(--rgb-glow-1));
  --accent-hover: rgb(var(--rgb-glow-2));
  --accent-warm: rgb(var(--rgb-glow-2));

  --shadow-sm: 0 1px 2px rgba(var(--rgb-color-shadow), 0.3);
  --shadow-md: 0 4px 12px rgba(var(--rgb-color-shadow), 0.4);
  --shadow-lg: 0 12px 32px rgba(var(--rgb-color-shadow), 0.5);
}
```

**Añadir además este selection style global** en `styles.css` (antes de cualquier otra regla):

```css
::selection {
  background-color: var(--color-selection-bg, rgba(44, 62, 80, 0.15));
  color: var(--color-selection-text, var(--text-primary));
}
```

---

### CAMBIO 2 — Scroll snap por sección (solo desktop, secciones específicas)

**Comportamiento esperado**:
- En **desktop ≥1024px**: scroll snap suave. Las secciones Hero, Sobre mí y Contacto ocupan exactamente 100vh y "encajan" al scrollear.
- Stack y Proyectos NO tienen snap forzado (su altura es natural según contenido) pero sí se incluyen como puntos de scroll-snap permisivos.
- En **mobile (<1024px)**: scroll normal, sin snap.

#### Estructura HTML del `index.html`

Envolver el contenido scrolleable en un contenedor con la clase `scroll-container`:

```html
<body>
  <nav>...</nav>
  <main class="scroll-container">
    <section id="hero" class="section section-full">...</section>
    <section id="sobre-mi" class="section section-full">...</section>
    <section id="stack" class="section section-auto">...</section>
    <section id="proyectos" class="section section-auto">...</section>
    <section id="contacto" class="section section-full">...</section>
    <footer>...</footer>
  </main>
</body>
```

#### CSS necesario en `styles.css`

```css
html {
  scroll-behavior: smooth;
}

.scroll-container {
  /* Mobile-first: sin snap */
  scroll-snap-type: none;
}

.section {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  padding-block: var(--space-16);
  padding-inline: var(--space-6);
}

.section-full {
  min-height: 100vh;
}

.section-auto {
  min-height: auto;
}

/* Desktop: activar snap */
@media (min-width: 1024px) {
  html {
    scroll-snap-type: y proximity;
  }

  .section {
    scroll-snap-align: start;
    scroll-snap-stop: normal;
    padding-inline: var(--space-12);
  }

  .section-full {
    height: 100vh;
    min-height: 100vh;
    scroll-snap-align: start;
    scroll-snap-stop: always;
  }
}
```

**Importante**:
- `scroll-snap-type: y proximity` (no `mandatory`) para que el snap sea sugerido, no impuesto. Esto permite que el usuario pare en medio de Stack o Proyectos sin que se le empuje.
- `scroll-snap-stop: always` solo en secciones full para que el snap sea firme en ellas.
- El footer NO es una sección con snap. Va después del último `</section>` y fluye natural.

---

### CAMBIO 3 — Hero centrado verticalmente y mejor jerarquía

Actualmente el contenido del Hero queda muy arriba con mucho espacio vacío. Arreglar:

#### Estructura HTML del Hero

```html
<section id="hero" class="section section-full hero">
  <div class="hero-inner">
    <span class="hero-location">MADRID · ESPAÑA</span>
    <h1 class="hero-title">Jesús Hernández</h1>
    <p class="hero-subtitle">Desarrollador de Aplicaciones Multiplataforma</p>
    <p class="hero-description">
      Construyo productos reales de extremo a extremo.<br>
      Backend con Java/Spring, frontend con Next.js, móvil con Kotlin/Android e integración de LLMs.
    </p>
    <div class="hero-ctas">
      <a href="#proyectos" class="btn btn-primary">Ver proyectos</a>
      <a href="/cv/Jesus_Hernandez_CV.pdf" class="btn btn-secondary" download>Descargar CV</a>
    </div>
  </div>
</section>
```

#### CSS del Hero

```css
.hero {
  text-align: left;
}

.hero-inner {
  max-width: var(--container-max);
  width: 100%;
  margin-inline: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: var(--space-6);
  /* El justify-content del .section ya lo centra verticalmente */
}

.hero-location {
  font-family: 'JetBrains Mono', monospace;
  font-size: var(--font-size-sm);
  color: var(--text-muted);
  padding: var(--space-1) var(--space-3);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  letter-spacing: 0.05em;
}

.hero-title {
  font-size: var(--font-size-5xl);
  font-weight: 700;
  line-height: var(--line-height-tight);
  margin: 0;
  color: var(--text-primary);
  letter-spacing: -0.02em;
}

.hero-subtitle {
  font-size: var(--font-size-2xl);
  font-weight: 500;
  color: var(--text-secondary);
  margin: 0;
}

.hero-description {
  font-size: var(--font-size-lg);
  color: var(--text-secondary);
  max-width: 640px;
  line-height: var(--line-height-relaxed);
  margin: 0;
}

.hero-ctas {
  display: flex;
  gap: var(--space-4);
  flex-wrap: wrap;
  margin-top: var(--space-4);
}

@media (max-width: 767px) {
  .hero-title {
    font-size: 2.75rem;
    word-break: keep-all;
    overflow-wrap: normal;
  }

  .hero-subtitle {
    font-size: var(--font-size-xl);
  }

  .hero-description {
    font-size: var(--font-size-base);
  }
}
```

---

### CAMBIO 4 — Renderizado real estilo GitHub README (eliminar `#` literales)

Las páginas de proyecto actualmente muestran los símbolos `#` y `##` literalmente. Esto es incorrecto. **GitHub renderiza el markdown**, no muestra los símbolos.

#### Estructura HTML correcta de cada página de proyecto

```html
<article class="readme-content">

  <!-- Antes: <h1># 🛒 puntoGO</h1> -->
  <!-- Ahora: -->
  <h1 class="readme-h1">
    <span class="readme-emoji">🛒</span> puntoGO
  </h1>

  <img src="/assets/projects/puntogo-hero.svg" alt="puntoGO hero" class="project-hero">

  <p class="project-tagline">
    E-commerce en producción con dominio propio, monitorización...
  </p>

  <!-- Antes: <h2>## ✨ Características</h2> -->
  <!-- Ahora: -->
  <h2 class="readme-h2">
    <span class="readme-emoji">✨</span> Características
  </h2>
  <ul>
    <li>Catálogo de productos...</li>
    ...
  </ul>

  <h2 class="readme-h2">
    <span class="readme-emoji">🛠️</span> Stack técnico
  </h2>
  <div class="stack-tags">...</div>

  <h2 class="readme-h2">
    <span class="readme-emoji">🚀</span> Links
  </h2>
  <div class="project-links">...</div>

  <h2 class="readme-h2">
    <span class="readme-emoji">🧠</span> Decisiones técnicas
  </h2>
  <p>...</p>

</article>
```

#### CSS específico de headings README

```css
.readme-h1 {
  font-size: var(--font-size-4xl);
  font-weight: 700;
  line-height: var(--line-height-tight);
  margin: 0 0 var(--space-6) 0;
  padding-bottom: var(--space-4);
  border-bottom: 1px solid var(--border-secondary);
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.readme-h2 {
  font-size: var(--font-size-2xl);
  font-weight: 600;
  line-height: var(--line-height-tight);
  margin: var(--space-12) 0 var(--space-4) 0;
  padding-bottom: var(--space-3);
  border-bottom: 1px solid var(--border-secondary);
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.readme-h3 {
  font-size: var(--font-size-xl);
  font-weight: 600;
  margin: var(--space-8) 0 var(--space-3) 0;
  color: var(--text-primary);
}

.readme-emoji {
  display: inline-flex;
  align-items: center;
  font-size: 0.9em;
  line-height: 1;
}

.readme-content p {
  font-size: var(--font-size-base);
  line-height: var(--line-height-relaxed);
  color: var(--text-primary);
  margin-block: var(--space-4);
}

.readme-content ul {
  padding-left: var(--space-6);
  margin-block: var(--space-4);
}

.readme-content ul li {
  margin-block: var(--space-2);
  color: var(--text-primary);
  line-height: var(--line-height-relaxed);
}

.project-tagline {
  font-size: var(--font-size-lg) !important;
  color: var(--text-secondary) !important;
  font-style: italic;
}
```

**Aplicar este cambio a las 6 páginas de proyecto** (`puntogo.html`, `fitness-ai-coach.html`, `asha-kiran.html`, `protocolo-estudio.html`, `gamehub-backend.html`, `zenith-workspace.html`).

---

### CAMBIO 5 — Marco README visible en modo claro

Actualmente en modo claro el marco del README casi no se distingue del fondo. Arreglar:

```css
.readme-container {
  max-width: 900px;
  margin: var(--space-12) auto;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-primary);
  overflow: hidden;
  background: var(--bg-secondary);
  box-shadow: var(--shadow-md);
}

[data-theme="light"] .readme-container,
:root:not([data-theme="dark"]) .readme-container {
  /* Refuerzo en modo claro */
  border-color: var(--light-grey);
  box-shadow: 0 4px 24px var(--shadow-light);
}

[data-theme="dark"] .readme-container {
  border-color: var(--color-borderhover);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);
}

.readme-header {
  padding: var(--space-4) var(--space-6);
  border-bottom: 1px solid var(--border-secondary);
  background: var(--bg-code);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.readme-header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-4);
  flex-wrap: wrap;
}

.readme-filename {
  font-family: 'JetBrains Mono', monospace;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: var(--space-2);
  color: var(--text-primary);
}

.readme-actions {
  display: flex;
  gap: var(--space-2);
}

.readme-actions button {
  font-family: 'JetBrains Mono', monospace;
  font-size: var(--font-size-xs);
  padding: var(--space-1) var(--space-3);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-sm);
  background: var(--bg-secondary);
  color: var(--text-muted);
  cursor: default;
  pointer-events: none;
}

.readme-tabs {
  display: flex;
  gap: 0;
  border-bottom: 1px solid var(--border-secondary);
  background: var(--bg-code);
  padding-inline: var(--space-6);
}

.tab {
  padding: var(--space-2) var(--space-4);
  font-family: 'JetBrains Mono', monospace;
  font-size: var(--font-size-sm);
  color: var(--text-muted);
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  cursor: default;
}

.tab.active {
  color: var(--text-primary);
  border-bottom-color: var(--accent);
  font-weight: 500;
}

.tab:disabled {
  cursor: default;
  opacity: 0.6;
}

.readme-content {
  padding: var(--space-12) var(--space-12);
  background: var(--bg-secondary);
}

@media (max-width: 767px) {
  .readme-content {
    padding: var(--space-6) var(--space-4);
  }

  .readme-header {
    padding: var(--space-3) var(--space-4);
  }

  .readme-tabs {
    padding-inline: var(--space-4);
  }
}
```

---

### CAMBIO 6 — NAV scroll-aware con sombra y blur

En modo claro la nav se confunde con el fondo. Aplicar efecto glass al hacer scroll:

#### HTML

Añadir clase `nav` al `<nav>` y atributo `data-scrolled="false"`:

```html
<nav class="nav" data-scrolled="false">
  ...
</nav>
```

#### CSS

```css
.nav {
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
  padding: var(--space-4) var(--space-6);
  background: transparent;
  backdrop-filter: blur(0);
  transition: all 200ms ease;
  border-bottom: 1px solid transparent;
}

.nav[data-scrolled="true"] {
  background: rgba(var(--rgb-color-background, 236, 240, 241), 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom-color: var(--border-secondary);
  box-shadow: var(--shadow-sm);
}

[data-theme="dark"] .nav[data-scrolled="true"] {
  background: rgba(21, 21, 21, 0.85);
}

[data-theme="light"] .nav[data-scrolled="true"],
:root:not([data-theme="dark"]) .nav[data-scrolled="true"] {
  background: rgba(236, 240, 241, 0.85);
}
```

#### JS (añadir en `js/main.js`)

```javascript
// Nav scroll-aware
const nav = document.querySelector('.nav');
const scrollContainer = document.querySelector('.scroll-container');

function updateNavScrollState() {
  const scrollTarget = scrollContainer || window;
  const scrollY = scrollContainer ? scrollContainer.scrollTop : window.scrollY;
  if (nav) {
    nav.dataset.scrolled = scrollY > 16 ? 'true' : 'false';
  }
}

if (scrollContainer) {
  scrollContainer.addEventListener('scroll', updateNavScrollState, { passive: true });
} else {
  window.addEventListener('scroll', updateNavScrollState, { passive: true });
}

updateNavScrollState();
```

---

### CAMBIO 7 — Cards de proyectos con hover mejorado y micro-interacciones

```css
.project-card {
  display: flex;
  flex-direction: column;
  background: var(--bg-secondary);
  border: 1px solid var(--border-secondary);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1),
              box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1),
              border-color 200ms ease;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
}

.project-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-lg);
  border-color: var(--accent);
}

.project-card:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 4px;
}

.project-card-cover {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  display: block;
  background: var(--bg-code);
}

.project-card-body {
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  flex: 1;
}

.project-card-title {
  font-size: var(--font-size-xl);
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
  line-height: var(--line-height-tight);
}

.project-card-meta {
  font-size: var(--font-size-sm);
  color: var(--text-muted);
  margin: 0;
}

.project-card-description {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  line-height: var(--line-height-relaxed);
  margin: 0;
}

.project-card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-top: auto;
  padding-top: var(--space-2);
}

.project-card-tag {
  font-family: 'JetBrains Mono', monospace;
  font-size: var(--font-size-xs);
  padding: var(--space-1) var(--space-3);
  background: var(--bg-code);
  border: 1px solid var(--border-secondary);
  border-radius: var(--radius-md);
  color: var(--text-secondary);
}
```

---

### CAMBIO 8 — Pulido global de tipografía, botones y secciones

#### Botones

```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-3) var(--space-6);
  font-family: inherit;
  font-size: var(--font-size-base);
  font-weight: 500;
  border-radius: var(--radius-md);
  text-decoration: none;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 180ms ease;
}

.btn-primary {
  background: var(--accent);
  color: var(--text-on-accent);
  border-color: var(--accent);
}

.btn-primary:hover {
  background: var(--accent-hover);
  border-color: var(--accent-hover);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.btn-secondary {
  background: transparent;
  color: var(--text-primary);
  border-color: var(--border-primary);
}

.btn-secondary:hover {
  background: var(--bg-code);
  border-color: var(--text-secondary);
}
```

#### Títulos de sección

```css
.section-title {
  font-size: var(--font-size-4xl);
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 var(--space-12) 0;
  line-height: var(--line-height-tight);
  letter-spacing: -0.02em;
}

.section-subtitle {
  font-size: var(--font-size-lg);
  color: var(--text-secondary);
  max-width: 640px;
  margin: calc(-1 * var(--space-8)) 0 var(--space-12) 0;
  line-height: var(--line-height-relaxed);
}

.section-inner {
  max-width: var(--container-max);
  width: 100%;
  margin-inline: auto;
}
```

---

## 2. Checklist de implementación (orden estricto)

1. [ ] CAMBIO 1: Reemplazar paleta de colores en `theme.css` (modo claro + oscuro)
2. [ ] CAMBIO 1bis: Añadir `::selection` global en `styles.css`
3. [ ] CAMBIO 2: Estructura HTML con `.scroll-container`, `.section`, `.section-full`, `.section-auto` en `index.html`
4. [ ] CAMBIO 2bis: CSS de scroll-snap en `styles.css`
5. [ ] CAMBIO 3: Rehacer Hero con nueva estructura y CSS
6. [ ] CAMBIO 4: Quitar `#` y `##` literales de las 6 páginas de proyecto. Usar `.readme-h1` / `.readme-h2` con `.readme-emoji`
7. [ ] CAMBIO 4bis: Aplicar nuevo CSS de headings README
8. [ ] CAMBIO 5: Refinar marco README (`.readme-container`, `.readme-header`, `.readme-tabs`, `.readme-content`)
9. [ ] CAMBIO 6: Nav scroll-aware: HTML `data-scrolled`, CSS de transición, JS listener
10. [ ] CAMBIO 7: Aplicar nuevo CSS a cards de proyectos
11. [ ] CAMBIO 8: Pulido global (btn, section-title, section-inner)
12. [ ] Verificar carga sin errores en consola del navegador
13. [ ] Verificar que `data-scrolled="true"` se aplica al hacer scroll
14. [ ] Verificar snap entre Hero → Sobre mí → (Stack scrollable) → (Proyectos scrollable) → Contacto en desktop ≥1024px
15. [ ] Verificar en móvil (375px) que el snap NO se activa y el scroll es natural

---

## 3. Criterios de aceptación V2

- [ ] La paleta de colores coincide exactamente con la especificada (modo claro y oscuro).
- [ ] En desktop ≥1024px, al scrollear desde el top, el Hero llena la pantalla y al hacer scroll suave encaja Sobre mí.
- [ ] En móvil <1024px, el scroll es continuo sin snap forzado.
- [ ] Stack y Proyectos pueden ser más altos que 100vh sin romper el snap.
- [ ] Las páginas de proyecto NO muestran símbolos `#` ni `##` literales.
- [ ] El título principal de cada página de proyecto está en h1 grande con border-bottom (estilo GitHub real).
- [ ] El marco README es claramente visible en modo claro (no se funde con el fondo).
- [ ] La nav cambia visualmente al hacer scroll (background, blur, border-bottom).
- [ ] Las cards de proyectos elevan al hover con transform y shadow.
- [ ] No se rompe nada de la V1 (todos los enlaces siguen funcionando, modo toggle funciona, año dinámico, etc.).

---

## 4. Restricciones que se mantienen de la V1

- ❌ NO añadir frameworks, npm, build step
- ❌ NO añadir librerías JS externas
- ❌ NO añadir tracking, cookies, analytics
- ❌ NO inventar contenido nuevo de proyectos
- ❌ NO cambiar la estructura de archivos definida en la V1
- ❌ NO modificar los SVGs existentes (la paleta cambia, no las imágenes)

---

## 5. Notas finales para el agente

- Si encuentras conflictos entre la V1 y la V2, **prevalece la V2**.
- Mantén comentarios concisos en el CSS para que el siguiente desarrollador (yo) entienda qué hace cada bloque.
- Si una decisión técnica no está especificada y debes elegir, prefiere la opción **más simple y más cercana al estilo GitHub**.

Cuando termines, presenta un resumen indicando:
1. Archivos modificados (lista)
2. Archivos creados nuevos (si aplica)
3. Desviaciones de esta spec V2 y por qué
4. Recomendaciones para una posible iteración V3

---

**Fin del documento V2.**
