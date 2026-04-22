# Bus Route Navigator

This is a lightweight starter app for substitute school-bus drivers.

## What it does

- Lets you choose a saved route from a dropdown
- Shows the stops in driving order
- Opens Google Maps with the full route prefilled

## How to use it

1. Open `index.html` in a browser.
2. Pick the route you need.
3. Click **Open in Google Maps**.

## Install on a phone

For a real home-screen app, these files need to be hosted on a website over HTTPS.

- Upload the files to any simple host such as GitHub Pages, Netlify, or Vercel
- Open the hosted site on your phone
- Use **Add to Home Screen** in Chrome or Safari
- After that, it will open like an app from your home screen

This version includes:

- a web app manifest
- a service worker for basic offline app loading
- a mobile-friendly layout
- an install button on browsers that support it

## Publish on GitHub Pages

1. Create a new public GitHub repository.
2. Upload all files from this folder to the repository root.
3. In GitHub, open **Settings** > **Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Set the branch to **main** and folder to **/(root)**, then save.
6. Wait a minute or two for GitHub Pages to publish your site.

Your site URL will usually be:

- `https://YOUR-GITHUB-USERNAME.github.io/REPOSITORY-NAME/`

If you want the app at the root like `https://YOUR-GITHUB-USERNAME.github.io/`, the repository name must be:

- `YOUR-GITHUB-USERNAME.github.io`

## How to customize routes

Edit the `routes` array in `app.js`.

Each route object should include:

- `id`: unique short id
- `name`: label shown in the dropdown
- `school`: school or route label
- `start`: where the route begins
- `end`: where the route ends
- `stops`: addresses in the order you want Google Maps to follow

## Next upgrades we can add

- Import routes from CSV or Excel
- Driver login and route notes
- Separate AM and PM route groups
- A mobile-friendly installable app
- Student stop pickup checklist
- Route search by route number or school
