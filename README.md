# CyberSale
 
CyberSale is a cyberpunk-themed e-commerce storefront for gaming hardware, built entirely with vanilla HTML, CSS, and JavaScript, with no frameworks, bundlers, or build tools required to run it. The project simulates a full online store experience, letting a visitor browse products, filter and search the catalog, manage a cart and wishlist, complete a mock checkout, and even log in to view order history, all backed by an in-memory product catalog rather than a real server.
 
## What the site does
 
The homepage greets visitors with a rotating promotional banner and a flat, image-icon category strip covering eleven categories, including Laptops, Gaming PCs, Handhelds, Monitors, Projectors, Accessories, Sound, Networking, Gaming Chairs, eMobility, and a special New Products category that automatically surfaces items flagged as new arrivals. Below that sits the main product grid, which can be narrowed down using a live search bar, a category dropdown, sidebar checkboxes for every category, and a maximum price slider, with all filters working together and updating the grid instantly as they change. Each product can be opened in a detail view showing its full specifications, added to the cart or wishlist, and wishlist items can be moved into the cart in a single click. The cart itself is presented as a slide-out drawer that calculates GST automatically and leads into a full checkout flow complete with an animated, live-updating credit card graphic for the card holder name, number, expiry, and CVV fields. There is also a lightweight mock authentication system so a visitor can log in, see a simulated order history, and log back out, plus an admin panel that lets someone inject, edit, or delete products directly from the browser, though none of these changes are saved permanently since everything resets on page refresh.
 
## Technical structure
 
The project is split into four files that sit side by side in the same folder: `index.html` holds all of the page markup for the home view, checkout view, user profile view, and admin view, switching between them by toggling an active class rather than through real page navigation; `style.css` contains the entire cyberpunk visual design system, including the neon pink, cyan, purple, green, and yellow accent palette and the dark background theme; `products.js` seeds the store with fifteen mock products complete with pricing, ratings, specifications, and images; and `app.js` contains every piece of interactive logic, from rendering the product grid and handling filters to managing the cart, wishlist, checkout, authentication, and admin panel. An `images` folder sits alongside these files and holds the custom product renders, the site logo, and the cyberpunk cityscape background image, all referenced with relative paths so the whole project is self-contained and works without any external image hosting.
 
## Running the project
 
Because there is no build step, the site can be opened directly by double-clicking `index.html` in a file browser, or served locally with any static file server, such as running `npx serve .` from inside the project folder and then visiting the address it prints in a browser. There is deliberately no `npm run dev` or `npm start` script, since the project does not use Node.js, React, or any bundler at runtime.
 
## Known limitations
 
All application state, including the cart, wishlist, login session, order history, and any products added or edited through the admin panel, lives only in memory for the current browser tab and is lost the moment the page is refreshed, since there is no backend database or persistent storage layer behind the site. The mock login form also accepts any username without real password validation, which is intentional for a demo project but should not be mistaken for a real authentication system.
 
## Credits
 
This project was built by Viknesh V as part of an ongoing series of frontend and full-stack practice builds, combining a cyberpunk visual identity with a functionally complete shopping experience to demonstrate vanilla JavaScript state management, DOM rendering, and interactive UI design without relying on any external frameworks.
 
