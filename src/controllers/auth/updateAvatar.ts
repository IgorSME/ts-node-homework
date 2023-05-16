import { Response } from "express";
import { IUserAuthRequest } from "../../types/appTypes";
import { User } from "../../models";
import path from "path";
import Jimp from "jimp";
import { promises as fsPromises } from "fs";

const { rename, unlink } = fsPromises;

const avatarPath:string = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req: IUserAuthRequest, res: Response):Promise<Response> => {
   if (!req.file) {
    return res.status(400).json({ error: "No file provided" });
  }
  const { path: tmpUpload, originalname } = req.file;
  const { _id: id } = req.user;
  const avatarName:string = `${id}_${originalname}`;

  try {
    const resultUpload:string = path.join(avatarPath, avatarName);

    await rename(tmpUpload, resultUpload);
    const avatarURL:string = path.join("public", "avatars", avatarName);

    await User.findByIdAndUpdate(id, { avatarURL });
    Jimp.read(resultUpload)
      .then((image:any) => {
        image.resize(250, 250).write(resultUpload);
      })
      .catch((err:Error) => {
        throw err;
      });
    res.json({
      status: "success",
      code: 200,
      data: { avatarURL },
    });
  } catch (error:any) {
    await unlink(tmpUpload);
    throw error;
  }
   return res.status(500).json({ error: "Internal server error" });
};

export default  updateAvatar;
