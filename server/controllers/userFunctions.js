import express, { query } from "express";
import { v4 as uuidv4 } from "uuid";
import db from "../config/db.js";
import bcrypt from "bcrypt";

export function getUsers(req, res) {
  db.query(
    "SELECT userid,email,authorized_by,userRole FROM users",
    (err, results) => {
      if (err) {
        res.json({
          error: err.code,
        });
      }
      console.log(results);
      res.json(results);
    }
  );
}
export async function postUser(req, res) {
  let userid = uuidv4();
  const salt = await bcrypt.genSalt(12);
  let userPassword = await bcrypt.hash(req.body.password, salt);
  console.log(salt, userPassword);
  let sql = `INSERT INTO users VALUES ('${userid}','${req.body.email}','${userPassword}','${req.session.userid}','${req.body.userRole}')`;
  db.query(sql, (err, results) => {
    if (err) {
      res.json({
        error: err.code,
      });
    }
    console.log(results);
    res.send({
      success: "new user added",
    });
  });
}
