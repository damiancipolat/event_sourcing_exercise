const Joi = require('joi');

const transactionSchema = Joi.object({
  type: Joi.string().valid('deposit', 'withdraw').required(),
  ammount: Joi.number().required(),
  accountId: Joi.string().required(),
});

export default transactionSchema;
