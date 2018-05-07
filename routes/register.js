var express = require('express');
var router = express.Router();
var moment = require('moment');
var async = require('async');
var pool = require('./mysqlConnection.js').pool;

router.get('/', function(req, res, next){
	res.render('register',{
		title: 'register now'
	})
})

router.post('/', function(req, res, next){
	var userName = req.body.user_name;
	var email = req.body.email;
	var password = req.body.password;
	var created_at = moment().format('YYYY-MM-DD HH:mm:ss');

	/* query info */
	var tableName = 'users';
	var columnName = ['user_name', 'email', 'password', 'created_at'];
	var values = '("' + user_name + '", ' + '"' + email + '", ' + '"' + password + '", ' + '"' + created_at + '")';
	var query = insertSQL.inserSQL(tableName, columnName, values);
	pool.query(query, [values], function(err, rows){
		res.redirect('/login');
	})
})

module.exports = router;