const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const componentsToUpdate = [
  'Dasboard.jsx',
  'LandingPage.jsx',
  'Forms.jsx',
  'Cards.jsx',
  'CustomTemplateBuilder.jsx',
  'ThemeSelector.jsx',
  'Login.jsx',
  'SignUp.jsx',
  'Modal.jsx',
  'Navbar.jsx',
  'StepProgress.jsx',
  'Tabs.jsx',
  'Progress.jsx',
  'EditResume.jsx'
];

function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  
  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (componentsToUpdate.includes(file)) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Replace hardcoded white background classes with the new app-surface class
      // being careful not to replace text-white or border-white
      let newContent = content.replace(/\bbg-white\b/g, 'bg-app-surface');
      newContent = newContent.replace(/\bbg-slate-50\b/g, 'bg-app-surface');
      newContent = newContent.replace(/\border-stone-200\b/g, 'border-app-border');
      newContent = newContent.replace(/\border-stone-300\b/g, 'border-app-border');
      
      if (content !== newContent) {
        fs.writeFileSync(fullPath, newContent, 'utf8');
        console.log(`Updated component: ${file}`);
      }
    }
  }
}

processDirectory(srcDir);
console.log('Component backgrounds updated.');
