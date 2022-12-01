
import commonjs from 'rollup-plugin-commonjs'
import {terser} from "rollup-plugin-terser"
import typescript from 'rollup-plugin-typescript2'

export default {
   input: './src/location.q.ts',

   output: [
      {
         name: "location.q",
         sourcemap: true,
         file: './dist/location.q.js',
         format: 'cjs'
      },
      {
         name: "location.q.min",
         sourcemap: true,
         file: './dist/location.q.min.js',
         format: 'cjs',
         plugins: [
            terser()
         ],
      },
   ],
   plugins: [
      typescript(),
      commonjs()
   ],

};