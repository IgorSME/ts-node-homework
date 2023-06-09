import { Response } from "express";
import { IUserAuthRequest } from "../../types/appTypes";


const getCurrent = async (req:IUserAuthRequest, res:Response):Promise<void> => {
  const { email, subscription } = req.user;
  res.json({
    status: "success",
    code: 200,
    data: {
      user: {
        email,
        subscription,
      },
    },
  });
};

export default getCurrent;
