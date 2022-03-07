/**
 * eslint config
 * @ref http://eslint.cn/
 * @desc generated at 2022/3/8 00:39:15 by streakingman-cli@1.6.3
 */

module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 11,
    },
    env: {
        es6: true,
        node: true,
    },
    plugins: ['eslint-plugin-prettier', '@typescript-eslint'],
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
    ],
    rules: {
        'prettier/prettier': 'error',
    },
};
