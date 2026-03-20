# Prompt: Build a PDF-to-Slide Web App

Create a production-quality web application from scratch that converts uploaded PDF presentations into a polished slide deck experience that matches this design language:

- serious, executive, high-trust tone
- cool slate/stone palette
- subtle but visible structured grid in the background
- top-right slide numbering
- very readable body copy for older audiences
- smooth, premium slide transitions and navigation motion

The output should not feel like a generic slide viewer. It should feel intentional, sharp, restrained, and presentation-ready.

## Product Goal

Build a web app where a user can:

1. Upload a PDF presentation.
2. Extract text and structure from the PDF.
3. Convert that content into a clean internal slide model.
4. Render the result as a modern web slide deck in the visual style described below.
5. Edit the parsed content before or after conversion.
6. Navigate the deck smoothly in presentation mode.
7. Export the structured result as JSON and markdown.

## Core Requirements

Use:

- Next.js 15 App Router
- React
- TypeScript
- Tailwind CSS

Do not build a fake prototype. Build real functionality with a clean architecture.

## Functional Scope

### 1. PDF Import

Implement real PDF upload support.

- Accept `.pdf` files through drag-and-drop and file picker.
- Use a real PDF parsing library such as `pdfjs-dist`.
- Extract text page by page.
- Preserve page order.
- Store the raw extracted content.
- Show import progress and basic error states.

If the PDF is image-based or scanned:

- support a clear OCR extension point
- design the code so OCR can be plugged in later without rewriting the app
- surface a helpful message when text extraction is weak

### 2. Content Transformation

Convert raw PDF text into a structured slide model.

Use a slide schema similar to this:

```ts
type SlideSection = {
  heading?: string;
  items: string[];
};

type Slide = {
  id: string;
  label: string;
  title: string;
  lead?: string;
  sections: SlideSection[];
  statements: string[];
  type: "cover" | "timeline" | "statement" | "standard";
};
```

The conversion pipeline should:

- identify probable slide boundaries from PDF pages
- detect title lines
- group supporting lines into bullet-like statements
- detect section headings
- infer slide types:
  - `cover`
  - `timeline`
  - `statement`
  - `standard`
- allow manual correction after import

Do not assume every PDF is perfectly structured. Build a transformation layer with heuristics and make it editable.

### 3. Editor

Build an editor UI so the user can refine the parsed deck.

Include:

- slide list sidebar
- selected slide editor
- fields for title, lead, sections, and statements
- add/delete/reorder slides
- add/delete/reorder sections
- add/delete/reorder items
- switch slide type manually
- live preview

### 4. Presentation Viewer

Build a presentation mode that renders the converted deck using the visual system below.

Support:

- keyboard navigation
- previous/next buttons
- hash-based slide URLs like `#slide-3`
- fullscreen-friendly layout
- mobile responsiveness
- disabled button states at boundaries

### 5. Export

Support export of:

- structured JSON
- markdown in a format that mirrors the internal slide structure

## App Structure

Use a clean architecture with separation of concerns. A good starting structure:

```text
app/
  page.tsx
  layout.tsx
  globals.css
  api/
    import-pdf/route.ts
components/
  upload-dropzone.tsx
  import-status.tsx
  slide-deck.tsx
  slide-shell.tsx
  slide-editor.tsx
  slide-list.tsx
  viewer-toolbar.tsx
  export-panel.tsx
lib/
  pdf/
    extract-text.ts
    normalize-pages.ts
  transform/
    pdf-to-slides.ts
    infer-slide-type.ts
    detect-headings.ts
  export/
    to-markdown.ts
    to-json.ts
  state/
    deck-store.ts
types/
  slides.ts
```

## UI Layout

Use a practical app layout:

- left sidebar: uploaded pages / slide list
- center: editor
- right: live slide preview

Also support a dedicated presentation mode that hides the editor and shows the deck full screen.

## Visual Direction

The entire app should have a serious executive tone.

### Background

Use a restrained background treatment:

- cool slate/stone gradient
- subtle grid overlay
- small grid spacing, around `28px`
- slight top and bottom lighting bands
- no loud colors
- no playful glow effects

### Typography

Use typography that feels presentation-grade and highly legible.

- strong serif or editorial display face for headings
- clean sans-serif for body copy
- large body text by default
- prioritize readability for age 50-70 viewers

### Slide Numbering

Place slide numbers on the top-right of each slide.

- format like `Slide 01`
- uppercase
- restrained spacing
- thin divider line extending from the label

### Cards and Surfaces

Use:

- white or off-white panels
- soft borders
- restrained shadows
- rounded corners

### Tone

The visual style should feel:

- boardroom
- high-stakes
- controlled
- premium
- calm

Not:

- startup flashy
- playful
- colorful
- futuristic neon
- generic template-like

## Motion System

Add very smooth ease-based animation to slide changes and navigation.

### Slide Transition

When moving between slides:

- use a subtle horizontal directional transition
- outgoing slide exits quickly
- incoming slide enters more smoothly
- combine opacity, translate, and a light blur
- keep the motion refined, not theatrical

Suggested motion timings:

- exit: about `180ms`
- enter: about `560ms`
- easing: premium ease curve such as `cubic-bezier(0.22, 1, 0.36, 1)`

### Navigation Buttons

Navigation buttons should have:

- smooth hover lift
- slight scale
- eased shadow shift
- disabled states

### Accessibility

Respect `prefers-reduced-motion`.

## Slide Rendering Rules

Implement reusable slide patterns:

### Cover Slide

- large title
- optional subtitle / lead
- optional statement block

### Standard Slide

- left title area
- right content area
- sections rendered as elevated panels

### Timeline Slide

- title on one side
- structured phase-based timeline cards on the other

### Statement Slide

- centered title
- one strong statement

## Editing and State Management

Use predictable state management.

- keep a single source of truth for the deck
- avoid duplicated derived state unless clearly necessary
- keep transformation utilities pure where possible
- keep rendering components presentational where possible

## Error Handling

Handle real-world failures:

- invalid file type
- unreadable PDF
- empty extraction
- poor OCR candidates
- transformation failures

Show useful messages, not vague failures.

## Quality Bar

The implementation must:

- compile cleanly
- be type-safe
- avoid placeholder mocks in the main workflow
- use real parsing and transformation logic
- be easy to extend
- be visually polished

## Deliverables

Provide:

1. Full app code.
2. Clear file structure.
3. Reusable slide schema.
4. PDF import pipeline.
5. Transformation pipeline from PDF text to structured slides.
6. Editor UI.
7. Presentation viewer.
8. Export features.
9. Smooth motion implementation.
10. Setup instructions.

## Final Instruction

Build the app completely, not as a sketch. Make pragmatic choices where needed, but keep the visual system and motion close to this brief:

- serious executive slides
- refined background grid and gradient
- top-right slide numbers
- larger body text
- smooth directional transitions
- polished navigation

If you need to make assumptions, choose the most production-ready path and explain them briefly.
