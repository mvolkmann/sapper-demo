const {MongoClient, ObjectId} = require('mongodb');

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

export async function del(req, res, next) {
  const {id} = req.query;
  try {
    await setCollection();
    const result = await collection.deleteOne({_id: ObjectId(id)})
    if (result.deletedCount === 0) {
      res.status(400).send(`no dog with id ${id} found`)
    } else {
      res.end();
    }
  } catch (e) {
    res.status(500).json({error: e.message});
  }
}

export async function get(req, res, next) {
  console.log('dogs.json.js get: entered');
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
  // } finally {
  //   if (client) client.close();
  }
}

export async function post(req, res, next) {
  const {body} = req;
  try {
    await setCollection();

    const result = await collection.insertOne(body);
    const id = result.insertedId;
    console.log('dogs.json.js post: id =', id);
    const obj = result.ops[0];
    res.end(JSON.stringify(obj));
  } catch (e) {
    res.status(500).json({error: e.message});
  }
}
