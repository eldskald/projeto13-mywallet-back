import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../db.js';

export async function signUp (req, res) {
    console.log(db);
    try {
        const body = req.body;
        const passwordHash = await bcrypt.hash(body.password, 10);
        await db.accounts.insertOne({
            name: body.name,
            email: body.email,
            passwordHash
        });
        return res.status(201).send('Conta criada.');

    } catch (err) {
        console.log(err);
        return res.status(500).send('Erro interno do servidor.');
    }
}

export async function signIn (_req, res) {
    try {
        const account = res.locals.account;
        const token = uuidv4();
        await db.sessions.insertOne({
            userId: account._id,
            token
        });
        return res.status(200).send(token);

    } catch (err) {
        console.log(err);
        return res.status(500).send('Erro interno do servidor.');
    }
}
