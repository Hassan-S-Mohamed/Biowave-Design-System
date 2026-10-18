# Value

Why the investment pays back, in Biowave's context:

| Without a system | With the Biowave Design System |
|---|---|
| Each module (Devices, Attendance, Requests, Personnel) restyles tables, filters and status chips its own way | One `Table`, one status vocabulary (success / warning / error / info), one look |
| Arabic support is patched per screen; icons point the wrong way; text clips | RTL and Arabic line heights are built into tokens and components |
| Error and warning buttons fail contrast (white on #FF8C32 was 2.32:1) | Every color pair is checked automatically on build |
| Dark mode is a separate redesign | Dark is a token mode — components switch with no extra work |
| Web and mobile teams interpret Figma differently | Both consume generated tokens from the same JSON |
| A brand change means a search-and-replace hunt | Change one primitive, rebuild, ship |

## Return on effort
- **Build once, use on three platforms:** foundations are written once and generated to CSS, TS and Dart.
- **Lower QA cost:** accessibility and theming defects are prevented at token level.
- **Faster onboarding:** a new engineer or agent reads `AGENTS.md` and one section README to start contributing.
