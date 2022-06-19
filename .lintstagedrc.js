const path = require('path');

const eslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`;

const prettierCommand = 'prettier --write';

module.exports = {
  'src/**/*.(js|jsx|ts|tsx)': [eslintCommand, prettierCommand],
  'src/**/*.(js|jsx|ts|tsx|json|css|scss)': [prettierCommand],
};
