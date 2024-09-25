import pluginJs from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import importPlugin from 'eslint-plugin-import';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const stylisticRecommended = stylistic.configs.customize({
    indent: 4,
    quotes: 'single',
    semi: true,
    jsx: false,
    commaDangle: 'only-multiline',
});

export default [
    {
        languageOptions: {
            globals: globals.node,
            parserOptions: {
                ecmaFeatures: {
                    impliedStrict: true,
                },
            },
        },
        ignores: ['.amplify/'],
    },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended.map((config) => ({
        ...config,
        files: ['**/*.ts'],
    })),
    ...tseslint.configs.stylistic.map((config) => ({
        ...config,
        files: ['**/*.ts'],
    })),
    {
        files: ['**/*.js', '**/*.mjs', '**/*.ts'],
        plugins: {
            ...stylisticRecommended.plugins,
        },
        rules: {
            'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
            ...stylisticRecommended.rules,
            '@stylistic/arrow-parens': ['error', 'always'],
            '@stylistic/quotes': ['error', 'single', { avoidEscape: true }],
            '@typescript-eslint/interface-name-prefix': 'off',
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
        },
    },
    {
        languageOptions: {
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
            },
        },
        settings: {
            'import/parsers': {
                espree: ['.js', '.cjs', '.mjs', '.jsx'],
            },
            'import/resolver': {
                node: true,
            },
        },
        files: ['**/*.js', '**/*.mjs'],
        plugins: { import: importPlugin },
        rules: {
            ...importPlugin.configs.recommended.rules,
            'import/no-commonjs': 'error',
        },
    },
];
