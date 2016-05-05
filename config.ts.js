// Export TS Config
module.exports = {
  dev:{
    emitDecoratorMetadata: true,
    experimentalDecorators: true,
    module: 'commonjs',
    target: 'es5',
    noImplicitAny: false,
    sourceMap: true,
    outDir: '/build/www'
  },
  prod: {
    emitDecoratorMetadata: true,
    experimentalDecorators: true,
    module: 'commonjs',
    target: 'es5',
    noImplicitAny: false,
    sourceMap: true,
    outDir: '/build/prod'
  }
};
