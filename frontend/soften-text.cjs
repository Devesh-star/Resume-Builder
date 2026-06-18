const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

const softenReplacements = [
  { regex: /text-indigo-950/g, replace: 'text-indigo-800' },
  { regex: /text-indigo-900/g, replace: 'text-indigo-700' },
  { regex: /text-indigo-800/g, replace: 'text-indigo-600' },
  { regex: /text-indigo-700/g, replace: 'text-indigo-500' },
  { regex: /text-indigo-600/g, replace: 'text-indigo-400' },
];

function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  
  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js') || fullPath.endsWith('.css')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;
      
      for (const { regex, replace } of softenReplacements) {
        if (regex.test(content)) {
          content = content.replace(regex, replace);
          changed = true;
        }
      }

      if (changed) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Softened text in: ${fullPath}`);
      }
    }
  }
}

processDirectory(srcDir);
