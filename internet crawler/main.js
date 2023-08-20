const {crawlPage} = require("./crawl.js")

async function main(){
    
     console.log(await crawlPage("https://wagslane.dev","https://wagslane.dev",{}));
}

main();
