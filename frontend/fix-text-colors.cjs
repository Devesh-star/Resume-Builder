const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

const textReplacements = [
  { regex: /text-stone-200/g, replace: 'text-slate-800' },
  { regex: /text-stone-300/g, replace: 'text-slate-700' },
  { regex: /text-stone-400/g, replace: 'text-slate-600' },
  { regex: /text-stone-500/g, replace: 'text-slate-500' },
  // Let's also fix background and border classes that were meant for dark mode
  { regex: /bg-white\/5/g, replace: 'bg-slate-200/50' },
  { regex: /bg-white\/10/g, replace: 'bg-slate-200' },
  { regex: /border-white\/5/g, replace: 'border-slate-200' },
  { regex: /border-white\/10/g, replace: 'border-slate-300' },
  { regex: /border-white\/15/g, replace: 'border-slate-300' },
  { regex: /bg-\[\#0a0508\]\/90/g, replace: 'bg-slate-50/90' },
  { regex: /bg-\[\#0a0508\]\/95/g, replace: 'bg-slate-50/95' },
  { regex: /bg-white\/\[0\.03\]/g, replace: 'bg-white' },
  { regex: /border-white\/\[0\.06\]/g, replace: 'border-slate-200' },
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

      // Special handling for LandingPage text-white that are headings/text but not buttons
      if (file === 'LandingPage.jsx') {
        content = content.replace(/text-white/g, 'text-slate-900');
        // Fix buttons back to text-white
        content = content.replace(/text-slate-900 px-5/g, 'text-white px-5'); // Get Started button
        content = content.replace(/text-slate-900 px-7/g, 'text-white px-7'); // Start Building Free button
        content = content.replace(/text-slate-900 px-8/g, 'text-white px-8'); // Start Building Now button
        content = content.replace(/bg-primary hover:bg-\[\#c02e5c\] text-slate-900/g, 'bg-primary text-white'); // Action buttons
        content = content.replace(/FileText size=\{18\} className="text-slate-900"/g, 'FileText size={18} className="text-white"'); // Logo icon
        changed = true;
      }
      
      if (file === 'Dasboard.jsx') {
        content = content.replace(/text-white/g, 'text-slate-900');
        content = content.replace(/text-slate-900 font-extrabold rounded-2xl/g, 'text-white font-extrabold rounded-2xl'); // Gradient button
        content = content.replace(/text-slate-900 px-4 py-2/g, 'text-white px-4 py-2'); // Small buttons
        content = content.replace(/text-slate-900 font-bold/g, 'text-slate-900 font-bold'); // Let text be dark
        content = content.replace(/text-slate-900 mb-1/g, 'text-slate-900 mb-1'); 
        content = content.replace(/FileText size=\{18\} className='text-slate-900'/g, 'FileText size={18} className="text-white"'); 
        changed = true;
      }

      if (changed) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated text colors: ${fullPath}`);
      }
    }
  }
}

processDirectory(srcDir);
