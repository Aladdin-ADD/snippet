import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import nodeResolve from 'rollup-plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import replace from 'rollup-plugin-replace';

var env = process.env.NODE_ENV || 'development';

var plugins = [
    nodeResolve(),
    commonjs({
        include: 'node_modules/**',
        extensions: ['.js', '.css'],
        sourceMap: true,
    }),
    json(),
    replace({
        'process.env.NODE_ENV': JSON.stringify(env)
    }),
    babel({
        presets: [
            'es2015-rollup'
        ]
    }),
];

if (env !== 'production') {
    plugins = [
        postcss(),
    ].concat(plugins);
}

export default {
    entry: './src/index.js',
    dest: './dist/index.js',
    format: 'cjs',
    plugins: plugins,
};
