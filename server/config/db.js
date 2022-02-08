import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  // password: "xyz",
  database: "cms",
});

db.connect((err) => {
  if (err) throw err;
  else {
    console.log("database connected");
  }
});

export default db;
