const path = require("path");

module.exports = {
  mode: process.env.NODE_ENV || "development",
  entry: "./app.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
};

resolve: {
  extensions: [".js", ".ts", ".tsx"];
}

module: {
  rules: [
    {
      test: /\.(j|t)sx?$/,
      exclude: /node_modules/,
      use: {
        loader: "babel_loader",
        options: {
          presets: [
            "@babel/preset-env",
            "@babel/preset-react",
            "@babel/preset-typescript",
          ],
        },
      },
    },
  ];
}
