var mysql = require('mysql');

var dbConfig = {
	host: '127.0.0.1',
	user: 'root',
	password: '',
	database: 'bulletin_board'
};

var pool = mysql.createPool(dbConfig);
exports.pool = pool;