# WordPress Theme Frontend Boilerplate

A modern webpack-based development environment for prototyping and building WordPress themes. This boilerplate lets you develop with live-reload, use HTML partials for reusable components, and compile production-ready CSS and JavaScript for your WordPress theme.

## Why This Boilerplate?

When developing WordPress themes, you often need to:
- **Prototype first** - Build and test HTML/CSS/JS before integrating with WordPress
- **Modern workflow** - Use Sass, ES6+, and live-reload during development
- **Clean separation** - Keep frontend development separate from WordPress PHP logic

This boilerplate solves these problems by providing a complete frontend development environment that mirrors WordPress theme structure, allowing you to build and perfect your templates before implementing them in WordPress.

**The PHP theme boilerplate:** Use [WordPress Theme Boilerplate](https://github.com/almazbisenbaev/wordpress-theme-boilerplate) to integrate the compiled frontend code into an actual WordPress theme.

## Features

- **Live development server** with hot reload
- **HTML partials** - Reusable components (header, footer, etc.)
- **Sass/SCSS** compilation with Bootstrap
- **Modern JavaScript** with Babel and webpack

## Quick Start

### Prerequisites
- [Node.js](https://nodejs.org) (v14 or higher)

### Installation

1. Clone this repository:
```bash
git clone <your-repo-url>
cd wordpress-theme-frontend-boilerplate
```

2. Install dependencies:
```bash
npm install
```

### Development

Start the development server with live reload:
```bash
npm start
```

Your browser will automatically open to `localhost:8080`. Any changes you make to HTML, Sass, or JavaScript files will automatically refresh the browser.

### Building for Production

When you're ready to use your code in WordPress:
```bash
npm run build
```

This creates a `/build/` folder with:
- Compiled and minified `style.css`
- Bundled JavaScript in `/js/`
- All assets (images, fonts) in their respective folders
- Compiled HTML files for reference

Copy the CSS and JS files from `/build/` into your WordPress theme folder.

## Project Structure

```
├── src/                          # Source files (edit these)
│   ├── index.html               # Homepage template
│   ├── blog-index.html          # Blog archive template
│   ├── blog-single.html         # Single post template
│   ├── page-template-default.html
│   ├── cart-empty.html
│   ├── components.html          # Component showcase
│   ├── partials/                # Reusable HTML components
│   │   ├── header.html
│   │   └── footer.html
│   ├── sass/                    # Sass/SCSS files
│   │   ├── style.scss           # Main stylesheet
│   │   ├── _vars.scss           # Variables
│   │   ├── _reset.scss          # CSS reset
│   │   ├── 0-mixins/            # Sass mixins
│   │   ├── 1-vendor/            # Third-party overrides
│   │   ├── 2-modifiers/         # Utility classes
│   │   ├── 3-components/        # Component styles
│   │   ├── 4-templates/         # Template-specific styles
│   │   └── 5-woo/               # WooCommerce styles
│   ├── scripts/                 # JavaScript files
│   │   ├── index.js             # Main JS entry point
│   │   └── helpers/             # JS utilities
│   ├── assets/                  # Theme assets
│   │   ├── fonts/
│   │   └── images/
│   └── uploads/                 # Mock WordPress uploads
├── build/                       # Compiled files (auto-generated)
├── webpack/                     # Webpack configuration
└── package.json
```

## Using HTML Partials

To avoid duplicating code like headers and footers, use HTML partials:

### Creating a Partial

Create HTML files in `src/partials/`:
```html
<!-- src/partials/header.html -->
<header>
  <div class="container">
    <nav>...</nav>
  </div>
</header>
```

### Including a Partial

In any HTML page, use the require syntax:
```html
<!DOCTYPE html>
<html>
<body>
  <%= require('./partials/header.html') %>
  
  <main>
    Your page content
  </main>
  
  <%= require('./partials/footer.html') %>
</body>
</html>
```

The partials will be automatically included during the build process.

## Folder Guidelines

### `/src/assets/`
Theme-specific assets that will be part of your WordPress theme (logos, icons, background images, fonts, etc.). These will be copied to `/build/assets/`.

### `/src/uploads/`
Mock content images that simulate WordPress media uploads. Use this for prototype content images. In production, these would come from WordPress's actual uploads folder.

### `/build/`
**Do not edit files here!** This folder is automatically generated and cleaned on each build. Only use these files to copy into your WordPress theme.

## WordPress Integration

After building, integrate with WordPress:

1. Copy `build/style.css` to your theme root
2. Copy `build/js/` folder to your theme
3. Copy `build/assets/` folder to your theme
4. Use the HTML files in `build/` as reference when creating your PHP templates
5. Enqueue the CSS and JS in your theme's `functions.php`:

```php
function theme_enqueue_scripts() {
    wp_enqueue_style('theme-style', get_stylesheet_uri());
    wp_enqueue_script('theme-script', get_template_directory_uri() . '/js/main.js', array(), '1.0', true);
}
add_action('wp_enqueue_scripts', 'theme_enqueue_scripts');
```

## Available Scripts

- `npm start` - Start development server with live reload
- `npm run build` - Build production-ready files

## Technologies Used

- **Webpack 5** - Module bundler
- **Babel** - JavaScript transpiler
- **Sass** - CSS preprocessor
- **Bootstrap 5** - CSS framework
- **html-loader** - HTML partials support
- **ESLint** - Code linting
