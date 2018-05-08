var express = require('express');
var router = express.Router();
var moment = require('moment');
var async = require('async');
var pool = require('./mysqlConnection.js').pool;
var insertSQL = require('./insert.js');
var sql = require('./query.js');

router.get('/:board_id', function(req, res, next){
	var board_id = req.params.board_id; /*  フォームから取得する場合はreq.body.board_id  */
	var getBoardQuery = 'SELECT * FROM boards WHERE board_id = ' + board_id;
	var getMessageQuery = 'SELECT *, DATE_FORMAT(created_at, \'%Y年%m月%d日 %k時%i分%s秒\') AS created_at FROM messages WHERE board_id = ' + board_id +' ORDER BY created_at DESC';

	async.series({
		getBoard: function(cb){
		    pool.query(getBoardQuery, function(err, results) {
		    	cb(null, results);
			})
		},
		getMessage: function(cb){
		    pool.query(getMessageQuery, function(err, results) {
		    	cb(null, results);
			})
		}
	}, function(error, results){
		if(!error){
/* レンダリングするファイルを指定: ここではboard.ejs */
			res.render('board', {
			title: results['getBoard'][0].title,
			board: results['getBoard'][0],
			messageList: results['getMessage']
   	    	});	
    	};
	});
});

/* GET home page. */
router.get('/', function(req, res, next) {
	async.series({
		history: function(cb){
		    pool.query(historyQuery, function(err, results) {
		    	cb(null, results);
			})
		},
		count: function(cb){
		    pool.query(countQuery, function(err, results) {
		    	cb(null, results);
			})
		}
	}, function(error, results){
		if(!error){
			res.render('index', {
	            title: 'boards_info' ,
	            boardList: results
   	    	});	
    	};
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
	pool.query(query, [values], function(err, rows){
		res.redirect('/boards/' + board_id);
	})
})

module.exports = router;