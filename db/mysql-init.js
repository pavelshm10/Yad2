var mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();

const con = mysql.createConnection({
	// host: "eu-cdbr-west-03.cleardb.net",
	// user: "b260e435482cd4",
	// password: "a5e68be0",
	// database: "heroku_5370d5802671fea",
	host: "localhost",
	user: "root",
	password: `pashShmil12!`,
	port: `3306`,
	database: "db",
});


mysql://b260e435482cd4:a5e68be0@eu-cdbr-west-03.cleardb.net/heroku_5370d5802671fea?reconnect=true
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
