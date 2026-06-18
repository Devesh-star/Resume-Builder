const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

const textReplacements = [
  { regex: /text-slate-900/g, replace: 'text-indigo-950' },
  { regex: /text-slate-800/g, replace: 'text-indigo-900' },
  { regex: /text-slate-700/g, replace: 'text-indigo-800' },
  { regex: /text-slate-600/g, replace: 'text-indigo-700' },
  { regex: /text-slate-500/g, replace: 'text-indigo-600' },
  // Just in case I missed some text-stone classes in the last run
  { regex: /text-stone-900/g, replace: 'text-indigo-950' },
  { regex: /text-stone-800/g, replace: 'text-indigo-900' },
  { regex: /text-stone-700/g, replace: 'text-indigo-800' },
  { regex: /text-stone-600/g, replace: 'text-indigo-700' },
  { regex: /text-stone-500/g, replace: 'text-indigo-600' },
];

function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  
  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;
      
      for (const { regex, replace } of textReplacements) {
        if (regex.test(content)) {
          content = content.replace(regex, replace);
          changed = true;
        }
      }

      if (changed) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated text to indigo in: ${fullPath}`);
      }
    }
  }
}

processDirectory(srcDir);
