# RIF Surfer — Design System

A lightweight reference for the visual language behind RIF Surfer, a solo-built layoff benefits finder. The tone borrows from GOV.UK-style civic services: plain, trustworthy, sharp-edged, no unnecessary decoration. Someone using this tool is having a hard week; the design gets out of the way.

## Color

### Core
| Token | Hex | Use |
|---|---|---|
| `--govuk-blue` | `#1D70B8` | Primary actions, links, hero background |
| `--govuk-blue-hover` | `#1A65A6` | Hover state for blue elements |
| `--govuk-blue-dark` | `#0F385C` | Link hover, dark accents |
| `--govuk-blue-tint95` | `#F4F8FB` | Subtle hover backgrounds |
| `--govuk-green` | `#0F7A52` | Success / completion states |
| `--govuk-text` | `#0B0C0C` | Primary text |
| `--govuk-secondary-text` | `#484949` | Supporting text |
| `--govuk-border-light` | `#CECECE` | Hairline borders |
| `--govuk-bg` | `#FFFFFF` | Page background |
| `--govuk-template-bg` | `#F0F2F5` | Card section backgrounds |
| `--turquoise` | `#0E7490` | Encouragement callouts |

### Badges
Each badge pairs a light background with a dark, matching text color, never black text on a colored fill.

| Badge | Background | Text | Meaning |
|---|---|---|---|
| Urgent | `#F0C8C8` | `#6B1A1A` | Act within 60 days |
| Federal | `#D2E2F1` | `#0F385C` | Federal program |
| State | `#FFF0C0` | `#5C3D00` | State-run program |
| Free | `#D4EDDA` | `#0A4A1E` | No cost |
| Community | `#E8E0F8` | `#3A1880` | Peer-led / community resource |
| Crisis | `#FFE8CC` | `#5C2E00` | Crisis support |

## Typography

Single typeface: **Plus Jakarta Sans**, weights 400–800. No serif, no secondary font, the whole tool speaks in one clear voice.

| Element | Size | Weight |
|---|---|---|
| Hero title (`h1`) | 44px | 800 |
| State heading | 28px | 700 |
| Checklist title | 18px | 700 |
| Card title | 14px | 600 |
| Body / description text | 12.5–13px | 400 |
| Eyebrow / labels | 10–11.5px, uppercase, letter-spaced | 700 |

## Shape and spacing

- **Sharp corners on content, rounded on controls.** Benefit cards use `border-radius: 0`, deliberately civic and unadorned. Buttons, tabs, and inputs use a soft `4px` radius. Tabs themselves are full pills (`20px`).
- **4px base spacing rhythm**, scaling up to 8/10/12/16/24px for section gaps.
- **Left accent bar on hover.** Cards reveal a 4px colored bar on the left edge on hover instead of a full border change, a quiet, consistent hover language across the tool.

## Components

- **Tabs**: pill-shaped filter buttons, active state fills solid blue with white text.
- **Benefit card**: icon, title, badge row, description, single text link styled as underlined blue text (not a button), keeping the visual weight low.
- **Checklist**: progress bar plus a list of tappable rows, each with a checkbox that fills and pops (small scale animation) on completion.
- **Crisis banner**: pale yellow, left-bordered in a stronger yellow, always visible regardless of filter, this one never gets buried.
- **Footer actions**: one primary (white-on-blue) button, the rest secondary (outlined), following a strict one-primary-action-per-view rule.

## Why it looks like this

The GOV.UK-inspired aesthetic is intentional: sharp cards, restrained color, and plain-spoken labels signal "this is a real, trustworthy resource," not a marketing site. Every design choice optimizes for someone scanning quickly, under stress, on a phone, for the exact next thing they need to do.
