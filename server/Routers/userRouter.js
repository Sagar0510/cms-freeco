import express, { query } from "express";
import { v4 as uuidv4 } from "uuid";
import db from "../config/db.js";
import protectRoute from "../controllers/ProtectHelper.js";
const userRouter = express.Router();

userRouter.route("/").get(protectRoute, getUsers).post(protectRoute, postUser);

function getUsers(req, res) {
  db.query("SELECT userid,email,authorized_by FROM users", (err, results) => {
    if (err) throw err;
    console.log(results);
    res.json(results);
  });
}
function postUser(req, res) {
  let userid = uuidv4();
  let sql = `INSERT INTO users VALUES ('${userid}','${req.body.email}','${req.body.password}','${req.cookies.loggedInUserid}')`;
  db.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.send({
      success: "new user added",
    });
  });
}

export default userRouter;
