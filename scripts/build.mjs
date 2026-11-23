import {mkdir,copyFile,cp,readFile} from 'node:fs/promises';
import {validateCatalog} from '../assets/catalog.js';
const root=new URL('../',import.meta.url);validateCatalog(JSON.parse(await readFile(new URL('tools.json',root),'utf8')));
await mkdir(new URL('_site/',root),{recursive:true});
for(const file of ['index.html','tools.json','.nojekyll']) await copyFile(new URL(file,root),new URL('_site/'+file,root));
await cp(new URL('assets/',root),new URL('_site/assets/',root),{recursive:true});
await mkdir(new URL('_site/mfc710-rs-monitor/',root),{recursive:true});
await copyFile(new URL('mfc710-rs-monitor/index.html',root),new URL('_site/mfc710-rs-monitor/index.html',root));
console.log('Validated public site: _site/');
