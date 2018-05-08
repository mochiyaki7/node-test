var express = require('express');
var router = express.Router();
var moment = require('moment');
var async = require('async');
var pool = require('./mysqlConnection.js').pool;
var insertSQL = require('./insert.js');
var sql = require('./query.js');

var historyQuery = sql['query']['limitBoard'];
var countQuery = sql['query']['countBoard'];

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

router.post('/', function(req, res, next){	
	var title = req.body.title;
//	var user_id = req.session.user_id? req.session.user_id: 0; 
	var user_id = 0; /* temporary */
	var created_at = moment().format('YYYY-MM-DD HH:mm:ss');

	/* query info */
	var tableName = 'boards';
//	var columnName = ['title', 'created_at'];
	var columnName = ['user_id', 'title', 'created_at'];
//	var values = '("' + title + '", ' + '"' + created_at + '")';
	var values = '("' + user_id + '", "' + title + '", "' + created_at + '")';

	var query = insertSQL.insertSQL(tableName, columnName, values);
	console.log(query);
	pool.query(query, [values], function(err, rows){
		res.redirect('/');
	})
})

module.exports = router;
