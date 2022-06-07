const fs = require('fs');   //fs file system es un modulo de node, que permite trabajar con el sistema, crear guardar o enviar datos al sistema operativo según sea el caso

fs.writeFileSync("./.env", `API=${process.env.API}\n`);  //con fs entramos a mode de file system,y con writeFileSync creando un archivo .env en la raíz del proyecto y escribiendo en este las variables que hacen falta para el deploy, en este caso  API, el archivo se crea en el servidor que es donde va a correr
