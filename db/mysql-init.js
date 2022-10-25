var mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();
console.log(process.env.HOST);
const con = mysql.createConnection({
	host: process.env.HOST,
	user: process.env.USER,
	password: process.env.PASSWORD,
	database: process.env.DB,
	// host: "localhost",
	// user: "root",
	// password: `pashShmil12!`,
	// port: `3306`,
	// database: "db",
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
