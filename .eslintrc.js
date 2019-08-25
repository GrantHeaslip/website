module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        node: true,
    },
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 2017,
        project: './tsconfig.json',
        sourceType: 'module',
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/typescript',
    ],
    plugins: [
        'import',
    ],
    rules: {
        'arrow-parens': [
            'warn',
            'always',
        ],
        'class-methods-use-this': 'off',
        'import/prefer-default-export': 'off',
        'import/no-default-export': 'error',
        'jsx-quotes': [
            'error',
            'prefer-single',
        ],
        'linebreak-style': [
            'error',
            'unix',
        ],
        'max-len': [
            'warn',
            {
                'code': 100,
                'ignoreStrings': true,
                'ignoreTemplateLiterals': true,
            }
        ],
        'no-console': 'off',
        'object-shorthand': [
            'error',
            'never',
        ],
        'quotes': [
            'warn',
            'single',
        ],
        '@typescript-eslint/array-type': [
            'error',
            {
                "default": "generic",
            },
        ],
        '@typescript-eslint/ban-ts-ignore': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
    },
    settings: {
        'import/extensions': [
            '.js',
            '.jsx',
            '.ts',
            '.tsx',
        ],
        'import/parsers': {
            '@typescript-eslint/parser': [
                '.ts',
                '.tsx',
            ],
        },
    },
};
