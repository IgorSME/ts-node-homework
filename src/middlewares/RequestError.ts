import { TRequestErrorMessage, IRequestError } from "../types/appTypes";


const messages:TRequestErrorMessage = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbbiden",
  404: "Not found",
  409: "Conflict",
};

const RequestError = (status:number, message:string = messages[status]): IRequestError => {
  const error:IRequestError = new Error(message) as IRequestError;
  error.status = status;
  return error;
};

export default  RequestError;
