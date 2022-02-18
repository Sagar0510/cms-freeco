import { v4 as uuidv4 } from "uuid";
import db from "../config/db.js";
import { removeHyphens } from "./removeHyphens.js";

export function deleteBook(req, res) {
  let bookId = removeHyphens(req.params.bookid);
  console.log(bookId);
  let sql1 = `DROP TABLE ${bookId}`;
  db.query(sql1, (err, result) => {
    if (err) {
      res.json({
        error: err.code,
      });
    }
    console.log(result);
  });
  let sql2 = `DELETE FROM books WHERE bookid = '${req.params.bookid}'`;
  db.query(sql2, (err, result) => {
    if (err) {
      res.json({
        error: err.code,
      });
    }
    console.log(result);
    res.json({
      success: "book deleted",
    });
  });
}
export function postTOC(req, res) {
  let bookId = req.body.bookid;
  let bookTable = removeHyphens(bookId);
  let uuid = uuidv4();
  let addNode = `INSERT INTO ${bookTable} VALUES('${uuid}','${req.body.type}','${req.body.parentid}','${req.body.bookid}','${req.body.name}','${req.body.page}','${req.body.question}','${req.body.answer}','null')`;
  db.query(addNode, (err, result) => {
    if (err) {
      res.json({
        error: err.code,
      });
    }
    console.log(result);
    res.json({
      success: "new node added in TOC",
    });
  });
}
export function getTOC(req, res) {
  let bookId = removeHyphens(req.params.bookid);
  let sql = `SELECT * FROM ${bookId}`;
  db.query(sql, (err, results) => {
    if (err) {
      res.json({
        error: err.code,
      });
    }
    console.log(results);
    res.json(results);
  });
}

export function postQCremarks(req, res) {
  let bookTable = removeHyphens(req.params.bookid);
  let nodeId = req.params.nodeid;
  let sql = `UPDATE ${bookTable} SET QC_Remarks='${req.body.qc_remarks}' WHERE nodeid = '${nodeId}'`;
  db.query(sql, (err, results) => {
    if (err) {
      res.json({
        error: err.code,
      });
    }
    console.log(results);
    res.json({
      success: "quality checker remark added",
    });
  });
}
