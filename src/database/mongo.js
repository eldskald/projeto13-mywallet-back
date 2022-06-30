import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();
const MONGO_URI = process.env.MONGO_URI;

const dbClient = new MongoClient(MONGO_URI);
export let db;

export async function connectDatabase () {
    try {
        await dbClient.connect();
        const database = dbClient.db('my-wallet');
        db = {
            accounts: database.collection('accounts'),
            sessions: database.collection('sessions'),
            movements: database.collection('movements')
        }
    } catch (err) {
        console.log(err);
    }
}
