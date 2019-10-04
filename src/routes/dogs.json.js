const MongoClient = require('mongodb').MongoClient;

// MongoDB thinks localhost is a different database instance than 127.0.0.1.
// mongo shell uses 127.0.0.1, so use that to hit the same instance.
// I thought maybe this was an issue with my /etc/host file,
// but I commented out all the lines that associated 127.0.0.1
// with something other than localhost and it didn't help.
//const url = 'mongodb://localhost:27017';
const url = 'mongodb://127.0.0.1:27017';

const options = {useNewUrlParser: true, useUnifiedTopology: true};

let client;
let db;
let collection;

async function setCollection() {
  if (!collection) {
    if (!db) {
      if (!client) {
        client = await MongoClient.connect(url, options);
      }
      db = client.db('animals');
    }
    collection = await db.collection('dogs');
  }
}

export async function get(req, res, next) {
  try {
    // To test error handling ...
    //throw new Error('bad thing happened');

    //TODO: Should you connect and disconnect on every request?
    await setCollection();

    const count = await collection.countDocuments();
    if (count === 0) {
      await collection.insertOne({breed: 'Whippet', name: 'Dasher'});
      await collection.insertOne({breed: 'Treeing Walker Coonhound', name: 'Maisey'});
      await collection.insertOne({breed: 'German Shorthaired Pointer', name: 'Oscar'});
      await collection.insertOne({breed: 'Native American Indian Dog', name: 'Ramsey'});
    }

    const result = await collection.find().toArray();
    res.end(JSON.stringify(result));
  } catch (e) {
    res.status(500).json({error: e.message});
  } finally {
    //if (client) client.close();
  }
}

export async function post(req, res, next) {
  await setCollection();
}