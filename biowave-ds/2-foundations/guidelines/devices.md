# Devices

"Devices" covers two things in Biowave: the **screens** we design for, and the **biometric hardware** our products manage.

## 1. Target screens
| Platform | Classes | Reference devices (Figma frames) | Input |
|---|---|---|---|
| Web App | ≥ 1200 (large); must reflow down to 600 | 1280, 1440, 1920 desktops | Mouse, keyboard |
| Tablet App | 600–1199 | iPad mini, iPad Pro 11"/13", Google Pixel Tablet | Touch, optional keyboard |
| Mobile App | < 600 | iPhone 13/14/17, Android compact (Pixel) | Touch |

Rules:
- Design at the smallest width of each class first, then the largest.
- Respect safe areas (notches, home indicator, Android navigation bar): Flutter `SafeArea`, web `env(safe-area-inset-*)`.
- Support portrait and landscape on tablet; mobile is portrait-first.
- Touch targets ≥ 48dp on tablet/mobile.

## 2. Biometric hardware (product imagery)
Managed device families shown in the product (Figma page `Devices`): **IDEMIA** (MorphoWave XP/SP, Sigma Lite+/Wide, VisionPass), **Suprema**, **STid**, **HID**, **Assa Abloy**, **Progeny**, **Tecnosicurezza**, and the **Biowave Smart Controller / Hub**.

Rules for device imagery:
- One consistent render style: front-facing, neutral background, same lighting; transparent PNG/WebP @2x or SVG.
- Fixed sizes: thumbnail 40 (tables), 64 (cards), 160 (details).
- Always show the model name in text next to the image; images are decorative for screen readers.
- Store in `2-foundations/assets/devices/<vendor>/<model>.webp` (to be added).
