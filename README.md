# 誠 株式会社 / Makoto Corporation Website

This is the official corporate website for Makoto Corporation, a company based in Osaka, Japan, specializing in real estate, land trading, and financial product investment.

**Live site:** [https://makoto.ltd](https://makoto.ltd)

## Features

- Multilingual support (Japanese, English, and Chinese)
- Responsive design for all devices
- Modern, professional design with animations
- Contact form for inquiries (powered by Formspree)
- SEO optimized with Open Graph, Twitter Cards, and JSON-LD
- Accessible (ARIA attributes, skip navigation, focus styles)
- Easy to deploy on GitHub Pages

## Project Structure

```
.
├── index.html              # Main HTML file
├── css/
│   └── style.css           # CSS styles
├── js/
│   └── script.js           # JavaScript functionality
├── images/                 # Image assets
│   ├── hero.jpg            # Hero section background
│   ├── office.jpg          # Office image for About section
│   └── favicon.svg         # Site favicon
├── robots.txt              # Search engine directives
├── sitemap.xml             # Sitemap for SEO
├── 404.html                # Custom 404 error page
├── CNAME                   # Custom domain configuration
└── README.md               # This file
```

## Setup and Development

1. Clone this repository:

```bash
git clone https://github.com/jerrylin0318/makoto.git
cd makoto
```

2. For local development, use any simple web server:

```bash
# Python 3
python -m http.server
```

3. Visit `http://localhost:8000` in your browser.

## Deployment

This site is automatically deployed to GitHub Pages via GitHub Actions on push to `main`.

## Customization

### Changing Images

Replace the images in the `images/` directory. Recommended sizes:
- Hero background: 1920px width, high-quality JPG
- Office image: 800px width, high-quality JPG

### Changing Content

Edit `index.html` to update text content in all three languages (JA/EN/ZH).

### Changing Colors

Modify CSS custom properties in the `:root` section of `css/style.css`.

### Contact Form

The contact form submits to [Formspree](https://formspree.io/). Update the form `action` URL in `index.html` with your own Formspree endpoint.

## License

All rights reserved. This website is proprietary to Makoto Corporation.
