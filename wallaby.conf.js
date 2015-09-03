var babel = require('babel');

module.exports = function (wallaby) {
  var babelCompiler = wallaby.compilers.babel({ babel: babel, stage: 1 });

  return {
    files: [
      'config/secrets.js',
      'app/**/*.js',
      'app/**/*.jade',
      'lib/**/*.js',
      '!app/**/*.test.js'
    ],
    tests: [
      'app/**/*.test.js'
    ],
    env: {
      type: 'node',
      runner: '/Users/scott/.nvm/versions/node/v0.12.7/bin/node',
      params: {
        env: 'NODE_ENV=test'
      }
    },
    testFramework: 'mocha',
    compilers: {
      '**/*.js': babelCompiler
    },
    workers: {
       initial: 1,
       regular: 1
     }
  }
}
