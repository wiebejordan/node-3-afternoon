
require ('dotenv').config()
const express = require('express'),
      massive = require('massive'),
      app = express(),
      products_controller = require('./products_controller'),
      {SERVER_PORT, CONNECTION_STRING} = process.env;

          massive({
            connectionString: CONNECTION_STRING,
            ssl: {rejectUnauthorized: false}
          }).then (dbInstance => {
            app.set('db', dbInstance);
            console.log('db connected');
          });

app.use(express.json());


app.post('/api/products', products_controller.create);
app.get('/api/products', products_controller.getAll);
app.get('/api/products/:id', products_controller.getOne);
app.put('/api/products/:id', products_controller.update);
app.delete('/api/products/:id', products_controller.delete);

app.listen(SERVER_PORT, () => {
  console.log(`Server is ripping on port ${SERVER_PORT}`)
})