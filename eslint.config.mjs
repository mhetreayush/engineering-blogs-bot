import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: ['**/node_modules/', '**/dist'],
  },
  ...compat.extends('plugin:@typescript-eslint/recommended', 'prettier', 'plugin:prettier/recommended'),
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },

    languageOptions: {
      globals: {
        ...globals.node,
      },

      parser: tsParser,
      ecmaVersion: 2020,
      sourceType: 'module',
    },

    rules: {
      'no-var': 'error',
      semi: 'error',

      indent: [
        'error',
        2,
        {
          SwitchCase: 1,
        },
      ],

      'no-multi-spaces': 'error',
      'space-in-parens': 'error',
      'no-multiple-empty-lines': 'error',
      'prefer-const': 'error',

      'simple-import-sort/imports': [
        'error',
        {
          groups: [['^\\u0000'], ['^react$', '^@?\\w'], ['^@', '^'], ['^\\./'], ['^.+\\.(module.css|module.scss)$'], ['^.+\\.(gif|png|svg|jpg)$']],
        },
      ],
    },
  },
  {
    files: ['**/*.ts', '**/*.js'],
    ignores: ['node_modules/**', 'dist/**'],
  },
];
