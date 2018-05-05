var insert = function (table, column, values){
	var sql = 'INSERT INTO ' + table + '(' + column.join(',') + ') VALUES ' + values;
	return sql;
}

exports.insertSQL = insert;