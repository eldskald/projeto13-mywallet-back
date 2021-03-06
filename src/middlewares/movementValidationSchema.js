import joi from 'joi';

const movementSchema = joi.object({
    amount: joi.number().positive().required(),
    description: joi.string().required(),
    type: joi.string().valid('entrance', 'exit').required()
});

function movementValidationSchema (req, res, next) {
    const validation = movementSchema.validate(req.body);
    if (validation.error) {
        return res.status(422).send('Preencha os campos corretamente!');
    }

    next();
}

export default movementValidationSchema;
