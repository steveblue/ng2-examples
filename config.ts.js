// Export TS Config
module.exports = {
  dev:{
    emitDecoratorMetadata: true,
    experimentalDecorators: true,
    module: 'commonjs',
    target: 'es5',
    noImplicitAny: false,
    sourceMap: false,
    outDir: '/build/www'
  },
  prod: {
    emitDecoratorMetadata: true,
    experimentalDecorators: true,
    module: 'commonjs',
    target: 'es5',
    noImplicitAny: false,
    sourceMap: false,
    outDir: '/build/prod'
  }
};
