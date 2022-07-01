import joi from 'joi';
import { db } from '../db.js';

const signupSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    passwordConfirm: joi.string().required()
});

async function signupValidation (req, res, next) {
    try {
        const body = req.body;

        const joiValidation = signupSchema.validate(req.body);
        if (joiValidation.error) {
            return res.status(422).send('Preencha os campos corretamente!');
        }

        const searchEmail = await db.accounts.findOne({ email: body.email });
        if (searchEmail) {
            return res.status(409).send('Email já cadastrado!');
        }

        if (body.password !== body.passwordConfirm) {
            return res.status(401).send('Confirme a senha corretamente!');
        }

        next();

    } catch (err) {
        console.log(err);
        return res.status(500).send('Erro interno do servidor.');
    }
}

export default signupValidation;
