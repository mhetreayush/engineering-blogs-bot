// eslint-disable-next-line @typescript-eslint/no-require-imports
const fs = require('fs');
const mainEnv = fs.readFileSync('.env', 'utf8');

const exampleEnv = mainEnv
  .split('\n')
  .map((line) => {
    line = line.trim();
    if (line[0] === '#') {
      return null;
    }
    const firstEqualSign = line.indexOf('=');
    if (firstEqualSign === -1) {
      return null;
    }
    const key = line.slice(0, firstEqualSign);
    return `${key}=`;
  })
  .filter(Boolean)
  .join('\n');

fs.writeFileSync('.env.example', exampleEnv);
