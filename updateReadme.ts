/* eslint-disable no-undef */
const fs = require('fs');
const path = require('path');
const {execSync} = require('child_process');

const packageJsonPath: string = path.resolve(__dirname, 'package.json');
const readmePath: string = path.resolve(__dirname, 'README.md');

if (!fs.existsSync(packageJsonPath)) {
  process.exit(1);
}
/* eslint-enable no-undef */

const packageJson: {version: string} = JSON.parse(
  fs.readFileSync(packageJsonPath, 'utf8'),
);
const version: string = packageJson.version;
const releaseDate: string = new Date().toISOString().split('T')[0];

if (!fs.existsSync(readmePath)) {
  fs.writeFileSync(readmePath, '# README.md\n');
}

let readmeContent: string = fs.readFileSync(readmePath, 'utf8');

const changeLogs = execSync('git log main --pretty=format:%s --no-merges -n 3')
  .toString()
  .trim()
  .split('\n')
  .map((line:string) => {
    const match = line.match(/(ADH-\d+)/);
    return match ? `<a href='' style='color: #5DADE2;'>${match[1]}</a> | ${line.replace(match[1], '').trim()}` : line;
  })
  .join('\n\n');

const newReleaseNotes = `
## v${version}  

**RELEASE DATE:** ${releaseDate}  

### CHANGE LOGS 
${changeLogs}
`;

const headingRegex: RegExp = /^# README\.md\s*\r?\n*/i;

if (!headingRegex.test(readmeContent)) {
  readmeContent = `# README.md\n${readmeContent}`;
}

if (!readmeContent.includes(`## v${version}`)) {
  readmeContent = readmeContent.replace(headingRegex, `$&\n${newReleaseNotes}`);
  fs.writeFileSync(readmePath, readmeContent);
}