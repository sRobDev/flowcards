# Flowcards (Major Work-in-Progress!)
Simple and fast flashcards app built for [Digital Ocean's MongoDB Hackathon](https://www.digitalocean.com/mongodb-hackathon/).

## Features:
**Current:**
- Registration/Login, users stored in MongoDB, with password encryption through [bcrypt](https://www.npmjs.com/package/bcrypt)
- JWT Bearer token auth strategy with protected routes on the front and backend
- Create/update/delete cards
- Quiz yourself on your cards

**Future:**
- Mobile friendliness
- More UI polish
- Searching cards
- Sorting cards
- Creating topics
- Adding cards to topics
- Search/sort/etc for topics


## Stack:
- MongoDB/Mongoose
- Node/Express
- Vite
- React
- SASS
- Nanostores
- Chakra UI

**Hosted On:** Digital Ocean's App Platform and managed MongoDB

### Setup

This app can be viewed live on Digital Ocean's App Platform here: https://flowcards-xvz8u.ondigitalocean.app/

These setup notes are also specifically for working on my hackathon version of the app, so the MongoDB connection is pointing to my DB. Feel free to change that out for your own DB if you really want to run this app that badly 😅.

**Frontend:**
1. `cd /frontend/flowcardsUI`
2. `npm i`
3. `npm run dev`

**Backend:**
1. `cd /server`
2. `npm i`
3. Create a new `.env` file containing:
```
DB_USER=<your_db_user>
DB_PASS=<your_db_password>
JWT_SECRET=<your_jwt_secret>
```
4. `npm run dev`
