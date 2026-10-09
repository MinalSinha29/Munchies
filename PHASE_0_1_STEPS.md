# Phase 0 and Phase 1: how to apply

## Phase 0 (clean-up) - do these first, in your Munchies folder

1. Make a NEW JWT secret and put it in your local backend/.env (the old one is public on GitHub):
       node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
2. Add the lines from gitignore_additions.txt to the end of your .gitignore
3. Stop tracking the secret file and node_modules (this keeps the files on your disk):
       git rm -r --cached backend/.env backend/node_modules
4. Delete the unused duplicate files (list below), then commit:
       git add .
       git commit -m "Phase 0: remove secrets and node_modules from git, delete unused files"
       git push

Files to delete (nothing imports them):
  src/RestaurantList.js
  src/RestaurantMenu.js
  src/components/Home.js
  src/components/RestaurantList.js
  src/components/RestaurantPage.jsx
  src/components/LoginPage.jsx
  src/pages/Home.js
  src/pages/RestaurantDetail.jsx
  src/data/restaurants.js        (the menu page now loads from the backend)

## Phase 1 (data, orders, cart)

5. Copy the folders from this zip over your project, keeping the same paths
   (backend/, src/, knowledge/). Say yes to overwrite.
6. In backend/:  npm install   (nothing new to install)
7. Make sure MongoDB is running, then:
       cd backend
       npm run seed          (menu: 17 restaurants, 85 dishes with details)
       npm run seed:orders   (48 sample users + about 366 sample orders)
       npm test              (6 tests should pass)
8. Start backend (npm run dev) and frontend (npm start), then test:
   - open a restaurant: dishes show veg dot, spice, description, allergens
   - add items, go to payment while LOGGED OUT: you should be sent to /auth
   - log in, place an order: the bill should open, totals include 5% GST
   - log in as sample user sample1@munchies.test / Sample@123 and open My Orders
9. Commit:  git add . && git commit -m "Phase 1: dish details, itemId cart, secure orders, sample data"
