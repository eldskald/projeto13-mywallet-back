import joi from 'joi';
import { db } from '../db.js';

const movementSchema = joi.object({
    amount: joi.number().required(),
    description: joi.string().required(),
    type: joi.string().valid('entrance', 'exit').required()
})

export async function getMovements (req, res) {
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
