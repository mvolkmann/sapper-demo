const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// MongoDB thinks localhost is a different database instance than 127.0.0.1.
// mongo shell uses 127.0.0.1, so use that to hit the same instance.
// I thought maybe this was an issue with my /etc/host file,
// but I commented out all the lines that associated 127.0.0.1
// with something other than localhost and it didn't help.
//const url = 'mongodb://localhost:27017';
const url = 'mongodb://127.0.0.1:27017';

const options = {useNewUrlParser: true, useUnifiedTopology: true};

async function doIt() {
  let client;
  try {
    client = await MongoClient.connect(url, options);

    const db = client.db('animals');

    const dogs = await db.collection('dogs');
    const count = await dogs.count();
    if (count > 0) await dogs.drop();

    await dogs.insertOne({breed: 'Whippet', name: 'Dasher'});
    await dogs.insertOne({breed: 'Treeing Walker Coonhound', name: 'Maisey'});
    await dogs.insertOne({breed: 'German Shorthaired Pointer', name: 'Oscar'});
    await dogs.insertOne({breed: 'Native American Indian Dog', name: 'Ramsey'});

    const result = await dogs.find().toArray();
    console.log('mongodb-demo.js x: result =', result);
    //TODO: Learn how to iterate over the dogs using a cursor.

    //TODO: Implement all the CRUD operations.

    //TODO: Use them from a Sapper app.
  } catch (e) {
    console.error(e);
  } finally {
    if (client) client.close();
  }
}

doIt();
