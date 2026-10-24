# Plan step — text-field / tablet

Project root: /Users/hassansaid/Downloads/Biowave Design System-text-field-tablet/biowave-ds. Project rules: AGENTS.md. Config: _workflow/config.json.

## Inputs (read only these)
4-tablet-components/README.md, every Part of 4-tablet-components/components/text-field/text-field.md, and _templates/README.md.

## Outputs (write only these)
Parts A–D and F of 4-tablet-components/components/text-field/text-field.md and 4-tablet-components/components/text-field/text-field.tokens.json (if it exists or is needed). Part A must stay identical across web/tablet/mobile (AGENTS.md rule 10) — do not change it unless a finding needs it. Plus the plan status in the header and README row, and a CHANGELOG entry.

## This step
Fix the Planner-owned findings of Review Round 1 (Part E): #4 🟡 end-button square start corners need a supported mechanism (BwButton has no shape/radius param; C5 does not allow changing it); #5 🟡 add `placeholder` to B1 (Web B1 has it); #10 🟢 header Source code → lib/src/components/text_field/; #11 🟢 B4: InputDecorator's border animation has a fixed duration that BwDuration.sm / reduced motion cannot change.
The same decisions must be made for tablet and mobile (the other platform is being planned in the same pass), so prefer one mechanism for both:
- End-button corners: allow a package-private corner/segment override on BwButton in C3/C5 (the tablet Split button plan 2.1 already adds an internal `segment` parameter + shared radius helper in bw_button_style.dart — reuse that idea: list bw_button.dart and bw_button_style.dart in C5 with exactly the internal change allowed), unless the spec can accept a rounded end button.
- Motion: record the Flutter platform limit in B4 (InputDecorator's built-in border transition) and say what C3 does about reduced motion, or require a custom border animation — pick one and make AC-3 checkable.
- `placeholder`: add it to B1 as Web B1 has it.
Do not touch Implementer findings. Bump the plan version, set Plan back to `Finished`, then run the afterPlan commands.

## Notes from the user
Approved: one consistent Planner pass for tablet + mobile.

## Checks to run
- npm run contract -- tablet text-field
- npm run docs:check

Do not commit, push or switch branches. End with the Handoff block.
