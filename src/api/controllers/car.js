import httpStatus from 'http-status';
import Car from '../models/car';
import User from '../models/user';
import { handleEntityNotFound, handleError, respondWithResult } from '../utils/requestHelpers';

export async function createCar(req, res) {
  const userId = req.auth._id;
  try {
    const user = await User.findById(userId);
    await handleEntityNotFound()(user);
    const newCar = new Car(req.body);
    await newCar.save();

    return await respondWithResult(res, httpStatus.CREATED)(newCar);
  } catch (error) {
    return handleError(res)(error);
  }
}

export async function listCars(req, res) {
  try {
    const cars = await Car.paginate();
    return await respondWithResult(res)(cars);
  } catch (error) {
    return handleError(res)(error);
  }
}

