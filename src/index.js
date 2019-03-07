import { pathAbsolute, convertInAbsolute, isDirOrFile, readFilesMd, validateOption, uniqueLinks, brokenLinks, statsOption } from '..root.js';

const options = {
  validate: --validate,
  stats: --stats
}

const mdLinks = (input) => {
  const path = pathAbsolute(input);
  let rootAbs;
  if (path === false) {
    rootAbs.push(convertInAbsolute(path));
  } else {
    rootAbs = input;
  }
  const allLinks = readFilesMd(isDirOrFile(rootAbs));
  
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