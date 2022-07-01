import joi from 'joi';
import bcrypt from 'bcrypt';
import { db } from '../db.js';

const signinSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
});

async function signinValidation (req, res, next) {
    try {
        const body = req.body;

        const joiValidation = signinSchema.validate(body);
        if (joiValidation.error) {
            return res.status(422).send('Preencha os campos corretamente!');
        }

        const account = await db.accounts.findOne({ email: body.email });
        if (!account) {
            return res.status(401).send('Email ou senha inválidos!');
        }

        const hashCheck = await bcrypt.compare(body.password, account.passwordHash);
        if (!hashCheck) {
            return res.status(401).send('Email ou senha inválidos!');
        }

        res.locals.account = account;
        next();

    } catch (err) {
        console.log(err);
        return res.status(500).send('Erro interno do servidor.');
    }
}

export default signinValidation;
