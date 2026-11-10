// Prints the export's print.html to the tagged, bookmarked PDF.  usage: node _src/print_pdf.js <export dir>/print.html downloads/Pathfinder-Guidebook-FYE100.pdf
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage();
const errs=[];p.on('requestfailed',r=>errs.push(r.url()));
await p.goto('file://'+process.argv[2],{waitUntil:'networkidle'});await p.pdf({path:process.argv[3],format:'Letter',printBackground:true,tagged:true,outline:true,margin:{top:'0.6in',bottom:'0.6in',left:'0.6in',right:'0.6in'}});
console.log('failed requests',errs.length,errs.slice(0,5));await b.close();})();
