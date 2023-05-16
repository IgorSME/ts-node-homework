import multer,{ DiskStorageOptions } from 'multer';
import { Request, Express } from 'express';
import { ICallBack } from '../types/appTypes';
import path from 'path';


const tmpDir:string = path.join(__dirname, "../", "tmp");

const multerConfig:multer.StorageEngine = multer.diskStorage({
  destination: (req:Request, file:Express.Multer.File, cb:ICallBack):void => {
    cb(null, tmpDir);
  },
  filename: (req:Request, file:Express.Multer.File, cb:ICallBack):void => {
    cb(null, file.originalname);
  },
  
});

const upload = multer({
  storage: multer.diskStorage(multerConfig as DiskStorageOptions),
  limits: {
    fileSize: 2048,
  },
});

export default  upload;
