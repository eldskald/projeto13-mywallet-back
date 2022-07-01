import { db } from '../db.js';

async function tokenValidation (req, res, next) {
    try {
        const { authorization } = req.headers;
        const token = authorization?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).send('Erro de validação!');
        }

        const session = await db.sessions.findOne({ token });
        if (!session) {
            return res.status(401).send('Erro de validação!');
        }

        const user = await db.accounts.findOne({ _id: session.userId });
        if (!user) {
            return res.status(401).send('Erro de validação!');
        }

        res.locals.user = user;
        next();
    } catch (err) {
        console.log(err);
        return res.status(500).send('Erro interno do servidor.');
    }
}

export default tokenValidation;
