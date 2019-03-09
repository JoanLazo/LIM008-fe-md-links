import { pathAbsolute, convertInAbsolute, isDirOrFile, readFilesMd, validateOption, uniqueLinks, brokenLinks, statsOption } from '..root.js';
import { resolve } from 'path';
import { rejects } from 'assert';

const options = {
  validate: '--validate',
  stats: '--stats',
  validateandstats: '--validate --stats'
};

const mdLinks = (root, options) => {
  const promise = new Promise((resolve, reject) => {
    const path = pathAbsolute(root);
    let rootAbs = '';
    if (path === false) {
      rootAbs.push(convertInAbsolute(root));
    } else {
      rootAbs = root;
    }
    const allLinks = readFilesMd(isDirOrFile(rootAbs));
    if (options === '--validate') {
      return validateOption(allLinks));
    } else if (options === '--stats') {
       
    } 
  });
};

// const mdLinks = require("md-links");

// mdLinks("./some/example.md")
//   .then(links => {
//     // => [{ href, text, file }]
//   })
//   .catch(console.error);

// mdLinks("./some/example.md", { validate: true })
//   .then(links => {
//     // => [{ href, text, file, status, ok }]
//   })
//   .catch(console.error);

// mdLinks("./some/dir")
//   .then(links => {
//     // => [{ href, text, file }]
//   })
//   .catch(console.error);