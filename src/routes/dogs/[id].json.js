// This file is for routes that require one path parameter.
const {ObjectId} = require('mongodb');
import {getCollection} from './_helpers.js';

export async function del(req, res) {
  const {id} = req.params;
  try {
    const collection = await getCollection();
    const result = await collection.deleteOne({_id: ObjectId(id)});
    if (result.deletedCount === 0) {
      res.status(400).send(`no dog with id ${id} found`);
    } else {
      res.end();
    }
  } catch (e) {
    res.status(500).json({error: e.message});
  }
}

export async function put(req, res) {
  const {id} = req.params;
  const replacement = req.body;
  delete replacement._id; // can't have this

  try {
    const collection = await getCollection();
    const result = await collection.replaceOne({_id: ObjectId(id)}, replacement);
    const [obj] = result.ops;
    obj._id = id; // missing this
    res.end(JSON.stringify(obj));
  } catch (e) {
    res.status(500).json({error: e.message});
  }
}
