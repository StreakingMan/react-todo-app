/**
 * lint-staged config
 * @ref https://www.npmjs.com/package/lint-staged
 * @desc generated at 2022/3/8 00:39:37 by streakingman-cli@1.6.3
 */

module.exports = {
    '*.{[tj]s,[tj]sx,[cm]js}': ['eslint --fix'],
    '*.json': ['prettier --write'],
};
