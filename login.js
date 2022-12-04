const mysql= require('mysql');

const conection = mysql.createConnection({
    host:'localhost',
    user:'Maikcol',
    password: 'contraseña',
    database: 'mydb'
})

conection.connect((err) =>{
    if (err) throw err
    console.log('La conexión funciona')
})

conection.query('select Usuario, Contraseña from usuario where Usuario="pepe12@hotmail.com"', (err, rows) =>{
    if (err) throw err
    console.log('los datos de la tabla son estos:')
    console.log(rows)
})

conection.end()