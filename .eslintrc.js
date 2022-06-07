module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
  plugins: [
    '@typescript-eslint',
    'prettier',
    'simple-import-sort',
    'react-css-module-hints',
    'import',
  ],
  ignorePatterns: ['.eslintrc.js', 'tailwind.config.js'],
  extends: [
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  settings: {
    react: {
      version: 'detect',
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './',
      },
    },
  },
  rules: {
    '@typescript-eslint/no-floating-promises': ['warn', { ignoreVoid: true }],
    'react-css-module-hints/no-non-existant-classes': 'warn',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-argument': 'warn',
    'react/jsx-closing-bracket-location': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/require-await': 'warn',
    '@typescript-eslint/comma-dangle': 'off',
    'react/jsx-props-no-spreading': 'off',
    'import/prefer-default-export': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'react-hooks/exhaustive-deps': [
      'warn',
      {
        additionalHooks: '(useRecoilCallback|useRecoilTransaction_UNSTABLE)',
      },
    ],
    '@typescript-eslint/indent': 'off',
    'react/react-in-jsx-scope': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'function-paren-newline': 'off',
    'object-curly-newline': 'off',
    'no-param-reassign': 'off',
    'react/prop-types': 'off',
    'linebreak-style': 'off',
    'no-void': 'off',
  },
};
