const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const { response } = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

// MySQL
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'crudcar_bd'
})

//Tabela carros

// Get All
app.get('/carros/', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`Conexão: ${connection.threadId}`)

        connection.query('SELECT * from carros', (err, rows) => {
            connection.release() //return the connection to pool

            if (!err) {
                res.json(rows)
            } else {
                console.log(err)
            }
        })
    })
})

//Get id
app.get('/carros/get/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`Conexão: ${connection.threadId}`)

        connection.query('SELECT * from carros WHERE id = ?', [req.params.id], (err, rows) => {
            connection.release() //return the connection to pool

            if (!err) {
                res.json(rows)
            } else {
                console.log(err)
            }
        })
    })
})

//Delete
app.delete('/carros/delete/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`Conexão: ${connection.threadId}`)

        connection.query('DELETE from carros WHERE id = ?', [req.params.id], (err, rows) => {
            connection.release() //return the connection to pool

            if (!err) {
                res.send(`Carro com o ID ${req.params.id} foi deletado com sucesso`)
            } else {
                console.log(err)
            }
        })
    })
})

// Add
app.post('/carros/post/:id/:modelo/:marca/:ano_fabricacao/:placa/:chassi/:data_compra/:valor_compra/:cor/:status', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`Conexão: ${connection.threadId}`)

        const params = req.params

        connection.query(`INSERT INTO carros (id, modelo, marca, ano_fabricacao, placa, chassi, data_compra, valor_compra, cor, status) VALUES ('${params.id}', '${params.modelo}', '${params.marca}', '${params.ano_fabricacao}', '${params.placa}', '${params.chassi}', '${params.data_compra}', '${params.valor_compra}', '${params.cor}', '${params.status}');`, (err, rows) => {
            connection.release() //return the connection to pool

            if (!err) {
                res.send(`Carro com o ID ${params.id} foi atualizado com sucesso`)
            } else {
                console.log(err)
            }
        })

        console.log(req.body)
    })
})

//Update
app.put('/carros/put/:id/:modelo/:marca/:ano_fabricacao/:placa/:chassi/:data_compra/:valor_compra/:cor', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`Conexão: ${connection.threadId}`)

        const params = req.params

        connection.query(`UPDATE carros SET modelo = '${params.modelo}', marca = '${params.marca}', ano_fabricacao = '${params.ano_fabricacao}', placa = '${params.placa}', chassi = '${params.chassi}', data_compra = '${params.data_compra}', valor_compra = '${params.valor_compra}', cor = '${params.cor}' WHERE carros.id = ${params.id};`, (err, rows) => {
            connection.release() //return the connection to pool

            if (!err) {
                res.send(`Carro com o ID ${params.id} foi atualizado com sucesso`)
            } else {
                console.log(err)
            }
        })

        console.log(req.body)
    })
})

//Update ID
app.put('/carros/put/:id/:new_id/', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`Conexão: ${connection.threadId}`)

        const params = req.params

        connection.query(`UPDATE carros SET id = '${params.new_id}' WHERE carros.id = ${params.id};`, (err, rows) => {
            connection.release() //return the connection to pool

            if (!err) {
                res.send(`Carro com o ID ${params.id} foi atualizado com sucesso`)
            } else {
                console.log(err)
            }
        })
        console.log(req.body)
    })
})

//Update status
app.put('/carros/put/status/:id/:status', (req, res) => {

    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`Conexão: ${connection.threadId}`)

        const params = req.params

        connection.query(`UPDATE carros SET status = '${params.status}' WHERE carros.id = ${params.id};`, (err, rows) => {
            connection.release() //return the connection to pool

            if (!err) {
                res.send(`Status do carro ${params.id} foi atualizado para: ${params.status}`)
            } else {
                console.log(err)
            }
        })
        console.log(req.body)
    })
})

//Filtro carros
app.get('/carros/get/filtro/:filtro/', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`Conexão: ${connection.threadId}`)

        const params = req.params

        connection.query(`Select * from carros WHERE status = '${params.filtro}'`, (err, rows) => {
            connection.release()

            if (!err) {
                res.json(rows)
            } else {
                console.log(err)
            }
        })
    })
})

// Fim tabela carros

// Tabela vendas
// Get All
app.get('/vendas/', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`Conexão: ${connection.threadId}`)

        connection.query('SELECT * from vendas', (err, rows) => {
            connection.release() //return the connection to pool

            if (!err) {
                res.json(rows)
            } else {
                console.log(err)
            }
        })
    })
})

//Get id
app.get('/vendas/get/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`Conexão: ${connection.threadId}`)

        connection.query('SELECT * from vendas WHERE id = ?', [req.params.id], (err, rows) => {
            connection.release() //return the connection to pool

            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
        })
    })
})

//Delete
app.delete('/vendas/delete/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`Conexão: ${connection.threadId}`)

        connection.query('DELETE from vendas WHERE id = ?', [req.params.id], (err, rows) => {
            connection.release() //return the connection to pool

            if (!err) {
                res.send(`A venda do carro com o ID ${req.params.id} foi deletada com sucesso`)
            } else {
                console.log(err)
            }
        })
    })
})

// Add
app.post('/vendas/post/:id/:data_venda/:valor_venda/:comissao/', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`Conexão: ${connection.threadId}`)

        const params = req.params

        connection.query(`INSERT INTO vendas (id, data_venda, valor_venda, comissao) VALUES ('${params.id}', '${params.data_venda}', '${params.valor_venda}', '${params.comissao}');`, (err, rows) => {
            connection.release() //return the connection to pool

            if (!err) {
                res.send(`A venda do carro com o ID ${params.id} foi atualizado com sucesso`)
            } else {
                console.log(err)
            }
        })

        console.log(req.body)
    })
})

//Update
app.put('/vendas/put/:id/:data_venda/:valor_venda/:comissao/', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`Conexão: ${connection.threadId}`)

        const params = req.params

        connection.query(`UPDATE vendas SET data_venda = '${params.data_venda}', valor_venda = '${params.valor_venda}', comissao = '${params.comissao}' WHERE vendas.id = ${params.id};`, (err, rows) => {
            connection.release() //return the connection to pool

            if (!err) {
                res.send(`A venda do carro com o ID ${params.id} foi atualizada com sucesso`)
            } else {
                console.log(err)
            }
        })

        console.log(req.body)
    })
})

//Update ID
app.put('/vendas/put/:id/:new_id/', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`Conexão: ${connection.threadId}`)

        const params = req.params

        connection.query(`UPDATE vendas SET id = '${params.new_id}' WHERE vendas.id = ${params.id};`, (err, rows) => {
            connection.release() //return the connection to pool

            if (!err) {
                res.send(`Venda com o ID ${params.id} foi atualizado com sucesso`)
            } else {
                console.log(err)
            }
        })

        console.log(req.body)
    })
})

// Fim tabela vendas

//Listen
app.listen(port, () => console.log(`Executando na porta: ${port}`));
