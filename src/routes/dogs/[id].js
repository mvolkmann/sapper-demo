// This file is for routes that require one path parameter.
const {ObjectId} = require('mongodb');
import {getCollection} from './_helpers.js';

export async function del(req, res, next) {
  const {id} = req.params;
  try {
    const collection = await getCollection();
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

export async function put(req, res, next) {
  const {id} = req.params;
  const dog = req.body;
  try {
    const collection = await getCollection();

    const result = await collection.replaceOne({_id: id}, dog);
    const obj = result.ops[0];
    res.end(JSON.stringify(obj));
  } catch (e) {
    res.status(500).json({error: e.message});
  }
}
