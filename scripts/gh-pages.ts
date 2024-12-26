import chalk from "chalk";
import ghpages from "gh-pages";
import { version } from "../package.json";

const EXIT_SUCCESS = 0;
const EXIT_FAILURE = 1;

ghpages
  .publish("out", {
    message: `Deployed to GitHub Pages [${version}]`,
    nojekyll: true,
    dotfiles: true,
  })
  .then(() => {
    console.log(` ${chalk.green("✓")} Successfully deployed to GitHub Pages`);
    process.exit(EXIT_SUCCESS);
  })
  .catch((error) => {
    console.error(` ${chalk.red("✗")} Error deploying to GitHub Pages:`, error);
    process.exit(EXIT_FAILURE);
  });
