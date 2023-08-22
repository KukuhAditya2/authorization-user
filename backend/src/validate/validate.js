import ResponseError from "../error/responseError.js";

const validate = (scema, request) => {
  const { error, value } = scema.validate(request, {
    abortEarly: false,
    allowUnknown: false,
  });

  if (error) {
    throw new ResponseError(400, error.message);
  } else {
    return value;
  }
};

export default validate;
