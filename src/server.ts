import { createConnection } from 'typeorm';
import { app } from './app';

// app.listen(process.env.PORT || 3333);

createConnection()
  .then(async (connection) => {
    
    app.listen(process.env.PORT || 3333);
  })
  .catch(error => {
    console.log(`Erro ao inicializar servidor: ${error}`);
  })

