const Joi = require('joi');

const accounSchena = Joi.object({
  name: Joi.string().required(),
  surname: Joi.string().required(),
  email: Joi.string().email().required(),
  accountNumber: Joi.string().required(),
});

export default accounSchena;
