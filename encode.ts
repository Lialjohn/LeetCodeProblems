// https://leetcode.com/explore/challenge/card/march-leetcoding-challenge-2021/590/week-3-march-15th-march-21st/3673/

// TinyURL is a URL shortening service where you enter a URL such as https://leetcode.com/problems/design-tinyurl and it returns a short URL such as http://tinyurl.com/4e9iAk.

// Design the encode and decode methods for the TinyURL service. There is no restriction on how your encode/decode algorithm should work. You just need to ensure that a URL can be encoded to a tiny URL and the tiny URL can be decoded to the original URL.

// ---------------------------------------------------------------

// so whatever comes out of encode has to go into decode and come back out as the original url string.
// so I need to find a way to make the url smaller. I suppose that'd mean one letter represents multiple letter patterns. Although I always thought actual url shorteners just used a serial code. 
// and then to decode I'd need to have the original domain and path available. I think it would be easiest if there was a ds you could simply pull the original url out of with the shortened url path as a key tbh. so let's do that.
// I'll get a string of random numbers/characters-- will keep it to 6 like the example-- attach it to a new constant url, and then stash the original in a map, to be picked out during decode.
// I don't love this solution because you could potentially get a repeated code. It's at least unlikely to happen during test cases, but I don't have time this morning to figure out a whole new hashing function. I usually rely on crypto :(
// potential chars in code: 10 + 26 + 26. 62.

const urls = new Map

const encode = (longUrl: string): string => {
    let newUrl = 'http://tinyurl.com/'
    const code = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    for (let i = 0; i < 6; i++) {
        newUrl += code[Math.floor(Math.random() * 62)]
    }
    urls.set(newUrl, longUrl)
    return newUrl
}

const decode = (tinyUrl: string): string => {
    return urls.get(tinyUrl)
}

const url = encode('https://leetcode.com/problems/design-tinyurl')
console.log(url)
console.log(decode(url))