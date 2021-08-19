import httpStatus from 'http-status';
import {
  EntityNotFound,
  InvalidFormatIdError,
  AlreadyUsedEntityError,
  InvalidLocationError,
  NotAuthorizedError,
  ValidationError,
  UknownServerError,
} from '../errors/knownErrors';
import logger from '../utils/logger';

function sendResErrorStatus(res, err) {
  res.status(err.status).json({
    message: err.message,
    error_code: err.errorCode,
  }).end();
}

function throwUnknownError(res, err) {
  if (err) {
    return res.status(500).json({
      message: err,
    });
  }
  return Promise.reject(new UknownServerError());
}

function throwKnownError(res, err) {
  switch (err.name) {
    case 'CastError':
      if (err.kind === 'ObjectId') {
        sendResErrorStatus(res, new InvalidFormatIdError());
      } else {
        throwUnknownError(res, err);
      }
      break;
    case 'ValidationError':
      if (err.kind === 'ObjectId') {
        sendResErrorStatus(res, new ValidationError(err.message));
      } else {
        throwUnknownError(res, err);
      }
      break;
    case 'MongoError':
      switch (err.code) {
        case 11000:
          sendResErrorStatus(res, new AlreadyUsedEntityError());
          break;
        case 13068:
          sendResErrorStatus(res, new InvalidLocationError());
          break;
        default:
          throwUnknownError(res, err);
      }
      break;
    default:
      throwUnknownError(res, err);
  }
  return new UknownServerError();
}

function respondWithResult(res, statusCode) {
  return (result) => {
    if (result) {
      let response;
      if (result.docs) {
        response = result;
        response.data = result.docs;
        delete response.docs;
      } else {
        response = {
          data: result,
        };
      }
      return res.status(statusCode || httpStatus.OK).json(response);
    }
    return Promise.reject(new UknownServerError());
  };
}

function respondWithData(res, dataRes, statusCode) {
  if (dataRes) {
    const data = {
      data: dataRes,
    };
    return res.status(statusCode || httpStatus.OK).json(data);
  }
  return Promise.reject(new UknownServerError());
}

function handleError(res) {
  return (err) => {
    logger.info(`handleError: ${err}`);
    if (err.errorCode) {
      return sendResErrorStatus(res, err);
    }
    return throwKnownError(res, err);
  };
}

function handleEntityNotFound() {
  return (entity) => {
    if (!entity) {
      return Promise.reject(new EntityNotFound());
    }
    return entity;
  };
}

function notAuthorized(res) {
  sendResErrorStatus(res, new NotAuthorizedError());
}

export {
  handleError,
  handleEntityNotFound,
  respondWithResult,
  respondWithData,
  notAuthorized,
};
