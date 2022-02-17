import express from "express";
import userRouter from "./Routers/userRouter.js";
import authRouter from "./Routers/authRouter.js";
import indexRouter from "./Routers/indexRouter.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import cloudinary from "./config/cloudinary.js";
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(session({ secret: "secret", resave: true, saveUninitialized: true }));
app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/index", indexRouter);

app.post("/uploadimage", async (req, res) => {
  let result = await cloudinary.uploader.upload(req.body.image);
  // console.log(result);
  res.json({
    success: "image uploaded",
    url: result.secure_url,
  });
});

app.listen(PORT, () => {
  console.log(`server started at port ${PORT}`);
});
