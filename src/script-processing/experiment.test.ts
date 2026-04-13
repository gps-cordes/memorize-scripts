import { describe, it, expect } from 'vitest';
import { boldFirstWordOfLine, creationWordMap, redactLetters, replaceWordsInText } from './scriptService';


const lorumIpsum = `Lorem ipsum dolor sit amet consectetur adipiscing elit. 
Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. 

Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. 
Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. 
Ad litora torquent per conubia nostra inceptos himenaeos.`

describe(" test", () => {
    it("basic test", () => {
        // this should not pass
        expect(replaceWordsInText(lorumIpsum, 1)).not.toEqual(lorumIpsum);
        expect(replaceWordsInText("basic", 1)).toEqual("ba-ic")
        expect(replaceWordsInText("Basic", 2)).toEqual("B-c")

        expect(replaceWordsInText("Basic: words in a script!", 1)).toContain("Ba-ic: wo-ds i- a sc-ipt!")
    })

    it("create dictionary", () => {
        expect(creationWordMap("basic", 0)).toEqual(new Map([["basic", "basic"]]))
        expect(creationWordMap("basic", 1)).toEqual(new Map([["basic", "ba-ic"]]))
        expect(creationWordMap("1.2?.3.   4!5", 0)).toEqual(new Map([["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"]]))

        expect(creationWordMap("basic words", 1)).toEqual(new Map([["basic", "ba-ic"], ["words", "wo-ds"]]))
        expect(creationWordMap("basic words", 2)).toEqual(new Map([["basic", "b-c"], ["words", "w-s"]]))
    })

    it("redact", () => {
        expect(redactLetters("basic", 0)).toEqual("basic")
        expect(redactLetters("basic", 1)).toEqual("ba-ic")
        expect(redactLetters("basic", 2)).toEqual("b-c")
        expect(redactLetters("basic", 3)).toEqual("b-")
        expect(redactLetters("basic", 4)).toEqual("b-")
    })

    it("redact in", () => {
        expect(redactLetters("in", 1)).toEqual("i-")
    })
})

describe("bold first word", () => {
    it("Isolated", () => {
        expect(
            boldFirstWordOfLine(`
                a:
                `)).toContain("<strong>a:</strong>")
    });
    
        it("bolds redaction", () => {
        expect(
            boldFirstWordOfLine(`
                a-c:
                `)).toContain("<strong>a-c:</strong>")
    });

    it("Every speaker", () => {
        const newText = boldFirstWordOfLine(`a:hi

b:hello`)
        expect(newText).contains("<strong>a:</strong>")
        expect(newText).contains("<strong>b:</strong>")
        expect(newText).not.contains("<strong>hi")
        expect(newText).not.contains("<strong>hello")
    })

    it("Realistic output",()=>{
        const boldedText = boldFirstWordOfLine(
            `Gros. What have you been up to, hello world?\nBunthorne: I don't know Grosver. I just don't know.`)

        console.log(boldedText);
    })
    
})

// describe("Identify speakers", () => {

// })

// describe("Redact identified speaker", () => {

// })