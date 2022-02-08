import express from "express";
import { v4 as uuidv4 } from "uuid";
import db from "../config/db.js";
import { getIndex, postIndex } from "../controllers/indexFunctions.js";
import { deleteBook, getTOC, postTOC } from "../controllers/bookFunctions.js";
import protectRoute from "../controllers/ProtectHelper.js";
import { getNodeInTOC,updateTOC,deleteTOC} from "../controllers/tocFunctions.js";

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

export default indexRouter;
