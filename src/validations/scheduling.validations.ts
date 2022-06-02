import { Joi } from 'celebrate';

const createSchedulingSchema = Joi.object().keys({
  type: Joi.number().valid(0, 1, 2).required(),
  day: Joi.string()
    .regex(/^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[012])-[12][0-9]{3}$/)
    .optional(),
  daysOnWeek: Joi.array()
    .items(Joi.number().valid(0, 1, 2, 3, 4, 5, 6).required())
    .optional(),
  intervals: Joi.array()
    .items(
      Joi.object({
        start: Joi.string()
          .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
          .required(),
        end: Joi.string()
          .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
          .required(),
      }),
    )
    .required(),
});

const deleteSchedulingSchema = { id: Joi.string().uuid().required() };

const getSchedulingAvaliable = {
  start: Joi.string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .required(),
  end: Joi.string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .required(),
};

export {
  createSchedulingSchema,
  deleteSchedulingSchema,
  getSchedulingAvaliable,
};
