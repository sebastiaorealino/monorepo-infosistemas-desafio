import httpStatus from 'http-status';
import AppError from './appError';

export class EntityNotFound extends AppError {
  constructor() {
    super('Entity not found.', 'ENTITY_NOT_FOUND', httpStatus.UNPROCESSABLE_ENTITY);
  }
}

export class AlreadyUsedEntityError extends AppError {
  constructor() {
    super('Entity already used.', 'ENTITY_ALREADY_USED', httpStatus.CONFLICT);
  }
}

export class NotAuthorizedError extends AppError {
  constructor() {
    super('Error: Access Denied.', 'UNAUTHORIZED_ACCESS', httpStatus.UNAUTHORIZED);
  }
}

export class ValidationError extends AppError {
  constructor(message) {
    super(message || 'Validation error.', 'VALIDATION_ERROR', httpStatus.BAD_REQUEST);
  }
}

export class UknownServerError extends AppError {
  constructor() {
    super('Unknown server error.', 'UNKNOWN_SERVER_ERROR', httpStatus.INTERNAL_SERVER_ERROR);
  }
}
