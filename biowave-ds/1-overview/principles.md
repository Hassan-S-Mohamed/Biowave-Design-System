# Principles

Use these to settle design decisions. When two principles conflict, the one higher in the list wins.

### 1. Clear before clever
People act on Biowave screens to grant access, approve leave, or fix a device. Show the state, the next action and its consequence plainly. Prefer familiar patterns over novel ones.
*In practice:* one primary action per view; status uses words and icons, not color alone.

### 2. Trust through precision
Identity data must look exact. Align numbers, use consistent formats for times, IDs and dates, and never hide what the system did.
*In practice:* `data-*` type roles with tabular numerals; audit-friendly wording ("Approved by Sara at 09:14").

### 3. Equal in Arabic and English
Arabic is not a translation layer. Layout, typography and iconography are designed for both directions from the start.
*In practice:* logical properties only; Arabic line heights are taller; never letter-space Arabic; test every component in RTL.

### 4. Accessible for everyone, everywhere
Workplaces include gloves, glare, small screens and assistive technology. Meet WCAG 2.2 AA as a floor.
*In practice:* 48dp touch targets, visible focus, contrast checked at build, reduced-motion respected.

### 5. Native on every platform
Share decisions, not pixels. Web follows MUI and web conventions; tablet and mobile follow Material 3 and platform gestures.
*In practice:* one token set, three component libraries.

### 6. Calm by default
Use color and motion to signal, not to decorate. Brand navy and teal lead; status colors appear only when there is a status.
*In practice:* neutral surfaces, short purposeful motion (`motion-duration-sm…lg`).
