const express = require('express')
const app = express()
const port = 3000
// Get the client
const mysql = require('mysql2/promise');
const cors = require('cors')
const session = require('express-session')

app.use(cors())
app.use(session({
secret : 'ydgsubsiudfhsni123456'

}))




// Create the connection to database
const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'login',
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/login', async (req, res) => { 
  const datos = req.query;

  try {
    const [results, fields] = await connection.query(
      "SELECT * FROM `usuarios` WHERE `usuario` = ? AND `clave` = ?",
      [datos.usuario, datos.clave]
    );

    if (results.length > 0) {
        req.session.usuario = datas.usuario;
        res.status(200).send('Inicio de sesion correcto ')
    } else {
        res.status(401).send('Inicio de sesion Incorrecto ')
    }

    console.log(results); 
    console.log(fields); 
  } catch (err) {
    console.log(err);
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})