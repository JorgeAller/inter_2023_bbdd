const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "mysql-5707.dinaserver.com",
  user: "inter_2023",
  password: "CamiloMola_2019",
  database: "inter_2023",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const getConnection = async () => {
  try {
    const connection = await pool.getConnection();
    return connection;
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = getConnection;
