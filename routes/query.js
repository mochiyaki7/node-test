var query ={
	limitBoard: 'SELECT *, DATE_FORMAT(created_at, \'%Y年%m月%d日 %k時%i分%s秒\') AS created_at FROM boards ORDER BY board_id DESC LIMIT 3;',
	countBoard: 'SELECT count(*) AS countAll FROM boards;'
}
exports.query = query;