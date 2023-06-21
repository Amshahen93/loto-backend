
const db_con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: ''
});

db_con.connect((err) => {
    if (error) {
      console.log("Database Connection Failed !!!", err);
    } else {
      console.log("connected to Database");
    }
});

export default db_con;