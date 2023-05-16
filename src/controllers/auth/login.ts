import { Request,Response } from "express";
import { Unauthorized } from "http-errors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../../models";
import { Secret } from "jsonwebtoken";
import { IUser, IUserAuthRequest } from "../../types/appTypes";

const { SECRET_KEY } = process.env;

const login = async (req:IUserAuthRequest, res:Response):Promise<void> => {
  const { email, password, subscription = "starter" } = req.body;

  const user:IUser | null = await User.findOne({ email });
  if (!user || !user.verify || !user.comparePassword(password)) {
    throw new Unauthorized("Email or password is wrong");
  }

  const passwordCompared:boolean = bcrypt.compareSync(password, user.password);

  if (!passwordCompared) {
    throw new Unauthorized("Email or password is wrong");
  }
  if (!SECRET_KEY) {
    throw new Error("Secret key is not defined");
  }
  const payload:object = {
    id: user._id,
  };

  const token:string = jwt.sign(payload, SECRET_KEY as Secret, { expiresIn: "1h" });

  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    status: "success",
    code: 200,
    data: {
      token,

      user: {
        email,
        subscription,
      },
    },
  });
};

export default  login;
