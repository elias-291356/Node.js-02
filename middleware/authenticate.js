import jwt from 'jsonwebtoken';
import { HttpError } from '../helpers/index.js';
import { ctrlWrapper } from '../decorators/index.js';
import User from '../models/User.js'
import "dotenv/config.js";

const { JWT_SECRET } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw HttpError(401, 'Authorization header not define');
  }
  const [bearer, token] = authorization.split(' ');
  if (bearer !== 'Bearer') {
    throw HttpError(401);

  }
  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);
    if (!user || !user.token) {
      throw HttpError(404);
    }
    req.user = user;
    next();
  }
  catch (error) {
    throw HttpError(401, error.message);
  }
}
export default ctrlWrapper(authenticate);