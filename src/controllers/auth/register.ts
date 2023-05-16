import { Request,Response } from "express";
import { Conflict } from "http-errors";
import bcrypt from "bcryptjs";
import gravatar from "gravatar";
import { v4  } from "uuid";
import { User } from "../../models";
import { sendEmail } from "../../helpers";
import { IEmail, IUser , IUserAuthRequest} from "../../types/appTypes";

const register = async (req:IUserAuthRequest, res:Response):Promise<void> => {
  const { email, password, subscription = "starter" } = req.body;
  const user:IUser |null = await User.findOne({ email });
  if (user) {
    throw new Conflict(`Email ${email} in use`);
  }
  const hashPassword:string = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const avatarURL:string = gravatar.url(email);
  const verificationToken:string = v4();
  await User.create({
    email,
    password: hashPassword,
    subscription,
    avatarURL,
    verificationToken,
  });
  const mail:IEmail = {
    from: "igor_vs@ukr.net",
    to: email,
    subject: "Email verification",
    html: `<a target ="_blank" href="http://localhost:3000/api/users/verify/:${verificationToken}"> Verify email </a>`,
  };
  await sendEmail(mail);

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        email,
        subscription,
        avatarURL,
        verificationToken,
      },
    },
  });
};

export default  register;
