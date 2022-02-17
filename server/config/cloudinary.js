import secret from "./secrets.js";
import * as cloud from "cloudinary";
const cloudinary = cloud.v2;

cloudinary.config({
  cloud_name: secret.CLOUDINARY_CLOUDNAME,
  api_key: secret.CLOUDINARY_APIKEY,
  api_secret: secret.CLOUDINARY_APISECRET,
});

export default cloudinary;
