
# Notes

This folder contains the pure-HTML templates (a prototype) for the theme, as well as the source files for CSS and JS. It is used to code and build CSS and JS files for the theme, and the HTML files are used to prototype the WordPress templates before implementing them into WordPress.

# Folder structure

`/wp-content-uploads/` is the equivalent of the `/uploads/` folder on WordPress. That is, if you need to use an image/video that is not a part of the theme, and will eventually end up in wordpress uploads, put that file there.

`/assets/` is the folder that contains assets of the theme (images, videos, fonts, etc.). That folder should end up in the theme folder.

`/src/` is the actual source code that you need to edit.

---

If you need to make changes to the CSS or JS files of the theme, you will have to edit those files here (in `/src/` folder) and **build** them. The compiled CSS and JS files in `/build/` folder should be copied into the theme folder.


### How to edit this prototype

What you're gonna need:
- NodeJS (nodejs.org)

Clone this repo to your folder and...
1. Open a terminal in the folder
2. Do `npm install` and wait until all modules are installed


### Start local server and make changes live

1. Do `npm start`
2. Go to `localhost:8080`

All your changes will be showing up in browser


### Compile the folder

When you're done with all the changes, you will need to **build** the code, so that you can take the compiled CSS and JS files and put them into the WordPress theme.

1. Do `npm run build`
2. Find compiled files in `/build/` folder.


---

# Folder structure

All the changes shoudl be made only inside the `/src/` folder. Don't touch the `/build/` folder.


#### HTML

Apart from the HTML page templates, there is a folder called `html-partials` for reusable HTML components.

---

**Don't edit anything in /build/ folder, it will be deleted automatically when you compile the code.**
