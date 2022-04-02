module.exports = {
    root: true,
    env: {
        node: true
    },
    'extends': [
        'plugin:vue/essential',
        'eslint:recommended'
    ],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error404.jpg' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error404.jpg' : 'off'
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
};
