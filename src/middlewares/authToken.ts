import { Response, NextFunction, RequestHandler } from 'express';
import { IUserAuthRequest,IUser,IJwtPayload } from '../types/appTypes';
import { Unauthorized } from "http-errors";
import jwt, { Secret } from "jsonwebtoken";
import { User } from '../models';
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";


const { SECRET_KEY } = process.env;


const authToken = async (req:IUserAuthRequest, res:Response, next:NextFunction):Promise<void> => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  try {
    if (bearer !== "Bearer") {
      throw new Unauthorized("Not authorized");
    }
    const { id } = jwt.verify(token, SECRET_KEY as Secret) as IJwtPayload;
    const user:IUser | null = await User.findById(id);
    if (!user || !user.token) {
      throw new Unauthorized("Not authorized");
    }
    req.user = user || null;
    next();
  } catch (error:any) {
    if (error.message === "invalid signature") {
     error.status = 401;
    }
    next(error);
  }
};

export default authToken as unknown as RequestHandler<ParamsDictionary, any, any, ParsedQs, Record<string, any>>;
