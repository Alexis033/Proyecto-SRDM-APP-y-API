const mysql= require('mysql');
const user= "10guevarafm1102@gmail.com";
const password= "123456789" ;

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

conection.query(`select * from usuario WHERE Usuario="${user}" AND Contraseña =${password}`, (err, rows) =>{
    if (err) throw err
           
    else if (rows[0].Usuario == user && rows[0].Contraseña==password){
        console.log("conectado");
        // console.log(rows);
    }
    else{
        console.log("error");
    }
})

conection.end();