const fs = require('fs');   //fs file system es un modulo de node, que permite trabajar con el sistema, crear guardar o enviar datos al sistema operativo según sea el caso

fs.writeFileSync('./.env', 'API=${process.env.API}\n');  //con esto estamos creando un archivo .env y escribiendo en este las variables que hacen falta para el deploy, el archivo se crea en el servidor que es donde va a correr