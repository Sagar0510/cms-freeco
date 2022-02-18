import express from "express";
import { v4 as uuidv4 } from "uuid";
import db from "../config/db.js";
import { getIndex, postIndex } from "../controllers/indexFunctions.js";
import {
  deleteBook,
  getTOC,
  postTOC,
  postQCremarks,
} from "../controllers/bookFunctions.js";
import {
  checkLoggedIn,
  checkPermission,
} from "../controllers/ProtectHelper.js";
import {
  getNodeInTOC,
  updateTOC,
  deleteTOC,
} from "../controllers/tocFunctions.js";

const indexRouter = express.Router();

indexRouter
  .route("/")
  .get(checkLoggedIn, checkPermission(["admin", "superuser"]), getIndex)
  .post(checkLoggedIn, checkPermission(["admin", "superuser"]), postIndex);

indexRouter
  .route("/:bookid")
  .get(checkLoggedIn, checkPermission(["admin", "superuser"]), getTOC)
  .post(checkLoggedIn, checkPermission(["admin", "superuser"]), postTOC)
  .delete(checkLoggedIn, checkPermission(["admin", "superuser"]), deleteBook);
indexRouter
  .route("/:bookid/:nodeid")
  .get(checkLoggedIn, checkPermission(["admin", "superuser"]), getNodeInTOC)
  .put(checkLoggedIn, checkPermission(["admin", "superuser"]), updateTOC)
  .delete(checkLoggedIn, checkPermission(["admin", "superuser"]), deleteTOC);

indexRouter
  .route("/:bookid/qc/:nodeid")
  .post(
    checkLoggedIn,
    checkPermission(["admin", "quality-checker"]),
    postQCremarks
  );

export default indexRouter;
