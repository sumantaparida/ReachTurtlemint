const fs = require('fs');
const path = require('path');

const prettierOptions = JSON.parse(fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8'));

module.exports = {
  "env": {
      "browser": true,
      "es2021": true,
      "jest": true,
      "node": true,
      "es6": true,
  },
  "extends": [
      "eslint:recommended",
      "plugin:react/recommended"
  ],
  "parserOptions": {
      "ecmaFeatures": {
          "jsx": true
      },
      "ecmaVersion": "latest",
      "sourceType": "module"
  },
  "plugins": [
      "react"
  ],
  rules: {
    'prettier/prettier': ['error', prettierOptions],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/jsx-props-no-spreading': [<enabled />, {
      html: 'ignore' | 'enforce',
      custom: 'ignore' | 'enforce',
      explicitSpread: 'ignore' | 'enforce',
      exceptions: [<string />],
    }],
  },
}
