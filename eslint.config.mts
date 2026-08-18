import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig([
    {
        files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
        plugins: { js },
        extends: ['js/recommended'],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
    },
    ...tseslint.configs.recommended,
    {
        files: ['**/*.{ts,mts,cts}'],
        languageOptions: {
            parserOptions: {
                tsconfigRootDir: __dirname,
                project: './tsconfig.json',
            },
        },
    },
    {
        rules: {
            'no-unused-vars': 'error',
            'prefer-const': ['error', { ignoreReadBeforeAssign: true }],
            'no-unused-expressions': 'error',
            'no-console': 'warn',
            'no-undef': 'error',
            '@typescript-eslint/no-explicit-any': 'warn',
        },
    },
    {
        ignores: ['.node_modules/*'],
    },
]);
