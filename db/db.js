const mysql = require('mysql')

function db() {
	this.conexao = function() {
		const conexao = mysql.createConnection({
			host: 'localhost',
			user: 'root',
		  	password: '123456',
		  	database: 'produtos'
		})

		conexao.connect((erro) => {
			if(erro) throw 'Não foi possível realizar a conexão ao banco de dados'
		})

		return conexao
	}
}

module.exports = db