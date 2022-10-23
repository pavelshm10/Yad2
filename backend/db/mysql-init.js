var mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();

const con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: `pashShmil12!`,
	port: `3306`,
	database: "db",
});

con.connect(function (err) {
	if (err) throw err;
	console.log("DB Connected!");
});

module.exports = function (query) {
	return new Promise((resolve, reject) => {
		try {
			con.query(query, function (err, result) {
				if (err) {
					return reject(err);
				}

				return resolve(result);
			});
		} catch (e) {
			reject(e);
		}
	});
};
