import express from "express";
import userRouter from "./Routers/userRouter.js";
import authRouter from "./Routers/authRouter.js";
import indexRouter from "./Routers/indexRouter.js";
import cookieParser from "cookie-parser";
import session from "express-session";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(session({ secret: "secret", resave: true, saveUninitialized: true }));
app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/index", indexRouter);

app.listen(PORT, () => {
  console.log(`server started at port ${PORT}`);
});
