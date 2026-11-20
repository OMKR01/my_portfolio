# Om Kumar — Portfolio

[![Live Site](https://img.shields.io/badge/live-site-6366f1?style=flat-square)](https://my-portfolio-one-lyart-70.vercel.app)
[![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](#license)

A personal portfolio site for **Om Kumar** — MCA graduate specializing in data analysis and machine learning, with additional full-stack development experience. Built as a fast, dependency-light static site with modern interactive UI touches: animated hero typewriter, theme toggle, scroll-driven reveals, 3D card tilt, and more.

**🔗 Live:** [my-portfolio-one-lyart-70.vercel.app](https://my-portfolio-one-lyart-70.vercel.app)

---

## ✨ Features

- **Dark / light theme toggle** with persisted preference (`localStorage`)
- **Animated hero section** — gradient name, typewriter role rotation, cursor glow (desktop)
- **Scroll-driven UI** — top progress bar, section-aware nav highlighting, staggered reveal animations, animated timeline fill
- **Interactive cards** — 3D tilt on hover, cursor-tracking spotlight glow, count-up stat numbers
- **Fully responsive** — mobile drawer navigation, adaptive grid layouts
- **Zero build step** — plain HTML/CSS/JS, deployable as-is

## 📂 Sections

| Section | Content |
|---|---|
| **Hero** | Intro, role typewriter, quick stats, resume download, social links |
| **Experience** | Internship & professional timeline (D'NOTES, NSL Technologies) |
| **Projects** | HydroPulse AI (flood prediction ML system), Personal Finance Tracker |
| **Skills** | Data & Analytics, Databases, Development, Tools, Core Concepts |
| **Education** | MCA (Amity University Jharkhand) & B.Sc IT (Gossner College) + certifications |
| **Contact** | Email, phone, LinkedIn, GitHub |

## 🛠️ Tech Stack

- **Markup / Styling:** HTML5, CSS3 (custom properties, Grid/Flexbox)
- **Scripting:** Vanilla JavaScript (`IntersectionObserver`, `requestAnimationFrame`)
- **Icons:** [Lucide Icons](https://lucide.dev)
- **Fonts:** [Inter](https://fonts.google.com/specimen/Inter) & [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) via Google Fonts
- **Hosting:** [Vercel](https://vercel.com)

## 📁 Project Structure

```
my_portfolio/
├── index.html          # Page markup & content
├── style.css           # All styling, theme variables, animations
├── main.js             # Interactivity: theme toggle, nav, scroll effects, animations
├── OM_KUMAR_CV.pdf     # Downloadable resume
└── README.md
```

## 🚀 Getting Started

No build tools or dependencies required.

```bash
git clone https://github.com/OMKR01/my_portfolio.git
cd my_portfolio
```

Open `index.html` directly in a browser, or serve it locally for live-reload (recommended, especially since this repo includes a `Live Server` config):

```bash
# Using VS Code's "Live Server" extension (settings already in settings.json)
# Right-click index.html → "Open with Live Server"

# ...or with Python
python -m http.server 5501
```

Then visit `http://localhost:5501`.

## 🌐 Deployment

This site is deployed on **Vercel** as a static site — no build configuration needed. Any push to the main branch redeploys automatically.

To deploy your own copy:

1. Fork / clone this repo
2. Import it into [Vercel](https://vercel.com/new)
3. Leave the framework preset as "Other" (static)
4. Deploy

## 📬 Contact

**Om Kumar**
📍 Ranchi, Jharkhand, India
✉️ [omkr544@gmail.com](mailto:omkr544@gmail.com)
🔗 [LinkedIn](https://linkedin.com/in/omkr03) · [GitHub](https://github.com/OMKR01)

## License

This project is open source and available under the [MIT License](LICENSE).
