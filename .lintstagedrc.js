const path = require('path');

const eslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`;

const prettierCommand = 'prettier --write';

const gitCommand = 'git add .';

module.exports = {
  '*.{js,jsx,ts,tsx}': [eslintCommand, prettierCommand, gitCommand],
  '*.{css,scss}': [prettierCommand, gitCommand],
};
