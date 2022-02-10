import db from "../config/db.js";
import bcrypt from "bcrypt";
import session from "express-session";

export function getSignInPage(req, res) {
  res.send({
    error: "INVALID_REQUEST",
  });
}

export function signInUser(req, res) {
  let { email, password } = req.body;
  console.log(email, password);
  let findUser = `SELECT * FROM cms.users WHERE email = '${email}'`;
  db.query(findUser, async (err, result) => {
    if (err) {
      res.json({
        error: err.code,
      });
    } else {
      console.log(email, result);
      if (result.length == 0) {
        res.json({
          error: "INVALID_CREDENTIALS",
          type: "AUTHORIZATION",
        });
      } else {
        let valid = await bcrypt.compare(password, result[0].password);
        if (!valid) {
          res.json({
            error: "INVALID_CREDENTIALS",
            type: "AUTHORIZATION",
          });
        }
        req.session.userid = result[0].userid;
        res.redirect("/index");
      }
    }
  });
}
