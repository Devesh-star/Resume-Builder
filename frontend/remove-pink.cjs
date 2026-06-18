const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

const hexReplacements = [
  { regex: /#D4577A/gi, replace: '#4F46E5' }, // Indigo-600
  { regex: /#E88FA2/gi, replace: '#818CF8' }, // Indigo-400
  { regex: /#d8386b/gi, replace: '#4338CA' }, // Indigo-700
  { regex: /#c02e5c/gi, replace: '#3730A3' }, // Indigo-800
  { regex: /#B84466/gi, replace: '#3730A3' }, // Indigo-800
  { regex: /#C77489/gi, replace: '#4F46E5' }, // Indigo-600
  { regex: /#FAF5F0/gi, replace: '#F8FAFC' }, // Slate-50
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
      
      for (const { regex, replace } of hexReplacements) {
        if (regex.test(content)) {
          content = content.replace(regex, replace);
          changed = true;
        }
      }

      if (changed) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Replaced pink hex codes in: ${fullPath}`);
      }
    }
  }
}

processDirectory(srcDir);
console.log('Hex code replacements complete.');
