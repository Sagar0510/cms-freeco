import express from "express";
import { v4 as uuidv4 } from "uuid";
import db from "../config/db.js";
import protectRoute from "../controllers/ProtectHelper.js";
const indexRouter = express.Router();

indexRouter
  .route("/")
  .get(protectRoute, getIndex)
  .post(protectRoute, postIndex);

indexRouter
  .route("/:bookid")
  .get(protectRoute, getTOC)
  .post(protectRoute, postTOC)
  .delete(protectRoute, deleteBook);
indexRouter
  .route("/:bookid/:nodeid")
  .get(protectRoute, getNodeInTOC)
  .put(protectRoute, updateTOC)
  .delete(protectRoute, deleteTOC);

function getIndex(req, res) {
  let sql = `SELECT * FROM books`;
  db.query(sql, (err, results) => {
    if (err) {
      res.json({
        error: err.code,
      });
    }
    res.json(results);
  });
}
function postIndex(req, res) {
  let bookid = uuidv4();
  let bookidModified = removeHyphens(bookid);
  let sql = `INSERT INTO books VALUES('${bookid}', '${req.body.title}', '${req.body.type}', '${req.body.author}', '${req.body.description}', '${req.body.isbn}', '${req.body.edition}', '${req.body.published}', '${req.body.publisher}', '${req.body.visibility}', '${req.body.videoAnswersCount}', '${req.body.textAnswersCount}', '${req.body.tocStatus}', '${req.body.popularity}', '${req.body.priority}')`;

  let addTable =
    "CREATE TABLE " +
    bookidModified +
    "(nodeid char(36),type varchar(200),parentid char(36),bookid varchar(200),name varchar(200),page varchar(200),question longtext,answer longtext)";
  db.query(addTable, (errr, result) => {
    if (errr) {
      res.json({
        error: errr.code,
      });
    }
    console.log(`TOC for ${bookidModified} created`);
  });

  db.query(sql, (err, results) => {
    if (err) {
      res.json({
        error: err.code,
      });
    }
    console.log(results);

    res.json({
      success: "new book added",
    });
  });
}
function deleteBook(req, res) {
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
function postTOC(req, res) {
  let bookId = req.body.bookid;
  let bookTable = removeHyphens(bookId);
  let uuid = uuidv4();
  let addNode = `INSERT INTO ${bookTable} VALUES('${uuid}','${req.body.type}','${req.body.parentid}','${req.body.bookid}','${req.body.name}','${req.body.page}','${req.body.question}','${req.body.answer}')`;
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
function getTOC(req, res) {
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
function deleteTOC(req, res) {
  let bookId = removeHyphens(req.params.bookid);
  let nodeId = req.params.nodeid;
  let sql = `DELETE FROM ${bookId} WHERE nodeid = '${nodeId}'`;
  console.log(bookId, nodeId, sql);

  db.query(sql, (err, results) => {
    if (err) {
      res.json({
        error: err.code,
      });
    }
    console.log(results);
    res.json({
      success: "node deleted from given TOC",
    });
  });
}
function updateTOC(req, res) {
  let bookId = removeHyphens(req.params.bookid);
  let nodeId = req.params.nodeid;
  let sql = `UPDATE ${bookId} SET type = '${req.body.type}',parentid = '${req.body.parentid}',bookid = '${req.body.bookid}', name = '${req.body.name}',page = '${req.body.page}',question = '${req.body.question}', answer = '${req.body.answer}' WHERE nodeid = '${nodeId}'`;
  console.log(bookId, nodeId, sql);
  db.query(sql, (err, results) => {
    if (err) {
      res.json({
        error: err.code,
      });
    }
    console.log(results);
    res.json({
      success: "node updated in given TOC",
    });
  });
}
function getNodeInTOC(req, res) {
  let bookId = removeHyphens(req.params.bookid);
  let nodeId = req.params.nodeid;
  let sql = `SELECT * FROM ${bookId} WHERE nodeid='${nodeId}'`;
  console.log(bookId, nodeId, sql);
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
function removeHyphens(str) {
  let modifiedStr = "";
  for (let i = 0; i < str.length; i++) {
    if (str[i] == "-") modifiedStr += "_";
    else modifiedStr += str[i];
  }
  return modifiedStr;
}

export default indexRouter;
