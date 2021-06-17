const mysql = require('mysql');
const http = require('http');
const url = require('url');
const {parse} = require('querystring');

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'vitalii',
    password: 'password',
    database: 'test',
});

conn.connect(function (err) {
    if (err) {
        return console.error("Ошибка: " + err.message);
    } else {
        console.log("Подключение к серверу MySQL успешно установлено");
    }
});

http.createServer((req, res) => {
    console.log('server work');
    if (req.method == 'GET') {
        let urlRequest = url.parse(req.url, true);
        if (urlRequest.query.test == 2) {
            const query = "SELECT * FROM user";
            conn.query(query, (err, result) => {
                res.end(JSON.stringify(result.map(data => {
                    console.log(data['firstname']);
                    return data['firstname'];
                })));
            })
        }
        if (urlRequest.query.test == 3) {
            const query = "SELECT * FROM user";
            conn.query(query, (err, result) => {
                res.end(JSON.stringify(result.map(data => {
                    console.log(data['email']);
                    return data['email'];
                })));
            })
        }
        if (urlRequest.query.test == 4 && urlRequest.query.email !== '') {
            const query = "SELECT * FROM user";
            conn.query(query, (err, result) => {
                res.end(JSON.stringify(result.map(data => {
                    console.log(data['id']);
                    return data['id'];
                })));
            })
        } else {
            res.end("0");
        }
    }
}).listen(3000);

// const finish = conn.end( err => {
//     if (err) {
//         console.log(err);
//         return err;
//     }
//     else {
//         console.log('Database ----- Close');
//     }
// });
