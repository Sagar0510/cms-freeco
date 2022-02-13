import db from "../config/db.js";

export function checkLoggedIn(req, res, next) {
  if (req.session.userid) {
    next();
  } else {
    return res.json({
      error: "ACCESS_DENIED",
      type: "AUTHORIZATION",
    });
  }
}

export function checkPermission(allowedUsers) {
  return (req, res, next) => {
    let sql = `SELECT userRole FROM users WHERE userid='${req.session.userid}'`;
    db.query(sql, (err, results) => {
      if (err)
        res.json({
          error: err.code,
        });
      if (allowedUsers.includes(results[0].userRole)) {
        console.log(results);
        next();
      } else {
        res.json({
          error: "PERMISSION NOT ALLOWED",
        });
      }
    });
  };
}
