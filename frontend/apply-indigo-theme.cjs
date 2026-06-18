const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src');

const replacements = [
  // HEX Colors
  { from: /#2563EB/ig, to: '#7C3AED' }, // Blue 600 -> Violet 600
  { from: /#1D4ED8/ig, to: '#6D28D9' }, // Blue 700 -> Violet 700
  { from: /#EEF2FF/ig, to: '#F5F3FF' }, // Blue 50 -> Violet 50
  { from: /#E0E7FF/ig, to: '#EDE9FE' }, // Blue 100 -> Violet 100
  
  // Tailwind Classes
  { from: /text-blue-600/g, to: 'text-violet-600' },
  { from: /text-blue-500/g, to: 'text-violet-500' },
  { from: /bg-blue-600/g, to: 'bg-violet-600' },
  { from: /bg-blue-500/g, to: 'bg-violet-500' },
  { from: /bg-blue-700/g, to: 'bg-violet-700' },
  { from: /bg-blue-50/g, to: 'bg-violet-50' },
  { from: /bg-blue-100/g, to: 'bg-violet-100' },
  { from: /border-blue-500/g, to: 'border-violet-500' },
  { from: /ring-blue-500/g, to: 'ring-violet-500' }
];

function processDirectory(dirPath) {
  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js') || fullPath.endsWith('.css')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;

      replacements.forEach(rule => {
        content = content.replace(rule.from, rule.to);
      });

      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated theme colors in: ${file}`);
      }
    }
  });
}

processDirectory(directoryPath);
console.log('Theme update complete!');
