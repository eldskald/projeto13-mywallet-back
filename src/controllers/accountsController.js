import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import joi from 'joi';

import { db } from '../database/mongo.js';

const signinSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
});

const signupSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    passwordConfirm: joi.string().required()
});

export async function signUp (req, res) {
    console.log(db);
    try {
        const body = req.body;

        // Validating posted data
        const joiValidation = signupSchema.validate(body);
        if (joiValidation.error) {
            return res.status(422).send('Preencha os campos corretamente!');
        }

        const searchEmail = await db.accounts.findOne({ email: body.email });
        if (searchEmail) {
            return res.status(409).send('Email já cadastrado!');
        }

        if (body.password !== body.passwordConfirm) {
            return res.status(403).send('Confirme a senha corretamente!');
        }

        // Validation successful
        const passwordHash = await bcrypt.hash(body.password, 10);
        await db.accounts.insertOne({
            name: body.name,
            email: body.email,
            passwordHash
        });
        return res.sendStatus(201);

    } catch (err) {
        console.log(err);
        return res.status(500).send('Erro interno do servidor.');
    }
}

export async function signIn (req, res) {
    try {
        const body = req.body;
        
        // Validating posted data
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

        // Validation successful
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
