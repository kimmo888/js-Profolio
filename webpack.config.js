//const { resolve } = require('path');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require ('copy-webpack-plugin');

module.exports = {
    entry: "./src/index.js",
    // Entry nos permite decir el punto de entrada de nuestra aplicación
    output: {
        // Output nos permite decir hacia dónde va enviar lo que va a preparar webpack bundle
        path: path.resolve(__dirname, 'dist'), //* se requiere una ruta absoluta, pero con el comando __dirname nos ubica la ruta del proyecto no importa si movemos el proyecto en otra ruta.
        //?también se puede poner asi path: __dirname + 'dist', o path: __dirname + '/ubicación',
        // path es donde estará la carpeta donde se guardará los archivos
        // Con path.resolve podemos decir dónde va estar la carpeta y la ubicación del mismo
        filename: 'main.js',
         // filename le pone el nombre al archivo final
        assetModuleFilename: "images/[hash][ext][query]",  //destino y carpeta de salida de las imágenes con hash y extension se agrega para no utilizar el copy-plugin, se cambia también el archivo templete donde  se hace el llamado de estas imágenes
    },
    resolve: {
        extensions: ['.js,']
        // Aquí ponemos las extensiones que tendremos en nuestro proyecto para webpack los lea
    },
    module: {
        rules: [  //reglas para trabajar con webpack
            {
                test: /\.m?js$/,
                // Test declara que extensión de archivos leerá .js
                exclude: /node_modules/,
                // Exclude permite omitir archivos o carpetas especificas
                use: {
                    // Use es un arreglo u objeto donde dices que loader aplicaras
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css|\.styl$/i,  //webpack lee de derecha a izquierda o de abajo hacia arriba, primero llera en este caso los .styl y después los css
                use: [MiniCssExtractPlugin.loader,
                'css-loader', 'stylus-loader'],
            },
            {
                test:/\.(png|svg|jpg|jpeg|gif)$/i,  //se declaran las extensiones de los archivos a importar.
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,  // Tipos de fuentes a incluir
                type: 'asset/resource',  // Tipo de módulo a usar (este mismo puede ser usado para archivos de imágenes)
                use: {
                    loader: 'url-loader', // NOMBRE DEL LOADER
                    options: {
                        limit: false, // O LE PASAMOS UN NUMERO
                        // Habilita o deshabilita la transformación de archivos en base64.
                        mimetype: 'application/font-woff',
                        // Especifica el tipo MIME con el que se alineará el archivo.
                        // Los MIME Types (Multipurpose Internet Mail Extensions)
                        // son la manera standard de mandar contenido a través de la red.
                        name: "[name].[ext]",
                        // EL NOMBRE INICIAL DEL PROYECTO + SU EXTENSIÓN
                        // PUEDES AGREGARLE [name]hola.[ext] y el output del archivo seria
                        // ubuntu-regular hola.woff
                        outputPath: './fonts/',
                        // EL DIRECTORIO DE SALIDA (SIN COMPLICACIONES)
                        publicPath: './fonts/',
                        // EL DIRECTORIO PUBLICO (SIN COMPLICACIONES)
                        esModule: false,
                /* generator: {
                  filename: 'assets/fonts/[hash][ext][query]',  // Directorio de salida también se podría poner en la parte de arriba como las imágenes en output: {assetModuleFilename: "fonts/[hash][ext]",} esta opción no necesita la opción de url-loader o se utiliza esta por defecto o se utiliza la de url-loader para que no genere conflicto.
                            } */
                        },
                    }
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ // se llama al plugin, configuración
            inject: true,  //se establece que es una inserción true, inyecta el bundle al templete html
            template: './public/index.html', //de donde tomamos el archivo html principal
            filename: './index.html' //nombre de salida que va a tener en la carpeta dist
        }),
        new MiniCssExtractPlugin(), //instanciamos el plugin
        new CopyPlugin({  // configuración del plugin
            patterns:[  // se obtienen dos elementos desde donde se toma la ubicación y adonde van los archivos
                {
                    from: path.resolve(__dirname, "src", "assets/images"), //carpeta a mover al dist proyecto de servidor o prodccion
                    to: "assets/images" // ruta final en la carpeta dist
                }
            ]
        })
    ]
}