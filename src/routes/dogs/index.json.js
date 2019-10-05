// This file is for routes that do not require any path parameters.
import {getCollection} from './_helpers';

export async function get(req, res) {
  try {
    // To test error handling ...
    //throw new Error('bad thing happened');

    const collection = await getCollection();

    const count = await collection.countDocuments();
    if (count === 0) {
      await collection.insertOne({breed: 'Whippet', name: 'Dasher'});
      await collection.insertOne({
        breed: 'Treeing Walker Coonhound',
        name: 'Maisey'
      });
      await collection.insertOne({
        breed: 'German Shorthaired Pointer',
        name: 'Oscar'
      });
      await collection.insertOne({
        breed: 'Native American Indian Dog',
        name: 'Ramsey'
      });
    }

    const result = await collection.find().toArray();
    res.end(JSON.stringify(result));
  } catch (e) {
    res.status(500).json({error: e.message});
  }
}

export async function post(req, res) {
  const dog = req.body;
  try {
    const collection = await getCollection();
    const result = await collection.insertOne(dog);
    const [obj] = result.ops;
    res.end(JSON.stringify(obj));
  } catch (e) {
    res.status(500).json({error: e.message});
  }
}
