module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    //"eslint:recommended",
    'plugin:vue/vue3-essential' // 解决vue3里报多根结点的问题
    //'plugin:prettier/recommended'
  ],
  parserOptions: {
    ecmaVersion: 10,
    sourceType: 'module'
  },
  plugins: ['vue'],
  rules: {}
}
