// eslint@3.10.2

module.exports = {
    parserOptions: {
        ecmaVersion: 2017,
        sourceType: 'module',
        ecmaFeatures: {
            globalReturn: false,
            impliedStrict: true,
            jsx: true,
            experimentalObjectRestSpread: true,
        },
    },
    parser: 'babel-eslint',
    env: {
        browser: true,
        node: true,
        commonjs: true,
        'shared-node-browser': true,
        es6: true,
        worker: true,
        serviceworker: true,
    },
    globals: {},
    plugins: [],
    extends: [
        'eslint:recommended',
    ],
    root: true,
    rules: {
        'no-console': 0,
        'no-unused-vars': [1, {'args': 'none'}],
        'no-constant-condition': [2, {'checkLoops': false}],
        'quotes': [2, 'single', {'avoidEscape': true, 'allowTemplateLiterals': true}],
        'no-unreachable': 1,
        'no-debugger': 1,
    },
};
