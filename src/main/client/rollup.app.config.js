import { uglify } from "rollup-plugin-uglify";

export default {
    input: './dist/app.js',
    output: {
        file: '../webapp/resources/js/app.js',
        format: 'iife'
    },
    plugins: [uglify()]
};