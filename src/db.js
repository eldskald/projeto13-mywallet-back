import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();
const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME;

const dbClient = new MongoClient(MONGO_URI);
export let db;

export async function connectDatabase () {
    try {
        await dbClient.connect();
        const database = dbClient.db(DB_NAME);
        db = {
            accounts: database.collection('accounts'),
            sessions: database.collection('sessions'),
            movements: database.collection('movements')
        }
    } catch (err) {
        console.log(err);
    }
}
