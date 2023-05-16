
import { isValidObjectId } from "mongoose";
import { Request,Response, NextFunction } from "express"

import  RequestError  from "./RequestError";

const isValidId = (req:Request, res:Response, next:NextFunction):void => {
  const { id } = req.params;
  const result:boolean = isValidObjectId(id);
  if (!result) {
    next(RequestError(400, "Invalid id format"));
  }
  next();
};

export default isValidId;
