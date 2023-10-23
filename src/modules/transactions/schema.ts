const Joi = require('joi');

const transactionSchema = Joi.object({
  type: Joi.string().valid('deposit', 'withdraw').required(),
  amount: Joi.number().required(),
  accountId: Joi.string().required(),
});

export default transactionSchema;
