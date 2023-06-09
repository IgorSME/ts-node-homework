import { Response } from "express";
import { IUserAuthRequest } from "../../types/appTypes";
import { User } from "../../models";
import path from "path";
import Jimp from "jimp";
import { promises as fsPromises } from "fs";

const { rename, unlink } = fsPromises;

const avatarPath:string = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req: IUserAuthRequest, res: Response):Promise<void> => {
   if (!req.file) {
    res.status(400).json({ error: "No file provided" });
    return;
  }
  const { path: tmpUpload, originalname } = req.file;
  const { _id: id } = req.user;
  const avatarName = `${id}_${originalname}`;

  try {
    const resultUpload:string = path.join(avatarPath, avatarName);

    await rename(tmpUpload, resultUpload);
    const avatarURL:string = path.join("public", "avatars", avatarName);

    await User.findByIdAndUpdate(id, { avatarURL });
    Jimp.read(resultUpload)
      .then((image:Jimp) => {
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
  } catch (error:unknown) {
    await unlink(tmpUpload);
    throw error;
  }
   
};

export default  updateAvatar;
