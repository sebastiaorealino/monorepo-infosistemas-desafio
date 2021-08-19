import httpStatus from 'http-status';
import User from '../../api/models/user';
import { NotAuthorizedError } from '../errors/knownErrors';
import { generateToken } from '../utils/auth';
import { handleError, respondWithData, respondWithResult } from '../utils/requestHelpers';


// Creates a User
export async function createUser(req, res) {
  try {
    const newUser = new User(req.body);
    await newUser.save();

    // Selecting fields to respond
    const userResponse = (
      ({ _id, updatedAt, createdAt }) => ({ _id, updatedAt, createdAt })
    )(newUser);
    return await respondWithResult(res, httpStatus.CREATED)(userResponse);
  } catch (error) {
    return handleError(res)(error);
  }
}

// User authentication
export function authenticateUser(req, res) {
  const reqPassword = req.body.password;
  const reqEmail = req.body.email;
  const rToken = {};
  const response = {};
  return User.findOne({ email: reqEmail })
    .then((userResult) => {
      if (userResult && userResult.comparePassword(reqPassword)) {
        const genToken = generateToken(userResult);
        rToken._user = userResult._id;
        response.token = genToken;
        response.name = userResult.name;
        response._id = userResult._id;
        return Promise.resolve(response);
      }
      return Promise.reject(new NotAuthorizedError());
    })
    .then(() => respondWithData(res, response))
    .catch(handleError(res));
}
