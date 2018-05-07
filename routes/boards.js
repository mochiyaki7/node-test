var express = require('express');
var router = express.Router();
var moment = require('moment');
var async = require('async');
var pool = require('./mysqlConnection.js').pool;
var insertSQL = require('./insert.js');
var sql = require('./query.js');

router.get('/:board_id', function(req, res, next){
	var board_id = req.params.board_id; /*  フォームから取得する場合はreq.body.board_id  */
	var query = 'SELECT * FROM boards WHERE board_id = ' + board_id;
	pool.query(query, function(err, board){
/* レンダリングするファイルを指定: ここではboards.ejs */
		res.render('board',{
			title: board[0].title,
			board: board[0]
		});
	});
});

router.post('/:board_id', function(req, res, next){	
	var message = req.body.message;
	var user_id = 0; /* temporary */
	var board_id = req.params.board_id;
	var created_at = moment().format('YYYY-MM-DD HH:mm:ss');

	/* query info */
	var tableName = 'messages';
	var columnName = ['user_id','message', 'board_id', 'created_at'];
	var values = '("' + user_id + '", "' + message + '", "' + board_id + '", "' + created_at + '")';

	var query = insertSQL.insertSQL(tableName, columnName, values);
	console.log(query);
	pool.query(query, [values], function(err, rows){
		res.redirect('/boards/' + board_id);
	})
})

module.exports = router;