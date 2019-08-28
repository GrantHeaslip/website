module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
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
        'semi': [
            'error',
            'always',
        ],
    },
    settings: {
        'import/extensions': [
            '.js',
            '.jsx',
        ],
    },
    overrides: [
        {
            files: [
                '*.ts',
                '*.tsx',
            ],
            extends: [
                'plugin:@typescript-eslint/eslint-recommended',
                'plugin:@typescript-eslint/recommended',
                'plugin:import/typescript',
            ],
            parserOptions: {
                ecmaFeatures: {
                    jsx: true
                },
                ecmaVersion: 2017,
                project: './tsconfig.json',
            },
            rules: {
                'jsx-quotes': [
                    'warn',
                    'prefer-single',
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
        },
    ],
};
