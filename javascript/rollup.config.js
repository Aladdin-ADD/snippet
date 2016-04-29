'use strict';

import replace from 'rollup-plugin-replace';
import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';

var env = process.env.NODE_ENV || 'development';

export default {
    entry: './src/index.js',
    dest: './dist/index.js',
    format: 'cjs',
    plugins: [
        json(),
        babel({
            presets: [
                'es2015-minimal-rollup'
            ]
        }),
        commonjs({
            include: 'node_modules/**',
            extensions: ['.js', '.json'],
            sourceMap: false
        }),
        nodeResolve({
            extensions: ['.js', '.json']
        }),
        replace({
            'process.env.NODE_ENV': JSON.stringify(env)
        })
    ]
};
