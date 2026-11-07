# FOODIE — Restaurant Reservation Website

A responsive restaurant landing page built with HTML, CSS and vanilla JavaScript.

## Files
- `index.html` — page structure and reservation form
- `style.css` — responsive orange, black and white design
- `script.js` — form submission and Google Apps Script connection

## Google Sheets connection
The form sends URL-encoded fields to the FOODIE Google Apps Script web app configured in `script.js`. The Apps Script must be deployed as a web app with:
- Execute as: **Me**
- Who has access: **Anyone**

The Apps Script `doPost(e)` handler must append the form fields (`name`, `email`, `phone`, `guests`, `date`, `time`, `preferences`, `requests`) to the `Reservations` sheet.

## Local preview
Open `index.html` in a browser. For best results, use a local development server or GitHub Pages.

## Publish with GitHub Pages
1. Create a public repository named `foodie-restaurant-website`.
2. Upload `index.html`, `style.css`, and `script.js` to the repository root.
3. In repository Settings → Pages, choose **Deploy from a branch**, select `main` and `/ (root)`, then Save.
4. Wait for GitHub Pages to publish the site.

## Important testing note
The browser uses `no-cors` for the Apps Script POST, so it cannot read the server's response. A browser-side success message means the request was handed off, not independently verified as a saved spreadsheet row. Test with a sample reservation and confirm that it appears in the `Reservations` tab.
