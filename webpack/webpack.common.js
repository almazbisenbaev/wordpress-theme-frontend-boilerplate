const Path = require('path');
// const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: Path.resolve(__dirname, '../src/scripts/index.js')
  },
  output: {
    path: Path.join(__dirname, '../build'),
    filename: 'js/[name].js',
    assetModuleFilename: ({ filename }) => {
      return filename.replace('src/', '');
    }
  },
  plugins: [
    new CleanWebpackPlugin(),

    new CopyWebpackPlugin({
      patterns: [
        { from: Path.resolve(__dirname, '../src/assets'), to: 'assets', globOptions: { follow: true } },
        { from: Path.resolve(__dirname, '../src/uploads'), to: 'uploads', globOptions: { follow: true } },
      ]
    }),

    new HtmlWebpackPlugin({
      minify: false,
      filename: 'components.html',
      template: Path.resolve(__dirname, '../src/components.html'),
      templateParameters: {
        require: require
      }
    }),
    new HtmlWebpackPlugin({
      minify: false,
      filename: 'index.html',
      template: Path.resolve(__dirname, '../src/index.html'),
      templateParameters: {
        require: require
      }
    }),
    new HtmlWebpackPlugin({
      minify: false,
      filename: 'cart-empty.html',
      template: Path.resolve(__dirname, '../src/cart-empty.html'),
      templateParameters: {
        require: require
      }
    }),
    new HtmlWebpackPlugin({
      minify: false,
      filename: 'page-template-default.html',
      template: Path.resolve(__dirname, '../src/page-template-default.html'),
      templateParameters: {
        require: require
      }
    }),
    new HtmlWebpackPlugin({
      minify: false,
      filename: 'blog-index.html',
      template: Path.resolve(__dirname, '../src/blog-index.html'),
      templateParameters: {
        require: require
      }
    }),
    new HtmlWebpackPlugin({
      minify: false,
      filename: 'blog-single.html',
      template: Path.resolve(__dirname, '../src/blog-single.html'),
      templateParameters: {
        require: require
      }
    }),

  ],
  resolve: {
    alias: {
      '~': Path.resolve(__dirname, '../src')
    }
  },
  module: {
    rules: [
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto'
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|mp4|webm|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        type: 'asset/resource'
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              preprocessor: (content, loaderContext) => {
                const fs = require('fs');
                const path = require('path');
                
                // Replace include syntax with actual file content
                let result = content.replace(/<%=\s*require\(['"](.*?)['"]\)\s*%>/g, (match, filePath) => {
                  try {
                    const fullPath = path.resolve(loaderContext.context, filePath);
                    return fs.readFileSync(fullPath, 'utf8');
                  } catch (err) {
                    console.error(`Error loading partial: ${filePath}`, err);
                    return match;
                  }
                });
                return result;
              },
              sources: {
                list: [
                  "...",
                  {
                    tag: "img",
                    attribute: "src",
                    type: "src"
                  }
                ]
              }
            }
          }
        ]
      },
    ]
  }
};
