function routes(app, porta, db, bodyParser) {
	const banco = new db()

	app.use(bodyParser.urlencoded({ extended: true }))

	app.get('/', (req, resp) => {
		const sql = 'SELECT id, descricao, preco, disponivel FROM produtos'
		banco.conexao().query(sql, (erro, resultado) => {
			const dados = []
			resultado.forEach(resultado => {
				dados.push({
					id: resultado.id,
					descricao: resultado.descricao,
					preco: resultado.preco
				})
			})
			resp.status(200).json(dados)
		})
	})

	app.post('/', (req, resp) => {
		const body = req.body
		if(body.descricao && body.preco && body.disponivel) {
			if(isNaN(body.preco)) {
				resp.status(401).json({erro: 'Informe um valor numérico para o campo preço'})
			} else if(body.disponivel != '1' && body.disponivel != '0') {
				resp.status(401).json({erro: 'Informe um valor entre 0 e 1 para o campo disponível'})
			} else {
				const sql = 'INSERT INTO produtos(descricao, preco, disponivel) VALUES(?, ?, ?)'
				banco.conexao().query(sql, [body.descricao, body.preco, Number(body.disponivel)], (erro, resultado) => {
					if(erro) {
						resp.status(401).json({erro: 'Não foi possível cadastrar o produto'})
					} else {
						resp.status(200).json({sucesso: 'Produto cadastrado com sucesso!'})
					}
				})
			}
		} else {
			resp.status(401).json({erro: 'Dados não informados'})
		}
	})

	app.delete('/', (req, resp) => {
		const sql = 'DELETE FROM produtos WHERE id = ?'
		banco.conexao().query(sql, [req.body.id], (erro, resultado) => {
			if(erro) {
				resp.status(401).json({erro: 'Não foi possível excluir o produto com o id ' + req.body.id})
			} else {
				resp.status(200).json({sucesso: 'Produto excluído com sucesso!'})
			}
		})
	})

	app.put('/', (req, resp) => {
		const body = req.body
		if(body.id && body.descricao && body.preco && body.disponivel) {
			const sql = 'UPDATE produtos SET descricao = ?, preco = ?, disponivel = ? WHERE id = ?'
			banco.conexao().query(sql, [body.descricao, body.preco, Number(body.disponivel), body.id], (erro, resultado) => {
				if(erro) {
					console.log(body)
					resp.status(401).json({erro: 'Não foi possível alterar o produto com o id ' + req.body.id})
				} else {
					resp.status(200).json({sucesso: 'Produto alterado com sucesso!'})
				}
			})
		} else {
			resp.status(401).json({erro: 'Dados não informados'})
		}
	})

	app.get('/:id', (req, resp) => {
		const sql = 'SELECT id, descricao, preco, disponivel FROM produtos WHERE id = ?'
		banco.conexao().query(sql, [req.params.id], (erro, resultado) => {
			const dados = []
			resultado.forEach(resultado => {
				dados.push({
					id: resultado.id,
					descricao: resultado.descricao,
					disponivel: resultado.disponivel.data
				})
			})
			resp.json(dados)
		})
	})

	app.listen(porta, () => {
		console.log(`Executando na porta ${porta}`)
	})
}

module.exports = routes