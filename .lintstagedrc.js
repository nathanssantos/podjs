const path = require('path');

const eslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`;

const prettierCommand = 'prettier --write';

module.exports = {
  '*.{js,jsx,ts,tsx}': [eslintCommand],
  '*.{js,jsx,ts,tsx,css,scss}': [prettierCommand],
};
