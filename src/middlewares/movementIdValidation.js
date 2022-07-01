import { ObjectId } from "mongodb";
import { db } from "../db.js";

async function movementIdValidation (req, res, next) {
    const id = req.params.id;
    const movement = await db.movements.findOne({ _id: ObjectId(id) });
    if (!movement) {
        return res.status(404).send('Movimentação não encontrada.');
    }

    const userId = res.locals.user._id;
    if (movement.userId.toString() != userId.toString()) {
        return res.status(401).send('Operação não permitida!');
    }

    next();
}

export default movementIdValidation;
