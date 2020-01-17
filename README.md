# sapper-demo

Steps to setup MongoDB on macOS:

1. `brew tap mongodb/brew`
1. `brew install mongodb-community`
1. `cd`
1. `mkdir -p data/db`
1. `mongod --dbpath=$HOME/data/db`

Steps to verify MongoDB setup:

1. `npm run md` to run `src/mongodb-demo.js`
1. `mongo` to start the interactive tool
1. `use animals` to select a database
1. `db.dogs.find()` to list all records in the dogs collection
   that were inserted by `npm run md`

Steps to run the Sapper app:

1. `npm install`
1. `npm run dev`
1. browse localhost:3000
