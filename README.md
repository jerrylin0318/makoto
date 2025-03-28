# 誠 株式会社 / Makoto Corporation Website

This is the official corporate website for Makoto Corporation, a company based in Osaka, Japan, specializing in real estate, land trading, and financial product investment.

## Features

- Multilingual support (Japanese, English, and Chinese)
- Responsive design for all devices
- Modern, professional design with animations
- Contact form for inquiries
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
│   └── office.jpg          # Office image for About section
└── README.md               # This file
```

## Setup and Development

1. Clone this repository to your local machine:

```bash
git clone https://github.com/yourusername/makoto-corporation.git
cd makoto-corporation
```

2. Open the files in your preferred code editor.

3. For local development, you can use any simple web server. For example, with Python:

```bash
# Python 3
python -m http.server
```

4. Visit `http://localhost:8000` in your browser to see the website.

## Deployment to GitHub Pages

Follow these steps to deploy the website on GitHub Pages:

1. Create a repository on GitHub (if you haven't already).

2. Push the code to the GitHub repository:

```bash
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/yourepository.git
git push -u origin main
```

3. Configure GitHub Pages in your repository settings:
   - Go to your repository on GitHub
   - Click on "Settings"
   - Scroll down to "GitHub Pages" section
   - Select "main" or "master" branch as the source
   - Click "Save"

4. Your website will be published at `https://yourusername.github.io/yourepository/`

## Customization

### Changing Images

1. Replace the images in the `images/` directory with your own. Make sure to keep the same filenames or update the references in the HTML and CSS.

2. Optimal image sizes:
   - Hero background: 1920px width, high-quality JPG
   - Office image: 800px width, high-quality JPG

### Changing Content

Edit the HTML file to update the text content in all three languages.

### Changing Colors

The color scheme can be modified in the CSS file by changing the variables in the `:root` section.

## License

All rights reserved. This website is proprietary to Makoto Corporation.

## Contact

For inquiries, please contact:
- Director: Kobayashi Hisao
- Email: XXX@DDD.com
- Phone: +XXXXXX 