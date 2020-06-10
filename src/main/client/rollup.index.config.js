import { uglify } from "rollup-plugin-uglify";

export default {
    input: './dist/index.js',
    output: {
        file: '../webapp/resources/js/index.js',
        format: 'iife'
    },
    plugins: [uglify()]
};