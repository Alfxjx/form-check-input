import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';

const production = process.env.NODE_ENV === 'production';

export default {
  input: 'src/index.js',
  output: {
    file: `release/index${production ? '.min' : ''}.js`,
    format: 'umd',
    name: 'formCheck',
    sourcemap: true,
    banner: `/**
    * @name form-check-input
    * @description
    * @author Alfxjx
    * @email xjxtju@163.com
    */`,
  },
  plugins: [
    babel()
  ]
    .concat(production ? [
      uglify()
    ] : [])
}
