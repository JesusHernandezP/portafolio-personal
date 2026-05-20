# Homepage Visual Polish Design

## Scope

Apply a focused visual polish pass to the homepage:

- Fix the mobile Hero spacing so the CTA row no longer collides with the summary card.
- Keep the navbar in its solid blue, fully readable state from first paint onward.
- Redesign the `Stack técnico` cards so they match the visual language of the Hero summary card.
- Fix Hero anchor/logo navigation so returning to the top lands at the correct resting position.
- Duplicate contact icons below the Hero CTA buttons using the existing links.
- Recolor project badges to use `#8b7355` for border and text.

This spec is intentionally limited to the homepage and does not change project detail pages.

## Design Direction

Use the Hero summary card as the reference visual language for the homepage:

- soft solid card background
- thin neutral border
- generous radius
- restrained shadow
- small-caps category label
- serious editorial spacing instead of badge-cloud styling

The result should feel more coherent and more senior, without changing the current palette or core layout.

## Changes

### 1. Hero mobile spacing

Problem:

- On narrow screens, the CTA row and the summary card visually stick together.
- The Hero title block also sits slightly too low relative to the right-hand summary card in larger layouts.

Solution:

- Add explicit vertical separation between the CTA group and the summary card on mobile.
- Convert the left Hero column into a clearer vertical stack:
  - title
  - subtitle
  - CTA row
  - contact icon row
- Raise the left Hero content slightly in desktop so it aligns better against the summary card.
- Preserve wrapping behavior for the CTA buttons on narrow widths.

### 2. Navbar initial state

Problem:

- At first paint while the page is at the very top, the navbar appears white / low-contrast before transitioning into the intended blue sticky look.

Solution:

- Make the navbar use the solid blue background, visible links, border radius, and shadow from the start.
- Keep the visual treatment consistent whether the page is at scroll position `0` or after scrolling.
- Preserve the mobile menu overlay behavior and current interaction model.

### 3. Hero anchor / logo scroll alignment

Problem:

- Opening the page for the first time or using the logo to return to Hero leaves the section slightly offset upward.

Solution:

- Adjust anchor scrolling so `#hero` lands with the intended top spacing under the fixed header.
- Ensure logo navigation uses the same corrected offset as the section links.
- Keep behavior consistent across desktop and mobile.

### 4. Hero contact icon row

Add a new icon-only row directly below the Hero CTA buttons:

- GitHub
- LinkedIn
- email

Rules:

- reuse the existing destination URLs
- base color `#8b7355`
- hover color stays the existing project blue hover
- align visually with the CTA group and left Hero copy
- on desktop, the row should sit high enough that the whole left column still balances against the summary card

### 5. Stack técnico redesign

Problem:

- The current stack cards read as containers full of tags.
- The user wants a more serious, card-based presentation.

Solution:

- Keep all existing categories and content.
- Keep the current grid structure and responsive column behavior unless spacing tweaks are needed.
- Replace the internal badge-cloud treatment with card content modeled after the Hero summary card.

Each stack card should contain:

- a small-caps category label at the top
- a compact list of short lines below
- the same card background/border/radius/shadow family used by the Hero summary card

Content format for the first implementation:

- no bullet points initially
- technologies grouped into short readable lines
- if this feels too flat after implementation, fallback iteration will switch the stack content to bullet points

### 6. Project badge recolor

Adjust homepage project card badges only:

- keep their current size, spacing, and shape
- change border color to `#8b7355`
- change text color to `#8b7355`
- leave background and the rest of each project card unchanged

## Affected Files

Expected primary edits:

- `index.html`
- `css/styles.css`
- possibly `js/main.js` if anchor offset behavior is currently handled in script

## Validation

Manual validation should confirm:

- Hero CTA block and summary card have clear separation on mobile widths around `382px`.
- Navbar is blue and readable immediately on first paint at the top of the page.
- Clicking the logo or loading the page at `/#hero` lands the Hero in the intended position.
- New contact icons appear below the Hero buttons, use the existing links, render in `#8b7355`, and hover blue.
- Stack cards visually match the Hero summary card language and no longer look like tag clusters.
- Project badges use `#8b7355` for border/text and keep the rest of the project card styling intact.
