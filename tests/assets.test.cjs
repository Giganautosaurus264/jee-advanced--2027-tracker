const fs=require('node:fs'),assert=require('node:assert/strict'),vm=require('node:vm');
const html=fs.readFileSync('index.html','utf8');
for(const file of ['app.js','core.js','catalog.js','syllabus.js','sw.js'])new vm.Script(fs.readFileSync(file,'utf8'),{filename:file});
const manifest=JSON.parse(fs.readFileSync('manifest.webmanifest','utf8'));assert.equal(manifest.scope,'./');assert.equal(manifest.start_url,'./#overview');assert.equal(manifest.display,'standalone');
for(const icon of manifest.icons){const bytes=fs.readFileSync(icon.src);assert.equal(bytes.readUInt32BE(16),Number(icon.sizes.split('x')[0]));assert.equal(bytes.readUInt32BE(20),Number(icon.sizes.split('x')[1]))}
const sw=fs.readFileSync('sw.js','utf8');const cache=vm.createContext({self:{addEventListener(){}},URL});vm.runInContext(sw,cache);const shell=vm.runInContext('SHELL',cache);
for(const asset of shell)assert(fs.existsSync(asset.split('?')[0]==='./'?'index.html':asset.split('?')[0]),asset+' exists');
for(const match of html.matchAll(/(?:src|href)="([^"#]+(?:\.js|\.css)[^"]*)"/g))assert(shell.includes('./'+match[1]),'Asset is precached with its exact version: '+match[1]);
assert(!html.includes('loadSharedReport'),'No automatic legacy hash import');assert(!/localStorage\.(clear|removeItem)/.test(fs.readFileSync('app.js','utf8')+fs.readFileSync('core.js','utf8')));
console.log('PWA assets, manifest icons, versioned offline shell, JavaScript syntax and non-destructive storage checks passed.');
