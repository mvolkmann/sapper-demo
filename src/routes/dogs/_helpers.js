const {MongoClient} = require('mongodb');

// MongoDB thinks localhost is a different database instance than 127.0.0.1.
// "mongo" shell uses 127.0.0.1, so use that to hit the same instance.
// I thought maybe this was an issue with my /etc/host file,
// but I commented out all the lines that associated 127.0.0.1
// with something other than localhost and it didn't help.
//const url = 'mongodb://localhost:27017';
const url = 'mongodb://127.0.0.1:27017';

const options = {useNewUrlParser: true, useUnifiedTopology: true};

let collection;

export async function getCollection() {
  if (!collection) {
    const client = await MongoClient.connect(url, options);
    //TODO: Is it okay that you never call client.close()?
    const db = client.db('animals');
    //eslint-disable-next-line require-atomic-updates
    collection = await db.collection('dogs');
  }

  return collection;
}
