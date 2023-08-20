const {test, expect} = require('@jest/globals')
const{getURLsFromHTML, normalizeURL} = require('./crawl.js')

test("all normalizeURL",() =>{
    let url = normalizeURL("https://blog.boot.dev/path/");
    expect(normalizeURL("https://blog.boot.dev/path/")).toBe(url)
    expect(normalizeURL("https://blog.boot.dev/path")).toBe(url)
    expect(normalizeURL("https://blog.boot.dev/path/")).toBe(url)
    expect(normalizeURL("http://blog.boot.dev/path")).toBe(url) 
})
test("all urls are here",() =>{
    let body = '<html><body><a href="https://blog.boot.dev/"><a href="/xyz"><a href="/ahmed"><span>Go to Boot.dev</span></a></body></html>';
    let base = 'https://blog.boot.dev';
    expect(getURLsFromHTML(body,base)).toEqual(["https://blog.boot.dev/","https://blog.boot.dev/xyz","https://blog.boot.dev/ahmed"]);

     
})
