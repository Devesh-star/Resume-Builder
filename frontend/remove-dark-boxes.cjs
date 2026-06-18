const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

const darkReplacements = [
  // Tailwind variants
  { regex: /bg-\[\#0a0508\]\/80/gi, replace: 'bg-app-surface/80' },
  { regex: /bg-\[\#0a0508\]\/60/gi, replace: 'bg-app-surface/60' },
  { regex: /bg-\[\#0a0508\]\/95/gi, replace: 'bg-app-surface/95' },
  { regex: /bg-\[\#0a0508\]/gi, replace: 'bg-app-surface' },
  { regex: /from-\[\#0a0508\]\/95/gi, replace: 'from-app-surface/95' },
  { regex: /via-\[\#0a0508\]\/50/gi, replace: 'via-app-surface/50' },
  { regex: /to-\[\#0a0508\]/gi, replace: 'to-app-surface' },
  { regex: /from-\[\#0a0508\]/gi, replace: 'from-app-surface' },
  { regex: /bg-gray-900/gi, replace: 'bg-slate-50' },
  // Raw hex fallbacks (for inline styles)
  { regex: /#0a0508/gi, replace: '#E0E7FF' },
  { regex: /#11080e/gi, replace: '#C7D2FE' },
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
      
      for (const { regex, replace } of darkReplacements) {
        if (regex.test(content)) {
          content = content.replace(regex, replace);
          changed = true;
        }
      }

      if (changed) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Replaced dark backgrounds in: ${fullPath}`);
      }
    }
  }
}

processDirectory(srcDir);
console.log('Dark background replacements complete.');
