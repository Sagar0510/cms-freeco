import express from "express";
import db from "../config/db.js";
const authRouter = express.Router();

authRouter.route("/signin").get(getSignInPage).post(signInUser);

function getSignInPage(req, res) {
  res.send({
    error: "INVALID_REQUEST",
  });
}
function signInUser(req, res) {
  let credentials = req.body;

  let userEmail = credentials.email;
  let userPassword = credentials.password;

  let findUser = `SELECT userid FROM cms.users WHERE email = '${userEmail}' AND password = '${userPassword}'`;
  db.query(findUser, (err, result) => {
    if (err) {
      res.json({
        error: err.code,
      });
    } else {
      console.log(result);
      if (result.length == 0) {
        res.json({
          error: "INVALID_CREDENTIALS",
          type: "AUTHORIZATION",
        });
      } else {
        res.cookie("isLoggedIn", true);
        res.cookie("loggedInUserid", result[0].userid);
        res.redirect("/index");
      }
    }
  });
}
export default authRouter;
