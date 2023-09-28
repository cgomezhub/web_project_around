const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); 


module.exports = {
    devtool: 'inline-source-map',
    entry: {
        main: "./src/index.js"
      },

    output: {
        path:  path.resolve(__dirname, "dist"), // Podrías darle el nombre que quisieras, pero vamos a quedarnos con 'dist'
        filename: "main.js", // Esto también puedes nombrarlo como quieras, pero vamos a ceñirnos a 'main.js'
        publicPath: "",
        clean: true,
    },
    target: ['web', 'es5'],
    stats: { children: true },    
    mode: 'development',
    devServer: {
        static: path.resolve(__dirname, './dist'), // especifica una carpeta desde donde servir la aplicación y su contenido
        compress: true, // esto acelerará la carga de archivos en el modo de desarrollo
        port: 8080, // abrirá tu página en localhost:8080 (puedes usar otro puerto)
        open: 'true',// se abrirá automáticamente en el navegador después de ejecutar npm run dev
    },
    module: {
        rules: [ // esto es un array de reglas
          // añádele un objeto que contenga reglas para Babel
          {
            // una expresión regular que busca todos los archivos js
            test: /\.js$/,
            // todos los archivos deben ser procesados por babel-loader
            loader: "babel-loader",
            // excluye la carpeta node_modules, no necesitamos procesar archivos en ella
            exclude: "/node_modules/"
          },
          {
            test: /\.css$/,
            use: [
              MiniCssExtractPlugin.loader,
              {
                loader: "css-loader"
              },
            ]
          },
          {
            // la regla para procesar archivos
            test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
            type: "asset/resource"
          },
        
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html" // ruta a nuestro archivo index.html
          }),
        new MiniCssExtractPlugin(),
    ],
}