import { MongoClient } from "mongodb";

const url = 'mongodb://localhost:27017/test'

const mongoClient = new MongoClient(url)

export default mongoClient