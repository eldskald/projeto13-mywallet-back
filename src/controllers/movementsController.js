import dayjs from 'dayjs';
import { db } from '../db.js';

export async function getMovements (_req, res) {
    try {
        const user = res.locals.user;
        const arr = await db.movements
            .find({ userId: user._id })
            .sort({ time: 1 })
            .toArray();
        return res.status(200).send(arr);

    } catch (err) {
        console.log(err);
        return res.status(500).send('Erro interno do servidor.');
    }
}

export async function newMovement (req, res) {
    try {
        const user = res.locals.user;
        const body = req.body;
        await db.movements.insertOne({
            ...body,
            userId: user._id,
            time: dayjs().format('DD/MM/YYYY HH:mm:ss')
        });
        return res.status(201).send('Movimentação criada.');

    } catch (err) {
        console.log(err);
        return res.status(500).send('Erro interno do servidor.');
    }
}
