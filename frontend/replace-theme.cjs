const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

const replacements = [
  { regex: /neon-pink-dim/g, replace: 'primary-dim' },
  { regex: /neon-cyan-dim/g, replace: 'secondary-dim' },
  { regex: /neon-pink-glow/g, replace: 'primary-glow' },
  { regex: /neon-cyan-glow/g, replace: 'secondary-glow' },
  { regex: /neon-pink/g, replace: 'primary' },
  { regex: /neon-cyan/g, replace: 'secondary' },
  { regex: /cyber-dark/g, replace: 'app-bg' },
  { regex: /cyber-surface/g, replace: 'app-surface' },
  { regex: /cyber-elevated/g, replace: 'app-elevated' },
  { regex: /cyber-glass/g, replace: 'app-glass' },
  { regex: /cyber-border/g, replace: 'app-border' },
  { regex: /neon-glow/g, replace: 'primary-glow' },
  { regex: /neon-subtle/g, replace: 'primary-subtle' },
  { regex: /neon-pulse/g, replace: 'primary-pulse' },
  { regex: /cyber-grid/g, replace: 'app-grid' },
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
      
      for (const { regex, replace } of replacements) {
        if (regex.test(content)) {
          content = content.replace(regex, replace);
          changed = true;
        }
      }
      
      if (changed) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated: ${fullPath}`);
      }
    }
  }
}

processDirectory(srcDir);
console.log('Theme replacement complete.');
