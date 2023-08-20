module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
    
}
const {JSDOM} = require('jsdom')


function normalizeURL(url){
   let myUrl = new URL(url);
 
   return myUrl.host + myUrl.pathname.split('/').join('/')
}





function getURLsFromHTML(htmlBody, baseURL){
   let dom = new JSDOM(htmlBody);
   let urls = dom.window.document.querySelectorAll('a').entries();
  
   let result = []
  
   for (let url of urls){
        if ( url[1].href[0] == '/'){
            result.push(baseURL + url[1].href)

        }else{
            
            result.push(url[1].href)
        }


   }

    return result 

}
async function crawlPage(base_url, url, pages){
   
    try{
        if(! url.includes(base_url)){
            console.log('done')
            return;
            
        }
        console.log(url);
        let normalized = normalizeURL(url);
        pages[normalizeURL(base_url)] = 0; 
        if(! (normalized in pages)){
            pages[normalized] = 1;

        }else{
            if(url != base_url){
                pages[normalized]++;
                console.log(url,base_url);
                return;
            }
        }
        
        let response = await fetch(url);
        
        if(response.headers.get('content-type').split(";")[0] != 'text/html'){
            
            return new Error("content is not html");
        }
        let html = await response.text();
        // console.log(html);
        let crawled_pages = getURLsFromHTML(html,base_url);
        
        for(let page of crawled_pages){
           crawlPage(base_url,page,pages); 
        }

    }catch(err){
        console.log(err);
    }
    console.log(pages)
    return pages
}





