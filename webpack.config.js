//const { resolve } = require('path');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: "./src/index.js",
    // Entry nos permite decir el punto de entrada de nuestra aplicación
    output: {
        // Output nos permite decir hacia dónde va enviar lo que va a preparar webpack
        path: path.resolve(__dirname, 'dist'), //* se requiere una ruta absoluta, pero con el comando __dirname nos ubica la ruta del proyecto no importa si movemos el proyecto en otra ruta.
        //?también se puede poner asi path: --dirname + 'dist', o path: --dirname + '/ubicación',
        // path es donde estará la carpeta donde se guardará los archivos
        // Con path.resolve podemos decir dónde va estar la carpeta y la ubicación del mismo
        filename: 'main.js',
         // filename le pone el nombre al archivo final
    },
    resolve: {
        extensions: ['.js,']
        // Aquí ponemos las extensiones que tendremos en nuestro proyecto para webpack los lea
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                // Test declara que extensión de archivos aplicara el loader
                exclude: /node_modules/,
                // Exclude permite omitir archivos o carpetas especificas
                use: {
                    // Use es un arreglo u objeto donde dices que loader aplicaras
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css|\.styl$/i,
                use: [MiniCssExtractPlugin.loader,
                'css-loader', 'stylus-loader'],
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ // se llama al plugin
            inject: true,  //se establece que es una inserción true
            template: './public/index.html', //de donde tomamos el archivo html principal
            filename: './index.html' //nombre de salida que va a tener en la carpeta dist
        }),
        new MiniCssExtractPlugin(),
    ]
}