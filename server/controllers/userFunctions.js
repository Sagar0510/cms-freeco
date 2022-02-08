import express, { query } from "express";
import { v4 as uuidv4 } from "uuid";
import db from "../config/db.js";

export function getUsers(req, res) {
  db.query("SELECT userid,email,authorized_by FROM users", (err, results) => {
    if (err) {
      res.json({
        error: err.code,
      });
    }
    console.log(results);
    res.json(results);
  });
}
export function postUser(req, res) {
  let userid = uuidv4();
  let sql = `INSERT INTO users VALUES ('${userid}','${req.body.email}','${req.body.password}','${req.cookies.loggedInUserid}')`;
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
