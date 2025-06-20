function cleanString(sentence) {
    const lowerCase = sentence.toLowerCase()
    const noPunctuation = lowerCase.replace(/[.,?/;:!'"]/g, '')
    const words = noPunctuation.split(/\s+/)
    return words
}

let test =  "String to be lower-cased, unpunctuated, and split into words. Basically wrangled?"

console.log(cleanString(test))