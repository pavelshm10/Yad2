var mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();

const con = mysql.createConnection({
	host: "eu-cdbr-west-03.cleardb.net",
	user: "bb9221896d7b80",
	password: "56cbd80e",
	database: "heroku_e0ef5323bf9331b",
});

mysql://bb9221896d7b80:56cbd80e@eu-cdbr-west-03.cleardb.net/heroku_e0ef5323bf9331b?reconnect=true

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
