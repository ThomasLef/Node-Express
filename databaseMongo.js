import { MongoClient } from "mongodb";

const url = 'mongodb://localhost:27017/test'

const mongoClient = new MongoClient(url)

async function addData (item, db, collection) { // Works for sure
    await mongoClient.connect()
    const result = await mongoClient.db(db).collection(collection).insertOne(item)
}

async function getData (db, collection) {
    var result = []
    await mongoClient.connect()
    const cursor = mongoClient.db(db).collection(collection).find()
    await cursor.forEach((doc) => {
        result.push(doc)
    })
    return result
}
export {addData, getData}