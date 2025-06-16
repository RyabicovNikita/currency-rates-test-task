import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';
import unusedImports from 'eslint-plugin-unused-imports';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tsParser from '@typescript-eslint/parser';

export default tseslint.config(
  { ignores: ['dist', 'build'] },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parser: tsParser,
      parserOptions: {
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'unused-imports': unusedImports,
      'simple-import-sort': simpleImportSort,
      import: importPlugin,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'unused-imports/no-unused-imports': 'warn',
      'unused-imports/no-unused-vars': [
        'warn',
        { vars: 'all', varsIgnorePattern: '^_', argsIgnorePattern: '^_' },
      ],

      // 'import/order': [
      //   'warn',
      //   {
      //     groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
      //     pathGroups: [
      //       { pattern: '@app/**', group: 'internal', position: 'before' },
      //       { pattern: '@pages/**', group: 'internal', position: 'before' },
      //       { pattern: '@widgets/**', group: 'internal', position: 'before' },
      //       { pattern: '@features/**', group: 'internal', position: 'before' },
      //       { pattern: '@entities/**', group: 'internal', position: 'before' },
      //       { pattern: '@shared/**', group: 'internal', position: 'before' },
      //     ],
      //     pathGroupsExcludedImportTypes: ['builtin'],
      //     alphabetize: { order: 'asc', caseInsensitive: true },
      //     'newlines-between': 'always',
      //   },
      // ],
      'import/no-duplicates': 'warn',
      'import/no-cycle': ['warn', { maxDepth: 1 }],
      'import/no-useless-path-segments': 'warn',
      'simple-import-sort/exports': 'warn',
      'simple-import-sort/imports': [
        'warn',
        {
          groups: [
            ['^\\u0000'],
            ['^node:'],
            ['^react', '^@?\\w'],
            [
              '^@app/',
              '^@process/',
              '^@pages/',
              '^@widgets/',
              '^@features/',
              '^@entities/',
              '^@shared/',
            ],
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            ['\\.s?css$'],
          ],
        },
      ],
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: [
                '@/app/**/!(*index)',
                '@/process/**/!(*index)',
                '@/pages/**/!(*index)',
                '@/widgets/**/!(*index)',
                '@/features/**/!(*index)',
                '@/entities/**/!(*index)',
                '@/shared/**/!(*index)',
              ],
              message: 'Импорт разрешён только из публичного API (index.ts)',
            },
          ],
        },
      ],
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
        },
      },
    },
  },
);
