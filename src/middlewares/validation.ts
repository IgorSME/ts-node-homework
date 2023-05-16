import { Request, Response, NextFunction } from 'express';
import { Schema, ValidationError} from 'joi';

interface IValidationError extends ValidationError {
  status?: number;
}
type TValidation = ((req: Request, res: Response, next: NextFunction) => void)


const validation = (schema:Schema):TValidation => {
  return (req:Request, res:Response, next:NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const validationError = error as IValidationError;
      validationError.status = 400;
     
      next(validationError);
      return;
    }
    next();
  };
};

export default  validation;
