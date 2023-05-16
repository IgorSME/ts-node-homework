import { IUserAuthRequest } from "../../types/appTypes";
import { Response } from "express";
import { Contact } from "../../models";
import { IContact } from "../../types/appTypes";


const add = async (req:IUserAuthRequest, res:Response) => {
  const { _id } = req.user;
  const result:IContact = await Contact.create({ ...req.body, owner: _id });
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result,
    },
  });
};

export default add;
