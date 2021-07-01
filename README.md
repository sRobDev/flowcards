# Flowcards
Simple and fast flashcards app built for [Digital Ocean's MongoDB Hackathon](https://www.digitalocean.com/mongodb-hackathon/).

## Stack:
- MongoDB/Mongoose
- Node/Koa
- Vite
- React
- SASS


### Setup

**NOTE:** As of July 1, 2021, the frontend and backend are not connected... I refactored the API and have yet to refactor the frontend (plus hosting on DO instead of Heroku).

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
```
4. `npm run dev`
